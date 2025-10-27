// Check if blog tables exist in Supabase
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

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
  console.log('🔍 Checking Supabase database tables...\n')
  console.log('📍 Project URL:', supabaseUrl)
  console.log('')

  try {
    // Check blog_posts table
    console.log('1️⃣ Checking blog_posts table...')
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1)

    if (postsError) {
      console.error('❌ blog_posts table error:', postsError.message)
      console.error('   Code:', postsError.code)
      console.error('   Details:', postsError.details)
      console.error('   Hint:', postsError.hint)
    } else {
      console.log('✅ blog_posts table exists')
      console.log('   Columns can be accessed')
    }
    console.log('')

    // Check blog_post_translations table
    console.log('2️⃣ Checking blog_post_translations table...')
    const { data: translations, error: translationsError } = await supabase
      .from('blog_post_translations')
      .select('*')
      .limit(1)

    if (translationsError) {
      console.error('❌ blog_post_translations table error:', translationsError.message)
      console.error('   Code:', translationsError.code)
      console.error('   Details:', translationsError.details)
      console.error('   Hint:', translationsError.hint)
    } else {
      console.log('✅ blog_post_translations table exists')
      console.log('   Columns can be accessed')
    }
    console.log('')

    // Try to get table structure using RPC or direct query
    console.log('3️⃣ Checking table structure...')
    const { data: structure, error: structureError } = await supabase
      .rpc('exec_sql', { 
        sql: `
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns 
          WHERE table_name IN ('blog_posts', 'blog_post_translations')
          ORDER BY table_name, ordinal_position;
        `
      })

    if (structureError) {
      console.log('⚠️  Cannot query table structure (RPC not available)')
      console.log('   This is normal if exec_sql function is not created')
    } else {
      console.log('✅ Table structure:')
      console.log(structure)
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }

  console.log('\n' + '='.repeat(60))
  console.log('📋 Summary:')
  console.log('='.repeat(60))
  console.log('')
  console.log('If you see errors above, the tables might not exist.')
  console.log('Please run the schema SQL file in Supabase SQL Editor:')
  console.log('👉 database/supabase-schema.sql')
  console.log('')
  console.log('Or visit: https://supabase.com/dashboard/project/dudvgnkvukujhqatolqm/editor/sql')
}

checkTables()

