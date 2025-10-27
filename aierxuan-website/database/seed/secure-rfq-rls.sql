-- =============================================
-- Secure RFQ RLS Policies (Final Version)
-- =============================================
-- This script secures the RFQ table by:
-- 1. Allowing anonymous users to INSERT only (submit RFQs)
-- 2. Preventing anonymous users from SELECT (no data leakage)
-- 3. Allowing authenticated users and service_role full access
--
-- IMPORTANT: Frontend must use returning: 'minimal' for anon inserts
-- =============================================

-- Display current policies (before changes)
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
ORDER BY policyname;

-- Drop all existing policies
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'rfqs')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.rfqs';
    END LOOP;
END $$;

-- Revoke all permissions (including PUBLIC to prevent residual grants)
REVOKE ALL ON public.rfqs FROM anon;
REVOKE ALL ON public.rfqs FROM authenticated;
REVOKE ALL ON public.rfqs FROM service_role;
REVOKE ALL ON public.rfqs FROM PUBLIC;

-- Grant table-level permissions
-- anon: INSERT only (NO SELECT - prevents data leakage)
GRANT INSERT ON public.rfqs TO anon;

-- authenticated: Full access (SELECT, INSERT, UPDATE, DELETE)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rfqs TO authenticated;

-- service_role: Full access (bypasses RLS anyway)
GRANT ALL ON public.rfqs TO service_role;

-- Note: rfqs uses UUID primary key with default gen_random_uuid()
-- No sequence grants needed (rfqs_id_seq does not exist)

-- Ensure RLS is enabled (NORMAL mode, not FORCE)
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfqs NO FORCE ROW LEVEL SECURITY;

-- =============================================
-- Create Policies
-- =============================================

-- Policy 1: Anonymous users can INSERT
CREATE POLICY "anon_can_insert_rfq"
    ON rfqs
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy 2: Authenticated users can SELECT all
CREATE POLICY "authenticated_can_select_rfq"
    ON rfqs
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy 3: Authenticated users can UPDATE all
CREATE POLICY "authenticated_can_update_rfq"
    ON rfqs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy 4: Authenticated users can DELETE all
CREATE POLICY "authenticated_can_delete_rfq"
    ON rfqs
    FOR DELETE
    TO authenticated
    USING (true);

-- Policy 5: Service role can do everything (bypasses RLS anyway)
CREATE POLICY "service_role_all_rfq"
    ON rfqs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =============================================
-- Verify Configuration
-- =============================================

-- Show final policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'rfqs'
ORDER BY policyname;

-- Show table permissions
SELECT 
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'rfqs'
ORDER BY grantee, privilege_type;

-- Show RLS status
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN relforcerowsecurity THEN 'FORCE'
        ELSE 'NORMAL'
    END as rls_mode
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE tablename = 'rfqs';

