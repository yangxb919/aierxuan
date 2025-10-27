-- Create default admin user with hashed password
-- This script creates a default admin user for testing purposes
-- Password: admin123 (hashed with bcrypt)

-- First, ensure the admin_users table exists with the correct structure
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'editor',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_users_updated_at();

-- Add RLS (Row Level Security) policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admin users can see all users, editors can only see themselves
CREATE POLICY admin_users_select ON admin_users
    FOR SELECT
    USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Only admins can insert new users
CREATE POLICY admin_users_insert ON admin_users
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Admins can update all users, users can update themselves
CREATE POLICY admin_users_update ON admin_users
    FOR UPDATE
    USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy: Only admins can delete users
CREATE POLICY admin_users_delete ON admin_users
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Insert default admin user
-- Password: admin123 (bcrypt hash with salt rounds 12)
INSERT INTO admin_users (
    email,
    password_hash,
    role,
    first_name,
    last_name,
    is_active
) VALUES (
    'admin@aierxuan.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9PS', -- admin123
    'admin',
    'Admin',
    'User',
    true
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Insert default editor user
-- Password: editor123 (bcrypt hash with salt rounds 12)
INSERT INTO admin_users (
    email,
    password_hash,
    role,
    first_name,
    last_name,
    is_active
) VALUES (
    'editor@aierxuan.com',
    '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- editor123
    'editor',
    'Test',
    'Editor',
    true
) ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_users TO authenticated;
GRANT USAGE ON SEQUENCE admin_users_id_seq TO authenticated;

-- View current admin users
SELECT 
    id, 
    email, 
    role, 
    first_name, 
    last_name, 
    is_active, 
    created_at,
    last_login_at
FROM admin_users
ORDER BY created_at DESC;

-- Function to create admin user with hashed password
CREATE OR REPLACE FUNCTION create_admin_user(
    p_email VARCHAR(255),
    p_password VARCHAR(255),
    p_role VARCHAR(50) DEFAULT 'editor',
    p_first_name VARCHAR(100) DEFAULT NULL,
    p_last_name VARCHAR(100) DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    user_id UUID;
    hashed_password VARCHAR(255);
BEGIN
    -- Note: In a real application, password hashing should be done in the application layer
    -- This is a simplified version for demonstration
    
    -- Generate a simple hash (in production, use proper bcrypt)
    hashed_password := crypt(p_password, gen_salt('bf', 12));
    
    INSERT INTO admin_users (
        email,
        password_hash,
        role,
        first_name,
        last_name,
        is_active
    ) VALUES (
        LOWER(p_email),
        hashed_password,
        p_role,
        p_first_name,
        p_last_name,
        true
    ) RETURNING id INTO user_id;
    
    RETURN user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to verify admin password
CREATE OR REPLACE FUNCTION verify_admin_password(
    p_email VARCHAR(255),
    p_password VARCHAR(255)
)
RETURNS TABLE(
    user_id UUID,
    email VARCHAR(255),
    role VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as user_id,
        u.email,
        u.role,
        u.first_name,
        u.last_name,
        u.is_active
    FROM admin_users u
    WHERE u.email = LOWER(p_email)
        AND u.password_hash = crypt(p_password, u.password_hash)
        AND u.is_active = true;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE admin_users IS 'Admin users for the AIERXUAN admin panel';
COMMENT ON COLUMN admin_users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN admin_users.role IS 'User role: admin, editor, viewer';
COMMENT ON COLUMN admin_users.is_active IS 'Whether the user account is active';

-- Display success message
DO $$
BEGIN
    RAISE NOTICE 'Default admin users created successfully!';
    RAISE NOTICE 'Admin login: admin@aierxuan.com / admin123';
    RAISE NOTICE 'Editor login: editor@aierxuan.com / editor123';
    RAISE NOTICE 'Please change these default passwords in production!';
END $$;
