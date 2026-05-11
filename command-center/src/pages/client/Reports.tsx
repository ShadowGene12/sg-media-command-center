import { motion } from "framer-motion";
import { REPORTS, PILLARS } from "@/lib/mockData";
import { FileText, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6", 2: "#378ADD", 3: "#1D9E75", 4: "#F59E0B", 5: "#D85A30",
};

const STATUS_CONFIG: Record<string, { text: string; bg: string; border: string; icon: typeof FileText }> = {
  Completed: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle2 },
  "In Review":{ text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  icon: Clock         },
  Scheduled: { text: "text-slate-400",   bg: "bg-white/5",       border: "border-white/10",       icon: AlertCircle   },
};

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

export default function Reports() {
  return (
    <div className="space-y-10 max-w-6xl pb-12">
      <PageHeader
        label="Client Portal"
        title="Assessments & Reports"
        description="Professional report library — diagnostics, audits, and strategic assessments."
      />

      <SectionLabel>{REPORTS.length} Reports</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((report, i) => {
          const pillar = PILLARS.find(p => p.id === report.pillar);
          const color = PILLAR_COLORS[report.pillar] ?? "#6D4AE6";
          const status = STATUS_CONFIG[report.status] ?? STATUS_CONFIG.Scheduled;
          const StatusIcon = status.icon;

          return (
            <motion.div key={report.id} custom={i} variants={cardVars} initial="hidden" animate="show">
              <PremiumCard glowColor={`${color}0D`} className="group">
                {/* Pillar accent */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${color}60, transparent)` }} />

                <div className="p-5 flex flex-col gap-4">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                        style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}>
                        <FileText className="h-4 w-4" style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white leading-snug">{report.title}</p>
                        <p className="text-[10px] font-mono text-slate-600 mt-0.5">{report.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 flex-shrink-0 text-[9px] font-mono font-semibold px-2.5 py-1 rounded-full border ${status.text} ${status.bg} ${status.border}`}>
                      <StatusIcon className="h-3 w-3" />
                      {report.status}
                    </div>
                  </div>

                  {/* Findings */}
                  {report.findings && (
                    <p className="text-xs text-slate-500 leading-relaxed">{report.findings}</p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}80` }} />
                      <span className="text-[10px] font-mono text-slate-600">{pillar?.name}</span>
                    </div>
                    {report.recommendations > 0 && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-sky-400">
                        <ArrowRight className="h-3 w-3" />
                        {report.recommendations} recommendations
                      </div>
                    )}
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
