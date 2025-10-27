# AIERXUAN 网站问题修复清单

**文档日期**: 2025年10月15日  
**基于测试报告**: TEST_REPORT_2025-10-15.md  
**状态**: 待修复

---

## 问题优先级说明

- 🔴 **Critical (严重)**: 必须立即修复，影响核心功能或安全
- 🟠 **High (高)**: 应尽快修复，影响用户体验
- 🟡 **Medium (中等)**: 计划修复，影响较小
- 🟢 **Low (低)**: 可选修复，优化性能或体验

---

## 🔴 严重问题（Critical Priority）

### 问题 #1: RFQ表单提交失败

**严重程度**: 🔴 Critical  
**状态**: ❌ 未修复  
**发现日期**: 2025-10-15

#### 问题描述
前端RFQ表单提交时返回Supabase错误：
```
Error: PGRST204 - Could not find the table
```

#### 影响范围
- 用户无法提交询盘请求
- 核心业务功能不可用
- 潜在客户流失

#### 错误详情
- **错误代码**: PGRST204
- **错误消息**: "Could not find the table"
- **发生位置**: `/contact` 页面，RFQ表单提交
- **API端点**: Supabase REST API (直接调用)

#### 重现步骤
1. 访问 http://localhost:3000/contact
2. 填写RFQ表单所有必填字段：
   - Full Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Product of Interest: Industrial Laptop
   - Message: I need 100 units
3. 点击"Submit Request"按钮
4. 观察错误消息显示

#### 预期行为
- 表单数据成功提交到Supabase
- 显示成功消息："Thank you! We'll get back to you soon."
- 表单字段清空
- 管理员可在后台查看新的RFQ记录

#### 实际行为
- 显示错误消息："Sorry, there was an error submitting your request. Please try again."
- 表单数据未保存
- 控制台显示PGRST204错误

#### 根本原因分析
可能的原因（需要验证）：
1. **表名不匹配**: 前端代码中的表名与Supabase实际表名不一致
2. **表不存在**: `rfq_submissions` 或 `rfqs` 表未在Supabase中创建
3. **RLS策略问题**: Row Level Security策略阻止了anon角色的插入操作
4. **API配置错误**: Supabase客户端配置不正确

#### 修复步骤

##### 步骤1: 验证表是否存在
```sql
-- 在Supabase SQL Editor中执行
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%rfq%';
```

##### 步骤2: 检查表结构
如果表不存在，执行创建表的SQL：
```sql
-- 参考 database/seed/create-rfq-table.sql
CREATE TABLE IF NOT EXISTS public.rfqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone_number TEXT,
  product_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  quantity_needed TEXT,
  country TEXT,
  industry TEXT,
  urgency TEXT DEFAULT 'normal',
  budget_range TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

##### 步骤3: 配置RLS策略
```sql
-- 启用RLS
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;

-- 允许anon角色插入
CREATE POLICY "Allow anonymous insert" ON public.rfqs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 允许authenticated用户查看所有记录
CREATE POLICY "Allow authenticated read" ON public.rfqs
  FOR SELECT
  TO authenticated
  USING (true);

-- 允许service_role完全访问
CREATE POLICY "Allow service role all" ON public.rfqs
  FOR ALL
  TO service_role
  USING (true);
```

##### 步骤4: 检查前端代码
检查文件：`src/components/RFQForm.tsx` 或类似文件

确认表名正确：
```typescript
// 应该是
const { data, error } = await supabase
  .from('rfqs')  // 确认表名
  .insert([formData]);

// 而不是
const { data, error } = await supabase
  .from('rfq_submissions')  // 错误的表名
  .insert([formData]);
```

##### 步骤5: 测试修复
```bash
# 重启开发服务器
npm run dev

