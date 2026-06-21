# Supabase Live QA Runbook (Phase 10A)

This runbook starts the post-Preview v1.0 live validation path. It applies only the base staging schema and seed needed for non-checkout CRUD QA. It does not enable checkout and does not modify production environment variables.

## Goal

Verify that the application is ready to run against a real Supabase project for non-checkout CRUD QA:

- Real Supabase auth.
- Single configured center through `VITE_CENTER_ID`.
- Core v1.0 tables only.
- Checkout, invoice print, financial reports, settings mutations, and expense edit UI remain blocked.

## Local Preflight

1. Create `.env.local` from `.env.example`.
2. Fill these values:
   - `VITE_DATA_BACKEND=supabase`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_CENTER_ID`
   - `VITE_BRANCH_MODE=single`
3. Run:

```bash
npm run preflight:supabase
```

The preflight verifies required env values, rejects non-`supabase` backend mode, rejects service-role secret keys, validates `VITE_CENTER_ID` shape, and checks that `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql` contains only the v1.0 base schema tables.

## Phase 10A.5 Staging Bootstrap

1. Open the Supabase SQL editor in a staging project.
2. Apply `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql`.
3. Create or identify one Supabase Auth user that will be the staging admin.
4. Copy that user's UUID from Authentication > Users.
5. Replace `YOUR-AUTH-UID-HERE` in `docs/SUPABASE_STAGING_SEED_10A5.sql`.
6. Apply `docs/SUPABASE_STAGING_SEED_10A5.sql`.
7. Copy the returned `VITE_CENTER_ID` into `.env.local`.
8. Run `npm run preflight:supabase` after `.env.local` is updated.
9. Do not apply `docs/PHASE_5B_CHECKOUT_SQL_DRAFT.md`.
10. Do not create `invoices`, `invoice_items`, `payments`, or `process_checkout_v1`.

## Phase 10A.5 Evidence To Record

- Supabase project name/ref: `TODO`
- Admin Auth user UUID: `TODO`
- Returned `VITE_CENTER_ID`: `TODO`
- `npm run preflight:supabase`: `TODO`
- Live QA date: `TODO`
- Drift notes from applying `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql`: `TODO`

## Browser QA Checklist

- App starts with `VITE_DATA_BACKEND=supabase`.
- Missing env values show a blocking configuration error.
- Login works for the seeded admin user.
- Unknown or missing role metadata fails closed.
- Customers list/create/update/delete works.
- Appointments list/create/update/delete works.
- Services list/create/update/delete works.
- Products list/create/update/delete works.
- Expenses list/create/delete works.
- Employees list/create/update/delete works.
- Dashboard operational counts load.
- Appointment and inventory reports load.
- POS checkout remains blocked.
- Invoice print remains blocked.
- Financial reports remain blocked.
- Settings mutations remain blocked.

## Next Step After This Runbook

After Phase 10A.5 live QA passes, proceed to Phase 10A.6: remove the remaining preview-mode source and tests, then re-run the same Supabase staging QA as release evidence before considering Phase 10B checkout work.
