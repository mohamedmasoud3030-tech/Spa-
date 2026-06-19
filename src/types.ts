export type UserRole = "ADMIN" | "STAFF";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  loyaltyPoints: number;
  totalSpent: number;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  durationMins: number;
}

export interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  price: number;
  cost: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  commissionPercentage: number;
}

export interface Appointment {
  id: string;
  dateTime: string;
  status: string;
  customerId: string;
  employeeId: string;
  serviceId: string;
  customer?: Customer;
  employee?: Employee;
  service?: Service;
}

export interface Invoice {
  id: string;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  customerId: string;
  customer?: Customer;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  serviceId?: string;
  productId?: string;
  price: number;
  service?: Service;
  product?: Product;
}

// Rentrix specific types as requested
export interface SafeLease {
  id: string;
  unitId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: string;
}

export interface SafeUnit {
  id: string;
  propertyId: string;
  unitNumber: string;
  type: string;
  status: string;
}
