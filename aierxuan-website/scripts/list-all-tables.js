#!/usr/bin/env node

/**
 * Script to list all tables in the database using SQL query
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

async function listAllTables() {
  console.log('🔍 Listing all tables in the database...\n')
  
  try {
    // Query to get all tables in the public schema
    const { data, error } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      })
    
    if (error) {
      console.error('❌ RPC call failed, trying direct query...')
      
      // Try a simpler approach - just try to select from common table names
      const commonTables = [
        'products', 'product_translations',
        'blog_posts', 'blog_post_translations',
        'faq', 'faq_translations',
        'rfqs', 'rfq', 'rfq_min', 'request_for_quotes',
        'admin_users', 'admin_sessions',
        'i18n_locales'
      ]
      
      console.log('\n📋 Checking common table names:\n')
      
      for (const tableName of commonTables) {
        try {
          const { error: checkError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true })
          
          if (!checkError) {
            console.log(`✅ ${tableName}`)
          }
        } catch (e) {
          // Table doesn't exist, skip
        }
      }
    } else {
      console.log('📋 Tables found:\n')
      data.forEach(row => {
        console.log(`✅ ${row.table_name}`)
      })
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run the script
listAllTables()
  .then(() => {
    console.log('\n✨ List completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ List failed:', error)
    process.exit(1)
  })
