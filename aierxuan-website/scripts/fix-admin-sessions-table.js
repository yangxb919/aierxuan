const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixAdminSessionsTable() {
  try {
    console.log('🔧 Fixing admin_sessions table...\n')
    
    // Drop the existing table
    console.log('1. Dropping existing admin_sessions table...')
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'DROP TABLE IF EXISTS admin_sessions CASCADE;'
    })
    
    if (dropError) {
      console.log('   Note: Could not drop table (may not exist or RPC not available)')
    } else {
      console.log('✅ Table dropped')
    }
    
    // Create the table with correct structure
    console.log('\n2. Creating admin_sessions table with correct structure...')
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_user_id UUID NOT NULL,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        revoked_at TIMESTAMP WITH TIME ZONE NULL,
        ip_address INET NULL,
        user_agent TEXT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(admin_user_id);
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
    `
    
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    })
    
    if (createError) {
      console.error('❌ Error creating table:', createError.message)
      console.log('\n⚠️  RPC method not available. Please create the table manually using Supabase SQL Editor:')
      console.log('\n' + createTableSQL)
      return
    }
    
    console.log('✅ Table created successfully')
    
    // Test the table
    console.log('\n3. Testing the table...')
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
    } else {
      console.log('✅ Test record inserted successfully')
      console.log('   Columns:', Object.keys(insertData[0]))
      
      // Delete the test record
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', testData.session_token)
      
      console.log('✅ Test record deleted')
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

async function main() {
  await fixAdminSessionsTable()
  console.log('\n✨ Fix complete!')
}

main().catch(console.error)
