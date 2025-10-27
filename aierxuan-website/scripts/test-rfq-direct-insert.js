#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🧪 Testing RFQ Direct Insert to Supabase...\n')

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

// Check environment variables
if (!envVars.NEXT_PUBLIC_SUPABASE_URL || !envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase environment variables')
  console.log('   Please check .env.local file')
  process.exit(1)
}

// Create Supabase client (using anon key like the frontend does)
const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Test data
const rfqData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  phone: '+1234567890',
  product_interest: 'laptop-pro-15',
  message: 'I am interested in purchasing laptops for my company.',
  quantity: 10,
  country: 'United States',
  user_agent: 'Test Script',
  referrer: null,
  language_code: 'en'
}

console.log('📤 Submitting RFQ directly to Supabase...')
console.log('   Data:', JSON.stringify(rfqData, null, 2))
console.log()

;(async () => {
  try {
    const { data, error } = await supabase
      .from('rfqs')
      .insert(rfqData)
      .select()

    if (error) {
      console.log('❌ Error inserting RFQ:')
      console.log('   Code:', error.code)
      console.log('   Message:', error.message)
      console.log('   Details:', error.details)
      console.log('   Hint:', error.hint)
      
      if (error.code === 'PGRST204') {
        console.log('\n💡 This error means the table does not exist or is not accessible.')
        console.log('   Please execute the SQL in database/seed/create-rfq-table.sql')
      } else if (error.code === '42501') {
        console.log('\n💡 This error means permission denied.')
        console.log('   Check RLS policies on the rfqs table.')
      }
    } else {
      console.log('✅ RFQ inserted successfully!')
      console.log('   RFQ ID:', data[0]?.id)
      console.log('   Data:', JSON.stringify(data[0], null, 2))
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
})()

