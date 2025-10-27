#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

// Initialize Supabase client
const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testSessionValidation() {
  console.log('🧪 Testing session validation...\n')
  
  // First, create a test session
  console.log('1. Creating a test session...')
  const testUserId = 'f0149900-ae05-4597-a401-9b9a1d962912' // admin user ID
  const testToken = 'test-token-' + Date.now()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  
  const { data: sessionData, error: sessionError } = await supabase
    .from('admin_sessions')
    .insert({
      admin_user_id: testUserId,
      session_token: testToken,
      expires_at: expiresAt
    })
    .select()
  
  if (sessionError) {
    console.error('❌ Error creating test session:', sessionError.message)
    return
  }
  
  console.log('✅ Test session created')
  console.log(`   Token: ${testToken}`)
  
  // Test the validate_admin_session RPC
  console.log('\n2. Testing validate_admin_session RPC...')
  const { data: validateData, error: validateError } = await supabase
    .rpc('validate_admin_session', { token: testToken })
  
  if (validateError) {
    console.error('❌ Error validating session:', validateError.message)
    console.log('\n⚠️  The validate_admin_session RPC function may not exist.')
    console.log('Please create it in Supabase SQL Editor.')
  } else {
    console.log('✅ Session validated successfully!')
    console.log('   Data:', validateData)
  }
  
  // Clean up
  console.log('\n3. Cleaning up test session...')
  await supabase
    .from('admin_sessions')
    .delete()
    .eq('session_token', testToken)
  
  console.log('✅ Test session deleted')
  
  console.log('\n✨ Test complete!')
}

async function main() {
  await testSessionValidation()
}

main().catch(console.error)
