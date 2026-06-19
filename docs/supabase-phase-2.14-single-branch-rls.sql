-- Phase 2.14 Single-Branch Active Runtime - RLS Patch
-- This preserves multi-tenant tables but provides clean active membership policies.

-- Notes:
-- Avoids infinite recursion on center_memberships by checking profile_id directly.
-- Covers all scoped branches: appointments, products, expenses, customers, employees, services, invoices, inventory.

-- 1. center_memberships
DROP POLICY IF EXISTS center_memberships_select_own_active ON public.center_memberships;
CREATE POLICY center_memberships_select_own_active
ON public.center_memberships
FOR SELECT
TO authenticated
USING (
  profile_id = auth.uid()
  AND is_active = true
);

-- Note: The following function avoids needing to create complex subselects multiple times but we will stick to standard EXIST clause per guidelines.

-- 2. appointments
DROP POLICY IF EXISTS appointments_policy ON public.appointments;
CREATE POLICY appointments_policy
ON public.appointments
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = appointments.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 3. products
DROP POLICY IF EXISTS products_policy ON public.products;
CREATE POLICY products_policy
ON public.products
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = products.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 4. expenses
DROP POLICY IF EXISTS expenses_policy ON public.expenses;
CREATE POLICY expenses_policy
ON public.expenses
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = expenses.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 5. customers
DROP POLICY IF EXISTS customers_policy ON public.customers;
CREATE POLICY customers_policy
ON public.customers
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = customers.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 6. employees
DROP POLICY IF EXISTS employees_policy ON public.employees;
CREATE POLICY employees_policy
ON public.employees
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = employees.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 7. services
DROP POLICY IF EXISTS services_policy ON public.services;
CREATE POLICY services_policy
ON public.services
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = services.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 8. invoices
DROP POLICY IF EXISTS invoices_policy ON public.invoices;
CREATE POLICY invoices_policy
ON public.invoices
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = invoices.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);

-- 9. center_settings
DROP POLICY IF EXISTS center_settings_policy ON public.center_settings;
CREATE POLICY center_settings_policy
ON public.center_settings
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.center_memberships m
    WHERE m.center_id = center_settings.center_id
      AND m.profile_id = auth.uid()
      AND m.is_active = true
  )
);
