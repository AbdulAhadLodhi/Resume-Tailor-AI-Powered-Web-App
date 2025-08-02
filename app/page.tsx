// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import SupabaseTest from '@/components/SupabaseTest'
import Auth from '@/components/Auth'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleGetStarted = () => {
    setShowAuth(true)
    // Scroll to auth section
    setTimeout(() => {
      document.getElementById('auth-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Resume Tailor AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create AI-powered, job-specific resumes tailored to your target positions
            </p>
          </div>

          {/* Supabase Connection Test - Development Only */}
          <div className="mb-8">
            <SupabaseTest />
          </div>

          {/* Authentication Section */}
          {showAuth && (
            <div id="auth-section" className="mb-12">
              <Auth />
            </div>
          )}

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Land Your Dream Job
                </h2>
                <p className="text-gray-600 mb-6">
                  Our AI analyzes job descriptions and crafts personalized resumes that highlight 
                  your most relevant skills and experiences. Stand out from the crowd with 
                  tailored content that speaks directly to hiring managers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">AI-powered content optimization</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Job-specific keyword matching</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Professional formatting</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
                  <p className="mb-6 opacity-90">
                    Join thousands of job seekers who have successfully landed interviews 
                    with our AI-tailored resumes.
                  </p>
                  <button 
                    onClick={handleGetStarted}
                    className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors w-full transform hover:scale-105"
                  >
                    Create Your Resume
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate a tailored resume in under 2 minutes. No more hours of manual editing.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced algorithms analyze job requirements and optimize your content accordingly.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Formats</h3>
              <p className="text-gray-600">
                Download your resume in PDF, Word, or other formats preferred by employers.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sign Up</h4>
                <p className="text-gray-600 text-sm">Create your account with magic link authentication</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Add Info</h4>
                <p className="text-gray-600 text-sm">Input your experience, skills, and career details</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Paste Job</h4>
                <p className="text-gray-600 text-sm">Copy the job description you're applying for</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Resume</h4>
                <p className="text-gray-600 text-sm">Download your tailored, job-specific resume</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Land Your Next Job?</h2>
              <p className="text-xl mb-6 opacity-90">
                Join the Resume Tailor AI revolution and start getting more interviews today.
              </p>
              <button 
                onClick={handleGetStarted}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all text-lg transform hover:scale-105"
              >
                Start Building Your Resume
              </button>
            </div>
          </div>

          {/* Additional Auth Section at Bottom */}
          {!showAuth && (
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Already have an account?</p>
              <button
                onClick={() => setShowAuth(true)}
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                Sign in here
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}