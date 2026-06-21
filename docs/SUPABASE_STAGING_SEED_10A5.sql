-- SUPABASE STAGING SEED (PHASE 10A.5)
-- Apply only after docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql succeeds.
-- Replace the two placeholders before running:
--   1. YOUR-AUTH-UID-HERE: UUID from Supabase Authentication > Users
--   2. Spa Staging Center: the staging center display name you want
-- The final SELECT returns the VITE_CENTER_ID value to copy into .env.local.

WITH new_center AS (
  INSERT INTO public.centers (name)
  VALUES ('Spa Staging Center')
  RETURNING id
),
admin_profile AS (
  INSERT INTO public.profiles (id, full_name)
  VALUES ('YOUR-AUTH-UID-HERE'::uuid, 'Staging Admin')
  ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name
  RETURNING id
),
admin_membership AS (
  INSERT INTO public.center_memberships (center_id, profile_id, role, is_active)
  SELECT new_center.id, admin_profile.id, 'admin'::public.member_role, true
  FROM new_center
  CROSS JOIN admin_profile
  ON CONFLICT (center_id, profile_id) DO UPDATE
    SET role = EXCLUDED.role,
        is_active = true
  RETURNING center_id
),
settings_seed AS (
  INSERT INTO public.center_settings (center_id, name, currency, tax_rate)
  SELECT center_id, 'Spa Staging Center', 'OMR', 0.00
  FROM admin_membership
  ON CONFLICT (center_id) DO UPDATE
    SET name = EXCLUDED.name,
        currency = EXCLUDED.currency,
        tax_rate = EXCLUDED.tax_rate,
        updated_at = now()
  RETURNING center_id
)
SELECT center_id AS "VITE_CENTER_ID"
FROM settings_seed;

-- Optional verification after updating .env.local with the returned VITE_CENTER_ID:
-- SELECT c.id, c.name, cm.profile_id, cm.role, cm.is_active
-- FROM public.centers c
-- JOIN public.center_memberships cm ON cm.center_id = c.id
-- WHERE c.id = 'PASTE-VITE-CENTER-ID-HERE'::uuid;
