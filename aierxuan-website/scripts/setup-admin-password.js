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

async function setupAdminPasswords() {
  try {
    console.log('🔧 Setting up admin user passwords...\n')
    
    // Admin user password
    const adminPassword = 'admin123'
    const adminHash = await bcrypt.hash(adminPassword, 12)
    
    console.log('🔐 Creating password hash for admin@aierxuan.com...')
    const { error: adminError } = await supabase
      .from('admin_users')
      .update({ password_hash: adminHash })
      .eq('email', 'admin@aierxuan.com')
    
    if (adminError) {
      console.error('❌ Error updating admin password:', adminError.message)
    } else {
      console.log('✅ Admin password set successfully')
      console.log(`   Email: admin@aierxuan.com`)
      console.log(`   Password: ${adminPassword}`)
    }
    
    // Editor user password
    const editorPassword = 'editor123'
    const editorHash = await bcrypt.hash(editorPassword, 12)
    
    console.log('\n🔐 Creating password hash for editor@aierxuan.com...')
    const { error: editorError } = await supabase
      .from('admin_users')
      .update({ password_hash: editorHash })
      .eq('email', 'editor@aierxuan.com')
    
    if (editorError) {
      console.error('❌ Error updating editor password:', editorError.message)
    } else {
      console.log('✅ Editor password set successfully')
      console.log(`   Email: editor@aierxuan.com`)
      console.log(`   Password: ${editorPassword}`)
    }
    
    // Verify the passwords work
    console.log('\n🧪 Verifying passwords...')
    
    // Test admin password
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('email', 'admin@aierxuan.com')
      .single()
    
    if (adminUser && adminUser.password_hash) {
      const adminValid = await bcrypt.compare(adminPassword, adminUser.password_hash)
      console.log(`   Admin password verification: ${adminValid ? '✅ VALID' : '❌ INVALID'}`)
    }
    
    // Test editor password
    const { data: editorUser } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('email', 'editor@aierxuan.com')
      .single()
    
    if (editorUser && editorUser.password_hash) {
      const editorValid = await bcrypt.compare(editorPassword, editorUser.password_hash)
      console.log(`   Editor password verification: ${editorValid ? '✅ VALID' : '❌ INVALID'}`)
    }
    
    console.log('\n📋 Login Credentials:')
    console.log('┌─────────────────────────────────────────┐')
    console.log('│ ADMIN LOGIN                             │')
    console.log('│ Email: admin@aierxuan.com               │')
    console.log('│ Password: admin123                      │')
    console.log('├─────────────────────────────────────────┤')
    console.log('│ EDITOR LOGIN                            │')
    console.log('│ Email: editor@aierxuan.com              │')
    console.log('│ Password: editor123                     │')
    console.log('└─────────────────────────────────────────┘')
    
    console.log('\n⚠️  IMPORTANT: Change these default passwords in production!')
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function main() {
  await setupAdminPasswords()
  console.log('\n✨ Setup complete!')
}

main().catch(console.error)
