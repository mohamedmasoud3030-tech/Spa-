# Supabase Setup Guide: Checkout Readiness

This guide explains how to manually configure your Supabase instance to support the Phase 5B checkout implementation.

## Pre-requisites

The application relies on the following environment variables (found in `src/config/env.ts`):
- `VITE_DATA_BACKEND=supabase`
- `VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY`
- `VITE_CENTER_ID=YOUR_CENTER_UUID`

## Applying the Checkout Schema

The application does **NOT** apply database schemas or migrations automatically. To unlock POS checkout, follow these steps:

1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Open the file `docs/PHASE_5B_CHECKOUT_SQL_DRAFT.md` inside this repository.
3. Review the draft SQL, including:
   - `invoices` table creation.
   - `invoice_items` table creation.
   - `process_checkout_v1` RPC function creation.
4. Copy and paste the validated SQL into the SQL Editor.
5. Click **Run**.

## RLS Verification Checklist

Ensure you have established RLS policies so that users only see data for their `center_id`.
By default, the `process_checkout_v1` is created as `SECURITY DEFINER`, allowing it to bypass RLS to ensure consistency during the transaction, provided the payload validates the `center_id`.
You must ensure the user executing the RPC provides their assigned `center_id`.

## Manual Test Example

Run the following inside the Supabase SQL editor to test if your checkout RPC was successfully deployed:

```sql
SELECT process_checkout_v1(
  'YOUR-CENTER-UUID',
  'A-VALID-CUSTOMER-UUID',
  NULL,
  'cash',
  0,
  false,
  '[{"type": "service", "serviceId": "A-VALID-SERVICE-UUID", "qty": 1, "price": 50}]'::jsonb
);
```

Once this function works successfully inside Supabase, the AI Studio web UI will gracefully switch from "Backend Required" to processing authentic POS transactions.
