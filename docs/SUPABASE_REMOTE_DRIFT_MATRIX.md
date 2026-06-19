# Supabase Remote Drift Matrix

*Note: Execution of this matrix is **BLOCKED** due to MCP execution constraints within the host container environment. The remote states evaluate to `UNKNOWN` universally until physical inspection queries are authorized or manually provided.*

| Object | Local Draft State | Remote State | Difference | Risk | Required Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`app_private` Schema** | Required (Security Definers) | UNKNOWN | UNKNOWN | HIGH | Initialize private namespace. |
| **`customers` Table** | Drafted with `center_id` UUID | UNKNOWN | UNKNOWN | HIGH | Apply structural DDL. |
| **`services` Table** | Drafted with `center_id` UUID | UNKNOWN | UNKNOWN | HIGH | Apply structural DDL. |
| **RLS Policies** | Drafted `WITH CHECK` protections | UNKNOWN | UNKNOWN | CRITICAL | Enable RLS and verify bounds. |
| **Tenant Functions** | `get_current_user_center_id` draft | UNKNOWN | UNKNOWN | CRITICAL | Apply helper functions. |
| **Tenant Triggers** | `tr_customers_set_tenant` draft | UNKNOWN | UNKNOWN | CRITICAL | Apply `BEFORE INSERT` triggers. |
| **Reassignment Blocks**| `prevent_tenant_reassignment` draft | UNKNOWN | UNKNOWN | CRITICAL | Apply `BEFORE UPDATE` blocks. |
