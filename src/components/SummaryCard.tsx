// File: src/components/SummaryCard.tsx

import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'muted';
  badge?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  badge,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          card: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg border-blue-500/30',
          title: 'text-blue-100',
          value: 'text-white',
          subtitle: 'text-blue-100/90',
          iconBg: 'bg-white/10 text-white',
          badge: 'bg-white/20 text-white',
        };
      case 'success':
        return {
          card: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
          title: 'text-emerald-800',
          value: 'text-emerald-700 font-extrabold',
          subtitle: 'text-emerald-600',
          iconBg: 'bg-emerald-100 text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        };
      case 'warning':
        return {
          card: 'bg-amber-50/60 border-amber-200 text-amber-950',
          title: 'text-amber-800',
          value: 'text-amber-700 font-bold',
          subtitle: 'text-amber-600',
          iconBg: 'bg-amber-100 text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
        };
      case 'muted':
        return {
          card: 'bg-slate-50 border-slate-200 text-slate-700',
          title: 'text-slate-500',
          value: 'text-slate-800',
          subtitle: 'text-slate-400',
          iconBg: 'bg-slate-200/60 text-slate-600',
          badge: 'bg-slate-200 text-slate-700',
        };
      default:
        return {
          card: 'bg-white border-slate-200/90 text-slate-900 shadow-jet hover:shadow-md',
          title: 'text-slate-500',
          value: 'text-slate-900',
          subtitle: 'text-slate-400',
          iconBg: 'bg-slate-100 text-slate-600',
          badge: 'bg-slate-100 text-slate-700 border border-slate-200',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`rounded-2xl p-5 border transition-all duration-300 ${styles.card}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className={`p-2 rounded-xl flex items-center justify-center ${styles.iconBg}`}>
              {icon}
            </div>
          )}
          <span className={`text-xs font-semibold uppercase tracking-wider ${styles.title}`}>
            {title}
          </span>
        </div>
        {badge && (
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles.badge}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="mt-1">
        <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${styles.value}`}>
          {value}
        </div>
        {subtitle && (
          <div className={`text-xs font-medium mt-1.5 ${styles.subtitle}`}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
