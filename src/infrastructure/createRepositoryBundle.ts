import { config } from "../config/env";
import {
  PreviewAuthAdapter,
  PreviewCustomerAdapter,
  PreviewEmployeeAdapter,
  PreviewServiceAdapter,
  PreviewAppointmentAdapter,
  PreviewProductAdapter,
  PreviewExpenseAdapter,
  PreviewInvoiceAdapter,
  PreviewSettingsAdapter,
  PreviewDashboardAdapter,
  PreviewReportAdapter
} from "./preview/PreviewAdapters";
import {
  AuthRepository,
  CustomerRepository,
  EmployeeRepository,
  ServiceRepository,
  AppointmentRepository,
  ProductRepository,
  ExpenseRepository,
  InvoiceRepository,
  SettingsRepository,
  DashboardRepository,
  ReportRepository
} from "../domain/ports/repositories";
import {
  SupabaseAuthAdapter,
  SupabaseCustomerAdapter,
  SupabaseEmployeeAdapter,
  SupabaseServiceAdapter,
  SupabaseAppointmentAdapter,
  SupabaseProductAdapter,
  SupabaseExpenseAdapter,
  SupabaseInvoiceAdapter,
  SupabaseSettingsAdapter,
  SupabaseDashboardAdapter,
  SupabaseReportAdapter
} from "./supabase";

export interface RepositoryBundle {
  authAdapter: AuthRepository;
  customerAdapter: CustomerRepository;
  employeeAdapter: EmployeeRepository;
  serviceAdapter: ServiceRepository;
  appointmentAdapter: AppointmentRepository;
  productAdapter: ProductRepository;
  expenseAdapter: ExpenseRepository;
  invoiceAdapter: InvoiceRepository;
  settingsAdapter: SettingsRepository;
  dashboardAdapter: DashboardRepository;
  reportAdapter: ReportRepository;
}

export class InfrastructureError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "InfrastructureError";
  }
}

export function createRepositoryBundle(): RepositoryBundle {
  if (config.backend === "supabase") {
    return {
      authAdapter: new SupabaseAuthAdapter(),
      customerAdapter: new SupabaseCustomerAdapter(),
      employeeAdapter: new SupabaseEmployeeAdapter(),
      serviceAdapter: new SupabaseServiceAdapter(),
      appointmentAdapter: new SupabaseAppointmentAdapter(),
      productAdapter: new SupabaseProductAdapter(),
      expenseAdapter: new SupabaseExpenseAdapter(),
      invoiceAdapter: new SupabaseInvoiceAdapter(),
      settingsAdapter: new SupabaseSettingsAdapter(),
      dashboardAdapter: new SupabaseDashboardAdapter(),
      reportAdapter: new SupabaseReportAdapter()
    };
  }

  // Fallback / default is preview mode
  return {
    authAdapter: new PreviewAuthAdapter(),
    customerAdapter: new PreviewCustomerAdapter(),
    employeeAdapter: new PreviewEmployeeAdapter(),
    serviceAdapter: new PreviewServiceAdapter(),
    appointmentAdapter: new PreviewAppointmentAdapter(),
    productAdapter: new PreviewProductAdapter(),
    expenseAdapter: new PreviewExpenseAdapter(),
    invoiceAdapter: new PreviewInvoiceAdapter(),
    settingsAdapter: new PreviewSettingsAdapter(),
    dashboardAdapter: new PreviewDashboardAdapter(),
    reportAdapter: new PreviewReportAdapter()
  };
}

