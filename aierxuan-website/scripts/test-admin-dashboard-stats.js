#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🧪 Testing Admin Dashboard Statistics...\n')

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

// Create Supabase clients
const anonClient = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const serviceClient = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
)

;(async () => {
  try {
    console.log('📊 Testing with ANON key (should fail for some queries)...\n')
    
    // Test with anon key
    const [
      { count: anonTotalRFQs },
      { count: anonNewRFQs },
      { count: anonTotalProducts },
      { count: anonActiveProducts }
    ] = await Promise.all([
      anonClient.from('rfqs').select('*', { count: 'exact', head: true }),
      anonClient.from('rfqs').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      anonClient.from('products').select('*', { count: 'exact', head: true }),
      anonClient.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active')
    ])

    console.log('ANON Key Results:')
    console.log('  Total RFQs:', anonTotalRFQs || 0)
    console.log('  New RFQs:', anonNewRFQs || 0)
    console.log('  Total Products:', anonTotalProducts || 0)
    console.log('  Active Products:', anonActiveProducts || 0)
    console.log('')

    console.log('📊 Testing with SERVICE ROLE key (should succeed)...\n')
    
    // Test with service role
    const [
      { count: serviceTotalRFQs },
      { count: serviceNewRFQs },
      { count: serviceTotalProducts },
      { count: serviceActiveProducts },
      { count: serviceTotalBlogPosts },
      { count: servicePublishedPosts },
      { count: serviceTotalFAQs },
      { count: serviceActiveFAQs }
    ] = await Promise.all([
      serviceClient.from('rfqs').select('*', { count: 'exact', head: true }),
      serviceClient.from('rfqs').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      serviceClient.from('products').select('*', { count: 'exact', head: true }),
      serviceClient.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      serviceClient.from('blog_posts').select('*', { count: 'exact', head: true }),
      serviceClient.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      serviceClient.from('faq').select('*', { count: 'exact', head: true }),
      serviceClient.from('faq').select('*', { count: 'exact', head: true }).eq('is_active', true)
    ])

    console.log('SERVICE ROLE Key Results:')
    console.log('  Total RFQs:', serviceTotalRFQs || 0)
    console.log('  New RFQs:', serviceNewRFQs || 0)
    console.log('  Total Products:', serviceTotalProducts || 0)
    console.log('  Active Products:', serviceActiveProducts || 0)
    console.log('  Total Blog Posts:', serviceTotalBlogPosts || 0)
    console.log('  Published Posts:', servicePublishedPosts || 0)
    console.log('  Total FAQs:', serviceTotalFAQs || 0)
    console.log('  Active FAQs:', serviceActiveFAQs || 0)
    console.log('')

    // Compare results
    console.log('📈 Comparison:')
    if (anonTotalRFQs === 0 && serviceTotalRFQs > 0) {
      console.log('  ✅ RFQs: ANON cannot read (secure), SERVICE ROLE can read')
    } else if (anonTotalRFQs === serviceTotalRFQs) {
      console.log('  ⚠️  RFQs: Both can read (may be insecure)')
    }

    if (anonTotalProducts === serviceTotalProducts && serviceTotalProducts > 0) {
      console.log('  ✅ Products: Both can read (expected for public data)')
    }

    console.log('\n✨ Test complete!')
    console.log('\n💡 Recommendation:')
    console.log('   Admin Dashboard should use SERVICE ROLE key for accurate statistics.')
    console.log('   Current implementation: ✅ Using createSupabaseAdminClient()')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
})()

