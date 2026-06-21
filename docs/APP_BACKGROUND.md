# App Background

## Product Identity
This is a single service-center / single-branch SPA (Single Page Application) management app tailored for basic configurations such as Salons or Service Clinics.

## Main Modules
- Login
- Dashboard
- Customers
- Appointments
- Services
- POS / Invoices
- Inventory / Products
- Expenses
- Employees
- Reports
- Settings

## Runtime Modes
The released v1.0 application supports exactly one runtime backend negotiated via `VITE_DATA_BACKEND`:
1. **Supabase Mode** (`supabase`)

### Removed Preview Mode
- `VITE_DATA_BACKEND=preview` is not a valid released configuration.
- Missing or invalid backend configuration must produce a hard blocking `EnvironmentConfigurationError` screen.
- The application must not fall back to mock data, a deterministic mock center ID, a demo session, or read-only fake adapters.

### Supabase Mode
- **Purpose**: The absolute real persistence mode backing the operational application logic.
- **Requirements**: Requires validated configuration credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) and a legitimate `VITE_CENTER_ID` parameter passed correctly to boot successfully.

## Version Model

| Version | Scope |
|---|---|
| v1.0 | Supabase PWA. Single customer, single center. Real auth, real CRUD. No Preview Mode. Browser QA signed off. |
| v1.1 | Checkout RPC, invoice print, financial reports, settings mutations, expense edit UI, bundle code-split. |
| v2.0 | Windows Desktop EXE. Tauri v2 + SQLite. Local auth, local migrations, backup/restore, offline-first. No Supabase required. |

## Internationalization and Layout
- **Languages**: The interface translates across Arabic and English mapping states dynamically through `i18n.ts`.
- **Layouts**: RTL (Right-to-Left) and LTR (Left-to-Right) UI flipping capabilities natively maintained.

## Known Completed Stabilization
- Misconfigurations produce direct, gracefully localized, visible errors upon initialization instead of crashing silently in console trace errors or falling back to Preview Mode.
- Stable testing logic (`src/__tests__/initialization.test.tsx`) prevents contextual regressions within the loader framework limits.
- Established ongoing refactoring replacing static dimension variables (`ml-`, `pr-`) with standard logical classes natively compatible with Tailwind configurations (`ms-`, `pe-`).
