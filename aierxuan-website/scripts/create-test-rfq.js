#!/usr/bin/env node

/**
 * Script to create a test RFQ in the database
 * This helps test the Admin RFQ management functionality
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

async function createTestRFQs() {
  console.log('🧪 Creating test RFQs...\n')
  
  const testRFQs = [
    {
      name: 'John Smith',
      company: 'ABC Manufacturing Co.',
      email: 'john.smith@abcmfg.com',
      phone: '+1-555-0123',
      country: 'United States',
      product_interest: 'Industrial Robots',
      quantity: 10,
      message: 'We are interested in purchasing industrial robots for our new production line. Please provide a quotation for 10 units with installation and training services.',
      status: 'new',
      budget_range: '$100,000 - $200,000',
      urgency: 'normal',
      industry: 'Manufacturing'
    },
    {
      name: 'Maria Garcia',
      company: 'XYZ Automation Ltd.',
      email: 'maria.garcia@xyzauto.com',
      phone: '+44-20-1234-5678',
      country: 'United Kingdom',
      product_interest: 'Conveyor Systems',
      quantity: 2,
      message: 'Looking for conveyor systems for our warehouse. Need customization for heavy loads up to 500kg per item.',
      status: 'new',
      budget_range: '$50,000 - $100,000',
      urgency: 'urgent',
      industry: 'Logistics'
    },
    {
      name: 'Hiroshi Tanaka',
      company: 'Global Tech Industries',
      email: 'h.tanaka@globaltech.jp',
      phone: '+81-3-1234-5678',
      country: 'Japan',
      product_interest: 'Automated Assembly Lines',
      quantity: 1,
      message: 'We need a complete automated assembly line for electronics manufacturing. Please include maintenance contract in the quotation.',
      status: 'contacted',
      budget_range: '$500,000+',
      urgency: 'normal',
      industry: 'Electronics'
    },
    {
      name: 'Sophie Dubois',
      company: 'European Manufacturing Group',
      email: 'sophie.dubois@emg.fr',
      phone: '+33-1-23-45-67-89',
      country: 'France',
      product_interest: 'Quality Control Systems',
      quantity: 5,
      message: 'Interested in automated quality control systems with AI-powered defect detection.',
      status: 'new',
      budget_range: '$200,000 - $300,000',
      urgency: 'flexible',
      industry: 'Manufacturing'
    },
    {
      name: 'Carlos Silva',
      company: 'Brazilian Auto Parts',
      email: 'carlos.silva@bap.com.br',
      phone: '+55-11-9876-5432',
      country: 'Brazil',
      product_interest: 'Robotic Welding Systems',
      quantity: 3,
      message: 'Need robotic welding systems for automotive parts production. Must support aluminum and steel welding.',
      status: 'quoted',
      budget_range: '$150,000 - $250,000',
      urgency: 'urgent',
      industry: 'Automotive'
    }
  ]
  
  let successCount = 0
  let errorCount = 0
  
  for (const rfq of testRFQs) {
    try {
      const { data, error } = await supabase
        .from('rfqs')
        .insert(rfq)
        .select()
        .single()
      
      if (error) {
        console.error(`❌ Failed to create RFQ for ${rfq.company}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Created RFQ for ${rfq.company}`)
        console.log(`   ID: ${data.id}`)
        console.log(`   Contact: ${data.name}`)
        console.log(`   Status: ${data.status}`)
        console.log(`   Product: ${data.product_interest}`)
        console.log('')
        successCount++
      }
    } catch (error) {
      console.error(`❌ Error creating RFQ for ${rfq.company}:`, error.message)
      errorCount++
    }
  }
  
  console.log('\n📊 Summary:')
  console.log(`   ✅ Successfully created: ${successCount} RFQs`)
  console.log(`   ❌ Failed: ${errorCount} RFQs`)
  
  if (successCount > 0) {
    console.log('\n🎉 Test RFQs created successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Make sure you have executed the validate_admin_session SQL function')
    console.log('   2. Login to admin: http://localhost:3000/admin/login')
    console.log('   3. View RFQs: http://localhost:3000/admin/rfqs')
    console.log('\n🔑 Login credentials:')
    console.log('   Email: admin@aierxuan.com')
    console.log('   Password: admin123')
  }
}

// Run the script
createTestRFQs()
  .then(() => {
    console.log('\n✨ Script completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
