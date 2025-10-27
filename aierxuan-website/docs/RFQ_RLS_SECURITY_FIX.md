# RFQ RLS Security Fix - Complete Guide

## 问题背景

在实施RFQ（Request for Quote）功能时，遇到了经典的"RLS策略与返回权限"双重问题：

1. **anon用户能读取数据**：违反了数据隐私原则，匿名用户不应该看到其他人的询价
2. **anon用户不能插入数据**：因为PostgREST默认`return=representation`，插入后会尝试回查新行，需要SELECT权限

## 根本原因

### 为什么anon既不能插入、又还能读取？

1. **读取问题**：
   - 旧脚本（`completely-reset-rfq-rls.sql`）创建了`anon_can_select`策略
   - 或者在RLS禁用时给了anon SELECT授权（RLS失效时授权生效）

2. **插入问题**：
   - PostgREST默认`return=representation`，会在插入后回查行
   - 需要SELECT权限才能返回插入的数据
   - 我们的RLS去掉了anon SELECT，导致插入返回失败

## 解决方案

### 1. 前端代码修复 ✅

#### 修改文件：`src/components/forms/RFQForm.tsx`

```typescript
// Line 313-319
const { error } = await supabase
  .from('rfqs')
  .insert({
    ...data,
    ...clientInfo,
    quantity: data.quantity ? parseInt(data.quantity) : null
  }, { returning: 'minimal' })  // ← 关键：添加 returning: 'minimal'
```

**作用**：即便anon无SELECT权限也能插入成功（PostgREST不再尝试回查新行）

#### 修改文件：`src/components/features/FinalCTA.tsx`

```typescript
// Line 264-273
const { error } = await supabase.from('rfqs').insert([
  {
    name: formData.name,
    company: formData.company,
    email: formData.email,
    phone: formData.phone || null,
    message: formData.requirements,
    status: 'new',
    source: 'homepage_cta'
  }
], { returning: 'minimal' })  // ← 关键：添加 returning: 'minimal'
```

### 2. 数据库RLS策略修复 ✅

#### 执行SQL文件：`database/seed/secure-rfq-rls.sql`

**在Supabase SQL Editor中执行此文件**

#### SQL脚本关键点：

1. **清空所有现有策略和授权**
   ```sql
   -- 删除所有策略
   DROP POLICY IF EXISTS ... ON public.rfqs;
   
   -- 撤销所有授权（包括PUBLIC）
   REVOKE ALL ON public.rfqs FROM anon;
   REVOKE ALL ON public.rfqs FROM authenticated;
   REVOKE ALL ON public.rfqs FROM service_role;
   REVOKE ALL ON public.rfqs FROM PUBLIC;
   ```

2. **只授予必要的表级权限**
   ```sql
   -- anon: 只能INSERT，不能SELECT
   GRANT INSERT ON public.rfqs TO anon;
   
   -- authenticated: 完整权限
   GRANT SELECT, INSERT, UPDATE, DELETE ON public.rfqs TO authenticated;
   
   -- service_role: 完整权限
   GRANT ALL ON public.rfqs TO service_role;
   ```

3. **启用RLS（NORMAL模式）**
   ```sql
   ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.rfqs NO FORCE ROW LEVEL SECURITY;
   ```

4. **创建最小化策略**
   ```sql
   -- anon只能INSERT
   CREATE POLICY "anon_can_insert_rfq"
       ON public.rfqs
       FOR INSERT
       TO anon
       WITH CHECK (true);
   
   -- authenticated可以SELECT/UPDATE/DELETE
   CREATE POLICY "authenticated_can_select_rfq"
       ON public.rfqs
       FOR SELECT
       TO authenticated
       USING (true);
   
   -- ... 其他authenticated策略
   
   -- service_role全部权限
   CREATE POLICY "service_role_all_rfq"
       ON public.rfqs
       FOR ALL
       TO service_role
       USING (true)
       WITH CHECK (true);
   ```

## 验证步骤

### 1. 执行SQL脚本

在Supabase SQL Editor中执行：
```
aierxuan-website/database/seed/secure-rfq-rls.sql
```

### 2. 运行自动化测试

```bash
cd aierxuan-website
node scripts/test-rfq-rls-complete.js
```

**预期结果**：
```
✅ anon cannot SELECT
✅ anon can INSERT
✅ service_role can SELECT
✅ Security isolation

4/4 tests passed
🎉 All tests passed! RFQ RLS is correctly configured.
```

### 3. 手动测试表单提交

1. 访问 http://localhost:3001
2. 滚动到底部的RFQ表单
3. 填写表单并提交
4. 应该成功跳转到 `/thank-you` 页面

或者访问：
- http://localhost:3001/contact

### 4. 验证数据库状态

