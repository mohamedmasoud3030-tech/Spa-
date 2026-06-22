import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { clsx } from "clsx";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  actions?: { label: string; onClick: () => void; variant?: "primary" | "secondary" | "danger" }[];
  showCloseButton?: boolean;
}

export function PremiumModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
  icon,
  actions,
  showCloseButton = true,
}: PremiumModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className={clsx(
              "w-full rounded-3xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden pointer-events-auto",
              "bg-gradient-to-br from-card via-card to-muted/5",
              sizeClasses[size]
            )}>
              {/* Header */}
              {(title || icon) && (
                <div className="border-b border-border/50 px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {icon && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-lg"
                        >
                          {icon}
                        </motion.div>
                      )}
                      <div className="min-w-0">
                        {title && (
                          <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">
                            {title}
                          </h2>
                        )}
                        {subtitle && (
                          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    {showCloseButton && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all flex-shrink-0"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="px-6 sm:px-8 py-6 sm:py-8 max-h-[70vh] overflow-y-auto scrollbar-hide"
              >
                {children}
              </motion.div>

              {/* Actions */}
              {actions && actions.length > 0 && (
                <div className="border-t border-border/50 px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-muted/20 to-transparent flex gap-3 justify-end">
                  {actions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={action.onClick}
                      className={clsx(
                        "px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-95",
                        action.variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
                        action.variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
                        action.variant === "danger" && "bg-destructive/10 text-destructive hover:bg-destructive/20",
                        !action.variant && "bg-muted text-foreground hover:bg-muted/80"
                      )}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Confirmation Modal - Specialized
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}) {
  return (
    <PremiumModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={!isDangerous}
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-muted text-foreground font-bold text-sm uppercase tracking-widest transition-all hover:bg-muted/80"
          >
            {cancelText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className={clsx(
              "px-4 py-2.5 rounded-lg font-bold text-sm uppercase tracking-widest transition-all",
              isDangerous
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </PremiumModal>
  );
}
