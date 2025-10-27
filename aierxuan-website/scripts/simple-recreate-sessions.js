const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('🔧 Attempting to recreate admin_sessions table...\n')
  
  console.log('📋 Please run the following SQL in Supabase SQL Editor:')
  console.log('=' .repeat(80))
  console.log(`
-- Drop existing admin_sessions table and recreate with correct structure
DROP TABLE IF EXISTS admin_sessions CASCADE;

-- Create admin_sessions table
CREATE TABLE admin_sessions (
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

-- Create indexes
CREATE INDEX idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_user_id ON admin_sessions(admin_user_id);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Disable RLS for now
ALTER TABLE admin_sessions DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON admin_sessions TO postgres;
GRANT ALL ON admin_sessions TO service_role;
GRANT ALL ON admin_sessions TO anon;
GRANT ALL ON admin_sessions TO authenticated;
  `)
  console.log('=' .repeat(80))
  
  console.log('\n📝 Steps to fix:')
  console.log('1. Go to https://supabase.com/dashboard/project/auesmvwfwubxyuswhbch/sql/new')
  console.log('2. Copy and paste the SQL above')
  console.log('3. Click "Run" to execute the SQL')
  console.log('4. Come back here and press Enter to test the table')
  
  // Wait for user input
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  await new Promise(resolve => {
    readline.question('\nPress Enter after running the SQL in Supabase...', () => {
      readline.close()
      resolve()
    })
  })
  
  // Test the table
  console.log('\n🧪 Testing the table...')
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
  
  console.log('\n✨ Complete!')
}

main().catch(console.error)
