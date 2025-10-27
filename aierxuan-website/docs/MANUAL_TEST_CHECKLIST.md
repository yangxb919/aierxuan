# Manual Test Checklist

## 测试环境
- URL: http://localhost:3001
- Browser: Chrome/Safari/Firefox
- 测试日期: 2025-10-15

---

## 1. RFQ表单提交测试 (Critical) 🔴

### 测试步骤

#### 方法1: 首页CTA表单
1. [ ] 访问 http://localhost:3001
2. [ ] 滚动到页面底部
3. [ ] 找到 "Get Your Custom Quote Today" 表单
4. [ ] 填写以下信息：
   - Name: `Test User Manual`
   - Company: `Test Company`
   - Email: `test-manual@example.com`
   - Phone: `+1 555 123 4567`
   - Requirements: `Testing RFQ form submission after security fix`
5. [ ] 点击 "Get Quote" 按钮
6. [ ] **预期结果**: 
   - ✅ 表单提交成功
   - ✅ 页面跳转到 `/thank-you`
   - ✅ 显示感谢消息

#### 方法2: 联系页面表单
1. [ ] 访问 http://localhost:3001/contact
2. [ ] 填写完整的RFQ表单
3. [ ] 点击提交
4. [ ] **预期结果**: 同上

### 验证数据保存
```bash
# 在终端运行
node -e "
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('rfqs')
    .select('*')
    .eq('email', 'test-manual@example.com')
    .order('created_at', { ascending: false })
    .limit(1);
  
  if (error) {
    console.log('❌ Error:', error.message);
  } else if (data && data.length > 0) {
    console.log('✅ RFQ found in database:');
    console.log('   Name:', data[0].name);
    console.log('   Email:', data[0].email);
    console.log('   Company:', data[0].company);
    console.log('   Status:', data[0].status);
    console.log('   Created:', data[0].created_at);
  } else {
    console.log('❌ RFQ not found');
  }
})();
"
```

---

## 2. 产品页面测试 (High) 🟠

### 测试步骤
1. [ ] 访问 http://localhost:3001/products
2. [ ] **检查产品列表**:
   - [ ] 显示5个产品卡片
   - [ ] 每个卡片有标题
   - [ ] 每个卡片有描述
   - [ ] 每个卡片有图片
   - [ ] 每个卡片有"View Details"和"Quote"按钮
3. [ ] **测试语言切换**:
   - [ ] 点击右上角语言按钮 (🇺🇸 EN)
   - [ ] 选择 🇨🇳 中文
   - [ ] 页面切换到中文
   - [ ] 导航菜单变成中文
   - [ ] 页面标题变成中文
4. [ ] **检查控制台**:
   - [ ] 打开浏览器开发者工具 (F12)
   - [ ] 切换到 Console 标签
   - [ ] **预期**: 没有红色错误

### 预期结果
- ✅ 所有产品正常显示
- ✅ 语言切换正常工作
- ✅ 无控制台错误

---

## 3. Admin登录测试 (High) 🟠

### 测试步骤
1. [ ] 访问 http://localhost:3001/admin
2. [ ] 应该自动跳转到 `/admin/login`
3. [ ] 填写登录信息：
   - Email: `admin@aierxuan.com`
   - Password: `admin123`
4. [ ] 点击 "Sign in"
5. [ ] **预期结果**:
   - ✅ 登录成功
   - ✅ 跳转到 `/admin` (Dashboard)
   - ✅ 显示统计数据

### Dashboard检查
1. [ ] **检查统计卡片**:
   - [ ] Total RFQs: 应该显示数字 (>0)
   - [ ] New RFQs: 应该显示数字
   - [ ] Total Products: 应该显示 5
   - [ ] Active Products: 应该显示 5
2. [ ] **检查侧边栏**:
   - [ ] Dashboard 链接
   - [ ] RFQs 链接
   - [ ] Products 链接
   - [ ] Blog 链接
   - [ ] FAQs 链接

---

## 4. Admin退出登录测试 (High) 🟠

### 测试步骤
1. [ ] 在Admin Dashboard页面
2. [ ] 点击右上角用户菜单
3. [ ] 点击 "Logout"
4. [ ] **预期结果**:
   - ✅ 退出成功
   - ✅ 跳转到 `/admin/login`
5. [ ] 尝试访问 http://localhost:3001/admin
6. [ ] **预期结果**:
   - ✅ 自动跳转到 `/admin/login`
   - ✅ 无法访问Dashboard

