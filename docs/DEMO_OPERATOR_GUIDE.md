# Demo Operator Guide

This guide ensures operators can present the Kanzy Spa unified management application while staying aligned with the current product scope.

## 1. How to Launch a Demo

Preview Mode is removed. Product demos must run against a configured Supabase backend:

- `VITE_DATA_BACKEND=supabase`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_CENTER_ID`
- `VITE_BRANCH_MODE=single`

Use `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql` as the canonical v1.0 bootstrap schema. Do not use mock data, fake checkouts, or Preview Mode as demo evidence.

## 2. Login

Use a real Supabase Auth user with a valid membership for `VITE_CENTER_ID`. Missing or invalid configuration must block startup instead of falling back to a demo session.

## 3. Recommended Walkthrough Order

1. **Login**: Demonstrate real authentication.
2. **Dashboard**: Show operational metrics that are backed by available Supabase data.
3. **App Header & Preferences**: Flip the UI language from English to Arabic, showing RTL structural mirroring.
4. **Customers**: Create, update, and delete real customer records.
5. **Services**: Navigate service management and show real CRUD behavior.
6. **Appointments**: Demonstrate booking flow using persisted Supabase records.
7. **POS System**: Show cart composition and validation only. Checkout and print are v1.1 work.
8. **Reports**: Show implemented operational reports; financial reports are v1.1 work.
9. **Mobile**: Use Chrome DevTools to showcase 390px layouts or perform the walkthrough directly on an iPad.

## 4. Current Scope Boundaries

- v1.0 is a single-customer, single-center Supabase PWA with real auth and real CRUD.
- Checkout RPC, invoice print, financial reports, settings mutations, and expense edit UI are v1.1 work.
- Windows Desktop EXE delivery is v2.0 work using Tauri v2 + SQLite with no Supabase dependency.
- Do not modify `.env.local` variables during live demos.

## 5. Customer Questions that Require Honest Bounded Answers

**Question:** Does it support multi-branch networks?

**Answer:** No. v1.0 is intentionally single-customer and single-center. Multi-center or SaaS expansion is not part of the locked product scope.

**Question:** Can staff members manipulate past invoices?

**Answer:** No. The architecture is designed around strict authorization and financial integrity. Invoice mutation workflows are not part of v1.0.
