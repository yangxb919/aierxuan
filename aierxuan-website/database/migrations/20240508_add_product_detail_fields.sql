-- Adds columns required for the new product detail layout
-- Products: MOQ, price, and datasheet URL
-- Product translations: localized quality tests, OEM services, and FAQs

ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS moq integer,
    ADD COLUMN IF NOT EXISTS price numeric,
    ADD COLUMN IF NOT EXISTS datasheet_url text;

ALTER TABLE public.product_translations
    ADD COLUMN IF NOT EXISTS quality_tests jsonb DEFAULT '[]'::jsonb NOT NULL,
    ADD COLUMN IF NOT EXISTS oem_services jsonb DEFAULT '[]'::jsonb NOT NULL,
    ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]'::jsonb NOT NULL;

-- Ensure existing rows have array values (in case defaults didn't backfill)
UPDATE public.product_translations
SET quality_tests = '[]'::jsonb
WHERE quality_tests IS NULL;

UPDATE public.product_translations
SET oem_services = '[]'::jsonb
WHERE oem_services IS NULL;

UPDATE public.product_translations
SET faqs = '[]'::jsonb
WHERE faqs IS NULL;
