import { createRepositoryBundle } from "../../infrastructure/createRepositoryBundle";
import { config } from "../../config/env";
import { Result } from "../../domain/ports/repositories";
import { Appointment, Customer, Employee, Expense, Product, Service, CenterSettings, Invoice } from "../../domain/entities";
import { CheckoutPayload, BackupPayload } from "../../application/dto";
import { tenantContext, requireConfiguredCenterId } from "../../infrastructure/tenantContext";

function checkPreviewWrite<T>(action: string): Result<T, any> | null {
  if (config.previewModeEnabled) {
    const err: any = new Error(`Preview mode read-only. [${action}] is not permitted.`);
    err.code = "PREVIEW_READ_ONLY";
    return { ok: false, error: err };
  }
  return null;
}

const {
  authAdapter,
  customerAdapter,
  employeeAdapter,
  serviceAdapter,
  appointmentAdapter,
  productAdapter,
  expenseAdapter,
  invoiceAdapter,
  settingsAdapter,
  dashboardAdapter,
  reportAdapter
} = createRepositoryBundle();

// Generic helper to unwrap Result and enforce errors instead of silently failing,
// but for our React hooks we will pass the promise.
export const useCases = {
  auth: {
    login: (u: string, p: string) => authAdapter.login(u, p),
    logout: () => authAdapter.logout(),
    getSession: () => authAdapter.getSession(),
    getMyCenters: () => authAdapter.getMyCenters(),
  },
  dashboard: {
    getSummary: () => dashboardAdapter.getSummary(),
    getPnlMonth: () => dashboardAdapter.getPnlMonth(),
    getRevenueLast7Days: () => dashboardAdapter.getRevenueLast7Days(),
  },
  appointments: {
    list: (range?: { fromISO: string, toISO: string }) => appointmentAdapter.list(range || { fromISO:"", toISO:"" }),
    create: async (data: Partial<Appointment>) => checkPreviewWrite<Appointment>("Appointments.create") || appointmentAdapter.create(data),
    update: async (id: string, data: Partial<Appointment>) => checkPreviewWrite<Appointment>("Appointments.update") || appointmentAdapter.update(id, data),
    delete: async (id: string) => checkPreviewWrite<void>("Appointments.delete") || appointmentAdapter.delete(id),
    sendReminder: async (id: string): Promise<Result<void, any>> => ({ ok: true, data: undefined }),
  },
  services: {
    list: () => serviceAdapter.list(),
    create: async (data: Partial<Service>) => checkPreviewWrite<Service>("Services.create") || serviceAdapter.create(data),
    update: async (id: string, data: Partial<Service>) => checkPreviewWrite<Service>("Services.update") || serviceAdapter.update(id, data),
    delete: async (id: string) => checkPreviewWrite<void>("Services.delete") || serviceAdapter.delete(id),
  },
  customers: {
    list: (q?: string) => customerAdapter.list(q),
    create: async (data: Partial<Customer>) => checkPreviewWrite<Customer>("Customers.create") || customerAdapter.create(data),
    update: async (id: string, data: Partial<Customer>) => checkPreviewWrite<Customer>("Customers.update") || customerAdapter.update(id, data),
    getHistory: (id: string) => customerAdapter.getHistory(id),
    delete: async (id: string) => checkPreviewWrite<void>("Customers.delete") || customerAdapter.delete(id),
  },
  employees: {
    list: () => employeeAdapter.list(),
    create: async (data: Partial<Employee>) => checkPreviewWrite<Employee>("Employees.create") || employeeAdapter.create(data),
    update: async (id: string, data: Partial<Employee>) => checkPreviewWrite<Employee>("Employees.update") || employeeAdapter.update(id, data),
    delete: async (id: string) => checkPreviewWrite<void>("Employees.delete") || employeeAdapter.delete(id),
  },
  products: {
    list: () => productAdapter.list(),
    listFull: () => productAdapter.listFull(),
    create: async (data: Partial<Product>) => checkPreviewWrite<Product>("Products.create") || productAdapter.create(data),
    update: async (id: string, data: Partial<Product>) => checkPreviewWrite<Product>("Products.update") || productAdapter.update(id, data),
    delete: async (id: string) => checkPreviewWrite<void>("Products.delete") || productAdapter.delete(id),
  },
  expenses: {
    list: () => expenseAdapter.list(),
    create: async (data: Partial<Expense>) => checkPreviewWrite<Expense>("Expenses.create") || expenseAdapter.create(data),
    delete: async (id: string) => checkPreviewWrite<void>("Expenses.delete") || expenseAdapter.delete(id),
  },
  settings: {
    get: () => settingsAdapter.get(),
    update: async (data: Partial<CenterSettings>) => checkPreviewWrite<CenterSettings>("Settings.update") || settingsAdapter.update(data),
    uploadLogo: async (file: File) => checkPreviewWrite<{ logoPath: string }>("Settings.uploadLogo") || settingsAdapter.uploadLogo(file),
    backup: async () => checkPreviewWrite<{ message: string }>("Settings.backup") || settingsAdapter.backup(),
    exportData: async () => checkPreviewWrite<any>("Settings.exportData") || settingsAdapter.exportData(),
    restore: async (data: BackupPayload) => checkPreviewWrite<void>("Settings.restore") || settingsAdapter.restore(data),
  },
  invoices: {
    checkout: async (data: CheckoutPayload) => checkPreviewWrite<{invoice: Invoice, total: number, earned: number}>("Invoices.checkout") || invoiceAdapter.checkout(data),
    getForPrint: (id: string) => invoiceAdapter.getForPrint(id),
  },
  reports: {
    getSales: (f: string, t: string) => reportAdapter.getSales(f, t),
    getAppointments: (f: string, t: string) => reportAdapter.getAppointments(f, t),
    getInventory: () => reportAdapter.getInventory(),
  },
  tenant: {
    setActiveCenterId: (id: string | null) => {
      tenantContext.activeCenterId = id;
    },
    getActiveCenterId: () => {
      try {
        return requireConfiguredCenterId();
      } catch {
        return tenantContext.activeCenterId;
      }
    }
  }
};
