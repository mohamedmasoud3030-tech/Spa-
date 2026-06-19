# FINAL MASTER PLAN — SPA Management App

This branch keeps the same product phases:

## v1.0 — Supabase PWA

Goal: first honest customer-deployable release.

Scope:

- single-customer, single-center hosted Supabase app.
- real auth.
- real persisted operational CRUD.
- browser QA before release.
- clear disclosure for unsupported backend capabilities.

v1.0 must not be positioned as multi-customer SaaS.

## v1.1 — Checkout, Reports, Print, Polish

Start only after v1.0 is closed.

Scope:

- checkout RPC and adapter.
- invoice/payment persistence.
- calculation-backed reports.
- receipt print layout.
- settings mutations.
- customer history.
- expense edit UI and real update implementation.
- route-level code splitting after measurement.

## v2.0 — Windows Desktop EXE

Start after v1.1 is stable.

Direction:

- Tauri v2 shell.
- SQLite local database.
- local auth.
- local backup/export.
- Windows 10/11 smoke testing.
- optional cloud sync only after v2.0.

## Immediate documentation task

Codex should move these planning files into the repo documentation structure, reconcile active docs, and keep the phase model above intact.
