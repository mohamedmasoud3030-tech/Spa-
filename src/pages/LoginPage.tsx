import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { useTranslation } from "react-i18next";
import { Lock, User } from "lucide-react";
import { config } from "../config/env";
import { clsx } from "clsx";
import { useAppContext } from "../context/AppContext";

export default function LoginPage() {
  const nav = useNavigate();
  const { login: authenticate } = useAuth();
  const { isInitialized, sessionState } = useAppContext();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isRtl = i18n.language === "ar";
  
  // Show app-level init error if exists
  const initError = (isInitialized && sessionState.status === "error") ? sessionState.error.message : null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authenticate(username, password);
      nav("/", { replace: true });
    } catch (err) {
      const e = err as { code?: string; message?: string };
      if (e.code === "AUTH_NOT_CONFIGURED") {
        setError(t("Authentication not configured yet. Database setup required."));
      } else {
        setError(e.message || String(err) || t("Login failed. Check your details."));
      }
    }
  };

  const handlePreview = async () => {
    try {
      if (!config.previewModeEnabled) return;
      await authenticate("preview", "preview");
      nav("/", { replace: true });
    } catch (err) {
      setError((err as { message?: string }).message || String(err));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-neutral-200">
        <div className="text-center pb-4 pt-8 px-6">
          <div className="w-16 h-16 mx-auto bg-amber-600 rounded-full flex items-center justify-center mb-4 text-white">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">{t("Sign In")}</h2>
          <p className="text-neutral-500 mt-2">{t("Enter credentials to continue")}</p>
        </div>
        <div className="px-6 pb-8">
          {(initError || error) && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center mb-4">
              {initError ? t(initError) : t(error)}
              {initError && <div className="mt-1 text-xs opacity-80">{t("Supabase production login is disabled until configured.")}</div>}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute top-3.5 h-4 w-4 text-neutral-400 start-3" />
                <input
                  autoFocus
                  placeholder={t("Username")}
                  className="w-full py-2 font-mono border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ps-9 pe-3 disabled:opacity-50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  dir="ltr"
                  disabled={!!initError}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute top-3.5 h-4 w-4 text-neutral-400 start-3" />
                <input
                  type="password"
                  placeholder={t("Password")}
                  className="w-full py-2 font-mono border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ps-9 pe-3 disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  disabled={!!initError}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!!initError}
              className="w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" 
            >
              {t("Sign In")}
            </button>
          </form>

          {config.previewModeEnabled && (
             <div className="mt-6 pt-6 border-t border-neutral-100 space-y-4">
                <div className="bg-amber-50 text-amber-600 p-3 rounded-md text-sm text-center">
                  {t("Preview mode active. You can browse the UI without a backend.")}
                </div>
                <button 
                  onClick={handlePreview}
                  type="button" 
                  className="w-full py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 shadow-sm" 
                >
                  {t("Enter Preview Mode")}
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
