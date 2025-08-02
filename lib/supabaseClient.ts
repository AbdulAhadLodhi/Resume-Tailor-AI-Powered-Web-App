import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // Use PKCE flow for better security
  }
})

// Types for our database
export type Profile = {
  id: string
  email: string
  full_name?: string
  created_at: string
  updated_at: string
}

export type Resume = {
  id: string
  user_id: string
  title: string
  content: any // JSON object containing resume data
  job_description?: string
  created_at: string
  updated_at: string
}