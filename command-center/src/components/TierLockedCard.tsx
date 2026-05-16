import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useCommandStore } from '@/lib/store';

interface TierLockedCardProps {
  children: React.ReactNode;
  requiredTier?: 'starter' | 'operator' | 'studio' | 'dfy';
  featureName?: string;
  // Override: if explicitly passed, use it. Otherwise derive from store.
  forceUnlocked?: boolean;
}

const TIER_RANK: Record<string, number> = {
  free: 0,
  trial: 1,   // trial has full access during days 1-7
  starter: 2,
  operator: 3,
  studio: 4,
  dfy: 5,
};

const TIER_LABEL: Record<string, string> = {
  starter: 'Starter',
  operator: 'Operator',
  studio: 'Studio',
  dfy: 'Done For You',
};

export function TierLockedCard({
  children,
  requiredTier = 'operator',
  featureName = 'This feature',
  forceUnlocked,
}: TierLockedCardProps) {
  const { tier, trialDay } = useCommandStore();

  // Derive locked state from the store
  let isLocked: boolean;
  if (forceUnlocked !== undefined) {
    isLocked = !forceUnlocked;
  } else if (tier === 'trial' && trialDay >= 1 && trialDay <= 7) {
    // Trial users have full access to everything during the 7 days
    isLocked = false;
  } else {
    const userRank = TIER_RANK[tier] ?? 0;
    const requiredRank = TIER_RANK[requiredTier] ?? 3;
    isLocked = userRank < requiredRank;
  }

  if (!isLocked) return <>{children}</>;

  const tierLabel = TIER_LABEL[requiredTier] ?? 'Operator';

  return (
    <div className="relative group overflow-hidden rounded-2xl">
      {/* Blurred preview */}
      <div className="filter blur-[3px] opacity-50 pointer-events-none select-none">
        {children}
      </div>

      {/* Lock overlay — matching PremiumCard glassmorphic style */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center p-6 rounded-2xl"
        style={{
          background: 'rgba(5,5,5,0.6)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="flex flex-col items-center text-center p-6 rounded-2xl max-w-xs w-full group-hover:scale-[1.02] transition-transform duration-300"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
            <Lock className="h-5 w-5 text-violet-400" />
          </div>

          <h3 className="text-sm font-display font-semibold text-white mb-1.5">
            {featureName}
          </h3>
          <p className="text-xs text-white/35 mb-5 font-sans leading-relaxed">
            Requires {tierLabel} tier or higher.
            {tier === 'free' && trialDay > 7 ? ' Your trial ended — upgrade to regain access.' : ''}
          </p>

          <Link to="/upgrade" className="w-full">
            <Button className="w-full h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium font-sans shadow-[0_0_14px_rgba(109,74,230,0.3)] hover:shadow-[0_0_20px_rgba(109,74,230,0.4)] transition-all">
              Unlock {tierLabel}
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
