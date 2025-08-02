// components/SupabaseTest.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing connection...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function testConnection() {
      try {
        setIsLoading(true)

        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)

        if (error) {
          // If profiles table doesn't exist yet, that's expected
          if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
            setConnectionStatus('✅ Supabase connected! (Database tables not created yet)')
          } else {
            setConnectionStatus(`❌ Database Error: ${error.message}`)
          }
        } else {
          setConnectionStatus('✅ Supabase connected and database ready!')
        }
      } catch (err) {
        setConnectionStatus(`❌ Connection failed: ${err}`)
      } finally {
        setIsLoading(false)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          🔌 Supabase Connection Status
        </h3>
        {isLoading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        )}
      </div>

      <p className={`text-sm font-medium ${
        connectionStatus.includes('✅') 
          ? 'text-green-600' 
          : connectionStatus.includes('❌')
          ? 'text-red-600'
          : 'text-yellow-600'
      }`}>
        {connectionStatus}
      </p>

      {connectionStatus.includes('❌') && (
        <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
          <p className="text-xs text-red-700">
            <strong>Troubleshooting:</strong>
            <br />• Check your environment variables in Replit Secrets
            <br />• Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
            <br />• Make sure your Supabase project is active
          </p>
        </div>
      )}

      {connectionStatus.includes('tables not created') && (
        <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-xs text-yellow-700">
            <strong>Next Step:</strong> Run the database schema SQL in your Supabase SQL Editor to create the required tables.
          </p>
        </div>
      )}
    </div>
  )
}