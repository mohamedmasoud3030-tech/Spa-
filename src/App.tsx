import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { AppRoutes } from "./routes";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./shared/components/Toast";
import { ConfirmProvider } from "./shared/components/ConfirmDialog";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AuthProvider>
          <ToastProvider>
            <ConfirmProvider>
              <HashRouter>
                <AppRoutes />
              </HashRouter>
            </ConfirmProvider>
          </ToastProvider>
        </AuthProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
