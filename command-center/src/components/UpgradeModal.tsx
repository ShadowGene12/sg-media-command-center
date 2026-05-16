import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowRight, Lock, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  requiredTier?: 'starter' | 'operator' | 'studio' | 'dfy';
}

const TIER_META = {
  starter: {
    label: 'Starter',
    price: '₹799',
    sub: '/month',
    color: '#378ADD',
    benefits: ['3 pillar-specific SOPs', 'Basic Action Plan', 'Dashboard + Report'],
  },
  operator: {
    label: 'Operator',
    price: '₹4,900',
    sub: '/month',
    color: '#6D4AE6',
    benefits: ['Full SOP library (50+)', 'AI Advisor — unlimited', 'Sprint Tracker & Pathways'],
  },
  studio: {
    label: 'Studio',
    price: '₹12,000',
    sub: '/month',
    color: '#6D4AE6',
    benefits: ['Everything in Operator', '5 team seats', '500 AI credits/month'],
  },
  dfy: {
    label: 'Done For You',
    price: 'Custom',
    sub: '',
    color: '#F59E0B',
    benefits: ['Dedicated account manager', 'Bi-weekly strategy calls', 'Custom SOP development'],
  },
};

export function UpgradeModal({
  isOpen,
  onClose,
  featureName = 'this feature',
  requiredTier = 'operator',
}: UpgradeModalProps) {
  const tier = TIER_META[requiredTier];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(5,5,5,0.97)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 60px rgba(109,74,230,0.18), 0 20px 60px rgba(0,0,0,0.7)',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-40 bg-violet-600/[0.07] rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-7 space-y-5">
            {/* Icon + title */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <DialogTitle className="text-base font-display font-semibold text-white leading-snug">
                  {featureName} requires {tier.label}
                </DialogTitle>
                <p className="text-xs text-white/35 mt-1 font-sans leading-relaxed">
                  Unlock the full platform and fix your bottleneck faster.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2.5 pl-1">
              {tier.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span className="text-sm text-white/55 font-sans">{b}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Price + CTA */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-bold text-white">{tier.price}</span>
                {tier.sub && <span className="text-white/25 text-xs font-mono">{tier.sub}</span>}
              </div>
              <Link to="/upgrade" onClick={onClose} className="block">
                <Button className="w-full h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium font-sans shadow-[0_0_16px_rgba(109,74,230,0.35)] hover:shadow-[0_0_26px_rgba(109,74,230,0.45)] transition-all">
                  <Zap className="w-4 h-4 mr-2" />
                  Unlock {tier.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <button
                onClick={onClose}
                className="w-full text-center text-xs text-white/20 hover:text-white/40 transition-colors font-mono py-0.5"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
