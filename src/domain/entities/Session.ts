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

export function can(sessionState: SessionState, permission: string): boolean {
  if (sessionState.status !== "authenticated") return false;

  const role = sessionState.session.user.role;

  if (role === UserRole.ADMIN) return true;

  // Granular settings could go here
  if (permission.startsWith("reports.") || permission.startsWith("settings.")) {
    return role === UserRole.MANAGER;
  }

  return true;
}
