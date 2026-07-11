-- Emergency security fix: keep custom admin sessions server-side only.
-- The application accesses this table through createSupabaseAdminClient(),
-- so anon and authenticated clients do not need table or RPC access.

BEGIN;

ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.admin_sessions FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_sessions TO service_role;

REVOKE EXECUTE ON FUNCTION public.validate_admin_session(VARCHAR)
FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_admin_session(VARCHAR) TO service_role;
ALTER FUNCTION public.validate_admin_session(VARCHAR) SET search_path = public;

-- Invalidate every session that might have been created before the privilege fix.
UPDATE public.admin_sessions
SET revoked_at = COALESCE(revoked_at, NOW()),
    updated_at = NOW()
WHERE revoked_at IS NULL;

COMMIT;

NOTIFY pgrst, 'reload schema';
