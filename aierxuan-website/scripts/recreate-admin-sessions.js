const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function recreateAdminSessionsTable() {
  try {
    console.log('🔧 Recreating admin_sessions table...\n')
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '../database/seed/recreate-admin-sessions.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('📄 SQL file loaded')
    console.log('📝 Executing SQL statements...\n')
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`Found ${statements.length} SQL statements to execute\n`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`${i + 1}. Executing: ${statement.substring(0, 60)}...`)
      
      try {
        // Use raw SQL query
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ sql: statement + ';' })
        })
        
        if (!response.ok) {
          const error = await response.text()
          console.log(`   ⚠️  Warning: ${error}`)
        } else {
          console.log('   ✅ Success')
        }
      } catch (error) {
        console.log(`   ⚠️  Warning: ${error.message}`)
      }
    }
    
    // Test the table
    console.log('\n🧪 Testing the recreated table...')
    const testData = {
      admin_user_id: '00000000-0000-0000-0000-000000000000',
      session_token: 'test-token-' + Date.now(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('admin_sessions')
      .insert(testData)
      .select()
    
    if (insertError) {
      console.error('❌ Error inserting test record:', insertError.message)
      console.log('\n⚠️  The table may not have been recreated correctly.')
      console.log('Please run the SQL manually in Supabase SQL Editor:')
      console.log('\n' + sql)
    } else {
      console.log('✅ Test record inserted successfully!')
      console.log('   Columns:', Object.keys(insertData[0]))
      
      // Delete the test record
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', testData.session_token)
      
      console.log('✅ Test record deleted')
      console.log('\n🎉 admin_sessions table is ready to use!')
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function main() {
  await recreateAdminSessionsTable()
  console.log('\n✨ Complete!')
}

main().catch(console.error)
