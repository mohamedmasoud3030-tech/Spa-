# Module Inventory

## Existing Modules

### Pages
- **AppointmentsPage**: Scheduling calendar and client booking views.
- **CustomersPage**: Client registry and historical data views.
- **DashboardPage**: Landing summary metrics and revenue charting.
- **EmployeesPage**: Staff lists, assignment rules, roles.
- **ExpensesPage**: Registry for financial outgoing transactions.
- **InventoryPage**: Product stock lists and management utilities.
- **LoginPage**: System entry point handling real Supabase authentication and blocking configuration errors.
- **PosInvoicesPage**: Checkout screen generating historical record transactions.
- **ReportsPage**: Graphical data overviews per time constraints.
- **ServicesPage**: Configurable settings targeting specific products provided directly using manpower.
- **SettingsPage**: Platform-wide organizational system settings configurations.

### Security Layouts & Guards
- `route-guards.tsx`: Implements role detection (`RequireAuth`, `RequireAdmin`) for unauthenticated, loading, error, and authenticated routing states.
- `AppRoutes`: Provides centralized hierarchy tracking layout scopes.

### Infrastructure Domains
- `infrastructure/supabase`: Contains the v1.0 real backend adapter implementation.
- `domain/entities`: Defines typed properties surrounding physical features such as `Service`, `Customer`, `Employee`.
- `config/env`: Isolated loader reading Vite configuration attributes without cluttering downstream usage behaviors.

## Placeholder Behaviors
Unsupported backend operations must fail through typed domain errors such as `INFRASTRUCTURE_ERROR`, `AUTH_NOT_CONFIGURED`, and `BACKEND_METHOD_UNSUPPORTED`. The released product must not use Preview Mode as a placeholder behavior.
