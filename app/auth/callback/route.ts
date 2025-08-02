// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🔐 Auth callback triggered')
  console.log('🌐 Request URL:', request.url)

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  console.log('📋 Callback params:', { 
    hasCode: !!code,
    hasToken: !!token,
    type,
    error, 
    error_description,
    origin: requestUrl.origin 
  })

  // Handle auth errors
  if (error) {
    console.error('❌ Auth error:', error, error_description)
    const errorUrl = new URL('/', requestUrl.origin)
    errorUrl.searchParams.set('error', error_description || error)
    return NextResponse.redirect(errorUrl)
  }

  // Handle successful auth
  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

      console.log('🔄 Exchanging code for session...')
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('❌ Code exchange error:', exchangeError.message)
        const errorUrl = new URL('/', requestUrl.origin)
        errorUrl.searchParams.set('error', 'Authentication failed. Please try again.')
        return NextResponse.redirect(errorUrl)
      }

      if (data.session) {
        console.log('✅ Session created successfully! Redirecting to dashboard...')
        return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      } else {
        console.error('❌ No session created despite successful code exchange')
        const errorUrl = new URL('/', requestUrl.origin)
        errorUrl.searchParams.set('error', 'Login failed. Please try again.')
        return NextResponse.redirect(errorUrl)
      }
    } catch (err) {
      console.error('💥 Unexpected error during authentication:', err)
      const errorUrl = new URL('/', requestUrl.origin)
      errorUrl.searchParams.set('error', 'Something went wrong. Please try again.')
      return NextResponse.redirect(errorUrl)
    }
  }

  // No code provided - redirect to home
  console.log('⚠️ No auth code provided, redirecting to home')
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}