import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./ui/layout/Layout";
import { RequireAdmin, RequireAuth } from "./route-guards";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PosInvoicesPage from "./pages/PosInvoicesPage";
import ServicesPage from "./pages/ServicesPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";
import InventoryPage from "./pages/InventoryPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pos" element={<PosInvoicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />

          <Route element={<RequireAdmin />}>
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
