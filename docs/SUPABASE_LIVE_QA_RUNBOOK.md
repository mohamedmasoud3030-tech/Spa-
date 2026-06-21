# Supabase Live QA Runbook (Phase 10A)

This runbook starts the post-Preview v1.0 live validation path. It does not apply SQL, does not enable checkout, and does not modify production environment variables.

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

## Manual Supabase Steps

1. Open the Supabase SQL editor in a staging project.
2. Apply `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql`.
3. Seed one center, one auth user profile, and one active `center_memberships` row for the `VITE_CENTER_ID`.
4. Do not apply `docs/PHASE_5B_CHECKOUT_SQL_DRAFT.md`.
5. Do not create `invoices`, `invoice_items`, `payments`, or `process_checkout_v1`.

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

After Phase 10A live QA passes, proceed to Phase 10A.5: apply and verify `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql` in the target Supabase environment, capture the generated `VITE_CENTER_ID`, and record any drift before considering Phase 10B checkout work.
