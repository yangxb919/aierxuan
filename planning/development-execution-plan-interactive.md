# AIERXUAN MVP 开发执行文档（可交互版本）

> **使用说明**：点击每个任务前的复选框来标记完成状态，页面会自动计算整体进度。完成每个任务后，请记得回来更新此文档的勾选状态。

## 项目概述
- **项目名称**: AIERXUAN B2B网站 MVP
- **开发周期**: 15-20天
- **技术栈**: Next.js 14+ + Tailwind CSS + Supabase + TypeScript
- **核心目标**: 快速收集潜在客户询盘（Lead Generation）
- **整体进度**: <span id="overall-progress">0%</span> 已完成

---

## 开发阶段规划

### 阶段一：项目初始化与环境搭建（Day 1-2）
**阶段进度**: <span id="stage1-progress">0%</span> 已完成

#### 1.1 项目脚手架搭建
- <input type="checkbox" id="task-1-1-1" onchange="updateProgress()"> **1.1.1** 创建 Next.js 14+ 项目
  ```bash
  npx create-next-app@latest aierxuan-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```

- <input type="checkbox" id="task-1-1-2" onchange="updateProgress()"> **1.1.2** 进入项目目录并初始化
  ```bash
  cd aierxuan-website
  git init
  ```

- <input type="checkbox" id="task-1-1-3" onchange="updateProgress()"> **1.1.3** 安装核心依赖包
  ```bash
  # UI组件和样式
  npm install @headlessui/react @heroicons/react

  # 表单处理和验证
  npm install react-hook-form @hookform/resolvers zod

  # 状态管理
  npm install zustand

  # 数据库和API
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

  # 工具库
  npm install clsx tailwind-merge
  npm install -D @types/node
  ```

- <input type="checkbox" id="task-1-1-4" onchange="updateProgress()"> **1.1.4** 配置环境变量文件
  ```bash
  touch .env.local
  touch .env.example
  ```

- <input type="checkbox" id="task-1-1-5" onchange="updateProgress()"> **1.1.5** 设置Git配置和提交规范
  ```bash
  # .gitignore 检查
  # 配置 husky 和 lint-staged (可选)
  ```

#### 1.2 项目目录结构设置
- <input type="checkbox" id="task-1-2-1" onchange="updateProgress()"> **1.2.1** 创建核心目录结构
  ```
  aierxuan-website/
  ├── src/
  │   ├── app/                    # App Router 页面
  │   │   ├── [locale]/          # 多语言路由
  │   │   ├── api/               # API 路由
  │   │   └── admin/             # Admin 后台
  │   ├── components/            # 组件
  │   │   ├── ui/                # UI 基础组件
  │   │   ├── forms/             # 表单组件
  │   │   ├── layout/            # 布局组件
  │   │   └── features/          # 功能组件
  │   ├── lib/                   # 工具库
  │   │   ├── supabase.ts
  │   │   ├── utils.ts
  │   │   └── validations.ts
  │   ├── types/                 # 类型定义
  │   ├── store/                 # 状态管理
  │   └── styles/                # 样式文件
  ├── public/
  │   └── images/
  └── docs/                      # 项目文档
  ```

- <input type="checkbox" id="task-1-2-2" onchange="updateProgress()"> **1.2.2** 创建基础配置文件
  - [ ] `tailwind.config.js` - 配置Tailwind CSS
  - [ ] `next.config.js` - Next.js配置
  - [ ] `tsconfig.json` - TypeScript配置
  - [ ] `.eslintrc.json` - ESLint配置

- <input type="checkbox" id="task-1-2-3" onchange="updateProgress()"> **1.2.3** 设置ESLint和Prettier
  ```bash
  npm install -D prettier eslint-config-prettier
  touch .prettierrc
  ```

#### 1.3 Supabase环境配置
- <input type="checkbox" id="task-1-3-1" onchange="updateProgress()"> **1.3.1** 创建Supabase项目
  - 登录Supabase Dashboard
  - 创建新项目 "aierxuan-website"
  - 获取项目URL和API密钥

