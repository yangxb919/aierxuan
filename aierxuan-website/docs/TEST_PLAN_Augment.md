# AIERXUAN 网站可执行测试计划（提供给 Cursor 执行）

本测试计划旨在让 AI（如 augment）按步骤自动验证网站核心功能是否可正常使用。步骤覆盖环境准备、数据库初始化、服务启动、接口与页面验收、后台登录与基础管理功能验证，以及常见问题排查。请严格按顺序执行。

## 0. 前置条件
- 已有可用的 Supabase 项目（获取 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`）。
- Node.js 版本 ≥ 18（Next.js 15 + React 19 需要）。
- 本地端口 `3000` 可用。

## 1. 环境配置
1) 进入项目目录并安装依赖：
```bash
cd aierxuan-website
npm ci
```

2) 配置环境变量（复制示例文件并填写 Supabase 信息）：
```bash
cp .env.example .env.local
```
编辑 `.env.local`，填入：
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- 其他可选：`NEXT_PUBLIC_SITE_URL`、`NEXT_PUBLIC_SITE_NAME` 等。

3) 快速校验环境变量是否生效：
```bash
rg -n "NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_SERVICE_ROLE_KEY" .env.local
```

## 2. 初始化数据库（在 Supabase SQL Editor 中执行）
按顺序运行以下 SQL 文件内容（文件路径均在仓库内，可复制到 Supabase SQL Editor 执行）：
1) 基础表结构：`database/supabase-schema.sql`
2) 管理员会话与校验函数：`database/seed/create-admin-sessions-table.sql`
3) RFQ 询盘表与策略：`database/seed/create-rfq-table.sql`
4) 会话校验 RPC（任选其一执行）：
   - `database/seed/EXECUTE_THIS_SQL.sql`
   - 或 `database/seed/create-validate-session-function.sql`
5) 示例数据：`database/seed/initial-data.sql`

执行成功后，使用脚本设置默认管理员密码：
```bash
node scripts/setup-admin-password.js
```
预期输出包含：`admin@aierxuan.com / admin123`、`editor@aierxuan.com / editor123` 设置成功与哈希校验通过。

常见问题：若后台登录相关接口报错，极可能是第4步 `validate_admin_session` 函数未创建。请回到第4步执行对应 SQL。

## 3. 启动开发服务
在一个终端启动服务（保持运行）：
```bash
npm run dev
```
等待 `http://localhost:3000` 可访问。

可在另一个终端中用 `curl` 做健康检查：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
# 预期：200
```

## 4. 后台登录全流程测试
执行内置脚本验证登录、获取用户信息、访问后台、退出登录与校验：
```bash
node scripts/test-full-login-flow.js
```
预期在控制台看到各步骤均 `✅`，并显示 `Admin authentication system is fully functional!`。

若失败，首先检查：
- `.env.local` Supabase 变量是否正确；
- 第2节 SQL 是否按顺序执行；
- `validate_admin_session` 是否存在；
- `admin_users`、`admin_sessions` 是否存在且数据正确。

## 5. 管理功能验证（脚本可执行）
以下测试脚本依赖第4节已能成功登录（脚本内部会自行登录并带 Cookie 调用页面与 API）：

- 产品管理基础检查：
```bash
node scripts/test-product-management.js
```
- 博客管理基础检查：
```bash
node scripts/test-blog-management.js
```
- FAQ 管理基础检查：
```bash
node scripts/test-faq-management.js
```
- RFQ 管理基础检查：
```bash
node scripts/test-rfq-management.js
```
- 会话校验 RPC 检查：
```bash
node scripts/test-session-validation.js
```

预期：脚本输出包含页面可访问、数据可读写、状态码正确等 “✅” 提示。

## 6. 核心页面与接口冒烟测试（可用 curl 执行）
注意：部分页面为客户端渲染，`curl` 仅能验证状态码与静态片段，不代表前端数据是否加载完全。

- 首页：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```
- 产品列表页（客户端渲染为主）：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/products
```
- 博客列表页（客户端渲染为主）：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/blog
```
- 单篇博客（示例 slug，源自种子数据）：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/blog/choosing-right-business-laptop
```
- FAQ（若有对应页面，可替换验证路径）：
```bash
# 如存在 /faq 页面：
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/faq || true
```
- 联系页（含 RFQ 表单组件）：
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/contact
```

## 7. 后台 API 验证（使用 curl + Cookie）
使用 `curl` 直连接口并持久化 Cookie，验证后台 API 可用：

