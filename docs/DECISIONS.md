# Product Decisions

- **Preview Mode Removed**: `VITE_DATA_BACKEND=preview` is not a valid released runtime mode. Missing or invalid backend configuration must produce a hard blocking `EnvironmentConfigurationError` screen, not a mock-data fallback.
- **Single Center / Single Branch Only**: The application architecture explicitly services simple localized environments. Multi-center hierarchical organizational structures must not be implemented.
- **No SaaS Scope**: Do not introduce subscription logic, tenant membership onboarding, or comprehensive generic platform SaaS capabilities into the app context.
- **Tenant Context Freeze**: The `tenantContext` module, if present in legacy components, must rigidly constrain to identifying single-branch session credentials. Under no context must it expand to support logical multi-tenancy.
- **No Mock Center ID Runtime**: The released product must never inject a deterministic mock center ID. `VITE_CENTER_ID` must identify the real single center in v1.0 Supabase mode.
- **Supabase as Source of Truth**: Remote Supabase integrations operate as the single source point of functional correctness.
- **Truth in Financials**: Rendered statistical metrics (Financials, KPIs, reporting aggregates) must natively extrapolate directly from successfully transacted records. Mocking, fabricating, or artificially defaulting these numbers in the actual UI layer is strictly prohibited.
- **Visible Failures**: Invoking unsupported or incomplete API methods within adapter layers MUST precipitate deliberate, safely translated UX failures indicating connection faults, rather than resolving silently leading to data illusions. 
- **Evidence-Backed Readiness**: No product validation claims of "Production Ready", "Testing Passed", or "Completed Implementation" are valid decoupled from genuine database runtime environments checks and strictly enforced pipeline suites (`npm run build`, `vitest`).
- **Version Scope Lock**: v1.0 is a single-customer, single-center Supabase PWA with real auth and real CRUD. v1.1 adds checkout, print, financial reports, settings mutations, and expense edit UI. v2.0 is a Windows Desktop EXE via Tauri v2 + SQLite, offline-first, with no Supabase dependency.
- **Expense Update Contract**: `Expense.update` already exists in the domain port and Supabase adapter contract. The editable expense UI is deferred to v1.1.
