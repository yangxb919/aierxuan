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

console.log('🔍 Checking database connection...\n')
console.log('Supabase URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkConnection() {
  try {
    // List all tables
    console.log('\n📋 Listing all tables:')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name')
    
    if (tablesError) {
      console.error('❌ Error listing tables:', tablesError)
      
      // Try alternative method
      console.log('\n🔄 Trying alternative method...')
      const { data: altData, error: altError } = await supabase.rpc('exec_sql', {
        sql_query: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
      })
      
      if (altError) {
        console.error('❌ Alternative method also failed:', altError)
      } else {
        console.log('✅ Tables:', altData)
      }
    } else {
      console.log('✅ Tables found:', tables?.length || 0)
      tables?.forEach(t => console.log('  -', t.table_name))
    }
    
    // Check for admin_sessions table specifically
    console.log('\n🔍 Checking for admin_sessions table...')
    const { data: adminSessions, error: adminError } = await supabase
      .from('admin_sessions')
      .select('*')
      .limit(1)
    
    if (adminError) {
      console.error('❌ admin_sessions table not accessible:', adminError.message)
    } else {
      console.log('✅ admin_sessions table exists and is accessible')
    }
    
    // Check for admin_users table
    console.log('\n🔍 Checking for admin_users table...')
    const { data: adminUsers, error: usersError } = await supabase
      .from('admin_users')
      .select('email, role')
      .limit(5)
    
    if (usersError) {
      console.error('❌ admin_users table not accessible:', usersError.message)
    } else {
      console.log('✅ admin_users table exists')
      console.log('   Users found:', adminUsers?.length || 0)
      adminUsers?.forEach(u => console.log('  -', u.email, `(${u.role})`))
    }
    
    // Test validate_admin_session function
    console.log('\n🧪 Testing validate_admin_session function...')
    const { data: funcData, error: funcError } = await supabase
      .rpc('validate_admin_session', { token: 'test-token' })
    
    if (funcError) {
      console.error('❌ Function not accessible:', funcError.message)
    } else {
      console.log('✅ Function is callable')
      console.log('   Result:', funcData)
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

checkConnection().catch(console.error)

