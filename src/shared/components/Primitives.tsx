import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Search, Info, Check, Plus, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "muted";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-2xl font-bold uppercase tracking-wider text-[10px] transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          {
            "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/10": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/95": variant === "secondary",
            "border border-border text-foreground hover:bg-muted": variant === "outline",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-destructive/10": variant === "danger",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50": variant === "ghost",
            "bg-muted text-muted-foreground hover:bg-muted/80": variant === "muted",
          },
          {
            "px-4 py-2.5 rounded-xl": size === "sm",
            "px-6 py-3.5 rounded-2xl": size === "md",
            "px-8 py-4.5 rounded-[1.5rem] test-xs": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && <RefreshCw className="h-3 w-3 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// IconButton Component
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        className={clsx(
          "inline-flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-xl cursor-pointer",
          size === "sm" ? "p-2 h-9 w-9" : "p-3 h-11 w-11",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

// Card Component
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bg-card/50 backdrop-blur-3xl border border-border p-5 sm:p-7 rounded-[1.75rem] shadow-sm relative overflow-hidden transition-all hover:bg-card hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Badge Component
export function Badge({
  className,
  variant = "primary",
  children,
}: {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "muted";
  children: ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
        {
          "bg-primary/5 text-primary border-primary/10": variant === "primary",
          "bg-secondary/5 text-secondary border-secondary/10": variant === "secondary",
          "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/10": variant === "success",
          "bg-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-500/10": variant === "warning",
          "bg-destructive/5 text-destructive border-destructive/10": variant === "danger",
          "bg-muted/50 text-muted-foreground border-border": variant === "muted",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

// Input Component
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={clsx(
          "w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl border border-border bg-muted/20 text-xs font-bold text-foreground placeholder:text-muted-foreground/70 outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Select Component
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          "w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl border border-border bg-card text-xs font-bold text-foreground outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all disabled:opacity-50 appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

// FormField wrapper
export function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      <label className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[10px] font-bold text-destructive flex items-center gap-1 animate-fadeIn mt-0.5">
          <AlertCircle className="h-3 w-3" />
          {error}
        </span>
      )}
    </div>
  );
}

// SearchInput Component
export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={clsx("relative flex items-center w-full bg-muted/10 border border-border rounded-2xl p-1.5 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition-all duration-300", className)}>
      <Search className="h-4 w-4 text-muted-foreground ms-3" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none text-xs font-bold text-foreground placeholder:text-muted-foreground/70 px-3 py-1.5"
        {...props}
      />
    </div>
  );
}

// PageHeader Component
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 tracking-tight leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 self-start sm:self-auto">{actions}</div>}
    </div>
  );
}

// LoadingState Component
export function LoadingState({ message }: { message?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-20 text-center space-y-4">
      <div className="h-10 w-10 flex items-center justify-center text-primary relative">
        <RefreshCw className="h-6 w-6 animate-spin" />
      </div>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        {message || t("Loading Data...")}
      </p>
    </div>
  );
}

// Skeleton loading block
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("bg-muted/40 animate-pulse rounded-2xl", className)} />
  );
}

// EmptyState Component
export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-border p-12 sm:p-16 rounded-[2rem] text-center max-w-xl mx-auto space-y-5 bg-card/10">
      <div className="h-14 w-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground/50">
        <Info className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">{title}</h3>
        {message && <p className="text-xs text-muted-foreground leading-relaxed px-4">{message}</p>}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

// ErrorState Component
export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center border border-destructive/20 bg-destructive/5 p-10 rounded-[2rem] text-center max-w-xl mx-auto space-y-4">
      <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">{t("Error Occurred")}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed px-4">{message}</p>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} className="mt-2">
          {t("Retry")}
        </Button>
      )}
    </div>
  );
}

// Modal Container Component
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-secondary/30 dark:bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-card border border-border rounded-[2rem] shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 px-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted font-mono"
          >
            {t("ESC")} ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

// Money Formatter Helper Component
export function Money({ amount }: { amount: number }) {
  const { i18n } = useTranslation();
  const currencySymbol = i18n.language === "ar" ? "ج.م" : "EGP";
  return (
    <span className="font-bold tracking-tight text-foreground font-sans">
      {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
    </span>
  );
}

// DateTime Formatter Helper Component
export function DateTime({ value }: { value: string }) {
  const { i18n } = useTranslation();
  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) return <span>{value}</span>;
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <span className="text-xs group-hover:text-primary transition-colors text-muted-foreground">
      {dateObj.toLocaleDateString(i18n.language || "ar", options)}
    </span>
  );
}
