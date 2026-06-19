import { AuthRepository, Result, AuthError, DomainError, CustomerRepository, EmployeeRepository, ServiceRepository, AppointmentRepository, ProductRepository, ExpenseRepository, InvoiceRepository, SettingsRepository, DashboardRepository, ReportRepository } from "../../domain/ports/repositories";
import { SessionState, UserRole } from "../../domain/entities/Session";
import { Customer, Employee, Service, Appointment, Product, Expense, Invoice, CenterSettings } from "../../domain/entities";
import { config } from "../../config/env";

import { CheckoutPayload, InvoicePrintData, DashboardSummary, PnlData, ChartData, SalesReportRow, AppointmentReportRow, InventoryReportRow, BackupPayload } from "../../application/dto";

export function createPreviewError(method: string): DomainError {
  const err = new Error(`Preview mode read-only. [${method}] is not permitted.`) as DomainError;
  err.code = "PREVIEW_READ_ONLY";
  return err;
}

export function createDisconnectedError(method: string): DomainError {
  const err = new Error(`Backend is disconnected. [${method}] is not implemented.`) as DomainError;
  err.code = "INFRASTRUCTURE_ERROR";
  return err;
}

const previewSession: SessionState = {
  status: "preview",
  session: {
    user: {
      id: "preview-user-id",
      username: "preview",
      role: UserRole.PREVIEW,
      name: "Preview User"
    }
  }
};

export class PreviewAuthAdapter implements AuthRepository {
  async login(u: string, p: string): Promise<Result<SessionState, AuthError>> {
    if (!config.previewModeEnabled) {
      const err = new Error("Authentication not configured. Set VITE_ENABLE_PREVIEW_MODE to false and setup Supabase.") as AuthError;
      err.code = "AUTH_NOT_CONFIGURED";
      return { ok: false, error: err };
    }
    // Preview mode login
    return { ok: true, data: previewSession };
  }
  async logout(): Promise<Result<void, AuthError>> {
    return { ok: true, data: undefined };
  }
  async getSession(): Promise<Result<SessionState, AuthError>> {
    if (config.previewModeEnabled) {
      return { ok: true, data: previewSession };
    }
    const err = new Error("Auth not configured") as AuthError;
    err.code = "AUTH_NOT_CONFIGURED";
    return { ok: false, error: err };
  }
  async getMyCenters(): Promise<Result<{ id: string, name: string }[], AuthError>> {
    if (config.previewModeEnabled) {
      return { ok: true, data: [{ id: "preview-center-id", name: "Preview Center" }] };
    }
    const err = new Error("Auth not configured") as AuthError;
    err.code = "AUTH_NOT_CONFIGURED";
    return { ok: false, error: err };
  }
}

export class SharedNullAdapter {
  protected checkMode(method: string): Result<any, DomainError> | null {
    if (!config.previewModeEnabled) {
      return { ok: false, error: createDisconnectedError(method) };
    }
    return null;
  }
}

