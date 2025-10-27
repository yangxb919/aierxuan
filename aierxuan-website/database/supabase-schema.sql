-- AIERXUAN Website Database Schema
-- Created: 2025-10-03
-- Version: 1.0

-- =============================================
-- 1. 多语言支持表
-- =============================================

CREATE TABLE i18n_locales (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_i18n_locales_code ON i18n_locales(code);
CREATE INDEX idx_i18n_locales_active ON i18n_locales(is_active);

-- =============================================
-- 2. 管理员用户表
-- =============================================

CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);

-- =============================================
-- 3. 管理员会话表
-- =============================================

CREATE TABLE admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);

-- =============================================
-- 4. 产品主表
-- =============================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    images TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
    sort_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_sort ON products(sort_order);

-- =============================================
-- 5. 产品多语言表
-- =============================================

CREATE TABLE product_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    locale VARCHAR(10) NOT NULL REFERENCES i18n_locales(code),
    title VARCHAR(255) NOT NULL,
    short_desc TEXT,
    long_desc TEXT,
    key_specs JSONB DEFAULT '{}',
    seo_title VARCHAR(255),
    seo_desc TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(product_id, locale)
);

-- 创建索引
CREATE INDEX idx_product_translations_product_id ON product_translations(product_id);
CREATE INDEX idx_product_translations_locale ON product_translations(locale);
CREATE INDEX idx_product_translations_title ON product_translations USING gin(to_tsvector('english', title));

-- =============================================
-- 6. 博客文章主表
-- =============================================

CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    cover_image VARCHAR(255),
    author_id UUID REFERENCES admin_users(id),
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);

-- =============================================
-- 7. 博客文章多语言表
-- =============================================

CREATE TABLE blog_post_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    locale VARCHAR(10) NOT NULL REFERENCES i18n_locales(code),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    body_md TEXT,
    seo_title VARCHAR(255),
    seo_desc TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(post_id, locale)
);

-- 创建索引
CREATE INDEX idx_blog_post_translations_post_id ON blog_post_translations(post_id);
CREATE INDEX idx_blog_post_translations_locale ON blog_post_translations(locale);
CREATE INDEX idx_blog_post_translations_title ON blog_post_translations USING gin(to_tsvector('english', title));

-- =============================================
-- 8. RFQ询盘表
-- =============================================

CREATE TABLE rfq_min (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    country VARCHAR(100),
    requirements TEXT,
    product_interest UUID REFERENCES products(id),
    quantity INTEGER,
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    locale VARCHAR(10) NOT NULL REFERENCES i18n_locales(code),
    source_page VARCHAR(255),
    referrer VARCHAR(500),
    user_agent TEXT,
    ip_address INET,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'quoted', 'converted', 'closed', 'archived')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assignee UUID REFERENCES admin_users(id),
    internal_notes TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_rfq_min_email ON rfq_min(email);
CREATE INDEX idx_rfq_min_status ON rfq_min(status);
CREATE INDEX idx_rfq_min_priority ON rfq_min(priority);
CREATE INDEX idx_rfq_min_locale ON rfq_min(locale);
CREATE INDEX idx_rfq_min_created ON rfq_min(created_at);
CREATE INDEX idx_rfq_min_assignee ON rfq_min(assignee);
CREATE INDEX idx_rfq_min_product ON rfq_min(product_interest);

-- =============================================
-- 9. FAQ主表
-- =============================================

CREATE TABLE faq (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_active ON faq(is_active);
CREATE INDEX idx_faq_sort ON faq(sort_order);

-- =============================================
-- 10. FAQ多语言表
-- =============================================

CREATE TABLE faq_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faq_id UUID NOT NULL REFERENCES faq(id) ON DELETE CASCADE,
    locale VARCHAR(10) NOT NULL REFERENCES i18n_locales(code),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(faq_id, locale)
);

