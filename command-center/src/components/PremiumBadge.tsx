import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface PremiumBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PremiumBadge = ({ children, className, icon, ...props }: PremiumBadgeProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-violet-500/50 bg-violet-500/10 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.2)]",
        className
      )}
      {...props}
    >
      {icon || <Sparkles className="w-3 h-3 text-violet-400" />}
      {children}
    </span>
  );
};