# 访问联系页面并测试表单提交
```

#### 验证标准
- [ ] 表单提交成功，无错误消息
- [ ] 数据正确保存到Supabase
- [ ] 显示成功消息
- [ ] 表单字段清空
- [ ] 后台可以查看新的RFQ记录
- [ ] 控制台无错误

#### 相关文件
- `src/components/RFQForm.tsx` (或类似文件)
- `database/seed/create-rfq-table.sql`
- `src/lib/supabase.ts`

---

### 问题 #2: 退出登录后Session未清除

**严重程度**: 🔴 Critical
**状态**: ✅ 已修复
**发现日期**: 2025-10-15
**修复日期**: 2025-10-15

#### 问题描述
调用logout API后，session cookie未被清除，用户信息仍可通过 `/api/admin/me` 访问。

#### 影响范围
- **安全漏洞**: 用户退出后仍可访问受保护资源
- **会话劫持风险**: 旧的session可能被恶意利用
- **合规问题**: 不符合安全最佳实践

#### 错误详情
- **API端点**: POST `/api/admin/logout`
- **问题**: Cookie未清除，session未失效
- **影响**: 退出后仍可访问 GET `/api/admin/me`

#### 重现步骤
1. 登录后台：
   ```bash
   curl -c cookies.txt -H 'Content-Type: application/json' \
     -d '{"email":"admin@aierxuan.com","password":"admin123"}' \
     http://localhost:3000/api/admin/login
   ```

2. 验证登录成功：
   ```bash
   curl -b cookies.txt http://localhost:3000/api/admin/me
   # 应返回用户信息
   ```

3. 退出登录：
   ```bash
   curl -b cookies.txt -X POST http://localhost:3000/api/admin/logout
   # 返回: {"success":true,"message":"Logged out successfully"}
   ```

4. 再次访问用户信息：
   ```bash
   curl -b cookies.txt http://localhost:3000/api/admin/me
   # 问题：仍然返回用户信息，应该返回401
   ```

#### 预期行为
- 退出登录后，cookie应被清除
- 访问 `/api/admin/me` 应返回401 Unauthorized
- 数据库中的session应被标记为无效或删除

#### 实际行为
- Cookie仍然有效
- 可以继续访问受保护的API
- Session在数据库中仍然有效

#### 根本原因分析
可能的原因：
1. **Cookie未清除**: logout API未设置清除cookie的响应头
2. **Session未删除**: 数据库中的session记录未删除
3. **中间件验证不足**: 未检查session的有效性标志

#### 修复步骤

##### 步骤1: 修改logout API
文件：`src/app/api/admin/logout/route.ts`

```typescript
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (sessionToken) {
      // 1. 从数据库删除session
      const supabase = createClient();
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken);
    }

    // 2. 清除cookie
    cookieStore.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // 立即过期
      path: '/',
    });

    return Response.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
```

##### 步骤2: 增强中间件验证
文件：`src/middleware.ts` 或相关认证中间件

```typescript
// 在验证session时，检查session是否存在于数据库
const { data: session } = await supabase
  .from('admin_sessions')
  .select('*')
  .eq('session_token', sessionToken)
  .eq('is_valid', true) // 添加有效性检查
  .single();

if (!session) {
  // Session不存在或无效，清除cookie并返回401
  return new Response('Unauthorized', { status: 401 });
}
```

##### 步骤3: 添加session过期检查
```typescript
// 检查session是否过期
const expiresAt = new Date(session.expires_at);
if (expiresAt < new Date()) {
  // Session已过期，删除并返回401
  await supabase
    .from('admin_sessions')
    .delete()
    .eq('id', session.id);
  
  return new Response('Session expired', { status: 401 });
}
```

##### 步骤4: 测试修复
```bash
# 测试完整的登录-退出流程
node scripts/test-full-login-flow.js

# 应该看到：
# ✅ Logout successful!
# ✅ User info not accessible after logout (401)
```

#### 验证标准
- [ ] 退出登录后，cookie被清除
- [ ] 访问 `/api/admin/me` 返回401
- [ ] 数据库中的session被删除或标记为无效
- [ ] 无法使用旧的session访问受保护资源
- [ ] 测试脚本全部通过

#### 相关文件
- `src/app/api/admin/logout/route.ts`
- `src/app/api/admin/me/route.ts`
- `src/middleware.ts`
- `scripts/test-full-login-flow.js`

---

## 🟠 高优先级问题（High Priority）

### 问题 #3: 产品页面未显示产品列表

**严重程度**: 🟠 High  
**状态**: ❌ 未修复  
**发现日期**: 2025-10-15

#### 问题描述
产品页面 (`/products`) 加载成功，但产品列表未显示。页面只显示分类区块，没有产品卡片。

#### 影响范围
- 用户无法浏览产品
- 影响产品展示和销售
- 用户体验差

#### 重现步骤
1. 访问 http://localhost:3000/products
2. 观察页面内容
3. 注意产品列表区域为空

#### 预期行为
- 显示所有active状态的产品
- 每个产品显示图片、标题、简介
- 可以点击查看详情

#### 实际行为
- 只显示分类区块
- 产品列表区域为空
- 无加载指示器

#### 可能原因
1. 客户端数据加载失败
2. API调用错误
3. 数据过滤逻辑问题
4. 组件渲染条件错误

#### 修复步骤

##### 步骤1: 检查浏览器控制台
打开浏览器开发者工具，查看：
- Network标签：API请求是否成功
- Console标签：是否有JavaScript错误

##### 步骤2: 检查产品数据API
```bash
# 测试产品API
curl http://localhost:3000/api/products

