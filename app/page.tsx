'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // If user is already logged in, redirect to dashboard
      if (session?.user) {
        router.push('/dashboard')
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Redirect to dashboard when user logs in
      if (session?.user) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
              <p className="text-gray-600">Create professional resumes with AI assistance</p>
            </div>
            <Auth />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Redirecting to dashboard...</h1>
          </div>
        )}
      </div>
    </div>
  )
}