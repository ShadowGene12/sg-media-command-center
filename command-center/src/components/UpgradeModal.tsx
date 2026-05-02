import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  requiredTier?: string;
}

export function UpgradeModal({ 
  isOpen, 
  onClose, 
  featureName = "this feature",
  requiredTier = "PRO"
}: UpgradeModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-950 border-slate-800 text-slate-100">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">Unlock {requiredTier}</DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            You've discovered a premium feature! Upgrade to the {requiredTier} tier to access {featureName} and supercharge your growth.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm text-slate-300">Unlimited Sprint Tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm text-slate-300">Full Pathway Access</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm text-slate-300">AI Advisor Consultations</span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:justify-center space-y-2 sm:space-y-0 mt-4">
          <Button 
            onClick={handleUpgrade} 
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
          >
            View Pricing Plans
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="w-full text-slate-400 hover:text-white"
          >
            Maybe later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
