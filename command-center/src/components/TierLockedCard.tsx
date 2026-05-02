import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TierLockedCardProps {
  isLocked?: boolean;
  tierRequired?: string;
  children: React.ReactNode;
  onUpgradeClick?: () => void;
  title?: string;
  description?: string;
}

export function TierLockedCard({ 
  isLocked = true, 
  tierRequired = "PRO",
  children,
  onUpgradeClick,
  title = "Unlock this feature",
  description = `This capability requires the ${tierRequired} tier. Upgrade your workspace to access.`
}: TierLockedCardProps) {
  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative group overflow-hidden rounded-xl">
      {/* Blurred background content */}
      <div className="filter blur-[4px] opacity-60 pointer-events-none select-none transition-all duration-500 group-hover:blur-[6px]">
        {children}
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-background/40 backdrop-blur-sm border border-white/5 rounded-xl">
        <div className="flex flex-col items-center max-w-sm text-center p-6 rounded-2xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md transform transition-transform duration-300 group-hover:scale-105">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-400 mb-6">
            {description}
          </p>
          <Button 
            onClick={onUpgradeClick} 
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
          >
            Upgrade to {tierRequired}
          </Button>
        </div>
      </div>
    </div>
  );
}
