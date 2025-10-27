#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🧪 Testing RFQ Insert with Service Role (bypasses RLS)...\n')

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

// Create Supabase client with SERVICE ROLE (bypasses RLS)
const supabaseAdmin = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
)

// Create Supabase client with ANON key (subject to RLS)
const supabaseAnon = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'Test message'
}

;(async () => {
  console.log('📤 Test 1: Insert with SERVICE ROLE (should bypass RLS)...')
  try {
    const { data, error } = await supabaseAdmin
      .from('rfqs')
      .insert(testData)
      .select()

    if (error) {
      console.log('❌ Error with service role:', error.message)
      console.log('   Code:', error.code)
    } else {
      console.log('✅ Success with service role! RFQ ID:', data[0]?.id)
      
      // Now try to read it back with anon
      console.log('\n📤 Test 2: Read with ANON key...')
      const { data: readData, error: readError } = await supabaseAnon
        .from('rfqs')
        .select('*')
        .eq('id', data[0].id)
        .single()
      
      if (readError) {
        console.log('❌ Cannot read with anon:', readError.message)
      } else {
        console.log('✅ Can read with anon!')
      }
      
      // Clean up - delete the test record
      console.log('\n🧹 Cleaning up test record...')
      await supabaseAdmin.from('rfqs').delete().eq('id', data[0].id)
      console.log('✅ Test record deleted')
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }

  console.log('\n📤 Test 3: Insert with ANON key (subject to RLS)...')
  try {
    const { data, error } = await supabaseAnon
      .from('rfqs')
      .insert(testData)
      .select()

    if (error) {
      console.log('❌ Error with anon key:', error.message)
      console.log('   Code:', error.code)
      console.log('\n💡 This confirms the RLS policy is blocking anon inserts.')
    } else {
      console.log('✅ Success with anon key! RFQ ID:', data[0]?.id)
      
      // Clean up
      await supabaseAdmin.from('rfqs').delete().eq('id', data[0].id)
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
})()

