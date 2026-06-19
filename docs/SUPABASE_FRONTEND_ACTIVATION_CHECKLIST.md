# Supabase Frontend Activation Checklist

Before the application explicitly moves off the fully-isolated local-memory `Preview Mode` and natively initializes `supabase-js`, these boundaries must be verified.

## 1. Environment Parsing
- [x] **Verified Variable:** `VITE_DATA_BACKEND=supabase` switches the UI orchestrators.
- [x] **Verified Variable:** `VITE_SUPABASE_URL` represents the absolute fully qualified backend path.
- [x] **Verified Variable:** `VITE_SUPABASE_PUBLISHABLE_KEY` prevents confusing secret-token injections.
- [x] **Verified Absence:** No keys named `_SECRET_`, `_SERVICE_ROLE_`, or generic passwords are functionally ingested by `env.ts`.

## 2. Security Defaults
- [x] **Preview Default:** Removing or failing to provide proper Supabase domains successfully gracefully defaults the client entirely into isolated `Preview Mode`.
- [x] **Browser Isolation:** Supabase client bindings strictly pull from the VITE_ prefixed domains, preventing node-environment elevated secrets from breaching the public rollup configurations.
- [x] **Client Initialization Strategy:** Lazy creation operates flawlessly, preserving the memory block correctly when offline.

## 3. Remote Authorization
- [ ] **Auth Resolution:** Are `auth.users` instances resolving to proper mapped `profiles` and subsequently `center_memberships`? *(Requires remote schema synchronization)*.
- [ ] **RLS Verification:** Does the authenticated browser user actually abide by the `current_user_center_id` bounds defined. *(Requires remote schema synchronization)*.

## 4. Activation Decision Gate
**BLOCKED — PROJECT TYPE REQUIRES USER CONFIRMATION**
The codebase itself is entirely primed and capable of switching via environment keys immediately. However, doing so requires physically deploying the schema migrations over a Supabase dashboard safely. Until the MCP or remote bridge allows that physical application of the SQL drafts, the application itself will immediately crash with PostgREST `404 Relation Not Found` errors.
