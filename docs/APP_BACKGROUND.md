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
The application supports two primary runtime modes negotiated via `VITE_DATA_BACKEND`:
1. **Preview Mode** (`preview`)
2. **Supabase Mode** (`supabase`)

### Preview Mode
- **Purpose**: A local and ephemeral demonstration mode useful for UI component layout inspection.
- **Limitations**: Injects a deterministic mock center ID (`00000000-0000-4000-8000-000000000001`). It does not require environmental networks or Supabase credentials. It actively returns empty models or throws mapped simulated errors for functional tests rather than relying on standard DB writes.
- **WARNING**: Preview success is **not** proof of production readiness. Successfully rendering layouts in preview mode does not provide validation that actual entity models function perfectly on the connected database. Do not use Preview mode as a band-aid to obscure incomplete or unsupported Supabase implementations.

### Supabase Mode
- **Purpose**: The absolute real persistence mode backing the operational application logic.
- **Requirements**: Requires validated configuration credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) and a legitimate `VITE_CENTER_ID` parameter passed correctly to boot successfully.

## Internationalization and Layout
- **Languages**: The interface translates across Arabic and English mapping states dynamically through `i18n.ts`.
- **Layouts**: RTL (Right-to-Left) and LTR (Left-to-Right) UI flipping capabilities natively maintained.

## Known Completed Stabilization
- Preview mode uses safely abstracted deterministic Center Id methodologies resolving reliably over the config loader logic.
- Misconfigurations produce direct, gracefully localized, visible errors upon initialization instead of crashing silently in console trace errors.
- Stable testing logic (`src/__tests__/initialization.test.tsx`) prevents contextual regressions within the loader framework limits.
- Established ongoing refactoring replacing static dimension variables (`ml-`, `pr-`) with standard logical classes natively compatible with Tailwind configurations (`ms-`, `pe-`).
