import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { AppRoutes } from "./routes";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./shared/components/Toast";
import { ConfirmProvider } from "./shared/components/ConfirmDialog";

export default function App() {
  return (
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
  );
}