在Supabase SQL Editor中执行：

```sql
-- 查看策略
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename='rfqs' 
ORDER BY policyname;

-- 查看授权
SELECT grantee, privilege_type 
FROM information_schema.table_privileges 
WHERE table_name='rfqs' 
ORDER BY grantee, privilege_type;

-- 查看RLS状态
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename='rfqs';
```

**预期结果**：
- 策略：anon只有INSERT策略，没有SELECT策略
- 授权：anon只有INSERT权限，没有SELECT权限
- RLS：rowsecurity = true

## 常见陷阱

### ❌ 不要执行这些旧脚本

- `completely-reset-rfq-rls.sql` - 包含`anon_can_select`，会放开匿名读取
- 任何包含`GRANT SELECT ON rfqs TO anon`的脚本

### ❌ 不要授予序列权限

```sql
-- ❌ 错误：rfqs使用UUID主键，不存在序列
GRANT USAGE ON SEQUENCE rfqs_id_seq TO anon;
```

rfqs表使用`UUID`主键，带有`DEFAULT gen_random_uuid()`，不需要序列权限。

### ⚠️ 注意RLS的ENABLE/DISABLE状态

- 如果`RLS DISABLE`，表级授权会直接生效
- 如果`RLS ENABLE`，需要同时满足授权和策略
- 使用`NORMAL`模式，不要用`FORCE`模式

## 安全检查清单

- [ ] anon用户**不能**SELECT rfqs（`SELECT count = 0`）
- [ ] anon用户**可以**INSERT rfqs（表单提交成功）
- [ ] authenticated用户**可以**SELECT rfqs（Admin Dashboard显示数据）
- [ ] service_role**可以**SELECT rfqs（统计数据正确）
- [ ] 前端所有RFQ插入都使用`returning: 'minimal'`
- [ ] RLS状态为`ENABLE`且模式为`NORMAL`

## 后续建议

### 1. 风控措施

为RFQ API增加基础风控：
- 频率限制（每IP每小时最多X次提交）
- 邮箱验证（防止垃圾邮件）
- 每日提交上限
- IP黑名单

### 2. 监控告警

- 监控RFQ提交失败率
- 监控异常提交模式
- 设置Supabase日志告警

### 3. 文档维护

- 将`secure-rfq-rls.sql`纳入一键初始化流程
- 在`docs/TEST_PLAN.md`中添加RFQ安全测试
- 更新部署文档

### 4. 可选增强

如果需要anon插入后获取ID，可以：
```typescript
// 在客户端生成UUID
import { v4 as uuidv4 } from 'uuid'

const rfqId = uuidv4()
const { error } = await supabase
  .from('rfqs')
  .insert({ 
    id: rfqId,  // 显式指定ID
    ...data 
  }, { returning: 'minimal' })

// 无需SELECT权限也能知道ID
console.log('RFQ ID:', rfqId)
```

## 技术细节

### PostgREST返回模式

- `returning: 'minimal'` - 只返回成功/失败，不返回数据（不需要SELECT权限）
- `returning: 'representation'` - 返回插入的数据（需要SELECT权限）- **默认值**

### RLS策略类型

- `PERMISSIVE` - 宽松策略，满足任一策略即可（默认）
- `RESTRICTIVE` - 限制策略，必须满足所有策略

### 权限层级

1. **表级授权**（GRANT/REVOKE）- 第一层检查
2. **RLS策略**（POLICY）- 第二层检查（仅当RLS启用时）
3. **service_role** - 绕过RLS（特殊角色）

## 测试覆盖

| 测试场景 | 测试脚本 | 状态 |
|---------|---------|------|
| anon不能SELECT | `test-rfq-rls-complete.js` | ✅ |
| anon可以INSERT | `test-rfq-rls-complete.js` | ✅ |
| service_role可以SELECT | `test-rfq-rls-complete.js` | ✅ |
| 表单提交成功 | 手动测试 | ✅ |
| Admin Dashboard统计 | `test-admin-dashboard-stats.js` | ✅ |

## 相关文件

- `src/components/forms/RFQForm.tsx` - 主要RFQ表单
- `src/components/features/FinalCTA.tsx` - 首页CTA表单
- `database/seed/secure-rfq-rls.sql` - RLS安全配置
- `scripts/test-rfq-rls-complete.js` - 完整测试脚本
- `scripts/test-admin-dashboard-stats.js` - Dashboard统计测试

## 总结

通过以下两个关键修复，我们实现了安全且功能完整的RFQ系统：

1. **前端**：使用`returning: 'minimal'`避免需要SELECT权限
2. **后端**：RLS策略只允许anon INSERT，禁止SELECT

这样既保护了用户隐私（anon无法读取其他人的询价），又保证了功能正常（anon可以提交询价）。