-- 创建索引
CREATE INDEX idx_faq_translations_faq_id ON faq_translations(faq_id);
CREATE INDEX idx_faq_translations_locale ON faq_translations(locale);
CREATE INDEX idx_faq_translations_question ON faq_translations USING gin(to_tsvector('english', question));

-- =============================================
-- 11. 系统配置表
-- =============================================

CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_site_settings_key ON site_settings(key);
CREATE INDEX idx_site_settings_public ON site_settings(is_public);

-- =============================================
-- 12. 审计日志表
-- =============================================

CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_audit_events_actor ON audit_events(actor_id);
CREATE INDEX idx_audit_events_action ON audit_events(action);
CREATE INDEX idx_audit_events_entity ON audit_events(entity_type, entity_id);
CREATE INDEX idx_audit_events_created ON audit_events(created_at);

-- =============================================
-- 更新时间触发器函数
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要的表添加更新时间触发器
CREATE TRIGGER update_i18n_locales_updated_at BEFORE UPDATE ON i18n_locales
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_translations_updated_at BEFORE UPDATE ON product_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_post_translations_updated_at BEFORE UPDATE ON blog_post_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rfq_min_updated_at BEFORE UPDATE ON rfq_min
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_translations_updated_at BEFORE UPDATE ON faq_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 行级安全策略 (RLS)
-- =============================================

-- 启用RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_min ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- 管理员用户策略
CREATE POLICY "Admin users can view all users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can insert users" ON admin_users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin users can update users" ON admin_users
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 管理员会话策略
CREATE POLICY "Users can view own sessions" ON admin_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON admin_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON admin_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON admin_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- 公开访问策略（产品、博客、FAQ）
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Anyone can view active FAQ" ON faq
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view product translations" ON product_translations
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM products
        WHERE products.id = product_translations.product_id
        AND products.status = 'active'
    ));

CREATE POLICY "Anyone can view blog post translations" ON blog_post_translations
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM blog_posts
        WHERE blog_posts.id = blog_post_translations.post_id
        AND blog_posts.status = 'published'
    ));

CREATE POLICY "Anyone can view FAQ translations" ON faq_translations
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM faq
        WHERE faq.id = faq_translations.faq_id
        AND faq.is_active = true
    ));

-- 管理员策略（完全访问）
CREATE POLICY "Admin users have full access to products" ON products
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to product translations" ON product_translations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to blog post translations" ON blog_post_translations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to RFQ" ON rfq_min
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to FAQ" ON faq
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users have full access to FAQ translations" ON faq_translations
    FOR ALL USING (auth.role() = 'authenticated');

-- 审计日志策略
CREATE POLICY "Admin users can view audit logs" ON audit_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- 初始数据插入
-- =============================================

-- 插入支持的语言
INSERT INTO i18n_locales (code, name, sort_order) VALUES
('zh-CN', '简体中文', 1),
('en', 'English', 2),
('ru', 'Русский', 3),
('ja', '日本語', 4),
('fr', 'Français', 5),
('pt', 'Português', 6);

-- 插入默认站点设置
INSERT INTO site_settings (key, value, description, is_public) VALUES
('site_name', '"AIERXUAN"', '网站名称', true),
('site_description', '"专业的B2B电脑设备供应商"', '网站描述', true),
('contact_email', '"info@aierxuan.com"', '联系邮箱', true),
('contact_phone', '"+86-400-123-4567"', '联系电话', true),
('company_address', '"中国上海市浦东新区张江高科技园区"', '公司地址', true),
('rfq_notification_emails', '["admin@aierxuan.com", "sales@aierxuan.com"]', 'RFQ通知邮箱列表', false),
('max_rfqs_per_day', '50', '每日最大RFQ数量限制', false);

-- 创建默认管理员用户（需要后续通过Supabase Auth或手动创建）
-- 注意：实际部署时需要使用安全的密码哈希
-- INSERT INTO admin_users (email, password_hash, role, first_name, last_name) VALUES
-- ('admin@aierxuan.com', '$2b$12$hashed_password_here', 'admin', 'Admin', 'User');

COMMIT;