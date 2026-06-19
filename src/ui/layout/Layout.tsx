import { Outlet, useLocation, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../auth";
import { Menu, Bell, Search, ChevronRight, LayoutGrid, Sparkles, Zap, Star, LayoutDashboard, CalendarDays, Receipt, Users } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

export default function Layout() {
  const { me, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // Dynamically sync language and direction on document element
  useEffect(() => {
    const currentLang = i18n.language || 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  const pageTitle = useMemo(() => {
    const path = location.pathname.substring(1);
    if (!path) return t("Dashboard");
    return t(path.charAt(0).toUpperCase() + path.slice(1));
  }, [location.pathname, t]);

  const isRtl = i18n.language === "ar";

  const bottomNavItems = [
    { to: "/", labelKey: "Home", Icon: LayoutDashboard },
    { to: "/appointments", labelKey: "Appointments", Icon: CalendarDays },
    { to: "/pos", labelKey: "POS", Icon: Receipt },
    { to: "/customers", labelKey: "Customers", Icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground pb-[72px] lg:pb-0">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[320px_1fr] relative">
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar Container */}
        <div className={clsx(
          "fixed inset-y-0 z-50 w-[80%] max-w-[320px] transform transition-all duration-300 ease-[0.23,1,0.32,1] lg:static lg:translate-x-0 shadow-2xl lg:shadow-none print:hidden start-0",
          showSidebar 
            ? "translate-x-0" 
            : (isRtl ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0")
        )}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </div>

        <div className="flex min-w-0 flex-col relative">
          {/* Immersive Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden print:hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
          </div>

          <header className="sticky top-0 z-30 flex h-16 sm:h-20 lg:h-24 items-center justify-between border-b border-border bg-card/60 px-4 sm:px-8 lg:px-10 backdrop-blur-3xl shadow-sm print:hidden">
            <div className="flex items-center gap-3 sm:gap-6">
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-10 sm:w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-foreground sm:text-muted-foreground/80 leading-tight">
                    {pageTitle}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              <div className="hidden md:flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border border-border shadow-inner group focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition-all">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary ms-2" />
                <input 
                  type="text" 
                  placeholder={t("Search anything...")}
                  className="bg-transparent border-none outline-none text-xs font-bold text-foreground placeholder:text-muted-foreground/70 w-28 sm:w-48"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all shadow-sm relative group">
                  <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute top-2.5 end-2.5 sm:top-3 sm:end-3 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary border-2 border-car shadow-sm" />
                </button>
                
                <div className="h-10 w-px bg-border mx-0.5 sm:mx-1 hidden sm:block" />
                
                <div className="hidden sm:flex flex-col items-end text-end">
                  <span className="text-sm font-bold text-foreground tracking-tight">{me?.username}</span>
                  {!!me?.role && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-80">
                        {me.role === "ADMIN" ? t("Administrator") : me.role === "STAFF" ? t("Staff Member") : ""}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center text-primary font-bold text-lg shadow-inner hover:scale-110 transition-transform cursor-pointer">
                  {me?.username?.[0]?.toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 p-3 sm:p-8 lg:p-12 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="h-auto py-6 sm:h-20 border-t border-border/50 hidden sm:flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-12 bg-card/20 backdrop-blur-sm print:hidden">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                <Zap className="h-3 w-3" />
                {t("System Online")}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                <Star className="h-3 w-3" />
                {t("Premium Build")}
              </div>
            </div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] opacity-30 text-center sm:text-end">
              &copy; {new Date().getFullYear()} KANZY SPA &bull; {t("All Rights Reserved")}
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/80 backdrop-blur-3xl border-t border-border shadow-[0_-8px_30px_rgb(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)] print:hidden">
        <nav className="flex items-center justify-around h-[72px] px-2">
          {bottomNavItems.map(({ to, labelKey, Icon }) => (
             <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-200",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={clsx(
                    "flex items-center justify-center h-8 w-14 rounded-full transition-all duration-300",
                    isActive ? "bg-primary/15 scale-110" : "bg-transparent scale-100"
                  )}>
                    <Icon className={clsx("h-5 w-5", isActive && "fill-primary/20 stroke-[2.5px]")} />
                  </div>
                  <span className={clsx(
                    "text-[10px] font-bold tracking-wider",
                    isActive && "text-primary"
                  )}>
                    {t(labelKey)}
                  </span>
                </>
              )}
            </NavLink>
          ))}
          <button 
            onClick={() => setShowSidebar(true)}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <div className="flex items-center justify-center h-8 w-14 rounded-full bg-transparent">
              <Menu className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold tracking-wider">{t("Menu")}</span>
          </button>
        </nav>
      </div>

    </div>
  );
}
