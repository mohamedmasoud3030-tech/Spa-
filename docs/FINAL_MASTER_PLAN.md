# FINAL MASTER PLAN — SPA Management App
**Branch:** docs-v1-v2-v3-source-of-truth  
**Verified from:** `origin/main` commit 617b883 (live clone, June 2026)  
**Roles:** Senior Product Architect · Full-Stack Auditor · Release Planning Engineer

---

## LOCKED PRODUCT DECISIONS

| # | Decision | Status |
|---|---|---|
| 1 | Preview Mode is **removed from the product entirely** — not toggled, not hidden, not valid as demo/fallback | ✅ Done in code (commit 3b60967) |
| 2 | Missing configuration must produce a **hard blocking error screen**, not a fallback | ✅ `parseEnv()` throws `EnvironmentConfigurationError` |
| 3 | `VITE_DATA_BACKEND=supabase` is the only valid backend mode | ✅ `BackendMode = "supabase"` in `env.ts` |
| 4 | v1.0 = single-customer, single-center Supabase PWA | On track |
| 5 | v1.1 = checkout, print, financial reports, settings mutations, expense edit UI, performance | Planned |
| 6 | v2.0 = Windows Desktop EXE via Tauri v2 + SQLite — **documented only, not implemented** | Future |
| 7 | Sales-ready = real auth + real CRUD + live QA verified — no fake mode | Pending QA |

---

## BUILD HEALTH — VERIFIED FROM SOURCE

| Check | Command | Result |
|---|---|---|
| TypeScript compile | `tsc --noEmit` | ✅ 0 errors |
| Tests | `vitest run` | ✅ 74/74 passed (8 files) |
| Production build | `npm run build` | ✅ Clean PWA output |
| Bundle warning | build output | ⚠️ 1,325 kB single chunk — code-split in v1.1 |
| Live browser QA | (not performed) | ❌ PENDING — blocking v1.0 release |

---
