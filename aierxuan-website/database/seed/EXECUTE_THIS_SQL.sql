-- ============================================================================
-- IMPORTANT: Execute this SQL in Supabase SQL Editor to complete Admin Login
-- ============================================================================
-- URL: https://supabase.com/dashboard/project/auesmvwfwubxyuswhbch/sql/new
-- ============================================================================

-- Create function to validate admin session token
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
        AND (s.revoked_at IS NULL OR s.revoked_at > NOW())
        AND u.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO service_role;
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION validate_admin_session(VARCHAR) TO authenticated;

-- Test the function (optional)
-- SELECT * FROM validate_admin_session('test-token');

SELECT 'validate_admin_session function created successfully!' AS result;
