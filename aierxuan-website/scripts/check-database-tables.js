#!/usr/bin/env node

/**
 * Script to check what tables exist in the database
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

async function checkTables() {
  console.log('🔍 Checking database tables...\n')
  
  const tablesToCheck = [
    'products',
    'product_translations',
    'blog_posts',
    'blog_post_translations',
    'faq',
    'faq_translations',
    'rfqs',
    'admin_users',
    'admin_sessions',
    'i18n_locales'
  ]
  
  for (const tableName of tablesToCheck) {
    try {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.log(`❌ ${tableName}: NOT FOUND or ERROR`)
        console.log(`   Error: ${error.message}`)
      } else {
        console.log(`✅ ${tableName}: EXISTS (${count || 0} rows)`)
      }
    } catch (error) {
      console.log(`❌ ${tableName}: ERROR`)
      console.log(`   Error: ${error.message}`)
    }
  }
  
  console.log('\n📊 Summary complete!')
}

// Run the script
checkTables()
  .then(() => {
    console.log('\n✨ Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error)
    process.exit(1)
  })