- <input type="checkbox" id="task-1-3-2" onchange="updateProgress()"> **1.3.2** 配置环境变量
  ```env
  # .env.local
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

- <input type="checkbox" id="task-1-3-3" onchange="updateProgress()"> **1.3.3** 安装和配置Supabase CLI (可选)
  ```bash
  npm install -g supabase
  supabase login
  ```

### 阶段二：数据库设计与建表（Day 2-3）
**阶段进度**: <span id="stage2-progress">0%</span> 已完成

#### 2.1 数据库表结构设计
- <input type="checkbox" id="task-2-1-1" onchange="updateProgress()"> **2.1.1** 创建数据库建表SQL脚本
  - 创建 `database/supabase-schema.sql` 文件
  - 包含所有表结构的SQL语句

- <input type="checkbox" id="task-2-1-2" onchange="updateProgress()"> **2.1.2** 核心表结构
  ```sql
  -- 多语言支持
  CREATE TABLE i18n_locales (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 管理员用户
  CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'editor',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 会话管理
  CREATE TABLE admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES admin_users(id),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 产品主表
  CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    images TEXT[],
    status VARCHAR(20) DEFAULT 'draft',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- 产品多语言
  CREATE TABLE product_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    locale VARCHAR(10) REFERENCES i18n_locales(code),
    title VARCHAR(255) NOT NULL,
    short_desc TEXT,
    key_specs JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 博客文章
  CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMP,
    cover_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- 博客多语言
  CREATE TABLE blog_post_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES blog_posts(id),
    locale VARCHAR(10) REFERENCES i18n_locales(code),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    body_md TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- RFQ询盘
  CREATE TABLE rfq_min (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    requirements TEXT,
    locale VARCHAR(10) REFERENCES i18n_locales(code),
    source_page VARCHAR(255),
    status VARCHAR(20) DEFAULT 'new',
    assignee UUID REFERENCES admin_users(id),
    internal_notes TEXT,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- FAQ
  CREATE TABLE faq (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- FAQ多语言
  CREATE TABLE faq_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faq_id UUID REFERENCES faq(id),
    locale VARCHAR(10) REFERENCES i18n_locales(code),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

- <input type="checkbox" id="task-2-1-3" onchange="updateProgress()"> **2.1.3** 在Supabase中执行建表脚本
  - 登录Supabase Dashboard
  - 在SQL Editor中执行建表语句

#### 2.2 初始数据设置
- <input type="checkbox" id="task-2-2-1" onchange="updateProgress()"> **2.2.1** 插入初始语言数据
  ```sql
  INSERT INTO i18n_locales (code, name) VALUES
  ('zh-CN', '简体中文'),
  ('en', 'English'),
  ('ru', 'Русский'),
  ('ja', '日本語'),
  ('fr', 'Français'),
  ('pt', 'Português');
  ```

- <input type="checkbox" id="task-2-2-2" onchange="updateProgress()"> **2.2.2** 创建默认管理员用户
  ```sql
  -- 注意：实际部署时需要加密密码
  INSERT INTO admin_users (email, password_hash, role) VALUES
  ('admin@aierxuan.com', 'encrypted_password_hash', 'admin');
  ```

### 阶段三：核心页面开发（Day 4-6）
**阶段进度**: <span id="stage3-progress">0%</span> 已完成

#### 3.1 多语言路由配置
- <input type="checkbox" id="task-3-1-1" onchange="updateProgress()"> **3.1.1** 创建多语言中间件
  - 创建 `middleware.ts` 文件
  - 配置语言检测和重定向逻辑

- <input type="checkbox" id="task-3-1-2" onchange="updateProgress()"> **3.1.2** 创建国际化配置
  - 创建 `lib/i18n.ts` 配置文件
  - 设置支持的语言列表和默认语言

- <input type="checkbox" id="task-3-1-3" onchange="updateProgress()"> **3.1.3** 创建语言切换组件
  - 创建 `components/ui/language-switcher.tsx`
  - 实现语言切换功能

#### 3.2 基础布局组件
- <input type="checkbox" id="task-3-2-1" onchange="updateProgress()"> **3.2.1** 创建根布局 `app/layout.tsx`
  ```tsx
  // 基础HTML结构
  // 字体和样式配置
  // 语言元标签
  ```

- <input type="checkbox" id="task-3-2-2" onchange="updateProgress()"> **3.2.2** 创建多语言布局 `app/[locale]/layout.tsx`
  ```tsx
  // 多语言上下文提供者
  // Header组件
  // Footer组件
  ```

- <input type="checkbox" id="task-3-2-3" onchange="updateProgress()"> **3.2.3** 开发Header组件
  ```tsx
  // Logo和导航菜单
  // 语言切换器
  // CTA按钮
  // 响应式菜单
  ```

- <input type="checkbox" id="task-3-2-4" onchange="updateProgress()"> **3.2.4** 开发Footer组件
  ```tsx
  // 公司信息
  // 快速链接
  // 联系方式
  // 社交媒体
  ```

#### 3.3 首页开发
- <input type="checkbox" id="task-3-3-1" onchange="updateProgress()"> **3.3.1** 创建首页 `app/[locale]/page.tsx`
  - 设置页面元数据
  - 配置SEO标签

- <input type="checkbox" id="task-3-3-2" onchange="updateProgress()"> **3.3.2** 开发Hero区域组件
  ```tsx
  // 主标题和副标题
  // CTA按钮
  // 背景图片/视频
  ```

- <input type="checkbox" id="task-3-3-3" onchange="updateProgress()"> **3.3.3** 开发产品展示组件
  ```tsx
  // 产品卡片网格
  // 产品图片展示
  // 基础产品信息
  // 快速询盘按钮
  ```

- <input type="checkbox" id="task-3-3-4" onchange="updateProgress()"> **3.3.4** 开发卖点组件
  ```tsx
  // 性能、稳定性、定制、OEM能力
  // 图标和文字说明
  ```

- <input type="checkbox" id="task-3-3-5" onchange="updateProgress()"> **3.3.5** 开发FAQ组件
  ```tsx
  // 常见问题列表
  // 折叠展开交互
  // 多语言内容支持
  ```

#### 3.4 产品页面开发
- <input type="checkbox" id="task-3-4-1" onchange="updateProgress()"> **3.4.1** 创建产品列表页 `app/[locale]/products/page.tsx`
  ```tsx
  // 产品网格布局
  // 筛选和排序功能
  // 分页组件
  ```

- <input type="checkbox" id="task-3-4-2" onchange="updateProgress()"> **3.4.2** 创建产品详情页 `app/[locale]/products/[slug]/page.tsx`
  ```tsx
  // 产品图片画廊
  // 详细规格表
  // 产品描述
  // RFQ询盘按钮
  ```

- <input type="checkbox" id="task-3-4-3" onchange="updateProgress()"> **3.4.3** 开发产品相关组件
  ```tsx
  // ProductCard组件
  // ProductGallery组件
  // SpecTable组件
  // RelatedProducts组件
  ```

#### 3.5 其他页面开发
- <input type="checkbox" id="task-3-5-1" onchange="updateProgress()"> **3.5.1** 创建关于我们页面 `app/[locale]/about/page.tsx`
  ```tsx
  // 公司简介
  // 资质证书
  // 发展历程
  ```

- <input type="checkbox" id="task-3-5-2" onchange="updateProgress()"> **3.5.2** 创建联系我们页面 `app/[locale]/contact/page.tsx`
  ```tsx
  // 联系方式展示
  // RFQ表单
  // 地图展示
  ```

- <input type="checkbox" id="task-3-5-3" onchange="updateProgress()"> **3.5.3** 创建感谢页面 `app/[locale]/thank-you/page.tsx`
  ```tsx
  // 提交成功提示
  // 后续步骤说明
  // 返回首页链接
  ```

### 阶段四：RFQ表单与交互（Day 7-8）
**阶段进度**: <span id="stage4-progress">0%</span> 已完成

#### 4.1 RFQ表单组件开发
- <input type="checkbox" id="task-4-1-1" onchange="updateProgress()"> **4.1.1** 创建表单验证schema
  ```typescript
  // lib/validations.ts
  import { z } from 'zod';

  export const rfqSchema = z.object({
    name: z.string().min(2, '姓名至少2个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
    company: z.string().optional(),
    requirements: z.string().min(10, '需求描述至少10个字符'),
    product_interest: z.string().optional(),
    quantity: z.string().optional(),
  });
  ```

- <input type="checkbox" id="task-4-1-2" onchange="updateProgress()"> **4.1.2** 开发RFQ表单组件
  ```tsx
  // components/forms/rfq-form.tsx
  // 表单字段
  // 实时验证
  // 提交状态
  // 错误处理
  ```

- <input type="checkbox" id="task-4-1-3" onchange="updateProgress()"> **4.1.3** 开发表单弹窗组件
  ```tsx
  // components/forms/rfq-modal.tsx
  // 弹窗显示/隐藏
  // 表单集成
  // 成功/错误状态
  ```

#### 4.2 后端API开发
- <input type="checkbox" id="task-4-2-1" onchange="updateProgress()"> **4.2.1** 创建RFQ提交API
  ```typescript
  // app/api/rfq/route.ts
  // POST请求处理
  // 数据验证
  // 数据库存储
  // 邮件通知
  // 防刷检查
  ```

- <input type="checkbox" id="task-4-2-2" onchange="updateProgress()"> **4.2.2** 实现防刷机制
  ```typescript
  // 基于IP的速率限制
  // 基于邮箱的时间窗口限制
  // reCAPTCHA集成（可选）
  ```

- <input type="checkbox" id="task-4-2-3" onchange="updateProgress()"> **4.2.3** 邮件通知系统
  ```typescript
  // 使用Supabase Edge Functions
  // 或集成第三方邮件服务
  // 邮件模板设计
  ```

#### 4.3 数据获取和状态管理
- <input type="checkbox" id="task-4-3-1" onchange="updateProgress()"> **4.3.1** 创建产品数据API
  ```typescript
  // app/api/products/route.ts
  // 获取产品列表
  // 获取单个产品
  // 多语言支持
  ```

- <input type="checkbox" id="task-4-3-2" onchange="updateProgress()"> **4.3.2** 设置状态管理
  ```typescript
  // store/use-product-store.ts
  // store/use-rfq-store.ts
  // store/use-language-store.ts
  ```

### 阶段五：内容管理模块（Day 9-10）
**阶段进度**: <span id="stage5-progress">0%</span> 已完成

#### 5.1 博客系统开发
- <input type="checkbox" id="task-5-1-1" onchange="updateProgress()"> **5.1.1** 创建博客列表页 `app/[locale]/blog/page.tsx`
  ```tsx
  // 文章卡片列表
  // 分页功能
  // 分类筛选
  ```

- <input type="checkbox" id="task-5-1-2" onchange="updateProgress()"> **5.1.2** 创建博客详情页 `app/[locale]/blog/[slug]/page.tsx`
  ```tsx
  // 文章内容渲染
  // Markdown支持
  // 相关文章推荐
  ```

- <input type="checkbox" id="task-5-1-3" onchange="updateProgress()"> **5.1.3** 开发博客相关组件
  ```tsx
  // BlogCard组件
  // BlogContent组件
  // RelatedPosts组件
  ```

#### 5.2 FAQ系统完善
- <input type="checkbox" id="task-5-2-1" onchange="updateProgress()"> **5.2.1** 创建FAQ数据API
  ```typescript
  // app/api/faq/route.ts
  // 获取FAQ列表
  // 多语言支持
  ```

- <input type="checkbox" id="task-5-2-2" onchange="updateProgress()"> **5.2.2** 优化FAQ组件
  ```tsx
  // 搜索功能
  // 分类显示
  // 折叠动画
  ```

#### 5.3 内容数据初始化
- <input type="checkbox" id="task-5-3-1" onchange="updateProgress()"> **5.3.1** 准备示例产品数据
  - 3-5款产品信息
  - 多语言翻译
  - 产品图片

- <input type="checkbox" id="task-5-3-2" onchange="updateProgress()"> **5.3.2** 准备示例博客内容
  - 2-3篇博客文章
  - 多语言版本

- <input type="checkbox" id="task-5-3-3" onchange="updateProgress()"> **5.3.3** 准备FAQ内容
  - 常见问题列表
  - 多语言翻译

### 阶段六：Admin后台开发（Day 11-14）
**阶段进度**: <span id="stage6-progress">0%</span> 已完成

#### 6.1 认证系统
- <input type="checkbox" id="task-6-1-1" onchange="updateProgress()"> **6.1.1** 创建登录页面 `app/admin/login/page.tsx`
  ```tsx
  // 登录表单
  // 密码验证
  // 错误处理
  // 会话管理
  ```

- <input type="checkbox" id="task-6-1-2" onchange="updateProgress()"> **6.1.2** 创建认证中间件
  ```typescript
  // middleware.ts
  // Admin路由保护
  // 会话验证
  ```

- <input type="checkbox" id="task-6-1-3" onchange="updateProgress()"> **6.1.3** 开发认证API
  ```typescript
  // app/api/admin/login/route.ts
  // app/api/admin/logout/route.ts
  // app/api/admin/me/route.ts
  ```

#### 6.2 Admin布局和导航
- <input type="checkbox" id="task-6-2-1" onchange="updateProgress()"> **6.2.1** 创建Admin布局 `app/admin/layout.tsx`
  ```tsx
  // 侧边栏导航
  // 顶部导航栏
  // 用户信息显示
  ```

- <input type="checkbox" id="task-6-2-2" onchange="updateProgress()"> **6.2.2** 开发Dashboard页面 `app/admin/page.tsx`
  ```tsx
  // 统计数据展示
  // 最近RFQ列表
  // 快速操作入口
  ```

#### 6.3 RFQ管理功能
- <input type="checkbox" id="task-6-3-1" onchange="updateProgress()"> **6.3.1** 创建RFQ列表页 `app/admin/rfqs/page.tsx`
  ```tsx
  // RFQ列表表格
  // 筛选和搜索
  // 状态标记
  // 批量操作
  ```

- <input type="checkbox" id="task-6-3-2" onchange="updateProgress()"> **6.3.2** 创建RFQ详情页 `app/admin/rfqs/[id]/page.tsx`
  ```tsx
  // RFQ详细信息
  // 状态更新
  // 内部备注
  // 邮件回复
  ```

- <input type="checkbox" id="task-6-3-3" onchange="updateProgress()"> **6.3.3** 开发RFQ相关API
  ```typescript
  // app/api/admin/rfqs/route.ts
  // app/api/admin/rfqs/[id]/route.ts
  // app/api/admin/rfqs/export/route.ts
  ```

#### 6.4 内容管理功能
- <input type="checkbox" id="task-6-4-1" onchange="updateProgress()"> **6.4.1** 博客管理
  ```tsx
  // app/admin/blog/page.tsx - 博客列表
  // app/admin/blog/new/page.tsx - 新建博客
  // app/admin/blog/[id]/page.tsx - 编辑博客
  ```

- <input type="checkbox" id="task-6-4-2" onchange="updateProgress()"> **6.4.2** 产品管理
  ```tsx
  // app/admin/products/page.tsx - 产品列表
  // app/admin/products/new/page.tsx - 新建产品
  // app/admin/products/[id]/page.tsx - 编辑产品
  ```

- <input type="checkbox" id="task-6-4-3" onchange="updateProgress()"> **6.4.3** 内容管理API
  ```typescript
  // 博客CRUD API
  // 产品CRUD API
  // 图片上传API
  ```

#### 6.5 权限控制和用户管理
- <input type="checkbox" id="task-6-5-1" onchange="updateProgress()"> **6.5.1** 实现角色权限系统
  ```typescript
  // 权限检查中间件
  // 角色权限矩阵
  // 组件级权限控制
  ```

- <input type="checkbox" id="task-6-5-2" onchange="updateProgress()"> **6.5.2** 用户管理功能（可选）
  ```tsx
  // 用户列表
  // 用户创建/编辑
  // 权限分配
  ```

### 阶段七：多语言化完善（Day 15）
**阶段进度**: <span id="stage7-progress">0%</span> 已完成

#### 7.1 语言检测和切换
- <input type="checkbox" id="task-7-1-1" onchange="updateProgress()"> **7.1.1** 完善多语言中间件
  ```typescript
  // 浏览器语言检测
  // URL语言参数处理
  // 默认语言回退
  ```

- <input type="checkbox" id="task-7-1-2" onchange="updateProgress()"> **7.1.2** 优化语言切换体验
  ```tsx
  // 无刷新语言切换
  // 语言状态保持
  // URL更新
  ```

#### 7.2 SEO优化
- <input type="checkbox" id="task-7-2-1" onchange="updateProgress()"> **7.2.1** 配置多语言SEO标签
  ```tsx
  // hreflang标签
  // canonical URL
  // 多语言meta标签
  ```

- <input type="checkbox" id="task-7-2-2" onchange="updateProgress()"> **7.2.2** 生成sitemap
  ```typescript
  // 多语言sitemap
  // 动态页面包含
  ```

#### 7.3 内容本地化
- <input type="checkbox" id="task-7-3-1" onchange="updateProgress()"> **7.3.1** 检查多语言内容完整性
  - 所有页面的多语言版本
  - 产品信息的完整翻译
  - 博客内容的多语言支持

- <input type="checkbox" id="task-7-3-2" onchange="updateProgress()"> **7.3.2** 优化本地化体验
  ```tsx
  // 数字和日期格式
  // 货币显示（如需要）
  // 文化适应性调整
  ```

### 阶段八：性能与安全优化（Day 16）
**阶段进度**: <span id="stage8-progress">0%</span> 已完成

#### 8.1 性能优化
- <input type="checkbox" id="task-8-1-1" onchange="updateProgress()"> **8.1.1** 图片优化
  ```tsx
  // Next.js Image组件使用
  // WebP格式支持
  // 响应式图片
  // 懒加载
  ```

- <input type="checkbox" id="task-8-1-2" onchange="updateProgress()"> **8.1.2** 代码分割和懒加载
  ```typescript
  // 动态导入组件
  // 路由级代码分割
  // 第三方库按需加载
  ```

- <input type="checkbox" id="task-8-1-3" onchange="updateProgress()"> **8.1.3** 缓存策略
  ```typescript
  // 静态资源缓存
  // API响应缓存
  // 浏览器缓存优化
  ```

#### 8.2 安全加固
- <input type="checkbox" id="task-8-2-1" onchange="updateProgress()"> **8.2.1** 数据验证强化
  ```typescript
  // 前端表单验证
  // 后端API验证
  // XSS防护
  // SQL注入防护
  ```

- <input type="checkbox" id="task-8-2-2" onchange="updateProgress()"> **8.2.2** 安全头配置
  ```typescript
  // CSP策略
  // 安全相关HTTP头
  // HTTPS强制
  ```

- <input type="checkbox" id="task-8-2-3" onchange="updateProgress()"> **8.2.3** 权限验证
  ```typescript
  // API访问控制
  // 文件上传安全
  // 会话管理安全
  ```

#### 8.3 Core Web Vitals优化
- <input type="checkbox" id="task-8-3-1" onchange="updateProgress()"> **8.3.1** LCP优化
  ```tsx
  // 关键资源预加载
  // 图片优化
  // 字体加载优化
  ```

- <input type="checkbox" id="task-8-3-2" onchange="updateProgress()"> **8.3.2** FID优化
  ```typescript
  // JavaScript执行优化
  // 主线程阻塞减少
  // 交互响应速度
  ```

- <input type="checkbox" id="task-8-3-3" onchange="updateProgress()"> **8.3.3** CLS优化
  ```tsx
  // 布局稳定性
  // 尺寸预留
  // 字体闪烁避免
  ```

### 阶段九：测试与部署（Day 17-18）
**阶段进度**: <span id="stage9-progress">0%</span> 已完成

#### 9.1 测试
- <input type="checkbox" id="task-9-1-1" onchange="updateProgress()"> **9.1.1** 功能测试
  ```bash
  # 手动功能测试清单
  # RFQ表单提交测试
  # 多语言切换测试
  # Admin后台功能测试
  ```

- <input type="checkbox" id="task-9-1-2" onchange="updateProgress()"> **9.1.2** 兼容性测试
  ```bash
  # 多浏览器测试
  # 移动端测试
  # 响应式布局测试
  ```

- <input type="checkbox" id="task-9-1-3" onchange="updateProgress()"> **9.1.3** 性能测试
  ```bash
  # Google PageSpeed测试
  # Lighthouse性能测试
  # 负载测试
  ```

- <input type="checkbox" id="task-9-1-4" onchange="updateProgress()"> **9.1.4** 安全测试
  ```bash
  # 安全扫描
  # 渗透测试
  # 依赖漏洞检查
  ```

#### 9.2 部署准备
- <input type="checkbox" id="task-9-2-1" onchange="updateProgress()"> **9.2.1** 生产环境配置
  ```env
  # 生产环境变量配置
  # 数据库连接配置
  # 域名和SSL配置
  ```

- <input type="checkbox" id="task-9-2-2" onchange="updateProgress()"> **9.2.2** 构建优化
  ```bash
  # 生产构建测试
  npm run build

  # 构建产物检查
  # 错误日志检查
  ```

- <input type="checkbox" id="task-9-2-3" onchange="updateProgress()"> **9.2.3** 部署配置
  ```bash
  # Vercel/Netlify部署配置
  # 或自建服务器部署
  # CI/CD配置（可选）
  ```

#### 9.3 上线和监控
- <input type="checkbox" id="task-9-3-1" onchange="updateProgress()"> **9.3.1** 上线检查清单
  ```bash
  # DNS配置检查
  # SSL证书检查
  # 域名访问测试
  # 功能完整性检查
  ```

- <input type="checkbox" id="task-9-3-2" onchange="updateProgress()"> **9.3.2** 监控配置
  ```bash
  # 错误监控（Sentry）
  # 性能监控
  # 用户行为监控
  ```

- <input type="checkbox" id="task-9-3-3" onchange="updateProgress()"> **9.3.3** 备份和恢复
  ```bash
  # 数据库备份策略
  # 代码备份
  # 恢复流程文档
  ```

---

## 使用说明

### 如何使用此文档
1. **在浏览器中打开**：将此HTML文件在浏览器中打开
2. **点击复选框**：完成每个任务后，点击任务前的复选框
3. **查看进度**：页面顶部会自动计算并显示整体进度
4. **保存进度**：浏览器会自动保存您的勾选状态（localStorage）

### 进度统计
- **整体进度**：显示所有任务的完成百分比
- **阶段进度**：显示每个开发阶段的完成百分比
- **已完成任务**：勾选的任务会自动标记为完成

### 注意事项
- 每完成一个任务，请及时回来勾选对应的复选框
- 进度会自动保存，下次打开页面时会恢复
- 如果需要重置进度，可以清除浏览器localStorage
- 建议定期备份此文档以防止进度丢失

---

## 开发规范和最佳实践

### 代码规范
- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Prettier格式化代码
- 组件命名使用PascalCase
- 文件命名使用kebab-case

### Git提交规范
```bash
# 提交消息格式
<type>(<scope>): <subject>

# 类型说明
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建工具或辅助工具的变动
```

### 分支管理
```bash
main      # 主分支，生产环境代码
develop   # 开发分支
feature/* # 功能分支
hotfix/*  # 紧急修复分支
```

### 代码审查清单
- [ ] 代码符合团队规范
- [ ] 功能实现正确
- [ ] 性能影响评估
- [ ] 安全性检查
- [ ] 测试覆盖充分
- [ ] 文档更新完整

---

## 风险控制和应急预案

### 技术风险
- **数据库设计风险**: 提前进行数据建模评审
- **API集成风险**: 使用Mock数据进行并行开发
- **性能优化风险**: 持续监控性能指标

### 时间风险
- **开发延期**: 采用敏捷开发，优先核心功能
- **需求变更**: 控制范围蔓延，变更评估流程
- **人员风险**: 关键模块多人熟悉

### 业务风险
- **市场接受度**: 用户测试和反馈收集
- **竞争对手**: 关注竞品动态，快速迭代
- **合规性**: 提前了解各地区法规要求

---

## 上线后维护计划

### 监控指标
- RFQ转化率
- 页面加载速度
- 用户行为数据
- 错误率统计

### 优化计划
- 基于数据的功能优化
- 性能持续改进
- 用户体验提升
- 安全性增强

### 支持计划
- 用户反馈处理
- Bug修复流程
- 功能更新发布
- 数据备份和维护

---

**文档版本**: 1.0 (可交互版)
**创建日期**: 2025-10-03
**最后更新**: 2025-10-03
**负责人**: 开发团队

---

*注意：此文档为动态文档，开发过程中会根据实际情况进行更新和调整。*

<script>
// 进度计算脚本
function updateProgress() {
    // 定义每个阶段的任务ID
    const stageTasks = {
        stage1: ['task-1-1-1', 'task-1-1-2', 'task-1-1-3', 'task-1-1-4', 'task-1-1-5', 'task-1-2-1', 'task-1-2-2', 'task-1-2-3', 'task-1-3-1', 'task-1-3-2', 'task-1-3-3'],
        stage2: ['task-2-1-1', 'task-2-1-2', 'task-2-1-3', 'task-2-2-1', 'task-2-2-2'],
        stage3: ['task-3-1-1', 'task-3-1-2', 'task-3-1-3', 'task-3-2-1', 'task-3-2-2', 'task-3-2-3', 'task-3-2-4', 'task-3-3-1', 'task-3-3-2', 'task-3-3-3', 'task-3-3-4', 'task-3-3-5', 'task-3-4-1', 'task-3-4-2', 'task-3-4-3', 'task-3-5-1', 'task-3-5-2', 'task-3-5-3'],
        stage4: ['task-4-1-1', 'task-4-1-2', 'task-4-1-3', 'task-4-2-1', 'task-4-2-2', 'task-4-2-3', 'task-4-3-1', 'task-4-3-2'],
        stage5: ['task-5-1-1', 'task-5-1-2', 'task-5-1-3', 'task-5-2-1', 'task-5-2-2', 'task-5-3-1', 'task-5-3-2', 'task-5-3-3'],
        stage6: ['task-6-1-1', 'task-6-1-2', 'task-6-1-3', 'task-6-2-1', 'task-6-2-2', 'task-6-3-1', 'task-6-3-2', 'task-6-3-3', 'task-6-4-1', 'task-6-4-2', 'task-6-4-3', 'task-6-5-1', 'task-6-5-2'],
        stage7: ['task-7-1-1', 'task-7-1-2', 'task-7-2-1', 'task-7-2-2', 'task-7-3-1', 'task-7-3-2'],
        stage8: ['task-8-1-1', 'task-8-1-2', 'task-8-1-3', 'task-8-2-1', 'task-8-2-2', 'task-8-2-3', 'task-8-3-1', 'task-8-3-2', 'task-8-3-3'],
        stage9: ['task-9-1-1', 'task-9-1-2', 'task-9-1-3', 'task-9-1-4', 'task-9-2-1', 'task-9-2-2', 'task-9-2-3', 'task-9-3-1', 'task-9-3-2', 'task-9-3-3']
    };

    let totalTasks = 0;
    let completedTasks = 0;

    // 计算整体进度
    Object.keys(stageTasks).forEach(stage => {
        const tasks = stageTasks[stage];
        const stageCompleted = tasks.filter(taskId => {
            const checkbox = document.getElementById(taskId);
            return checkbox && checkbox.checked;
        }).length;

        totalTasks += tasks.length;
        completedTasks += stageCompleted;

        // 更新阶段进度
        const stageProgress = Math.round((stageCompleted / tasks.length) * 100);
        const progressElement = document.getElementById(stage + '-progress');
        if (progressElement) {
            progressElement.textContent = stageProgress + '%';
            progressElement.style.color = stageProgress === 100 ? '#10b981' : '#f59e0b';
        }
    });

    // 更新整体进度
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const overallElement = document.getElementById('overall-progress');
    if (overallElement) {
        overallElement.textContent = overallProgress + '%';
        overallElement.style.color = overallProgress === 100 ? '#10b981' : overallProgress >= 50 ? '#f59e0b' : '#ef4444';
    }

    // 保存进度到localStorage
    saveProgress();
}

// 保存进度到localStorage
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('aierxuan-dev-progress', JSON.stringify(progress));
}

// 从localStorage恢复进度
function loadProgress() {
    const savedProgress = localStorage.getItem('aierxuan-dev-progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        Object.keys(progress).forEach(taskId => {
            const checkbox = document.getElementById(taskId);
            if (checkbox) {
                checkbox.checked = progress[taskId];
            }
        });
        updateProgress();
    }
}

// 页面加载时恢复进度
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
});

// 添加重置进度功能
function resetProgress() {
    if (confirm('确定要重置所有进度吗？此操作不可撤销。')) {
        localStorage.removeItem('aierxuan-dev-progress');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateProgress();
    }
}

// 添加导出进度功能
function exportProgress() {
    const progress = {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });

    const dataStr = JSON.stringify(progress, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'aierxuan-dev-progress.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// 在页面末尾添加控制按钮
document.addEventListener('DOMContentLoaded', function() {
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: flex; gap: 10px;';
    controlsDiv.innerHTML = `
        <button onclick="resetProgress()" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">重置进度</button>
        <button onclick="exportProgress()" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">导出进度</button>
    `;
    document.body.appendChild(controlsDiv);
});
</script>

<style>
/* 自定义样式 */
input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    cursor: pointer;
}

input[type="checkbox"]:checked + span {
    text-decoration: line-through;
    color: #6b7280;
}

.task-item {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.task-item:hover {
    background-color: #f9fafb;
}

.task-completed {
    background-color: #f0fdf4;
    border-left: 4px solid #10b981;
}

.stage-progress {
    font-weight: bold;
    font-size: 14px;
}

.overall-progress {
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 8px;
    margin: 10px 0;
}
</style>