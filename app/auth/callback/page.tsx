// app/auth/callback/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setLoading(true)

        // Debug: Log current URL and params
        const currentUrl = window.location.href
        const hashFragment = window.location.hash
        const searchQuery = window.location.search

        setDebugInfo(`URL: ${currentUrl}\nHash: ${hashFragment}\nSearch: ${searchQuery}`)

        // Method 1: Check URL search params (for newer magic links)
        const code = searchParams.get('code')
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            setError(`Code exchange error: ${error.message}`)
            return
          }

          if (data.session && data.user) {
            router.push('/dashboard')
            return
          }
        }

        // Method 2: Check for hash fragment (older magic links)
        if (hashFragment) {
          const params = new URLSearchParams(hashFragment.substring(1))
          const accessToken = params.get('access_token')
          const refreshToken = params.get('refresh_token')
          const tokenType = params.get('token_type')

          if (accessToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            })

            if (error) {
              setError(`Session error: ${error.message}`)
              return
            }

            if (data.session && data.user) {
              // Clear the hash from URL
              window.history.replaceState({}, document.title, window.location.pathname)
              router.push('/dashboard')
              return
            }
          }
        }

        // Method 3: Check current session (user might already be logged in)
        const { data: sessionData } = await supabase.auth.getSession()
        if (sessionData.session && sessionData.session.user) {
          router.push('/dashboard')
          return
        }

        // If we get here, authentication failed
        setError('No valid authentication data found in the callback URL. The magic link may have expired or been used already.')

      } catch (err) {
        console.error('Auth callback error:', err)
        setError(`Unexpected error: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    // Small delay to ensure the page is fully loaded
    const timer = setTimeout(handleAuthCallback, 100)
    return () => clearTimeout(timer)
  }, [router, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Signing you in...</h2>
            <p className="text-gray-600">Please wait while we verify your magic link.</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>

            {/* Debug information */}
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Debug Information (click to expand)
              </summary>
              <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                {debugInfo}
              </pre>
            </details>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded text-left">
              <p className="text-xs text-yellow-700">
                <strong>Troubleshooting Tips:</strong><br/>
                • Request a fresh magic link<br/>
                • Check that the link wasn't used already<br/>
                • Verify your email provider isn't blocking the redirect<br/>
                • Make sure the link opens in the same browser
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  )
}