# Database Blueprint

## Planned Tables

### 1. `profiles`
- `id`: uuid (PK, refs auth.users)
- `username`: text
- `name`: text
- `role`: text (enum: 'ADMIN', 'MANAGER', 'STAFF')
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 2. `customers`
- `id`: uuid (PK)
- `name`: text
- `phone`: text (nullable)
- `email`: text (nullable)
- `total_spent`: numeric (default 0)
- `loyalty_points`: integer (default 0)
- `last_visit_at`: timestamptz (nullable)
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 3. `employees`
- `id`: uuid (PK)
- `name`: text
- `role`: text
- `phone`: text (nullable)
- `salary`: numeric
- `commission_percentage`: numeric
- `is_active`: boolean (default true)
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 4. `services`
- `id`: uuid (PK)
- `category_id`: uuid (FK optional)
- `name`: text
- `price`: numeric
- `duration_minutes`: int
- `is_active`: boolean (default true)
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 5. `appointments`
- `id`: uuid (PK)
- `customer_id`: uuid (FK refs customers)
- `employee_id`: uuid (FK refs employees, nullable)
- `service_id`: uuid (FK refs services, nullable)
- `date_time`: timestamptz
- `status`: text (enum: 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')
- `notes`: text
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 6. `products`
- `id`: uuid (PK)
- `name`: text
- `barcode`: text
- `stock_quantity`: int
- `price`: numeric
- `cost`: numeric
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 7. `invoices`
- `id`: uuid (PK)
- `serial_number`: text
- `date`: timestamptz
- `total_amount`: numeric
- `discount`: numeric
- `loyalty_points_used`: int
- `payment_method`: text
- `customer_id`: uuid (FK refs customers)
- `created_at`: timestamptz
- `updated_at`: timestamptz

### 8. `expenses`
- `id`: uuid (PK)
- `amount`: numeric
- `category`: text
- `description`: text
- `date`: timestamptz
- `created_at`: timestamptz

### 9. `center_settings`
- `id`: text (PK) // singleton record logic usually implies basic ID
- `name`: text
- `currency`: text
- `tax_rate`: numeric
- `logo_path`: text
- `address`: text
- `phone`: text

## Enums Strategy
Use PostgreSQL native `CREATE TYPE <enum_name> AS ENUM ('a', 'b')` for fields like `appointment_status` and `user_role`.

## Ownership Boundaries
- Currently a single-tenant architecture without explicit branches. If multi-tenant occurs, a `tenant_id` column will be used for isolation.

## Audit Fields
- All primary models include `created_at` and `updated_at` handled via trigger or server defaults.

## Transactions Boundaries
- Appointments transitioning to invoices decrement stock quantities transactionally as part of an RPC to avoid partial failures.
- Product inventory adjustments must be strictly audited.

## Seeding
- Seed data strategy involves `seed.sql` generated using the current adapter's default array dataset for local supabase instances.