1) 登录，保存 Cookie 到 `cookies.txt`：
```bash
curl -i -c cookies.txt -H 'Content-Type: application/json' \
  -d '{"email":"admin@aierxuan.com","password":"admin123"}' \
  http://localhost:3000/api/admin/login
```

2) 获取当前用户信息（应返回 200 且包含用户信息）：
```bash
curl -b cookies.txt http://localhost:3000/api/admin/me
```

3) 创建博客文章（注意：slug 需唯一；status 允许 draft/published/archived）：
```bash
curl -i -b cookies.txt -H 'Content-Type: application/json' \
  -d '{
        "slug":"test-post-$(date +%s)",
        "status":"draft",
        "published_at":null,
        "cover_image":null,
        "translations":[
          {"locale":"en","title":"Test Post","excerpt":"ex","body":"# Hello","meta_description":"md"}
        ]
      }' \
  http://localhost:3000/api/admin/blog
```

4) 创建产品（status 允许 active/inactive/discontinued）：
```bash
curl -i -b cookies.txt -H 'Content-Type: application/json' \
  -d '{
        "slug":"test-product-$(date +%s)",
        "category":"laptop",
        "status":"active",
        "featured":false,
        "sort_order":0,
        "images":[],
        "translations":[
          {"locale":"en","title":"Test Product","short_desc":"s","long_desc":"desc","key_specs":{},"seo_title":"st","seo_desc":"sd"}
        ]
      }' \
  http://localhost:3000/api/admin/products
```

5) 创建 FAQ：
```bash
curl -i -b cookies.txt -H 'Content-Type: application/json' \
  -d '{
        "category":"product",
        "sort_order":0,
        "is_active":true,
        "translations":[
          {"locale":"en","question":"Q?","answer":"A."}
        ]
      }' \
  http://localhost:3000/api/admin/faq
```

6) 文件上传（支持 image/jpeg/png/gif/webp，默认归类到 blog）：
```bash
# 准备一张本地测试图片，替换 /path/to/image.jpg
curl -i -b cookies.txt -F "file=@/path/to/image.jpg" -F "type=blog" \
  http://localhost:3000/api/admin/upload
```

7) 退出登录并验证：
```bash
curl -i -b cookies.txt -X POST http://localhost:3000/api/admin/logout
curl -i -b cookies.txt http://localhost:3000/api/admin/me  # 预期 401 或无用户信息
```

## 8. RFQ 表单与数据验证
前端 RFQ 表单为公开插入（RLS 允许 anon 插入），但命令行无法直接触发表单提交流程。可用以下两种方式验证：

- 使用脚本插入并检查（服务角色插入，验证表结构与读写链路）：
```bash
node scripts/create-test-rfq.js
node scripts/check-rfq-structure.js
```
- 登录后台后，访问 `http://localhost:3000/admin/rfqs`（脚本中已做页面可访问性检查），或人工浏览器查看。

## 9. 通过 Supabase 直接抽样校验
脚本均已内置 Supabase 校验，如需手动抽查，可用 `scripts/check-database-tables.js`、`scripts/check-blog-tables.js` 等进一步验证：
```bash
node scripts/check-database-tables.js
node scripts/check-blog-tables.js
```

## 10. 通过页面做额外人工/视觉校验（可选）
- `http://localhost:3000/` 首页视觉与核心区块是否展示。
- `http://localhost:3000/products` 产品卡片是否渲染（依赖 Supabase 数据）。
- `http://localhost:3000/blog` 博客卡片是否渲染（依赖 Supabase 数据）。
- `http://localhost:3000/contact` RFQ 表单组件是否渲染。
- `http://localhost:3000/admin` 后台仪表盘统计是否展示（需已登录）。

## 11. 常见问题与修复建议
- 后台接口返回 401：
  - 未登录或 Cookie 未带上；
  - `validate_admin_session` 未创建；
  - `.env.local` 中 Supabase 变量缺失或不正确。
- 创建博客/产品/FAQ 报 400：
  - 必填字段缺失（如博客/产品至少需要英文翻译的 title 与 body/long_desc）。
  - slug 重复（请改用唯一 slug）。
- 图片上传失败：
  - 非允许的图片 MIME 类型或超过 5MB；
  - `public/uploads` 目录写入权限问题（本地开发默认可写）。

## 12. 通过标准（判定说明）
- 第4节登录流程、以及第5节各管理脚本全部通过，且第6节页面/接口冒烟返回 200；
- 可成功创建至少 1 篇博客、1 个产品、1 条 FAQ，且上传图片返回 URL；
- RFQ 基础链路可用（能插入与读取记录）。

---
如需扩展自动化（例如加入 Playwright 做端到端 UI 测试），可在确保上述脚本全部通过后追加。
