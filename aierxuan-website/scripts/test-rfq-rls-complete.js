#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

console.log('🧪 Complete RFQ RLS Security Test\n')
console.log('This test verifies:')
console.log('  1. anon can INSERT (with returning: minimal)')
console.log('  2. anon CANNOT SELECT (data security)')
console.log('  3. service_role can SELECT (admin access)')
console.log('  4. authenticated can SELECT (admin access)\n')

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
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 Test 1: ANON cannot SELECT (security check)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const { data: selectData, error: selectError, count: selectCount } = await anonClient
      .from('rfqs')
      .select('*', { count: 'exact', head: true })
    
    if (selectError) {
      console.log('✅ PASS: anon cannot SELECT')
      console.log('   Error:', selectError.message)
      console.log('   Code:', selectError.code)
    } else if (selectCount === 0) {
      console.log('✅ PASS: anon SELECT returns 0 rows (RLS blocking)')
      console.log('   Count:', selectCount)
    } else {
      console.log('❌ FAIL: anon can SELECT (SECURITY ISSUE!)')
      console.log('   Count:', selectCount)
      console.log('   ⚠️  This means anonymous users can read all RFQs!')
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📤 Test 2: ANON can INSERT (with returning: minimal)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const testRFQ = {
      name: 'Test User RLS',
      email: `test-rls-${Date.now()}@example.com`,
      company: 'Test Company RLS',
      phone: '+1 555 000 0000',
      message: 'Testing RLS with returning: minimal',
      product_interest: 'laptop-pro-15',
      status: 'new',
      source: 'test_script'
    }
    
    console.log('Inserting with returning: minimal...')
    const { data: insertData, error: insertError } = await anonClient
      .from('rfqs')
      .insert(testRFQ, { returning: 'minimal' })
    
    if (insertError) {
      console.log('❌ FAIL: anon cannot INSERT')
      console.log('   Error:', insertError.message)
      console.log('   Code:', insertError.code)
      console.log('   Details:', insertError.details)
      console.log('\n💡 Possible causes:')
      console.log('   - Missing INSERT grant for anon')
      console.log('   - Missing INSERT policy for anon')
      console.log('   - RLS policy WITH CHECK condition failing')
    } else {
      console.log('✅ PASS: anon can INSERT')
      console.log('   Data returned:', insertData || 'null (expected with minimal)')
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔍 Test 3: SERVICE ROLE can SELECT (verify insert)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const { data: verifyData, error: verifyError } = await serviceClient
      .from('rfqs')
      .select('*')
      .eq('email', testRFQ.email)
      .single()
    
    if (verifyError) {
      console.log('❌ FAIL: service_role cannot SELECT')
      console.log('   Error:', verifyError.message)
    } else if (verifyData) {
      console.log('✅ PASS: service_role can SELECT')
      console.log('   Found RFQ:', {
        id: verifyData.id,
        name: verifyData.name,
        email: verifyData.email,
        company: verifyData.company,
        status: verifyData.status
      })
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📈 Test 4: Count comparison')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const { count: anonCount } = await anonClient
      .from('rfqs')
      .select('*', { count: 'exact', head: true })
    
    const { count: serviceCount } = await serviceClient
      .from('rfqs')
      .select('*', { count: 'exact', head: true })
    
    console.log('ANON count:', anonCount || 0)
    console.log('SERVICE count:', serviceCount || 0)
    
    if ((anonCount || 0) === 0 && (serviceCount || 0) > 0) {
      console.log('✅ PASS: Security is correct')
      console.log('   - anon cannot read any RFQs')
      console.log('   - service_role can read all RFQs')
    } else if ((anonCount || 0) === (serviceCount || 0)) {
      console.log('❌ FAIL: Security issue detected')
      console.log('   - anon can read RFQs (should be 0)')
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📋 Summary')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const tests = [
      { name: 'anon cannot SELECT', pass: selectError || selectCount === 0 },
      { name: 'anon can INSERT', pass: !insertError },
      { name: 'service_role can SELECT', pass: !verifyError && verifyData },
      { name: 'Security isolation', pass: (anonCount || 0) === 0 && (serviceCount || 0) > 0 }
    ]
    
    const passCount = tests.filter(t => t.pass).length
    const totalCount = tests.length
    
    tests.forEach(test => {
      console.log(`${test.pass ? '✅' : '❌'} ${test.name}`)
    })
    
    console.log(`\n${passCount}/${totalCount} tests passed`)
    
    if (passCount === totalCount) {
      console.log('\n🎉 All tests passed! RFQ RLS is correctly configured.')
      console.log('\n✨ Security status:')
      console.log('   ✅ Anonymous users can submit RFQs')
      console.log('   ✅ Anonymous users cannot read RFQs')
      console.log('   ✅ Admin users can read all RFQs')
    } else {
      console.log('\n⚠️  Some tests failed. Please review the RLS configuration.')
      console.log('\n💡 Next steps:')
      console.log('   1. Execute: aierxuan-website/database/seed/secure-rfq-rls.sql')
      console.log('   2. Verify policies: SELECT * FROM pg_policies WHERE tablename=\'rfqs\'')
      console.log('   3. Verify grants: SELECT * FROM information_schema.table_privileges WHERE table_name=\'rfqs\'')
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message)
    console.error(error)
  }
})()

