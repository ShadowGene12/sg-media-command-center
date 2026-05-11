import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/mockData";
import { CheckCircle2, AlertCircle, ArrowRight, MessageSquare } from "lucide-react";
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

export default function WeeklyReview() {
  const r = REVIEWS.weekly;
  return (
    <div className="space-y-8 max-w-5xl pb-12">
      <div className="space-y-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-mono tracking-widest text-violet-400/80 uppercase">Client Portal — Reviews</p>
          <h1 className="text-4xl font-display font-light text-white tracking-tight mt-2">Weekly Review</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-slate-500 bg-white/[0.02]">{r.week}</span>
            <span className="text-xs font-mono text-slate-600">{r.date}</span>
          </div>
        </motion.div>
      </div>

      {/* Metrics strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {Object.entries(r.metrics).map(([key, val], i) => (
          <PremiumCard key={key} glowColor="rgba(255,255,255,0.05)" className="p-4 text-center">
            <p className="text-2xl font-display font-light text-white">{val}</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mt-1 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </PremiumCard>
        ))}
      </motion.div>

      {/* Wins + Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<CheckCircle2 className="h-3.5 w-3.5" />} iconColor="#10B981" label="Wins">
          <div className="space-y-2">
            {r.wins.map((w, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" style={{ boxShadow: "0 0 5px rgba(16,185,129,0.6)" }} />
                <p className="text-sm text-slate-300 leading-snug">{w}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<AlertCircle className="h-3.5 w-3.5" />} iconColor="#F59E0B" label="Issues">
          <div className="space-y-2">
            {r.issues.map((issue, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-snug">{issue}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>
      </div>

      {/* SG Notes */}
      <CardSection icon={<MessageSquare className="h-3.5 w-3.5" />} iconColor="#6D4AE6" label="SG Media Notes">
        <p className="text-sm text-slate-400 leading-relaxed">{r.sgNotes}</p>
      </CardSection>

      {/* Next Priorities + Accountability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Next Priorities">
          <div className="space-y-2">
            {r.nextPriorities.map((p, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] font-mono font-bold text-violet-400/60 w-4 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-300">{p}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <GlassCard>
          <div className="px-5 py-4 border-b border-white/[0.04]">
            <SectionLabel>Accountability</SectionLabel>
          </div>
          <div className="p-4 space-y-2">
            {r.accountability.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div>
                  <p className="text-sm text-white leading-snug">{a.item}</p>
                  <p className="text-[10px] font-mono text-slate-600 mt-0.5">{a.owner}</p>
                </div>
                <span className="text-[9px] font-mono font-semibold px-2.5 py-1 rounded-full border border-white/10 text-slate-500 flex-shrink-0 ml-3">
                  {a.due}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Decisions */}
      <CardSection icon={<CheckCircle2 className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Decisions Made">
        <div className="space-y-2">
          {r.decisions.map((d, i) => (
            <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/[0.04] border border-sky-500/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
              <p className="text-sm text-slate-300">{d}</p>
            </motion.div>
          ))}
        </div>
      </CardSection>
    </div>
  );
}
