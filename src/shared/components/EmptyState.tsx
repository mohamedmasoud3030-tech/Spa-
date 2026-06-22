import { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full h-80 flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-border/50 bg-muted/20">
      <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary/60 mb-6">
        {icon || <Plus className="h-10 w-10" />}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 text-center">{title}</h3>

      {description && (
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="group relative px-8 h-12 rounded-2xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Plus className="h-5 w-5 relative z-10" />
          <span className="relative z-10">{t(actionLabel)}</span>
        </button>
      )}
    </div>
  );
}
