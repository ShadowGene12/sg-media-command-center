import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Plus, ArrowRight, Lock, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PremiumBadge } from "@/components/PremiumBadge";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PremiumCard } from "@/components/PremiumCard";

const ACTIVE_WORKSPACES = [
  { id: "wk-1", title: "Q3 Outbound Engine", pillar: "Customer Acquisition", color: "#378ADD", type: "Sequence Builder", lastEdited: "2 hours ago", progress: 40 },
];

const TEMPLATES = ["Lite CRM", "Cold Email Sequence", "Offer Positioning Canvas", "Pricing Model", "Cash Flow Projector", "KPI Dashboard"];

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

export default function WorkspaceHub() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const freeLimit = 1;
  const currentUsage = ACTIVE_WORKSPACES.length;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} featureName="unlimited workspaces and premium templates" />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Execution Layer"
          title="Workspace"
          description="Your active execution environments. Turn frameworks into reality."
        />
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Free Limit</p>
            <p className="text-sm text-slate-400 font-mono mt-0.5">{currentUsage} / {freeLimit} Canvases</p>
          </div>
          <button
            onClick={() => currentUsage >= freeLimit ? setShowUpgrade(true) : undefined}
            className="flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-100 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus className="w-4 h-4" /> New Canvas
          </button>
        </div>
      </div>

      {/* Active canvases */}
      <div>
        <SectionLabel className="mb-5">Recent Canvases</SectionLabel>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVE_WORKSPACES.map((ws, i) => (
            <motion.div
              key={ws.id}
              custom={i}
              variants={cardVars}
              initial="hidden"
              animate="show"
            >
              <PremiumCard glowColor={`${ws.color}1A`} className="group relative">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/[0.04]">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: ws.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${ws.progress}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="p-5 pt-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                      style={{ color: ws.color, backgroundColor: `${ws.color}18`, borderColor: `${ws.color}30` }}
                    >
                      {ws.type}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
                      <Clock className="h-3 w-3" /> {ws.lastEdited}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{ws.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{ws.pillar}</p>
                  </div>

                  <Link to={`/workspace/${ws.id}`}>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200">
                      <span>Open Canvas</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </PremiumCard>
            </motion.div>
          ))}

          {/* Add canvas slot */}
          <motion.div custom={ACTIVE_WORKSPACES.length} variants={cardVars} initial="hidden" animate="show">
            <button
              onClick={() => setShowUpgrade(true)}
              className="w-full h-full min-h-[180px] rounded-2xl border-2 border-dashed border-white/[0.07] hover:border-violet-500/30 flex flex-col items-center justify-center gap-3 text-center p-6 transition-all duration-300 group"
            >
              <div className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                <Lock className="h-4 w-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Unlock Unlimited Canvases</p>
                <p className="text-xs text-slate-600 mt-0.5">Upgrade to Pro</p>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Templates */}
      <div className="pt-2 border-t border-white/[0.04]">
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Start from a Template</SectionLabel>
          <PremiumBadge className="text-[9px]">PRO TIER</PremiumBadge>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {TEMPLATES.map((template, i) => (
            <motion.button
              key={i}
              custom={i}
              variants={cardVars}
              initial="hidden"
              animate="show"
              onClick={() => setShowUpgrade(true)}
              className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-black/30 hover:bg-white/[0.03] hover:border-white/[0.10] transition-all duration-200"
            >
              <div className="text-left">
                <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{template}</p>
                <p className="text-[10px] font-mono text-slate-600 mt-0.5">Premium Template</p>
              </div>
              <Lock className="h-3.5 w-3.5 text-slate-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
