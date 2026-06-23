import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { can } from "./domain/entities/Session";
import { PageLoader } from "./shared/components/PageLoader";

export function RequireAuth() {
  const { isInitialized, sessionState, user } = useAppContext();
  const location = useLocation();

  if (!isInitialized || sessionState.status === "loading") {
    return <PageLoader />;
  }

  // If there's an error and it's auth not configured, redirect to login so it shows the message
  if (sessionState.status === "error" && sessionState.error.message.includes("not configured")) {
    return <Navigate to="/login" replace />;
  }

  if (sessionState.status === "anonymous" || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function RequireAdmin() {
  const { isInitialized, sessionState, user } = useAppContext();
  const location = useLocation();

  if (!isInitialized || sessionState.status === "loading") {
    return <PageLoader />;
  }

  if (sessionState.status === "error" && sessionState.error.message.includes("not configured")) {
    return <Navigate to="/login" replace />;
  }

  if (sessionState.status === "anonymous" || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!can(sessionState, "admin.access")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
