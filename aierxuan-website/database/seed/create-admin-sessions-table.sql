-- Create admin_sessions table for session management
-- This table stores active admin sessions with tokens

CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE NULL,
    ip_address INET NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_active ON admin_sessions(admin_user_id, expires_at) WHERE revoked_at IS NULL;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_admin_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_admin_sessions_updated_at
    BEFORE UPDATE ON admin_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_sessions_updated_at();

-- Add RLS (Row Level Security) policies
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Admin users can only see their own sessions
CREATE POLICY admin_sessions_select_own ON admin_sessions
    FOR SELECT
    USING (admin_user_id = auth.uid());

-- Policy: Admin users can only insert their own sessions
CREATE POLICY admin_sessions_insert_own ON admin_sessions
    FOR INSERT
    WITH CHECK (admin_user_id = auth.uid());

-- Policy: Admin users can only update their own sessions
CREATE POLICY admin_sessions_update_own ON admin_sessions
    FOR UPDATE
    USING (admin_user_id = auth.uid());

-- Policy: Admin users can only delete their own sessions
CREATE POLICY admin_sessions_delete_own ON admin_sessions
    FOR DELETE
    USING (admin_user_id = auth.uid());

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_admin_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM admin_sessions 
    WHERE expires_at < NOW() OR revoked_at IS NOT NULL;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to revoke all sessions for a user
CREATE OR REPLACE FUNCTION revoke_all_admin_sessions(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE admin_sessions 
    SET revoked_at = NOW(), updated_at = NOW()
    WHERE admin_user_id = user_id AND revoked_at IS NULL;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to validate session token
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
        AND s.revoked_at IS NULL
        AND u.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_sessions TO authenticated;
GRANT USAGE ON SEQUENCE admin_sessions_id_seq TO authenticated;

-- Insert some sample data for testing (optional)
-- Note: This should be removed in production
/*
INSERT INTO admin_sessions (admin_user_id, session_token, expires_at, ip_address, user_agent)
SELECT 
    id,
    'sample_token_' || id,
    NOW() + INTERVAL '7 days',
    '127.0.0.1'::inet,
    'Test User Agent'
FROM admin_users 
WHERE email = 'admin@aierxuan.com'
LIMIT 1;
*/

-- View to check active sessions
CREATE OR REPLACE VIEW active_admin_sessions AS
SELECT 
    s.id,
    s.session_token,
    s.admin_user_id,
    u.email,
    u.role,
    u.first_name,
    u.last_name,
    s.expires_at,
    s.ip_address,
    s.user_agent,
    s.created_at
FROM admin_sessions s
JOIN admin_users u ON s.admin_user_id = u.id
WHERE s.expires_at > NOW() 
    AND s.revoked_at IS NULL
    AND u.is_active = true
ORDER BY s.created_at DESC;

-- Grant access to the view
GRANT SELECT ON active_admin_sessions TO authenticated;

COMMENT ON TABLE admin_sessions IS 'Stores active admin user sessions with tokens for authentication';
COMMENT ON COLUMN admin_sessions.session_token IS 'Unique session token for authentication';
COMMENT ON COLUMN admin_sessions.expires_at IS 'When the session expires';
COMMENT ON COLUMN admin_sessions.revoked_at IS 'When the session was manually revoked (logout)';
COMMENT ON COLUMN admin_sessions.ip_address IS 'IP address of the session';
COMMENT ON COLUMN admin_sessions.user_agent IS 'User agent string of the client';
