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
CREATE INDEX idx_admin_sessions_active ON admin_sessions(admin_user_id, expires_at) WHERE revoked_at IS NULL;

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

-- Disable RLS for now (we'll enable it later if needed)
ALTER TABLE admin_sessions DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON admin_sessions TO postgres;
GRANT ALL ON admin_sessions TO service_role;

SELECT 'admin_sessions table recreated successfully' AS result;
