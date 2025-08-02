'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function SupabaseTest() {
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('test').select('*').limit(1)
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "table not found" which means connection works but table doesn't exist
          setConnected(false)
        } else {
          setConnected(true)
        }
      } catch (err) {
        setConnected(false)
      }
    }

    testConnection()
  }, [])

  if (connected === null) {
    return <div className="text-yellow-600">Testing Supabase connection...</div>
  }

  return (
    <div className={`p-3 rounded-lg text-sm ${
      connected 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      Supabase: {connected ? 'Connected ✅' : 'Connection Failed ❌'}
    </div>
  )
}