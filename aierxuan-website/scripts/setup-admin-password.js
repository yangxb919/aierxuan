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

// Get credentials from environment variables (SECURE)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const EDITOR_EMAIL = process.env.EDITOR_EMAIL
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD

async function setupAdminPasswords() {
  try {
    console.log('🔧 Setting up admin user passwords...\n')

    if (!ADMIN_PASSWORD) {
      console.error('❌ ADMIN_PASSWORD environment variable is required')
      console.log('\nUsage:')
      console.log('  ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=your_secure_password node scripts/setup-admin-password.js')
      process.exit(1)
    }

    // Admin user password
    const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12)

    console.log(`🔐 Creating password hash for ${ADMIN_EMAIL}...`)
    const { error: adminError } = await supabase
      .from('admin_users')
      .update({ password_hash: adminHash })
      .eq('email', ADMIN_EMAIL)

    if (adminError) {
      console.error('❌ Error updating admin password:', adminError.message)
    } else {
      console.log('✅ Admin password set successfully')
      console.log(`   Email: ${ADMIN_EMAIL}`)
    }

    // Editor user password (optional)
    if (EDITOR_EMAIL && EDITOR_PASSWORD) {
      const editorHash = await bcrypt.hash(EDITOR_PASSWORD, 12)

      console.log(`\n🔐 Creating password hash for ${EDITOR_EMAIL}...`)
      const { error: editorError } = await supabase
        .from('admin_users')
        .update({ password_hash: editorHash })
        .eq('email', EDITOR_EMAIL)

      if (editorError) {
        console.error('❌ Error updating editor password:', editorError.message)
      } else {
        console.log('✅ Editor password set successfully')
        console.log(`   Email: ${EDITOR_EMAIL}`)
      }
    }

    console.log('\n⚠️  IMPORTANT: Never commit passwords to version control!')
    console.log('   Use environment variables or a secure secrets manager.')

  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function main() {
  await setupAdminPasswords()
  console.log('\n✨ Setup complete!')
}

main().catch(console.error)
