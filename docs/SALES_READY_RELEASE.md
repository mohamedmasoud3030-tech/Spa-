# SALES-READY RELEASE — Definition & Criteria
**Rule:** The product is not delivered to any customer — paid or pilot — until a live Supabase connection is established and QA-verified.

---

## DEFINITION

> Sales-ready means: a live Supabase project is connected, a real admin user can log in, all implemented CRUD operations persist real data, no fake mode is reachable, and the customer has a deployment guide they can follow independently.

---

## DELIVERY PREREQUISITE — SUPABASE MUST BE LIVE

**This supersedes all other criteria.** The product must not be shown, demoed, or delivered in any state where data does not persist to a real Supabase database.

| Why | Detail |
|---|---|
| Preview Mode is removed | There is no fallback mode — the app requires a real Supabase connection to function |
| Trust | A customer who sees fake or empty data cannot evaluate the product honestly |
| Data safety | Untested RLS in a live environment is a data breach risk |
| Support | Delivering a product without a verified connection creates unresolvable support tickets |

---

## CRITERION 1 — No Fake Operating Mode ✅ ACHIEVED

| Check | Verified |
|---|---|
| `BackendMode = "supabase"` only | ✅ `env.ts` line 8 |
| Missing env → `EnvironmentConfigurationError` | ✅ `parseEnv()` throws |
| `UserRole.PREVIEW` absent | ✅ `Session.ts` |
| "Enter Preview Mode" button absent | ✅ `LoginPage.tsx` |
| `src/infrastructure/preview/` deleted | ✅ |
| Preview banner absent from route guards | ✅ `route-guards.tsx` |

---

## CRITERION 2 — Live Supabase Connection Verified ❌ PENDING

**This is the primary blocker.**

| Check | Status |
|---|---|
| Supabase project created | ❌ |
| Base schema applied (`SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql`) | ❌ |
| Admin user created and linked to center | ❌ |
| `.env` configured with real credentials | ❌ |
| `npm run preflight:supabase` passes | ❌ |
| App boots without config errors | ❌ |
| Login succeeds with real credentials | ❌ |

See `CURRENT_VERSION_CLOSURE.md` — Mandatory Gate section for exact steps.

---

## CRITERION 3 — Real Data Persistence Verified ❌ PENDING

All operations must complete against real Supabase and survive page reload.

| Module | Create | Read | Update | Delete |
|---|---|---|---|---|
| Customers | ❌ | ❌ | ❌ | ❌ |
| Appointments | ❌ | ❌ | ❌ | ❌ |
| Services | ❌ | ❌ | ❌ | ❌ |
| Employees | ❌ | ❌ | ❌ | ❌ |
| Products | ❌ | ❌ | ❌ | ❌ |
| Expenses | ❌ | ❌ | N/A (v1.1) | ❌ |
| Dashboard counts | — | ❌ | — | — |
| Appointment report | — | ❌ | — | — |
| Inventory report | — | ❌ | — | — |

---

## CRITERION 4 — Auth & Role Separation Verified ❌ PENDING

| Check | Status |
|---|---|
| ADMIN login works | ❌ |
| STAFF login works | ❌ |
| STAFF blocked from `/reports` and `/settings` | ❌ |
| Session persists on page refresh | ❌ |
| Wrong credentials → error (not crash) | ❌ |

---

## CRITERION 5 — Blocked Features Disclosed Before Sale ⚠️

The buyer must know what v1.0 does and does not include before purchasing.

| Feature | v1.0 | v1.1 |
|---|---|---|
| Customer, Appointment, Service, Employee, Product management | ✅ | ✅ |
| Expense tracking (create/delete) | ✅ | ✅ |
| Operational dashboard (counts) | ✅ | ✅ |
| Appointment + Inventory reports | ✅ | ✅ |
| **POS Checkout / Billing** | ❌ | ✅ |
| **Invoice printing** | ❌ | ✅ |
| **Financial dashboard (P&L, revenue)** | ❌ | ✅ |
| **Sales reports** | ❌ | ✅ |
| **Customer visit history** | ❌ | ✅ |
| **Settings mutations (logo, name, backup)** | ❌ | ✅ |
| **Expense editing** | ❌ | ✅ |

---

## CRITERION 6 — Data Isolation Verified ❌ PENDING

| Check | Status |
|---|---|
| RLS policies in schema | ✅ Defined in `SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql` |
| `center_id` mismatch → `UNAUTHORIZED_CENTER_MEMBERSHIP` | ✅ Implemented in `AppContext.tsx` |
| Cross-center read blocked (live test) | ❌ Not yet tested |

---

## CRITERION 7 — Deployment Path Documented ❌ PENDING

`docs/CUSTOMER_DEPLOYMENT_GUIDE.md` does not yet exist.

A customer must be able to deploy the app independently, without requiring developer involvement.

---

## CRITERION 8 — Arabic RTL Device-Tested ❌ PENDING

| Check | Status |
|---|---|
| Layout correct on Android (Chrome) | ❌ |
| Layout correct on iOS (Safari) | ❌ |
| No text overflow or cut-off | ❌ |
| Forms and modals work in RTL | ❌ |

---

## SALES-READY GATE CHECKLIST

**All must be ✅ before first customer delivery:**

```
Technical:
[x] Preview Mode removed from source
[x] tsc --noEmit → 0 errors
[x] vitest run → 74/74
[x] npm run build → clean PWA
[ ] Supabase project live + schema applied     ← PRIMARY BLOCKER
[ ] npm run preflight:supabase passes
[ ] Login works with real credentials
[ ] Full live QA (SUPABASE_LIVE_QA_RUNBOOK.md) signed off
[ ] RLS cross-center isolation tested

Documentation:
[ ] CUSTOMER_DEPLOYMENT_GUIDE.md written
[ ] MANUAL_PRE_SALE_ACCEPTANCE_CHECKLIST.md signed
[ ] v1.0 feature scope communicated to buyer

Quality:
[ ] Arabic RTL tested on Android + iOS
[ ] Error states tested (network failure, bad credentials)
[ ] No crashes in QA session
```

---

## V1.0 POSITIONING

**What v1.0 is:** The operational backbone of a salon — scheduling, staffing, catalog, and inventory. Every core management feature is real and data-persisted.

**What v1.0 is not:** A billing system. POS checkout, invoices, and financial reporting are v1.1 features.

**How to sell v1.0:** "Start managing your salon today. Billing features arrive shortly in v1.1 — typically within 4–6 weeks."

---

## V2.0 DESKTOP EXE — FUTURE GATE

Same criteria as above, plus:

- [ ] Windows 10 + 11 installer QA passed
- [ ] Offline operation verified (zero internet required)
- [ ] Arabic RTL in WebView2 verified
- [ ] Backup/restore round-trip tested
- [ ] Auto-update works
- [ ] EXE is code-signed (no SmartScreen warning)
