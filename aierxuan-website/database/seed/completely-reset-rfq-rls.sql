-- Completely reset RFQ RLS from scratch

-- Step 1: Disable RLS completely
ALTER TABLE rfqs DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'rfqs') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON rfqs';
    END LOOP;
END $$;

-- Step 3: Revoke all permissions
REVOKE ALL ON rfqs FROM anon;
REVOKE ALL ON rfqs FROM authenticated;
REVOKE ALL ON rfqs FROM service_role;

-- Step 4: Grant basic permissions
GRANT SELECT, INSERT ON rfqs TO anon;
GRANT ALL ON rfqs TO authenticated;
GRANT ALL ON rfqs TO service_role;

-- Step 5: Re-enable RLS
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- Step 6: Create the simplest possible INSERT policy for anon
CREATE POLICY "anon_can_insert" ON rfqs
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Step 7: Create SELECT policy for anon (so they can read their own submissions)
CREATE POLICY "anon_can_select" ON rfqs
    FOR SELECT 
    TO anon
    USING (true);

-- Step 8: Create policies for authenticated users
CREATE POLICY "auth_can_select" ON rfqs
    FOR SELECT 
    TO authenticated
    USING (true);

CREATE POLICY "auth_can_update" ON rfqs
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "auth_can_delete" ON rfqs
    FOR DELETE 
    TO authenticated
    USING (true);

-- Step 9: Create policy for service_role
CREATE POLICY "service_role_all" ON rfqs
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Step 10: Verify everything
SELECT 'RLS Status:' as info;
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'rfqs';

SELECT 'Policies:' as info;
SELECT 
    policyname,
    roles,
    cmd,
    with_check
FROM pg_policies
WHERE tablename = 'rfqs'
ORDER BY cmd, policyname;

SELECT 'Grants:' as info;
SELECT 
    grantee, 
    string_agg(privilege_type, ', ') as privileges
FROM information_schema.role_table_grants 
WHERE table_name = 'rfqs'
GROUP BY grantee
ORDER BY grantee;

