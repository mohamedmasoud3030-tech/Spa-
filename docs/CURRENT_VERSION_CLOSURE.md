# CURRENT VERSION CLOSURE — v1.0
**Release definition:** Single-customer, single-center Supabase PWA. Real auth. Real CRUD. Live QA verified. No fake mode.  
**Code status:** ✅ Ready — all blockers are operational, not technical.

---

## WHAT IS ALREADY DONE (verified from source)

| Item | Evidence |
|---|---|
| Preview Mode removed | `BackendMode = "supabase"` only in `env.ts` · `src/infrastructure/preview/` deleted · `UserRole.PREVIEW` absent · Login page has no preview button |
| Configuration guard | `parseEnv()` throws `EnvironmentConfigurationError` on missing/invalid config |
| Core CRUD adapters | All 11 domain port interfaces implemented in `SupabaseAdapter` (repositories.ts) |
| TypeScript clean | `tsc --noEmit` → 0 errors |
| Tests passing | `vitest run` → 74/74 |
| Build passing | `npm run build` → clean PWA |
| Supabase schema written | `docs/SUPABASE_BASE_SCHEMA_BOOTSTRAP.sql` finalized |
| QA runbook written | `docs/SUPABASE_LIVE_QA_RUNBOOK.md` exists |
| Preflight script | `npm run preflight:supabase` validates env before QA |
| Acceptance checklist | `docs/MANUAL_PRE_SALE_ACCEPTANCE_CHECKLIST.md` exists |

---
