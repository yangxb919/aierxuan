-- Fix RFQ INSERT Policy for anon role
-- This script specifically fixes the INSERT policy to allow public form submissions

-- First, let's check current policies
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
WHERE tablename = 'rfqs';

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Allow public to insert RFQs" ON rfqs;

-- Create a new INSERT policy with explicit conditions
-- The key is to use WITH CHECK clause that allows any insert from anon
CREATE POLICY "Allow public to insert RFQs" ON rfqs
    FOR INSERT 
    TO anon
    WITH CHECK (
        -- Allow insert if basic required fields are provided
        name IS NOT NULL 
        AND email IS NOT NULL
        AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

-- Also ensure the table has proper grants
GRANT INSERT ON rfqs TO anon;
GRANT SELECT ON rfqs TO anon;

-- Verify the policy was created
SELECT 
    policyname,
    roles,
    cmd,
    with_check
FROM pg_policies
WHERE tablename = 'rfqs' AND cmd = 'INSERT';

