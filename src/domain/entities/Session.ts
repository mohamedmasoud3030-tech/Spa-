export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name?: string;
}

export type SessionState =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "authenticated"; session: AuthenticatedSession }
  | { status: "error"; error: Error };

export interface AuthenticatedSession {
  user: User;
}

// Permissions granted to each role (additive — higher roles include lower ones).
const MANAGER_PERMISSIONS = new Set([
  "reports.view",
  "settings.view",
  "settings.update",
]);

const STAFF_PERMISSIONS = new Set([
  "appointments.view",
  "appointments.create",
  "appointments.update",
  "appointments.delete",
  "customers.view",
  "customers.create",
  "customers.update",
  "services.view",
  "products.view",
  "pos.checkout",
]);

export function can(sessionState: SessionState, permission: string): boolean {
  if (sessionState.status !== "authenticated") return false;

  const role = sessionState.session.user.role;

  if (role === UserRole.ADMIN) return true;

  if (role === UserRole.MANAGER) {
    return MANAGER_PERMISSIONS.has(permission) || STAFF_PERMISSIONS.has(permission);
  }

  if (role === UserRole.STAFF) {
    return STAFF_PERMISSIONS.has(permission);
  }

  return false;
}