# 应该返回产品列表
```

##### 步骤3: 检查前端组件
文件：`src/app/products/page.tsx` 或类似文件

检查：
- 数据获取逻辑
- 渲染条件
- 错误处理

##### 步骤4: 添加调试日志
```typescript
console.log('Products data:', products);
console.log('Loading state:', isLoading);
console.log('Error state:', error);
```

#### 验证标准
- [ ] 产品列表正确显示
- [ ] 显示所有active产品
- [ ] 产品卡片包含完整信息
- [ ] 无控制台错误

#### 相关文件
- `src/app/products/page.tsx`
- `src/components/ProductCard.tsx`
- `src/app/api/products/route.ts`

---

### 问题 #4: 会话验证脚本环境变量问题

**严重程度**: 🟠 High  
**状态**: ❌ 未修复  
**发现日期**: 2025-10-15

#### 问题描述
`test-session-validation.js` 脚本无法读取环境变量，导致测试失败。

#### 错误消息
```
Missing Supabase environment variables
```

#### 影响范围
- 无法自动化测试会话验证功能
- CI/CD流程可能受影响

#### 修复步骤

##### 步骤1: 检查脚本
文件：`scripts/test-session-validation.js`

确保正确加载环境变量：
```javascript
// 添加在文件开头
require('dotenv').config({ path: '.env.local' });

// 或使用
const { config } = require('dotenv');
config({ path: '.env.local' });
```

##### 步骤2: 验证环境变量
```javascript
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');
```

##### 步骤3: 测试脚本
```bash
node scripts/test-session-validation.js
```

#### 验证标准
- [ ] 脚本成功读取环境变量
- [ ] 测试正常执行
- [ ] 无环境变量错误

---

## 🟡 中等优先级问题（Medium Priority）

### 问题 #5: 联系页面Hydration错误

**严重程度**: 🟡 Medium  
**状态**: ❌ 未修复  
**发现日期**: 2025-10-15

#### 问题描述
联系页面出现React hydration警告：
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client props
```

#### 影响范围
- 可能影响SEO
- 首次渲染性能下降
- 用户体验轻微影响

#### 修复步骤
1. 检查服务端和客户端渲染的一致性
2. 确保动态内容使用 `useEffect` 或 `useState`
3. 避免在服务端渲染时使用浏览器特定API

#### 相关文件
- `src/app/contact/page.tsx`
- `src/components/RFQForm.tsx`

---

### 问题 #6: 后台仪表盘RFQ统计不准确

**严重程度**: 🟡 Medium  
**状态**: ❌ 未修复  
**发现日期**: 2025-10-15

#### 问题描述
后台仪表盘显示"Total RFQs: 0"，但实际数据库中有8条RFQ记录。

#### 影响范围
- 管理员看到错误的统计数据
- 影响业务决策

#### 修复步骤
1. 检查仪表盘的数据查询逻辑
2. 验证API端点返回正确数据
3. 确认前端正确显示数据

#### 相关文件
- `src/app/admin/page.tsx`
- `src/app/api/admin/stats/route.ts`

---

## 修复进度跟踪

| 问题编号 | 问题名称 | 优先级 | 状态 | 负责人 | 预计完成 |
|---------|---------|--------|------|--------|----------|
| #1 | RFQ表单提交失败 | 🔴 Critical | ❌ 未修复 | - | - |
| #2 | 退出登录Session未清除 | 🔴 Critical | ❌ 未修复 | - | - |
| #3 | 产品页面未显示列表 | 🟠 High | ❌ 未修复 | - | - |
| #4 | 会话验证脚本问题 | 🟠 High | ❌ 未修复 | - | - |
| #5 | 联系页面Hydration错误 | 🟡 Medium | ❌ 未修复 | - | - |
| #6 | 仪表盘统计不准确 | 🟡 Medium | ❌ 未修复 | - | - |

---

## 修复后验证清单

### 完整回归测试
修复所有问题后，执行以下测试：

```bash
# 1. 后台登录流程测试
node scripts/test-full-login-flow.js

# 2. 产品管理测试
node scripts/test-product-management.js

# 3. 博客管理测试
node scripts/test-blog-management.js

# 4. FAQ管理测试
node scripts/test-faq-management.js

# 5. RFQ管理测试
node scripts/test-rfq-management.js

# 6. 会话验证测试
node scripts/test-session-validation.js

# 7. 页面访问测试
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/products
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/blog
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/contact
```

### UI测试
使用浏览器手动测试：
- [ ] 首页加载正常
- [ ] 产品页面显示产品列表
- [ ] 博客页面显示文章列表
- [ ] 联系页面RFQ表单可以成功提交
- [ ] 后台登录和退出功能正常
- [ ] 后台各管理页面功能正常

---

**文档维护**: 请在修复每个问题后更新此文档的状态和进度。

