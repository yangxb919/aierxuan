// Test inserting a blog post
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
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsert() {
  console.log('🧪 Testing blog post insertion...\n')

  const testSlug = 'test-post-' + Date.now()

  try {
    // Step 0: Get a real admin user ID
    console.log('0️⃣ Getting admin user...')
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1)
      .single()

    if (adminError || !adminUsers) {
      console.error('❌ Cannot find admin user:', adminError?.message)
      return
    }

    const authorId = adminUsers.id
    console.log('   Using author_id:', authorId)
    console.log('')

    // Step 1: Insert blog_posts
    console.log('1️⃣ Inserting into blog_posts table...')
    console.log('   Slug:', testSlug)

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        slug: testSlug,
        status: 'draft',
        published_at: null,
        cover_image: null,
        author_id: authorId,
        featured: false
      })
      .select()
      .single()

    if (postError) {
      console.error('❌ Error inserting blog_posts:')
      console.error('   Message:', postError.message)
      console.error('   Code:', postError.code)
      console.error('   Details:', postError.details)
      console.error('   Hint:', postError.hint)
      console.error('\n📋 Full error object:')
      console.error(JSON.stringify(postError, null, 2))
      return
    }

    console.log('✅ blog_posts inserted successfully')
    console.log('   Post ID:', post.id)
    console.log('')

    // Step 2: Insert blog_post_translations
    console.log('2️⃣ Inserting into blog_post_translations table...')
    
    const { data: translation, error: translationError } = await supabase
      .from('blog_post_translations')
      .insert({
        post_id: post.id,
        locale: 'en',
        title: 'Test Blog Post',
        excerpt: 'This is a test excerpt',
        body_md: '# Test Content\n\nThis is test content.',
        seo_title: 'Test Blog Post',
        seo_desc: 'Test description'
      })
      .select()
      .single()

    if (translationError) {
      console.error('❌ Error inserting blog_post_translations:')
      console.error('   Message:', translationError.message)
      console.error('   Code:', translationError.code)
      console.error('   Details:', translationError.details)
      console.error('   Hint:', translationError.hint)
      console.error('\n📋 Full error object:')
      console.error(JSON.stringify(translationError, null, 2))
      
      // Cleanup: delete the post
      console.log('\n🧹 Cleaning up...')
      await supabase.from('blog_posts').delete().eq('id', post.id)
      return
    }

    console.log('✅ blog_post_translations inserted successfully')
    console.log('   Translation ID:', translation.id)
    console.log('')

    // Step 3: Cleanup
    console.log('3️⃣ Cleaning up test data...')
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post.id)

    if (deleteError) {
      console.error('⚠️  Error deleting test data:', deleteError.message)
    } else {
      console.log('✅ Test data cleaned up')
    }

    console.log('\n' + '='.repeat(60))
    console.log('✅ ALL TESTS PASSED!')
    console.log('='.repeat(60))
    console.log('\nThe database tables are working correctly.')
    console.log('The issue might be with:')
    console.log('  - Authentication/permissions')
    console.log('  - Form data format')
    console.log('  - API endpoint logic')

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message)
    console.error('Stack:', error.stack)
  }
}

testInsert()

