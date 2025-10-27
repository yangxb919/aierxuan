#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🧪 Testing RFQ Minimal Insert to Supabase...\n')

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

// Create Supabase client (using anon key)
const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Test with minimal required fields only
const minimalData = {
  name: 'Test User',
  email: 'test@example.com'
}

console.log('📤 Test 1: Minimal data (only required fields)...')
console.log('   Data:', JSON.stringify(minimalData, null, 2))

;(async () => {
  try {
    const { data, error } = await supabase
      .from('rfqs')
      .insert(minimalData)
      .select()

    if (error) {
      console.log('❌ Error:', error.message)
      console.log('   Code:', error.code)
    } else {
      console.log('✅ Success! RFQ ID:', data[0]?.id)
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }

  // Test 2: With all fields
  console.log('\n📤 Test 2: With all fields...')
  const fullData = {
    name: 'Test User 2',
    email: 'test2@example.com',
    company: 'Test Company',
    phone: '+1234567890',
    product_interest: 'laptop-pro-15',
    message: 'I am interested in purchasing laptops.',
    quantity: 10,
    country: 'United States',
    industry: 'Technology',
    urgency: 'normal',
    budget_range: '$10000-$20000',
    user_agent: 'Test Script',
    referrer: null,
    language_code: 'en',
    source: 'website'
  }

  try {
    const { data, error } = await supabase
      .from('rfqs')
      .insert(fullData)
      .select()

    if (error) {
      console.log('❌ Error:', error.message)
      console.log('   Code:', error.code)
      console.log('   Details:', error.details)
    } else {
      console.log('✅ Success! RFQ ID:', data[0]?.id)
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }

  // Test 3: Check if we can read
  console.log('\n📤 Test 3: Check if anon can read rfqs...')
  try {
    const { data, error, count } = await supabase
      .from('rfqs')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log('❌ Cannot read:', error.message)
    } else {
      console.log('✅ Can read! Total RFQs:', count)
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
})()

