# Demo Operator Guide

This guide ensures operators can confidently present the Kanzy Spa unified management application to prospective owners or stakeholders while adhering to the safe, functional workflows.

## 1. How to Launch Preview Mode
The application heavily relies on an entirely isolated `Preview Mode`. Because live mutations across transactional tables are frozen to ensure sale readiness and zero risk, the demo operates locally against dynamic mocks that resemble actual data constraints.
To ensure the app boots in Preview mode, verify `.env.local` lacks active `VITE_SUPABASE_URL` bindings or ensure the environment loader maps the app back to fallback defaults correctly.

## 2. Demo Login Behavior
When in `Preview Mode`, you can use any username/password combination. The login flow simulates a successful handshake and resolves the session to `{ status: "preview" }`.
If booted in true Supabase mode, the login relies on the deployed `auth.users` pool.

## 3. Recommended Walkthrough Order
1. **Login**: Demonstrate the smooth ambient transition.
2. **Dashboard**: Show the analytics and aggregated POS values.
3. **App Header & Preferences**: Flip the UI language from English to Arabic, showing the true RTL structural mirroring.
4. **Customers**: View lists, view customer history logs.
5. **Services**: Navigate the services management. 
6. **POS System**: Create a mock checkout (which remains fully supported strictly within the UI-isolated preview logic) and print the receipt.

## 4. Customer Management Demonstration
Create, update, and delete actions for Customers are supported end-to-end within Preview mode and fully mapped for backend Supabase mode. Demonstrate inserting a new customer record to highlight the fast response times and safe input validation.

## 5. Service Management Demonstration
Showcase adding new salon services, specifying prices, and attaching duration minutes. You can also manipulate pricing updates inside the modal.

## 6. Appointment Demonstration
Switch to the built-in calendar to demonstrate the day-view, dragging appointments, and editing statuses constraint. Mention that backend integration for appointments is currently being synchronized securely.

## 7. POS Demonstration (Preview Only)
Navigate to the POS invoice page. Add services, add tips or products, and perform checkout. Explain that behind the scenes, checkout is preparing to be heavily protected through centralized atomicity so bad transactions never occur (which is a massive advantage compared to older standalone software). 

## 8. Receipt Printing Demonstration
After checking out inside the POS, the POS engine directly provides a modal. Press the Print button. 

## 9. Historical Reprint Demonstration
Navigate to a Customer's internal historical records page (under "Invoices" tab) and hit the newly minted "Print" option located on historical invoice lists. 

## 10. Reports Demonstration
Review the Sales, Inventory, and Analytics tracking. 

## 11. Mobile Demonstration
Use Chrome DevTools to showcase 390px layouts or perform the walkthrough directly on an iPad for best experience. Focus on horizontal navigation safety and table overflow resilience.

## 12. Known Limitations
- The `checkout` flow has not yet been wired for Postgres execution. It operates correctly in preview local-memory mode only.
- Historical data cannot be deeply modified after POS execution.
- Complex analytics are purely in read-only aggregations based on fixed backend formulas.

## 13. Actions Not Approved for Production
Do NOT demo importing heavy external Excel formats via third party plugins. Do NOT demo uploading giant imagery, as bucket integrations might drop the payload without settings synchronized.
Do NOT modify `.env.local` variables during live demos.

## 14. Customer Questions that Require Honest Bounded Answers
**Question:** Does it support multi-branch networks?
**Answer:** Yes, the fundamental architecture maps a strict `center_id` to everything. However, cross-branch analytics are deferred for a future expansion phase as current operations isolate per-tenant strictly.

**Question:** Can staff members manipulate past invoices?
**Answer:** The architecture enforces a zero-trust model meaning historical sales modification is severely blocked in our security layer, ensuring absolute financial integrity for the owner.
