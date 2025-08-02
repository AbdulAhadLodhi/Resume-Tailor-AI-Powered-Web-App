// app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Simple keyword matching algorithm (replace with AI later)
function analyzeResume(resumeText: string, jobDescription: string) {
  const resumeWords = resumeText.toLowerCase().split(/\W+/)
  const jobWords = jobDescription.toLowerCase().split(/\W+/)

  // Common tech/business keywords
  const importantKeywords = jobWords.filter(word => 
    word.length > 3 && 
    !['the', 'and', 'for', 'with', 'this', 'that', 'will', 'you', 'are', 'have'].includes(word)
  )

  const matchedKeywords = importantKeywords.filter(keyword => 
    resumeWords.includes(keyword)
  )

  const missingKeywords = importantKeywords.filter(keyword => 
    !resumeWords.includes(keyword)
  ).slice(0, 10) // Top 10 missing

  const matchPercentage = Math.round((matchedKeywords.length / importantKeywords.length) * 100)

  return {
    matchPercentage,
    matchedKeywords: [...new Set(matchedKeywords)].slice(0, 10),
    missingKeywords: [...new Set(missingKeywords)],
    suggestions: generateSuggestions(missingKeywords, matchPercentage)
  }
}

function generateSuggestions(missingKeywords: string[], matchPercentage: number) {
  const suggestions = []

  if (matchPercentage < 50) {
    suggestions.push("Your resume has low keyword alignment. Consider revising to better match the job requirements.")
  }

  if (missingKeywords.length > 0) {
    suggestions.push(`Consider adding these important keywords: ${missingKeywords.slice(0, 5).join(', ')}`)
  }

  if (matchPercentage > 70) {
    suggestions.push("Great job! Your resume aligns well with the job requirements.")
  }

  suggestions.push("Tailor your experience section to highlight relevant achievements.")
  suggestions.push("Ensure your skills section includes the most relevant technologies.")

  return suggestions
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get latest resume and job description
    const { data: resume } = await supabase
      .from('resumes')
      .select('content')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const { data: jobDesc } = await supabase
      .from('job_descriptions')
      .select('description')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!resume || !jobDesc) {
      return NextResponse.json({ 
        error: 'Please upload both a resume and job description first' 
      }, { status: 400 })
    }

    // Analyze resume against job description
    const analysis = analyzeResume(resume.content, jobDesc.description)

    // Store analysis results
    await supabase
      .from('analyses')
      .insert({
        user_id: userId,
        match_percentage: analysis.matchPercentage,
        matched_keywords: analysis.matchedKeywords,
        missing_keywords: analysis.missingKeywords,
        suggestions: analysis.suggestions,
        created_at: new Date().toISOString()
      })

    return NextResponse.json({ 
      success: true, 
      analysis
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}