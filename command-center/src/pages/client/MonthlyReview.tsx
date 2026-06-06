import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/mockData";
import { TrendingUp, TrendingDown, ArrowRight, MessageSquare } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20, delay: i * 0.06 } }),
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <PremiumCard glowColor="rgba(139,92,246,0.08)" className={className}>
    {children}
  </PremiumCard>
);

const CardSection = ({ icon, iconColor, label, children }: { icon: React.ReactNode; iconColor: string; label: string; children: React.ReactNode }) => (
  <GlassCard>
    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04]">
      <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <SectionLabel>{label}</SectionLabel>
    </div>
    <div className="p-4">{children}</div>
  </GlassCard>
);

export default function MonthlyReview() {
  const r = REVIEWS.monthly;
  return (
    <div className="space-y-8 max-w-5xl pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-3">
        <p className="text-xs font-mono tracking-widest text-violet-400/80 uppercase">Client Portal — Reviews</p>
        <h1 className="text-4xl font-display font-light text-white tracking-tight">Monthly Review</h1>
        <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-slate-500 bg-white/[0.02] inline-block">{r.month}</span>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}>
        <GlassCard>
          <div className="px-5 py-4 border-b border-white/[0.04]"><SectionLabel>Month Summary</SectionLabel></div>
          <div className="p-5"><p className="text-sm text-slate-400 leading-relaxed">{r.summary}</p></div>
        </GlassCard>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}
        className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(r.metricsReview).map(([key, val]) => (
          <PremiumCard key={key} glowColor="rgba(255,255,255,0.05)" className="p-4 text-center">
            <p className="text-xl font-display font-light text-white">{val}</p>
            <p className="text-[9px] font-mono uppercase tracking-widest text-slate-600 mt-1 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
          </PremiumCard>
        ))}
      </motion.div>

      {/* Improved + Weak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<TrendingUp className="h-3.5 w-3.5" />} iconColor="#10B981" label="What Improved">
          <div className="space-y-2">
            {r.improved.map((item, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" style={{ boxShadow: "0 0 5px rgba(16,185,129,0.6)" }} />
                <p className="text-sm text-slate-300 leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<TrendingDown className="h-3.5 w-3.5" />} iconColor="#F59E0B" label="What Remains Weak">
          <div className="space-y-2">
            {r.weak.map((item, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>
      </div>

      {/* Progress areas */}
      <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#6D4AE6" label="Major Progress Areas">
        <div className="space-y-2">
          {r.progressAreas.map((p, i) => (
            <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
              <span className="text-[10px] font-mono font-bold text-violet-400/60 w-4 flex-shrink-0">{i + 1}</span>
              <p className="text-sm text-slate-300">{p}</p>
            </motion.div>
          ))}
        </div>
      </CardSection>

      {/* Decisions + Next month */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Decisions & Resets">
          <div className="space-y-2">
            {r.decisions.map((d, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-500/[0.04] border border-sky-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">{d}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Next Month Priorities">
          <div className="space-y-2">
            {r.nextMonthPriorities.map((p, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] font-mono font-bold text-violet-400/60 w-4 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-300">{p}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>
      </div>

      {/* SG Recommendation */}
      <CardSection icon={<MessageSquare className="h-3.5 w-3.5" />} iconColor="#6D4AE6" label="SG Media Recommendation">
        <p className="text-sm text-slate-400 leading-relaxed">{r.recommendations}</p>
      </CardSection>
    </div>
  );
}
