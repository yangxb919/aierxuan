-- Create Default Admin User
-- Note: This script needs to be executed after creating users in Supabase Auth

-- Method 1: Create via Supabase Dashboard (Recommended)
-- 1. Go to Supabase Dashboard -> Authentication -> Users
-- 2. Click "Add user"
-- 3. Enter email: admin@example.com
-- 4. Set password and record it
-- 5. After user creation, copy the user ID from the Users list
-- 6. Execute the SQL statements below to add to admin_users table

-- Method 2: Use Auth.signUp() to create user (after application startup)
-- This method will be implemented in the application, use Method 1 for now

-- After creating Auth user, execute the following SQL statement:
-- Please replace 'YOUR_USER_UUID_HERE' with the actual auth.users.id

INSERT INTO admin_users (
    id,
    email,
    role,
    first_name,
    last_name,
    is_active
) VALUES (
    'YOUR_USER_UUID_HERE', -- Replace with actual auth.users.id
    'admin@example.com',
    'admin',
    'Admin',
    'User',
    true
) ON CONFLICT (email) DO UPDATE SET
    role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- View current admin users
SELECT id, email, role, first_name, last_name, is_active, created_at
FROM admin_users
WHERE role = 'admin' OR role = 'editor';

-- Create test user (optional)
-- Also need to create user in Auth first, then replace UUID
INSERT INTO admin_users (
    id,
    email,
    role,
    first_name,
    last_name,
    is_active
) VALUES (
    'YOUR_EDITOR_UUID_HERE', -- Replace with actual editor user UUID
    'editor@example.com',
    'editor',
    'Test',
    'Editor',
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Complete Creation Step Guide
-- ============================================

/*
Step 1: Create Auth users in Supabase Dashboard
1. Go to project -> Authentication -> Users
2. Click "Add user"
3. Create admin user:
   - Email: admin@example.com
   - Password: Set strong password
   - Auto confirm: Check (skip email verification)
4. Create editor user:
   - Email: editor@example.com
   - Password: Set strong password
   - Auto confirm: Check

Step 2: Get user UUID
1. In the Users list, click on the created user
2. Copy the "ID" field value (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

Step 3: Execute SQL statements
1. Replace 'YOUR_USER_UUID_HERE' in the script with admin user's UUID
2. Replace 'YOUR_EDITOR_UUID_HERE' with editor user's UUID
3. Execute this SQL script

Step 4: Verify creation results
SELECT * FROM admin_users;
*/