export class PreviewCustomerAdapter extends SharedNullAdapter implements CustomerRepository {
  async list(_query?: string): Promise<Result<Customer[], DomainError>> {
    const err = this.checkMode("Customer.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async getById(_id: string): Promise<Result<Customer, DomainError>> {
    const err = this.checkMode("Customer.getById"); if (err) return err;
    return { ok: false, error: createPreviewError("Customer.getById") };
  }
  async create(_data: Partial<Customer>): Promise<Result<Customer, DomainError>> {
    return { ok: false, error: createPreviewError("Customer.create") };
  }
  async update(_id: string, _data: Partial<Customer>): Promise<Result<Customer, DomainError>> {
    return { ok: false, error: createPreviewError("Customer.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Customer.delete") };
  }
  async getHistory(_id: string): Promise<Result<any, DomainError>> {
    const err = this.checkMode("Customer.getHistory"); if (err) return err;
    return { ok: true, data: { appointments: [], invoices: [] } };
  }
}

export class PreviewEmployeeAdapter extends SharedNullAdapter implements EmployeeRepository {
  async list(): Promise<Result<Employee[], DomainError>> {
    const err = this.checkMode("Employee.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async create(_data: Partial<Employee>): Promise<Result<Employee, DomainError>> {
    return { ok: false, error: createPreviewError("Employee.create") };
  }
  async update(_id: string, _data: Partial<Employee>): Promise<Result<Employee, DomainError>> {
    return { ok: false, error: createPreviewError("Employee.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Employee.delete") };
  }
}

export class PreviewServiceAdapter extends SharedNullAdapter implements ServiceRepository {
  async list(): Promise<Result<Service[], DomainError>> {
    const err = this.checkMode("Service.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async create(_data: Partial<Service>): Promise<Result<Service, DomainError>> {
    return { ok: false, error: createPreviewError("Service.create") };
  }
  async update(_id: string, _data: Partial<Service>): Promise<Result<Service, DomainError>> {
    return { ok: false, error: createPreviewError("Service.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Service.delete") };
  }
}

export class PreviewAppointmentAdapter extends SharedNullAdapter implements AppointmentRepository {
  async list(_range?: { fromISO: string, toISO: string }): Promise<Result<Appointment[], DomainError>> {
    const err = this.checkMode("Appointment.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async create(_data: Partial<Appointment>): Promise<Result<Appointment, DomainError>> {
    return { ok: false, error: createPreviewError("Appointment.create") };
  }
  async update(_id: string, _data: Partial<Appointment>): Promise<Result<Appointment, DomainError>> {
    return { ok: false, error: createPreviewError("Appointment.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Appointment.delete") };
  }
}

export class PreviewProductAdapter extends SharedNullAdapter implements ProductRepository {
  async list(): Promise<Result<Product[], DomainError>> {
    const err = this.checkMode("Product.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async listFull(): Promise<Result<Product[], DomainError>> {
    const err = this.checkMode("Product.listFull"); if (err) return err;
    return { ok: true, data: [] };
  }
  async create(_data: Partial<Product>): Promise<Result<Product, DomainError>> {
    return { ok: false, error: createPreviewError("Product.create") };
  }
  async update(_id: string, _data: Partial<Product>): Promise<Result<Product, DomainError>> {
    return { ok: false, error: createPreviewError("Product.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Product.delete") };
  }
}

export class PreviewExpenseAdapter extends SharedNullAdapter implements ExpenseRepository {
  async list(): Promise<Result<Expense[], DomainError>> {
    const err = this.checkMode("Expense.list"); if (err) return err;
    return { ok: true, data: [] };
  }
  async create(_data: Partial<Expense>): Promise<Result<Expense, DomainError>> {
    return { ok: false, error: createPreviewError("Expense.create") };
  }
  async update(_id: string, _data: Partial<Expense>): Promise<Result<Expense, DomainError>> {
    return { ok: false, error: createPreviewError("Expense.update") };
  }
  async delete(_id: string): Promise<Result<void, DomainError>> {
    return { ok: false, error: createPreviewError("Expense.delete") };
  }
}

export class PreviewInvoiceAdapter extends SharedNullAdapter implements InvoiceRepository {
  async checkout(_payload: CheckoutPayload): Promise<Result<{ invoice: Invoice, total: number, earned: number }, DomainError>> {
    return { ok: false, error: createPreviewError("Invoice.checkout") };
  }
  async getForPrint(_id: string): Promise<Result<InvoicePrintData, DomainError>> {
    return { ok: false, error: createPreviewError("Invoice.getForPrint") };
  }
}

export class PreviewSettingsAdapter extends SharedNullAdapter implements SettingsRepository {
  async get(): Promise<Result<CenterSettings, DomainError>> {
    const err = this.checkMode("Settings.get"); if (err) return err;
    return { 
      ok: true, 
      data: { id: "1", name: "Preview Center", currency: "$", taxRate: 0 } as CenterSettings 
    };
  }
  async update(_data: Partial<CenterSettings>): Promise<Result<CenterSettings, DomainError>> {
    return { ok: false, error: createPreviewError("Settings.update") };
  }
  async uploadLogo(_file: File): Promise<Result<{ logoPath: string }, DomainError>> {
    return { ok: true, data: { logoPath: "" } };
  }
  async backup(): Promise<Result<{ message: string }, DomainError>> {
    const err = this.checkMode("Settings.backup"); if (err) return err;
    return { ok: true, data: { message: "Backup simulated successfully" } };
  }
  async exportData(): Promise<Result<any, DomainError>> {
    const err = this.checkMode("Settings.exportData"); if (err) return err;
    return { ok: true, data: {} };
  }
  async restore(_data: BackupPayload): Promise<Result<void, DomainError>> {
    const err = this.checkMode("Settings.restore"); if (err) return err;
    return { ok: true, data: undefined };
  }
}

export class PreviewDashboardAdapter extends SharedNullAdapter implements DashboardRepository {
  async getSummary(): Promise<Result<DashboardSummary, DomainError>> {
    const err = this.checkMode("Dashboard.getSummary"); if (err) return err;
    return { 
      ok: true, 
      data: { revenue: 0, appointments: 0, customers: 0, sales: 0 }
    };
  }
  async getPnlMonth(): Promise<Result<PnlData, DomainError>> {
    const err = this.checkMode("Dashboard.getPnlMonth"); if (err) return err;
    return { ok: true, data: { profit: 0, revenue: 0, baseSalaries: 0, commissions: 0, expenses: 0 } };
  }
  async getRevenueLast7Days(): Promise<Result<ChartData[], DomainError>> {
    const err = this.checkMode("Dashboard.getRevenueLast7Days"); if (err) return err;
    return { ok: true, data: [] };
  }
}

export class PreviewReportAdapter extends SharedNullAdapter implements ReportRepository {
  async getSales(_from: string, _to: string): Promise<Result<SalesReportRow[], DomainError>> {
     const err = this.checkMode("Report.getSales"); if (err) return err;
     return { ok: true, data: [] };
  }
  async getAppointments(_from: string, _to: string): Promise<Result<AppointmentReportRow[], DomainError>> {
     const err = this.checkMode("Report.getAppointments"); if (err) return err;
     return { ok: true, data: [] };
  }
  async getInventory(): Promise<Result<InventoryReportRow[], DomainError>> {
     const err = this.checkMode("Report.getInventory"); if (err) return err;
     return { ok: true, data: [] };
  }
}
