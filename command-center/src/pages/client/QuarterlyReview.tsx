import { motion } from "framer-motion";
import { REVIEWS, PILLARS } from "@/lib/mockData";
import { ArrowRight, MessageSquare, AlertTriangle, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6", 2: "#378ADD", 3: "#1D9E75", 4: "#F59E0B", 5: "#D85A30",
};

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

export default function QuarterlyReview() {
  const r = REVIEWS.quarterly;
  return (
    <div className="space-y-8 max-w-5xl pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-3">
        <p className="text-xs font-mono tracking-widest text-violet-400/80 uppercase">Client Portal — Reviews</p>
        <h1 className="text-4xl font-display font-light text-white tracking-tight">Quarterly Review</h1>
        <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-slate-500 bg-white/[0.02] inline-block">{r.quarter}</span>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}>
        <GlassCard>
          <div className="px-5 py-4 border-b border-white/[0.04]"><SectionLabel>Quarter Summary</SectionLabel></div>
          <div className="p-5"><p className="text-sm text-slate-400 leading-relaxed">{r.summary}</p></div>
        </GlassCard>
      </motion.div>

      {/* Pillar progress */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}>
        <GlassCard>
          <div className="px-5 py-4 border-b border-white/[0.04]"><SectionLabel>Progress by Pillar</SectionLabel></div>
          <div className="p-5 space-y-5">
            {r.pillarProgress.map((pp, i) => {
              const pillar = PILLARS.find(p => p.id === pp.pillar);
              const color = PILLAR_COLORS[pp.pillar] ?? "#6D4AE6";
              return (
                <div key={pp.pillar}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }} />
                      <span className="text-sm text-slate-300">{pillar?.name}</span>
                    </div>
                    <span className="text-sm font-mono font-semibold" style={{ color }}>{pp.progress}%</span>
                  </div>
                  <div className="h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
                      initial={{ width: 0 }} animate={{ width: `${pp.progress}%` }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 font-mono">{pp.notes}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Lessons + Strategic decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<BookOpen className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Key Business Lessons">
          <div className="space-y-2">
            {r.lessons.map((l, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] font-mono font-bold text-slate-600 w-4 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-300 leading-snug">{l}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#6D4AE6" label="Strategic Decisions">
          <div className="space-y-2">
            {r.strategicDecisions.map((d, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-500/[0.04] border border-violet-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">{d}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>
      </div>

      {/* Unresolved bottlenecks */}
      <CardSection icon={<AlertTriangle className="h-3.5 w-3.5" />} iconColor="#EF4444" label="Unresolved Bottlenecks">
        <div className="space-y-2">
          {r.unresolvedBottlenecks.map((b, i) => (
            <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
              className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/[0.04] border border-red-500/10">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-slate-300">{b}</p>
            </motion.div>
          ))}
        </div>
      </CardSection>

      {/* Next quarter + Long-term rec */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSection icon={<ArrowRight className="h-3.5 w-3.5" />} iconColor="#378ADD" label="Next Quarter Priorities">
          <div className="space-y-2">
            {r.nextQuarterPriorities.map((p, i) => (
              <motion.div key={i} custom={i} variants={itemVars} initial="hidden" animate="show"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] font-mono font-bold text-violet-400/60 w-4 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-300">{p}</p>
              </motion.div>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<MessageSquare className="h-3.5 w-3.5" />} iconColor="#6D4AE6" label="Long-Term Recommendation">
          <p className="text-sm text-slate-400 leading-relaxed">{r.longTermRecommendations}</p>
        </CardSection>
      </div>
    </div>
  );
}
