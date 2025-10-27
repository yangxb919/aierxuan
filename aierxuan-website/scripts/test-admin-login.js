const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testAdminLogin() {
  try {
    console.log('🔍 Testing admin login functionality...\n')
    
    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@aierxuan.com')
      .single()
    
    if (userError) {
      console.error('❌ Error fetching admin user:', userError.message)
      return
    }
    
    if (!adminUser) {
      console.error('❌ Admin user not found')
      return
    }
    
    console.log('✅ Found admin user:')
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Role: ${adminUser.role}`)
    console.log(`   Active: ${adminUser.is_active}`)
    console.log(`   Password Hash: ${adminUser.password_hash ? 'EXISTS' : 'MISSING'}`)
    
    // Test password verification
    const testPassword = 'admin123'
    console.log(`\n🔐 Testing password verification with: "${testPassword}"`)
    
    if (!adminUser.password_hash) {
      console.error('❌ No password hash found for admin user')
      return
    }
    
    try {
      const isValidPassword = await bcrypt.compare(testPassword, adminUser.password_hash)
      console.log(`   Password match: ${isValidPassword ? '✅ VALID' : '❌ INVALID'}`)
      
      if (!isValidPassword) {
        console.log('\n🔧 Let\'s create a new password hash for testing:')
        const newHash = await bcrypt.hash(testPassword, 12)
        console.log(`   New hash: ${newHash}`)
        
        // Update the password hash
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ password_hash: newHash })
          .eq('email', 'admin@aierxuan.com')
        
        if (updateError) {
          console.error('❌ Error updating password hash:', updateError.message)
        } else {
          console.log('✅ Password hash updated successfully')
          
          // Test again
          const isValidNow = await bcrypt.compare(testPassword, newHash)
          console.log(`   Password match after update: ${isValidNow ? '✅ VALID' : '❌ INVALID'}`)
        }
      }
      
    } catch (bcryptError) {
      console.error('❌ Error verifying password:', bcryptError.message)
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function testLoginAPI() {
  console.log('\n🌐 Testing login API endpoint...')
  
  try {
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@aierxuan.com',
        password: 'admin123'
      })
    })
    
    const data = await response.json()
    
    console.log(`   Status: ${response.status}`)
    console.log(`   Response:`, data)
    
    if (response.ok && data.success) {
      console.log('✅ Login API test successful!')
    } else {
      console.log('❌ Login API test failed')
    }
    
  } catch (error) {
    console.error('❌ Error testing login API:', error.message)
  }
}

async function main() {
  await testAdminLogin()
  await testLoginAPI()
  console.log('\n✨ Test complete!')
}

main().catch(console.error)
