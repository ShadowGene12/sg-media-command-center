import { motion } from "framer-motion";
import { RECOMMENDATIONS as RECS, PILLARS } from "@/lib/mockData";
import { Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6", 2: "#378ADD", 3: "#1D9E75", 4: "#F59E0B", 5: "#D85A30",
};

const PRIORITY_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  High:   { text: "text-red-400",   bg: "bg-red-500/10",   border: "border-red-500/20"   },
  Medium: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  Low:    { text: "text-slate-400", bg: "bg-white/5",      border: "border-white/10"     },
};

const URGENCY_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  Immediate:   { text: "text-red-400",   bg: "bg-red-500/10",   border: "border-red-500/20"   },
  "This Month":{ text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "Next 30 Days":{ text: "text-sky-400", bg: "bg-sky-500/10",   border: "border-sky-500/20"   },
  "Next 60 Days":{ text: "text-slate-400",bg:"bg-white/5",      border: "border-white/10"     },
  "This Quarter":{ text: "text-slate-400",bg:"bg-white/5",      border: "border-white/10"     },
};

const STATUS_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  "In Progress": { text: "text-sky-400",    bg: "bg-sky-500/10",    border: "border-sky-500/20"    },
  Pending:       { text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20"  },
  "Not Started": { text: "text-slate-400",  bg: "bg-white/5",       border: "border-white/10"      },
};

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

const Badge = ({ cfg, label }: { cfg: { text: string; bg: string; border: string }; label: string }) => (
  <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>{label}</span>
);

export default function Recommendations() {
  return (
    <div className="space-y-10 max-w-5xl pb-12">
      <PageHeader
        label="Strategic Intelligence"
        title="Recommendations"
        description="What to focus on now, what's next, and why — prioritized by impact."
      />

      <div className="space-y-4">
        {RECS.map((rec, i) => {
          const pillar = PILLARS.find(p => p.id === rec.pillar);
          const color = PILLAR_COLORS[rec.pillar] ?? "#6D4AE6";
          const priorityBadge = PRIORITY_BADGE[rec.priority] ?? PRIORITY_BADGE.Low;
          const urgencyBadge = URGENCY_BADGE[rec.urgency] ?? URGENCY_BADGE["This Quarter"];
          const statusBadge = STATUS_BADGE[rec.status] ?? STATUS_BADGE["Not Started"];

          return (
            <motion.div key={rec.id} custom={i} variants={cardVars} initial="hidden" animate="show">
              <PremiumCard glowColor={`${color}0D`} className="group">
                {/* Pillar accent top */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${color}60, transparent)` }} />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                      style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}>
                      <Lightbulb className="h-4 w-4" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug">{rec.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}80` }} />
                        <span className="text-[10px] font-mono text-slate-600">{pillar?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Badge cfg={priorityBadge} label={rec.priority} />
                      <Badge cfg={urgencyBadge}  label={rec.urgency}  />
                      <Badge cfg={statusBadge}   label={rec.status}   />
                    </div>
                  </div>

                  {/* Action steps */}
                  <div className="ml-13 pl-0 space-y-4" style={{ marginLeft: "3.25rem" }}>
                    <div>
                      <SectionLabel className="mb-2">Action Steps</SectionLabel>
                      <div className="space-y-1.5">
                        {rec.actionSteps.map((step, j) => (
                          <div key={j} className="flex items-center gap-2.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                            <p className="text-sm text-slate-400">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next decision */}
                    <div className="flex items-start gap-3 p-4 rounded-xl border"
                      style={{ backgroundColor: `${color}08`, borderColor: `${color}20` }}>
                      <ArrowRight className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color }} />
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color }}>Next Decision</p>
                        <p className="text-sm text-white mt-0.5">{rec.nextDecision}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
