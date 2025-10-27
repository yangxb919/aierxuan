-- Fix RFQ RLS Policies
-- This script ensures the correct RLS policies are in place for the rfqs table

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public to insert RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow authenticated users to view RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow authenticated users to update RFQs" ON rfqs;
DROP POLICY IF EXISTS "Allow service role full access to RFQs" ON rfqs;

-- Ensure RLS is enabled
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow public (anon) to insert (for website form submissions)
CREATE POLICY "Allow public to insert RFQs" ON rfqs
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users to view all RFQs
CREATE POLICY "Allow authenticated users to view RFQs" ON rfqs
    FOR SELECT TO authenticated
    USING (true);

-- Allow authenticated users to update RFQs
CREATE POLICY "Allow authenticated users to update RFQs" ON rfqs
    FOR UPDATE TO authenticated
    USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access to RFQs" ON rfqs
    FOR ALL TO service_role
    USING (true);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON rfqs TO anon;
GRANT ALL ON rfqs TO authenticated;
GRANT ALL ON rfqs TO service_role;

-- Verify policies
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

