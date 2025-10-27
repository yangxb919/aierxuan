#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1]] = match[2]
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateFunction() {
  console.log('🔧 Updating validate_admin_session function...\n')
  
  const sql = `
-- Drop existing function
DROP FUNCTION IF EXISTS validate_admin_session(VARCHAR);

-- Create updated function to validate admin session token
CREATE OR REPLACE FUNCTION validate_admin_session(token VARCHAR(255))
RETURNS TABLE(
    session_id UUID,
    admin_user_id UUID,
    email VARCHAR(255),
    role VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id as session_id,
        s.admin_user_id,
        u.email,
        u.role,
        u.first_name,
        u.last_name,
        u.is_active
    FROM admin_sessions s
    JOIN admin_users u ON s.admin_user_id = u.id
    WHERE s.session_token = token
        AND s.expires_at > NOW()
        AND s.revoked_at IS NULL  -- Session must not be revoked
        AND u.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO service_role;
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO authenticated;
`
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      // Try direct execution if exec_sql doesn't exist
      console.log('⚠️  exec_sql RPC not available, trying direct query...')
      
      // Split into individual statements and execute
      const statements = sql.split(';').filter(s => s.trim())
      
      for (const statement of statements) {
        if (statement.trim()) {
          const { error: execError } = await supabase.rpc('query', { 
            query_text: statement + ';' 
          })
          
          if (execError) {
            console.error('❌ Error executing statement:', execError)
            console.error('Statement:', statement.substring(0, 100) + '...')
          }
        }
      }
    }
    
    console.log('✅ Function update attempted')
    console.log('\n📝 Please manually execute the following SQL in Supabase SQL Editor:')
    console.log('=' .repeat(80))
    console.log(sql)
    console.log('='.repeat(80))
    
    // Test the function
    console.log('\n🧪 Testing function with invalid token...')
    const { data: testData, error: testError } = await supabase
      .rpc('validate_admin_session', { token: 'invalid-token' })
    
    if (testError) {
      console.error('❌ Function test error:', testError)
    } else {
      console.log('✅ Function is callable')
      console.log('   Result:', testData)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📝 Please manually execute the SQL shown above in Supabase SQL Editor')
  }
}

updateFunction().catch(console.error)

