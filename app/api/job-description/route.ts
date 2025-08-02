// app/api/job-description/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, jobTitle, company, userId } = await request.json()

    if (!jobDescription || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Store job description in Supabase
    const { error } = await supabase
      .from('job_descriptions')
      .insert({
        user_id: userId,
        job_title: jobTitle || 'Untitled Position',
        company: company || 'Unknown Company',
        description: jobDescription,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save job description' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Job description saved successfully'
    })

  } catch (error) {
    console.error('Job description error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}