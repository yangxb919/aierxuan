const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local')
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
  console.error('Error: Supabase credentials not found in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  console.log('🔧 Attempting to add category column to blog_posts table...\n')

  try {
    // First, let's check if the column already exists
    console.log('Step 1: Checking current table structure...')
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1)

    if (checkError) {
      console.error('Error checking table:', checkError.message)
    } else {
      console.log('Current columns:', Object.keys(existingPosts?.[0] || {}))
      if (existingPosts?.[0] && 'category' in existingPosts[0]) {
        console.log('\n✅ Category column already exists!')
        return
      }
    }

    // Since we can't run DDL via the JS client, we'll provide instructions
    console.log('\n⚠️  Cannot execute DDL operations via JavaScript client.')
    console.log('\n📝 Please run the following steps manually:\n')
    console.log('1. Open Supabase Dashboard: https://app.supabase.com/')
    console.log('2. Select your project')
    console.log('3. Go to SQL Editor')
    console.log('4. Run this SQL:\n')
    console.log('─'.repeat(60))

    const sqlContent = fs.readFileSync(
      path.join(__dirname, '../database/migrations/add-category-to-blog-posts.sql'),
      'utf8'
    )
    console.log(sqlContent)
    console.log('─'.repeat(60))

    console.log('\n5. After running the SQL, restart your dev server')
    console.log('6. Visit http://localhost:3001/blog to verify the fix\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
  }
}

runMigration()
