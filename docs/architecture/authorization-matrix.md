# RBAC and Authorization Matrix

## Roles
- **ADMIN**: Has unrestricted access to all operations in the platform including System Configurations.
- **MANAGER**: Has access to all reports, appointments, products, and employee schedules, but may not modify core system behaviors or view overarching system configurations.
- **STAFF**: Read-only restrictions for global data. Can only manipulate assignments targeting themselves explicitly. Cannot see financial reports or expenses lists.

## Module Authorization Policy

| Module / Action   | Admin | Manager | Staff | Unauthenticated |
| ----------------- | ----- | ------- | ----- | --------------- |
| **Auth**          |
| Login             | Read  | Read    | Read  | Read (only login) |
| **Dashboard**     |
| View Summaries    | Grant | Grant   | Deny  | Deny            |
| **Appointments**  |
| Read All          | Grant | Grant   | Own   | Deny            |
| Create New        | Grant | Grant   | Deny  | Deny            |
| **Customers**     |
| Read All          | Grant | Grant   | Grant | Deny            |
| Create / Update   | Grant | Grant   | Deny  | Deny            |
| **Inventory**     |
| View Stock        | Grant | Grant   | Grant | Deny            |
| Modify Stock      | Grant | Grant   | Deny  | Deny            |
| **Expenses**      |
| Read All          | Grant | Deny    | Deny  | Deny            |
| Add Expense       | Grant | Deny    | Deny  | Deny            |
| **Reports**       |
| Read All          | Grant | Grant   | Deny  | Deny            |
| **Settings**      |
| View / Configure  | Grant | Deny    | Deny  | Deny            |

## RLS Preparation
This matrix serves as the direct map for generating Supabase Row Level Security (RLS) policies targeting the endpoints inside the upcoming phases. Preview sessions and `UserRole.PREVIEW` are not valid released concepts.
