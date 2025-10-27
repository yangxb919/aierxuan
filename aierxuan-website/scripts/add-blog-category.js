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

async function addCategoryColumn() {
  try {
    console.log('Starting blog_posts table migration...')
    console.log('Adding category column to blog_posts table\n')

    // Execute each SQL statement separately
    const statements = [
      {
        name: 'Add category column',
        sql: `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'news'`
      },
      {
        name: 'Add index',
        sql: `CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category)`
      },
      {
        name: 'Update existing posts',
        sql: `UPDATE blog_posts SET category = 'news' WHERE category IS NULL`
      },
      {
        name: 'Make category NOT NULL',
        sql: `ALTER TABLE blog_posts ALTER COLUMN category SET NOT NULL`
      }
    ]

    for (const stmt of statements) {
      console.log(`Executing: ${stmt.name}...`)
      const { error } = await supabase.rpc('exec_sql', { sql_query: stmt.sql })

      if (error) {
        // If exec_sql function doesn't exist, try direct query
        console.log(`  Note: exec_sql RPC not available, trying direct query...`)

        // For Supabase, we need to use the REST API directly for DDL operations
        // This is a limitation - we'll need to run this manually in Supabase SQL editor
        console.log(`  Please run this SQL manually in Supabase SQL Editor:`)
        console.log(`  ${stmt.sql}\n`)
      } else {
        console.log(`  ✓ ${stmt.name} completed\n`)
      }
    }

    console.log('\n⚠️  IMPORTANT: If you see errors above, please run the migration SQL manually:')
    console.log('   1. Go to your Supabase Dashboard')
    console.log('   2. Navigate to SQL Editor')
    console.log('   3. Run the SQL file: database/migrations/add-category-to-blog-posts.sql')
    console.log('\nAlternatively, you can run:')
    console.log('   supabase db execute --file database/migrations/add-category-to-blog-posts.sql\n')

  } catch (error) {
    console.error('\n❌ Error during migration:', error.message)
    console.error('\nPlease run the migration manually in Supabase SQL Editor:')
    console.error('File: database/migrations/add-category-to-blog-posts.sql\n')
    process.exit(1)
  }
}

// Run the migration
addCategoryColumn()
