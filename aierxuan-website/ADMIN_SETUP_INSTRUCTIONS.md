# 🔐 Admin登录系统设置说明

## ⚠️ 重要：完成Admin登录的最后一步

Admin登录系统已经完成了99%，只需要在Supabase中执行一个SQL脚本即可完全启用。

---

## 📝 执行步骤

### 1. 打开Supabase SQL Editor

访问：https://supabase.com/dashboard/project/auesmvwfwubxyuswhbch/sql/new

### 2. 复制SQL脚本

打开文件：`database/seed/EXECUTE_THIS_SQL.sql`

或者直接复制以下内容：

```sql
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

SELECT 'validate_admin_session function created successfully!' AS result;
```

### 3. 执行SQL

1. 将SQL粘贴到Supabase SQL Editor中
2. 点击右下角的 **"Run"** 按钮
3. 等待执行完成，应该看到成功消息

### 4. 测试Admin登录

执行完SQL后，测试登录功能：

```bash
# 在项目目录下运行
cd aierxuan-website
node scripts/test-full-login-flow.js
```

或者直接在浏览器中测试：

1. 访问：http://localhost:3000/admin/login
2. 使用以下凭据登录：
   - **Email**: admin@example.com
   - **Password**: <CHANGE_PASSWORD>
3. 登录成功后应该跳转到Admin仪表盘

---

## 🎯 登录凭据

### Admin账户（完全权限）
- **Email**: admin@example.com
- **Password**: <CHANGE_PASSWORD>
- **Role**: admin

### Editor账户（编辑权限）
- **Email**: editor@example.com
- **Password**: <CHANGE_PASSWORD>
- **Role**: editor

⚠️ **重要**：这些是开发环境的默认密码，在生产环境中必须更改！

---

## ✅ 验证成功

执行SQL后，运行测试脚本应该看到：

```
🧪 Testing full admin login flow...

1️⃣  Step 1: Login with admin credentials
✅ Login successful!
   User: admin@example.com
   Role: admin
   Session ID: [UUID]
   Cookie: admin_session=[TOKEN]

2️⃣  Step 2: Get current user info
✅ User info retrieved!
   Email: admin@example.com
   Role: admin
   Name: Admin User

3️⃣  Step 3: Access admin dashboard
✅ Admin dashboard accessible!
   Status: 200 OK

4️⃣  Step 4: Logout
✅ Logout successful!

5️⃣  Step 5: Verify logout
✅ Logout verified - user info not accessible

✨ Test complete!

📋 Summary:
- Login API: ✅ Working
- Session creation: ✅ Working
- User info API: ✅ Working
- Logout API: ✅ Working

🎉 Admin authentication system is fully functional!
```

---

## 🚀 完成后的下一步

Admin登录系统完成后，我们将继续开发：

### Task #8: Admin管理功能
1. **RFQ管理**：查看和管理客户询价
2. **Blog管理**：创建、编辑、发布博客文章
3. **Product管理**：管理产品信息和图片

---

## 🆘 遇到问题？

如果遇到任何问题，请检查：

1. ✅ Supabase项目是否正在运行
2. ✅ 开发服务器是否在运行（`npm run dev`）
3. ✅ 环境变量是否正确配置（`.env.local`）
4. ✅ admin_users和admin_sessions表是否存在

如果问题仍然存在，可以运行诊断脚本：

```bash
cd aierxuan-website
NEXT_PUBLIC_SUPABASE_URL=https://dudvgnkvukujhqatolqm.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZHZnbmt2dWt1amhxYXRvbHFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTUwMTc0OSwiZXhwIjoyMDc1MDc3NzQ5fQ.AjroOgNKKUBT8xZJqTW5XkwOtusNVJGdoMaVfNVQVrI \
node scripts/check-admin-users.js
```

---

**祝您使用愉快！** 🎉
