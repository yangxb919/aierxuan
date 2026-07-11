-- Apply only after the secure server RFQ endpoint is deployed.
-- Browser clients must no longer write directly to the public Data API.

BEGIN;

ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;

DO $policy_cleanup$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'rfqs'
    LOOP
        EXECUTE format(
            'DROP POLICY IF EXISTS %I ON public.rfqs',
            policy_record.policyname
        );
    END LOOP;
END
$policy_cleanup$;

REVOKE ALL PRIVILEGES ON TABLE public.rfqs FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.rfqs TO service_role;

NOTIFY pgrst, 'reload schema';

COMMIT;
