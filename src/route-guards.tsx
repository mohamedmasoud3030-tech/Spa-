import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { can, SessionState } from "./domain/entities/Session";
import { config } from "./config/env";

export function RequireAuth() {
  const { isInitialized, sessionState, user } = useAppContext();
  const location = useLocation();

  if (!isInitialized || sessionState.status === "loading") {
    return <div className="min-h-screen flex items-center justify-center font-mono">Loading App...</div>;
  }

  // If there's an error and it's auth not configured, redirect to login so it shows the message
  if (sessionState.status === "error" && sessionState.error.message.includes("not configured")) {
    return <Navigate to="/login" replace />;
  }

  if (sessionState.status === "anonymous" || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isPreview = sessionState.status === "preview";

  return (
      <>
        {isPreview && (
          <div className="bg-amber-100 text-amber-800 text-sm p-2 text-center fixed w-full top-0 z-50">
              ⚠️ وضع المعاينة (Preview Mode) - غير متصل بقاعدة بيانات. يمكنك تصفح الواجهات فقط ولن يتم الحفظ.
          </div>
        )}
        <div className={isPreview ? "mt-8" : ""}>
           <Outlet />
        </div>
      </>
  );
}

export function RequireAdmin() {
  const { isInitialized, sessionState, user } = useAppContext();
  const location = useLocation();

  if (!isInitialized || sessionState.status === "loading") {
    return <div className="min-h-screen flex items-center justify-center font-mono">Loading App...</div>;
  }

  if (sessionState.status === "error" && sessionState.error.message.includes("not configured")) {
    return <Navigate to="/login" replace />;
  }

  if (sessionState.status === "anonymous" || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin permission (preview always passes to allow viewing UI)
  if (!can(sessionState, "admin.access")) {
    return <Navigate to="/" replace />;
  }

  const isPreview = sessionState.status === "preview";

  return (
      <>
        {isPreview && (
          <div className="bg-amber-100 text-amber-800 text-sm p-2 text-center fixed w-full top-0 z-50">
              ⚠️ وضع المعاينة (Preview Mode) - غير متصل بقاعدة بيانات. يمكنك تصفح الواجهات فقط ولن يتم الحفظ.
          </div>
        )}
        <div className={isPreview ? "mt-8" : ""}>
           <Outlet />
        </div>
      </>
  );
}
