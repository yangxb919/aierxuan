const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkTableStructure() {
  try {
    console.log('🔍 Checking admin_sessions table structure...\n')
    
    // Try to select all columns to see what exists
    const { data, error } = await supabase
      .from('admin_sessions')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Error querying admin_sessions:', error.message)
      return
    }
    
    console.log('✅ admin_sessions table structure:')
    if (data && data.length > 0) {
      console.log('   Columns:', Object.keys(data[0]))
    } else {
      console.log('   Table is empty, trying to insert a test record...')
      
      // Try to insert a test record to see what columns are required
      const testInsert = await supabase
        .from('admin_sessions')
        .insert({
          admin_user_id: '00000000-0000-0000-0000-000000000000',
          session_token: 'test-token-' + Date.now(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
      
      if (testInsert.error) {
        console.error('❌ Error inserting test record:', testInsert.error.message)
        console.log('   This helps us understand the table structure')
      } else {
        console.log('✅ Test record inserted successfully')
        console.log('   Columns:', Object.keys(testInsert.data[0]))
        
        // Delete the test record
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', testInsert.data[0].session_token)
        
        console.log('✅ Test record deleted')
      }
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function main() {
  await checkTableStructure()
  console.log('\n✨ Check complete!')
}

main().catch(console.error)
