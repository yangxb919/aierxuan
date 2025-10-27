#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🔍 Verifying Latest RFQ Submission...\n')

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

// Create Supabase client with ANON key
const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

;(async () => {
  try {
    // Get the latest RFQ
    const { data, error } = await supabase
      .from('rfqs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.log('❌ Error:', error.message)
      return
    }

    console.log('📋 Latest 5 RFQ Submissions:\n')
    data.forEach((rfq, index) => {
      console.log(`${index + 1}. ${rfq.name} (${rfq.email})`)
      console.log(`   Company: ${rfq.company || 'N/A'}`)
      console.log(`   Phone: ${rfq.phone || 'N/A'}`)
      console.log(`   Message: ${rfq.message ? rfq.message.substring(0, 50) + '...' : 'N/A'}`)
      console.log(`   Created: ${new Date(rfq.created_at).toLocaleString()}`)
      console.log(`   ID: ${rfq.id}`)
      console.log('')
    })

    console.log(`✅ Total RFQs in database: ${data.length >= 5 ? '5+' : data.length}`)
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
})()

