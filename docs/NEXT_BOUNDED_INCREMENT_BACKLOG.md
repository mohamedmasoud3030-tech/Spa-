# Next Bounded Increment Backlog

Given the completed stabilization of the `Customer` and `Service` domain entity workflows, we can map out the sequential path toward enabling real live-data pilot testing.

## Candidate Increment A — Employees
*   **Assessment:** Employee data resembles master-data constraints, much like Customers and Services. Tenant bounds are direct via `center_id`.
*   **Dependencies:** Employees have distinct ties to the `center_memberships` and overall schedule roles. 
*   **Risks:** Profile syncing may be necessary depending on whether employees are configured as active app users or solely static tracking records.
*   **Conclusion:** Very safe read-write expansion target. 

## Candidate Increment B — Appointments
*   **Assessment:** Operational data layer. Dense constraints linking `Customer`, `Service`, and `Employee`. 
*   **Dependencies:** Heavily reliant on stable master data. Requires timestamp parsing strictness.
*   **Risks:** Schedule concurrency bugs. Modification of statuses could cause inconsistent local state.
*   **Conclusion:** Requires intermediate DML expansion but is heavily scoped to isolated operations rather than transactional ledgers.

## Candidate Increment C — Products & Expenses
*   **Assessment:** Light ledger tracking combined with strict catalog constraints.
*   **Dependencies:** Products drive `inventory_movements` but standard adjustments are safe. 
*   **Conclusion:** Low risk boundary for standard reads and writes.

## Candidate Increment D — Checkout RPC
*   **Assessment:** Highly complex transactional layer. Invoices directly mandate corresponding `invoice_items`, `payments`, and `inventory_movements` (stock locking).
*   **Dependencies:** Entire application state needs to be mapped.
*   **Risks:** Atomicity failure could sever financial records. Cross-tenant pollution inside a failed SQL transaction must be prevented strictly through `SECURITY DEFINER` isolation. 

## Final Recommendation Sequence
Do not attempt parallel implementation. Implement strictly in this order:

1.  **Next Bounded Phase:** **Increment B (Appointments) & Increment A (Employees)**
    *   This empowers the baseline master-data capabilities across the operational timeline, completing the core management view for front-desk operators without touching any sensitive financial ledgers.
2.  **Next:** **Increment C (Products & Expenses)**
    *   Finalizes the catalogs.
3.  **Final:** **Increment D (Checkout RPC)**
    *   Once the system is saturated and absolutely stabilized around tracking, locking the financial models to RPC enables safe scale over remote Supabases.
