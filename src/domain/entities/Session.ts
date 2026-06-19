export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  PREVIEW = "PREVIEW",
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
  | { status: "preview"; session: PreviewSession }
  | { status: "authenticated"; session: AuthenticatedSession }
  | { status: "error"; error: Error };

export interface PreviewSession {
  user: {
    id: "preview-user-id";
    username: "preview";
    role: UserRole.PREVIEW;
    name: "Preview User";
  };
}

export interface AuthenticatedSession {
  user: User;
}

export function can(sessionState: SessionState, permission: string): boolean {
  if (sessionState.status === "preview") {
    return true; // Preview can 'see' most things, but writes should fail at adapter.
  }
  if (sessionState.status !== "authenticated") return false;

  const role = sessionState.session.user.role;

  if (role === UserRole.ADMIN) return true;

  // Granular settings could go here
  if (permission.startsWith("reports.") || permission.startsWith("settings.")) {
    return role === UserRole.MANAGER;
  }

  return true;
}
