const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

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

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkAdminUsers() {
  try {
    console.log('🔍 Checking admin_users table...')
    
    // Check if table exists and get data
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
    
    if (error) {
      console.error('❌ Error querying admin_users table:', error.message)
      
      // If table doesn't exist, we'll get a specific error
      if (error.message.includes('relation "admin_users" does not exist')) {
        console.log('📋 admin_users table does not exist')
        return { exists: false, data: null }
      }
      
      return { exists: true, data: null, error: error.message }
    }
    
    console.log('✅ admin_users table exists')
    console.log(`📊 Found ${data.length} admin users:`)
    
    if (data.length > 0) {
      data.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Role: ${user.role}, Active: ${user.is_active}`)
      })
    } else {
      console.log('📝 No admin users found in the table')
    }
    
    return { exists: true, data }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
    return { exists: false, data: null, error: error.message }
  }
}

async function checkAdminSessions() {
  try {
    console.log('\n🔍 Checking admin_sessions table...')
    
    const { data, error } = await supabase
      .from('admin_sessions')
      .select('*')
    
    if (error) {
      console.error('❌ Error querying admin_sessions table:', error.message)
      
      if (error.message.includes('relation "admin_sessions" does not exist')) {
        console.log('📋 admin_sessions table does not exist')
        return { exists: false, data: null }
      }
      
      return { exists: true, data: null, error: error.message }
    }
    
    console.log('✅ admin_sessions table exists')
    console.log(`📊 Found ${data.length} active sessions`)
    
    return { exists: true, data }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
    return { exists: false, data: null, error: error.message }
  }
}

async function main() {
  console.log('🚀 Starting admin database check...\n')
  
  const adminUsersResult = await checkAdminUsers()
  const adminSessionsResult = await checkAdminSessions()
  
  console.log('\n📋 Summary:')
  console.log(`- admin_users table: ${adminUsersResult.exists ? '✅ EXISTS' : '❌ MISSING'}`)
  console.log(`- admin_sessions table: ${adminSessionsResult.exists ? '✅ EXISTS' : '❌ MISSING'}`)
  
  if (adminUsersResult.exists && adminUsersResult.data && adminUsersResult.data.length === 0) {
    console.log('\n⚠️  admin_users table exists but is empty. You need to create admin users.')
  }
  
  if (!adminSessionsResult.exists) {
    console.log('\n⚠️  admin_sessions table is missing. You need to create it for session management.')
  }
  
  console.log('\n✨ Check complete!')
}

main().catch(console.error)
