-- Debug RFQ RLS Issues

-- Check if ROW LEVEL SECURITY is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'rfqs';

-- Check all policies again
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

-- Check grants
SELECT
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'rfqs'
ORDER BY grantee, privilege_type;

-- Check table owner
SELECT
    t.schemaname,
    t.tablename,
    t.tableowner
FROM pg_tables t
WHERE t.tablename = 'rfqs';

-- Ensure RLS is enabled
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- Verify the change
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'rfqs';

