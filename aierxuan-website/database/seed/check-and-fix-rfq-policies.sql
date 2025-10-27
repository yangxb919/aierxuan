-- Comprehensive check and fix for RFQ policies

-- Step 1: Show all current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'rfqs'
ORDER BY cmd, policyname;

-- Step 2: Check table permissions
SELECT 
    grantee, 
    privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'rfqs';

-- Step 3: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow public to insert RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow authenticated users to view RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow authenticated users to update RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow service role full access to RFQs" ON rfqs;

-- Step 4: Disable RLS temporarily to test
ALTER TABLE rfqs DISABLE ROW LEVEL SECURITY;

-- Step 5: Re-enable RLS
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- Step 6: Create a PERMISSIVE policy for INSERT (this is the default and most lenient)
CREATE POLICY "anon_insert_rfqs" ON rfqs
    AS PERMISSIVE
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Step 7: Create policies for other operations
CREATE POLICY "authenticated_select_rfqs" ON rfqs
    AS PERMISSIVE
    FOR SELECT 
    TO authenticated
    USING (true);

CREATE POLICY "authenticated_update_rfqs" ON rfqs
    AS PERMISSIVE
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "service_role_all_rfqs" ON rfqs
    AS PERMISSIVE
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Step 8: Grant permissions explicitly
GRANT INSERT, SELECT ON rfqs TO anon;
GRANT ALL ON rfqs TO authenticated;
GRANT ALL ON rfqs TO service_role;

-- Step 9: Verify final state
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'rfqs'
ORDER BY cmd, policyname;

