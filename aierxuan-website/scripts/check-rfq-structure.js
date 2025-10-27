#!/usr/bin/env node

/**
 * Script to check the structure of the rfqs table
 */

const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkRFQStructure() {
  console.log('🔍 Checking RFQ table structure...\n')
  
  try {
    // Try to insert a test RFQ with minimal fields
    const testRFQ = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      product_interest: 'Test Product',
      message: 'Test message',
      country: 'Test Country'
    }
    
    console.log('Attempting to insert test RFQ with fields:', Object.keys(testRFQ).join(', '))
    
    const { data, error } = await supabase
      .from('rfqs')
      .insert(testRFQ)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Insert failed:', error.message)
      console.error('   Details:', error.details)
      console.error('   Hint:', error.hint)
      
      // Try alternative field names
      console.log('\n🔄 Trying alternative field names...')
      const altRFQ = {
        contact_name: 'Test User',
        email: 'test@example.com',
        company_name: 'Test Company',
        product_interest: 'Test Product',
        message: 'Test message',
        country: 'Test Country'
      }
      
      console.log('Attempting with fields:', Object.keys(altRFQ).join(', '))
      
      const { data: altData, error: altError } = await supabase
        .from('rfqs')
        .insert(altRFQ)
        .select()
        .single()
      
      if (altError) {
        console.error('❌ Alternative insert also failed:', altError.message)
      } else {
        console.log('✅ Success with alternative field names!')
        console.log('   Created RFQ ID:', altData.id)
        console.log('\n📋 RFQ structure uses these field names:')
        console.log('   - contact_name (not name)')
        console.log('   - company_name (not company)')
        
        // Clean up test data
        await supabase.from('rfqs').delete().eq('id', altData.id)
        console.log('\n🧹 Test data cleaned up')
      }
    } else {
      console.log('✅ Success with original field names!')
      console.log('   Created RFQ ID:', data.id)
      console.log('\n📋 RFQ structure uses these field names:')
      console.log('   - name')
      console.log('   - company')
      
      // Clean up test data
      await supabase.from('rfqs').delete().eq('id', data.id)
      console.log('\n🧹 Test data cleaned up')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run the script
checkRFQStructure()
  .then(() => {
    console.log('\n✨ Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error)
    process.exit(1)
  })
