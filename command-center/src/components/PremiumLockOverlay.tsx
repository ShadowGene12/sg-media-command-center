import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { Link } from "react-router-dom";

interface PremiumLockOverlayProps {
  children: React.ReactNode;
  featureName: string;
  description: string;
}

export function PremiumLockOverlay({ children, featureName, description }: PremiumLockOverlayProps) {
  const tier = useCommandStore((state) => state.tier);

  if (tier === "dfy") {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full min-h-[70vh] flex flex-col rounded-3xl overflow-hidden border border-white/5">
      {/* Blurred Background Content */}
      <div className="absolute inset-0 pointer-events-none filter blur-[8px] opacity-30 select-none z-0 p-8">
        {children}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-black/20" />

      {/* Lock CTA Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(109,74,230,0.15)] max-w-xl w-full"
        >
          <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(109,74,230,0.3)]">
            <Lock className="h-8 w-8 text-violet-400" />
          </div>
          
          <h2 className="text-3xl font-display font-light text-white mb-3">
            {featureName}
          </h2>
          <p className="text-slate-400 font-light leading-relaxed mb-8 max-w-md mx-auto">
            {description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
              <h4 className="text-sm text-white font-medium mb-1">Executive Control</h4>
              <p className="text-xs text-slate-500">Stop building. Let our team execute the systems for you.</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <Zap className="h-5 w-5 text-blue-400 mb-2" />
              <h4 className="text-sm text-white font-medium mb-1">Premium Delivery</h4>
              <p className="text-xs text-slate-500">Access done-for-you assets, live KPIs, and deep tracking.</p>
            </div>
          </div>

          <Link to="/upgrade">
            <button className="group relative inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Upgrade to Done-For-You <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </Link>
          <p className="text-xs text-slate-500 font-mono mt-4 uppercase tracking-widest">
            Application Required
          </p>
        </motion.div>
      </div>
    </div>
  );
}
