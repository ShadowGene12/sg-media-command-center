import * as React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface PremiumAssetGuardProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  allowDay6Bypass?: boolean;
  slug?: string;
}

export const PremiumAssetGuard = ({
  children,
  fallbackTitle = "Premium Asset",
  allowDay6Bypass = false,
  slug,
}: PremiumAssetGuardProps) => {
  const tier = useCommandStore((state) => state.tier);
  const trialDay = useCommandStore((state) => state.trialDay);

  const isGodMode = tier === "operator" || tier === "studio" || tier === "dfy" || tier === "dwy";
  const isDay6BypassActive = allowDay6Bypass && trialDay === 6 && tier === "trial";
  const isDay1FreeSOP = trialDay === 1 && tier === "trial" && slug === "b2b-outbound-cadence";
  
  const isUnlocked = isGodMode || isDay6BypassActive || isDay1FreeSOP;

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.05] bg-[#050505]">
      {/* 
        We render the actual content underneath, but blur it out and block interactions. 
        This is the "Zeigarnik Effect" execution. 
      */}
      <div 
        className="pointer-events-none select-none opacity-40 transition-all duration-700 blur-[6px] grayscale-[30%]"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* The Lock Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] p-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl">
          <Lock className="h-6 w-6 text-violet-400" />
        </div>
        <h3 className="mb-2 font-display text-xl font-medium text-white">
          {fallbackTitle} Locked
        </h3>
        <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-slate-400">
          {tier === "trial" 
            ? "Unlock this SOP and 50+ others. Upgrade your Command Center to get Full Access instantly."
            : "This system is restricted to premium tiers. Upgrade your Command Center to unlock this execution playbook immediately."}
        </p>
        <Link to="/upgrade">
          <Button className="h-12 rounded-full bg-violet-600 px-8 font-medium text-white shadow-[0_0_20px_rgba(109,74,230,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(109,74,230,0.5)]">
            {tier === "trial" ? "Upgrade to Full Access" : "Unlock Premium Access"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