---

## 5. RFQ管理测试 (Medium) 🟡

### 测试步骤
1. [ ] 登录Admin
2. [ ] 点击侧边栏 "RFQs"
3. [ ] **检查RFQ列表**:
   - [ ] 显示所有RFQs
   - [ ] 包含刚才提交的测试RFQ
   - [ ] 每行显示: Name, Email, Company, Status, Date
4. [ ] **测试筛选**:
   - [ ] 按状态筛选 (New/In Progress/Completed)
   - [ ] 搜索功能
5. [ ] **测试详情**:
   - [ ] 点击某个RFQ
   - [ ] 查看完整信息
   - [ ] 可以更新状态

---

## 6. 产品管理测试 (Medium) 🟡

### 测试步骤
1. [ ] 登录Admin
2. [ ] 点击侧边栏 "Products"
3. [ ] **检查产品列表**:
   - [ ] 显示5个产品
   - [ ] 每行显示: Title, Category, Status, Featured
4. [ ] **测试编辑**:
   - [ ] 点击某个产品的编辑按钮
   - [ ] 修改标题或描述
   - [ ] 保存
   - [ ] 验证修改成功

---

## 7. 响应式设计测试 (Low) 🟢

### 测试步骤
1. [ ] **桌面视图** (>1024px):
   - [ ] 访问首页
   - [ ] 检查布局正常
2. [ ] **平板视图** (768px-1024px):
   - [ ] 调整浏览器窗口大小
   - [ ] 检查布局适配
3. [ ] **移动视图** (<768px):
   - [ ] 调整到手机尺寸
   - [ ] 检查汉堡菜单
   - [ ] 检查表单可用性

---

## 8. 性能测试 (Low) 🟢

### 测试步骤
1. [ ] 打开浏览器开发者工具
2. [ ] 切换到 Network 标签
3. [ ] 刷新首页
4. [ ] **检查**:
   - [ ] 页面加载时间 < 3秒
   - [ ] 没有404错误
   - [ ] 没有500错误
5. [ ] 切换到 Lighthouse 标签
6. [ ] 运行性能测试
7. [ ] **预期**:
   - [ ] Performance > 70
   - [ ] Accessibility > 80
   - [ ] Best Practices > 80

---

## 9. SEO基础测试 (Low) 🟢

### 测试步骤
1. [ ] 访问首页
2. [ ] 右键 → 查看页面源代码
3. [ ] **检查**:
   - [ ] `<title>` 标签存在
   - [ ] `<meta name="description">` 存在
   - [ ] `<meta property="og:*">` 存在 (Open Graph)
   - [ ] 结构化数据 (JSON-LD) 存在

---

## 10. 错误处理测试 (Low) 🟢

### 测试步骤
1. [ ] **404页面**:
   - [ ] 访问 http://localhost:3001/nonexistent
   - [ ] 应该显示404页面
2. [ ] **表单验证**:
   - [ ] 尝试提交空的RFQ表单
   - [ ] 应该显示验证错误
3. [ ] **无效登录**:
   - [ ] 使用错误密码登录
   - [ ] 应该显示错误消息

---

## 测试结果汇总

### Critical Tests (必须通过)
- [ ] RFQ表单提交
- [ ] Admin登录
- [ ] Admin退出登录

### High Priority Tests (强烈建议)
- [ ] 产品页面显示
- [ ] Dashboard统计
- [ ] RFQ管理

### Medium Priority Tests (建议)
- [ ] 产品管理
- [ ] 语言切换
- [ ] 响应式设计

### Low Priority Tests (可选)
- [ ] 性能测试
- [ ] SEO测试
- [ ] 错误处理

---

## 问题记录

| # | 问题描述 | 严重程度 | 状态 | 备注 |
|---|---------|---------|------|------|
| 1 |         |         |      |      |
| 2 |         |         |      |      |
| 3 |         |         |      |      |

---

## 测试签名

- 测试人员: _______________
- 测试日期: _______________
- 测试环境: _______________
- 总体评价: [ ] 通过 [ ] 有问题 [ ] 失败

---

## 快速测试命令

```bash
# 启动开发服务器
npm run dev

# 运行自动化测试
node scripts/test-full-login-flow.js
node scripts/test-rfq-rls-complete.js
node scripts/test-session-validation.js
node scripts/test-admin-dashboard-stats.js

# 检查数据库
node scripts/verify-latest-rfq.js
```

