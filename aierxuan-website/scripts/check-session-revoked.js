#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1]] = match[2]
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkSessions() {
  console.log('🔍 Checking recent sessions...\n')
  
  try {
    // Get recent sessions
    const { data: sessions, error } = await supabase
      .from('admin_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      console.error('❌ Error:', error)
      return
    }
    
    console.log(`Found ${sessions.length} recent sessions:\n`)
    
    sessions.forEach((session, index) => {
      console.log(`Session #${index + 1}:`)
      console.log('  ID:', session.id)
      console.log('  Token:', session.session_token.substring(0, 20) + '...')
      console.log('  Created:', session.created_at)
      console.log('  Expires:', session.expires_at)
      console.log('  Revoked:', session.revoked_at || 'Not revoked')
      console.log('  Updated:', session.updated_at)
      
      // Check if session is valid
      const now = new Date()
      const expires = new Date(session.expires_at)
      const isExpired = expires < now
      const isRevoked = session.revoked_at !== null
      
      if (isRevoked) {
        console.log('  Status: ❌ REVOKED')
      } else if (isExpired) {
        console.log('  Status: ⏰ EXPIRED')
      } else {
        console.log('  Status: ✅ VALID')
      }
      console.log()
    })
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

checkSessions().catch(console.error)

