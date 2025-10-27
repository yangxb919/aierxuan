// Test authentication
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
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuth() {
  console.log('🔐 Testing authentication...\n')

  // Check active sessions
  const { data: sessions, error: sessionsError } = await supabase
    .from('admin_sessions')
    .select('*')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  if (sessionsError) {
    console.error('❌ Error fetching sessions:', sessionsError.message)
    return
  }

  console.log(`📊 Found ${sessions.length} active session(s)\n`)

  if (sessions.length === 0) {
    console.log('⚠️  No active sessions found!')
    console.log('\nYou need to login first:')
    console.log('1. Visit: http://localhost:3000/admin/login')
    console.log('2. Login with your credentials')
    console.log('3. Try creating a blog post again')
    return
  }

  // Show session details
  for (const session of sessions.slice(0, 3)) {
    console.log('Session:')
    console.log('  ID:', session.id)
    console.log('  User ID:', session.admin_user_id)
    console.log('  Expires:', session.expires_at)
    console.log('  Created:', session.created_at)
    
    // Get user details
    const { data: user } = await supabase
      .from('admin_users')
      .select('email, role')
      .eq('id', session.admin_user_id)
      .single()
    
    if (user) {
      console.log('  User:', user.email, `(${user.role})`)
    }
    console.log('')
  }

  console.log('✅ Authentication is working')
  console.log('\nIf you still get 401 errors:')
  console.log('1. Check browser cookies (admin_session)')
  console.log('2. Try logging out and logging in again')
  console.log('3. Clear browser cache')
}

testAuth()

