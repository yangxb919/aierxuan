-- Lock down public Data API access after the July 2026 security audit.
-- Browser clients keep read-only access to published content and constrained
-- INSERT access to RFQs. All administration stays behind the service role.

BEGIN;

-- Every table in the exposed public schema must use RLS.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.i18n_locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;

-- Remove every existing policy on the audited tables. This prevents an older
-- permissive policy from being combined with the replacement policies below.
DO $policy_cleanup$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename IN (
              'admin_users',
              'audit_events',
              'rfq_status_history',
              'site_settings',
              'i18n_locales',
              'products',
              'product_translations',
              'blog_posts',
              'blog_post_translations',
              'faq',
              'faq_translations',
              'rfqs'
          )
    LOOP
        EXECUTE format(
            'DROP POLICY IF EXISTS %I ON %I.%I',
            policy_record.policyname,
            policy_record.schemaname,
            policy_record.tablename
        );
    END LOOP;
END
$policy_cleanup$;

-- Server-only data. The custom admin session system does not use Supabase Auth
-- identities, so neither anon nor authenticated may access these tables.
REVOKE ALL PRIVILEGES ON TABLE public.admin_users FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.audit_events FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.rfq_status_history FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.site_settings FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_users TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.audit_events TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.rfq_status_history TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.site_settings TO service_role;

-- Locale metadata is safe for public reads but may only be changed server-side.
REVOKE ALL PRIVILEGES ON TABLE public.i18n_locales FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.i18n_locales TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.i18n_locales TO service_role;

CREATE POLICY "public_can_read_locales"
    ON public.i18n_locales
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Published product, blog and FAQ content is public read-only.
REVOKE ALL PRIVILEGES ON TABLE public.products FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.product_translations FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.blog_posts FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.blog_post_translations FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.faq FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.faq_translations FROM PUBLIC, anon, authenticated;

GRANT SELECT ON TABLE public.products TO anon, authenticated;
GRANT SELECT ON TABLE public.product_translations TO anon, authenticated;
GRANT SELECT ON TABLE public.blog_posts TO anon, authenticated;
GRANT SELECT ON TABLE public.blog_post_translations TO anon, authenticated;
GRANT SELECT ON TABLE public.faq TO anon, authenticated;
GRANT SELECT ON TABLE public.faq_translations TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.products TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.product_translations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.blog_posts TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.blog_post_translations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.faq TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.faq_translations TO service_role;

CREATE POLICY "public_can_read_active_products"
    ON public.products
    FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

CREATE POLICY "public_can_read_active_product_translations"
    ON public.product_translations
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.products
            WHERE products.id = product_translations.product_id
              AND products.status = 'active'
        )
    );

CREATE POLICY "public_can_read_published_blog_posts"
    ON public.blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

CREATE POLICY "public_can_read_published_blog_translations"
    ON public.blog_post_translations
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.blog_posts
            WHERE blog_posts.id = blog_post_translations.post_id
              AND blog_posts.status = 'published'
        )
    );

CREATE POLICY "public_can_read_active_faq"
    ON public.faq
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "public_can_read_active_faq_translations"
    ON public.faq_translations
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.faq
            WHERE faq.id = faq_translations.faq_id
              AND faq.is_active = true
        )
    );

-- Temporary browser RFQ path: callers may submit a new website inquiry, but
-- cannot read existing RFQs or set any administration-controlled state.
REVOKE ALL PRIVILEGES ON TABLE public.rfqs FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.rfqs TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.rfqs TO service_role;

CREATE POLICY "public_can_submit_new_website_rfq"
    ON public.rfqs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        status = 'new'
        AND priority = 'medium'
        AND source = 'website'
        AND assigned_to IS NULL
        AND admin_notes IS NULL
        AND contacted_at IS NULL
        AND follow_up_date IS NULL
        AND (quantity IS NULL OR quantity > 0)
        AND language_code IN ('zh-CN', 'en', 'ru', 'ja', 'fr', 'pt')
    );

-- Trigger functions are not public RPC endpoints. Pin their search path and
-- retain execution only for the server role.
ALTER FUNCTION public.update_rfqs_updated_at() SET search_path = public;
ALTER FUNCTION public.log_rfq_status_change() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.update_rfqs_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_rfq_status_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.update_rfqs_updated_at() TO service_role;
GRANT EXECUTE ON FUNCTION public.log_rfq_status_change() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;

-- Invalidate any session that could have survived the permission change.
UPDATE public.admin_sessions
SET revoked_at = COALESCE(revoked_at, NOW()),
    updated_at = NOW()
WHERE revoked_at IS NULL;

-- Ask PostgREST to refresh its schema/privilege cache after the transaction.
NOTIFY pgrst, 'reload schema';

COMMIT;
