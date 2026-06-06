import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MILESTONES } from "@/lib/mockData";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const STATUS_CONFIG = {
  Completed: {
    icon: CheckCircle2,
    color: "#10B981",
    glow: "0 0 12px rgba(16,185,129,0.5)",
    bg: "bg-emerald-500/15 border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  "In Progress": {
    icon: Clock,
    color: "#378ADD",
    glow: "0 0 12px rgba(55,138,221,0.5)",
    bg: "bg-sky-500/15 border-sky-500/30",
    text: "text-sky-400",
    dot: "bg-sky-500",
  },
  Upcoming: {
    icon: Circle,
    color: "#515B68",
    glow: "none",
    bg: "bg-white/5 border-white/10",
    text: "text-slate-500",
    dot: "bg-slate-600",
  },
};

function MilestoneRow({ milestone, index }: { milestone: typeof MILESTONES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = STATUS_CONFIG[milestone.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.Upcoming;
  const Icon = cfg.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, type: "spring", stiffness: 120, damping: 20 }}
      className="relative flex items-start gap-4 pl-0"
    >
      {/* Node */}
      <div className="relative z-10 flex-shrink-0 mt-0.5">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center border-2"
          style={{
            backgroundColor: `${cfg.color}20`,
            borderColor: cfg.color,
            boxShadow: cfg.glow,
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
        </div>
      </div>

      {/* Card */}
      <PremiumCard glowColor="rgba(109,74,230,0.06)" className="flex-1 mb-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-white leading-snug">{milestone.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono text-slate-500">{milestone.date}</span>
              <span className="text-slate-700">·</span>
              <span className="text-xs font-mono text-slate-600">{milestone.phase}</span>
            </div>
          </div>
          <span className={`flex-shrink-0 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text}`}>
            {milestone.status}
          </span>
        </div>
      </PremiumCard>
    </motion.div>
  );
}

export default function Timeline() {
  const phases = Array.from(new Set(MILESTONES.map(m => m.phase)));
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <div className="space-y-10 max-w-4xl pb-12">
      <PageHeader
        label="Engagement Journey"
        title="Timeline & Milestones"
        description="Visual progress through your strategic engagement phases."
      />

      {/* Phase summary strip */}
      <div>
        <SectionLabel className="mb-4">Progress by Phase</SectionLabel>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {phases.map(phase => {
            const items = MILESTONES.filter(m => m.phase === phase);
            const completed = items.filter(m => m.status === "Completed").length;
            const pct = Math.round((completed / items.length) * 100);
            return (
              <PremiumCard key={phase} glowColor="rgba(255,255,255,0.05)" className="p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{phase}</p>
                <p className="text-2xl font-display font-light text-white mt-1">{completed}<span className="text-sm text-slate-500 font-mono">/{items.length}</span></p>
                <div className="mt-3 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </PremiumCard>
            );
          })}
        </motion.div>
      </div>

      {/* Vertical timeline */}
      <div>
        <SectionLabel className="mb-6">All Milestones</SectionLabel>
        <div className="relative" ref={lineRef}>
          {/* Animated connector line */}
          <div className="absolute left-[9px] top-2 bottom-2 w-px overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.05]" />
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{ background: "linear-gradient(to bottom, transparent, #6D4AE6 20%, #378ADD 60%, transparent)" }}
              initial={{ height: "0%" }}
              animate={lineInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          <div className="space-y-0.5 pl-0">
            {MILESTONES.map((m, i) => (
              <MilestoneRow key={m.id} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
