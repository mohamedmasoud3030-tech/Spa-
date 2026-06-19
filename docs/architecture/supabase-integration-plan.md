# Supabase Integration Plan

## Package Installation
In the next phase, we will install the `@supabase/supabase-js` package to provide the client SDK for database interactions.

## Client Adapter location
The client implementation will be placed under:
`src/infrastructure/persistence/SupabaseAdapters.ts` 

## Required Environment Variables
The following environment variables will be required inside `.env.local`:
- `VITE_SUPABASE_URL`: The URL for the Supabase project
- `VITE_SUPABASE_ANON_KEY`: The anonymous API key for the Supabase project

## Generated Database Types
The generated database TypeScript types will be downloaded using the Supabase CLI and saved under:
`src/infrastructure/persistence/database.types.ts`

## Migrations Strategy
Migrations will be defined inside a future `supabase/migrations/` directory using standard SQL generated via the Supabase CLI. Migrations will be applied sequentially upon deployment tracking. 

## RLS Policies Testing
RLS policies will be verified using Jest and the `@supabase/supabase-js` testing library to simulate requests as different `auth.uid()` values matching the roles.

## Specialized Operations (RPCs)
- **Point of Sale Checkout:** Transactions involving inventory decrementing, invoice generation, customer point deductions, and financial ledger logging must use a database RPC function to ensure atomic behavior.
- **Reporting Analytics:** Data aggregation tasks across wide ranges will use database views or RPCs to prevent downloading raw datasets onto the client.

## Standard Operations
CRUD operations regarding Customers, Appointments, Services, and Staff will utilize direct table accesses bounded by RLS (e.g. `supabase.from('customers').select(...)`).

## Storage Buckets
- A `public-assets` bucket will be required for handling `logoPath` business center image assets. Insert policies will be scoped to managers. Read access will be public.
