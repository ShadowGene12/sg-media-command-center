import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACTION_ITEMS, PILLARS } from "@/lib/mockData";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6", 2: "#378ADD", 3: "#1D9E75", 4: "#F59E0B", 5: "#D85A30",
};

const STATUS_CONFIG: Record<string, { label: string; text: string; bg: string; border: string }> = {
  "In Progress": { label: "In Progress", text: "text-sky-400",   bg: "bg-sky-500/10",   border: "border-sky-500/20" },
  "Pending":     { label: "Pending",     text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "Completed":   { label: "Completed",   text: "text-emerald-400",bg:"bg-emerald-500/10",border:"border-emerald-500/20"},
  "Not Started": { label: "Not Started", text: "text-slate-400", bg: "bg-white/5",      border: "border-white/10" },
  "Blocked":     { label: "Blocked",     text: "text-red-400",   bg: "bg-red-500/10",   border: "border-red-500/20" },
};

const PRIORITY_CONFIG: Record<string, { text: string; bg: string; border: string }> = {
  "High":   { text: "text-red-400",   bg: "bg-red-500/10",   border: "border-red-500/20" },
  "Medium": { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "Low":    { text: "text-slate-400", bg: "bg-white/5",      border: "border-white/10" },
};

const TABS = ["All", "In Progress", "Pending", "Not Started"];

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const rowVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
};

export default function ActionPlan() {
  const [activeTab, setActiveTab] = useState("All");
  const blockers = ACTION_ITEMS.filter(a => a.blocker);
  const next30 = ACTION_ITEMS.filter(a => a.status !== "Completed").slice(0, 4);

  const statusCounts = TABS.slice(1).map(s => ({
    label: s,
    count: ACTION_ITEMS.filter(a => a.status === s).length,
  }));

  const filtered = ACTION_ITEMS.filter(a => activeTab === "All" || a.status === activeTab);

  return (
    <div className="space-y-10 max-w-6xl pb-12">
      <PageHeader
        label="Strategic Execution"
        title="Action Plan & Roadmap"
        description="Implementation roadmap — initiatives, owners, and timelines."
      />

      {/* Status summary strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {statusCounts.map(({ label, count }) => {
          const cfg = STATUS_CONFIG[label];
          return (
            <PremiumCard
              key={label}
              onClick={() => setActiveTab(label)}
              glowColor="rgba(255,255,255,0.05)"
              className={cn(
                "p-4 cursor-pointer transition-all duration-200",
                activeTab === label ? `${cfg.border} ${cfg.bg}` : ""
              )}
            >
              <p className={cn("text-2xl font-display font-light", cfg.text)}>{count}</p>
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-1">{label}</p>
            </PremiumCard>
          );
        })}
      </motion.div>

      {/* Tab bar */}
      <div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] w-fit">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200",
                activeTab === tab
                  ? "text-white bg-white/[0.08] border border-white/[0.10]"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08] -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="mt-4"
          >
          <PremiumCard glowColor="rgba(255,255,255,0.05)">
            {filtered.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-3 text-center">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-slate-600" />
                </div>
                <p className="text-sm text-slate-500">No actions in this category</p>
              </div>
            ) : (
              filtered.map((item, i) => {
                const pillar = PILLARS.find(p => p.id === item.pillar);
                const color = PILLAR_COLORS[item.pillar] ?? "#6D4AE6";
                const status = STATUS_CONFIG[item.status] ?? STATUS_CONFIG["Not Started"];
                const priority = PRIORITY_CONFIG[item.priority] ?? PRIORITY_CONFIG["Low"];
                return (
                  <motion.div
                    key={item.id}
                    variants={rowVars}
                    className="flex items-start gap-4 px-5 py-4 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Pillar dot */}
                    <div
                      className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
                    />
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white leading-snug">{item.title}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-mono text-slate-600">{pillar?.name}</span>
                        <span className="text-slate-700">·</span>
                        <span className="text-[10px] font-mono text-slate-600">{item.owner}</span>
                        <span className="text-slate-700">·</span>
                        <span className="text-[10px] font-mono text-slate-600">Due {item.dueDate}</span>
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{item.notes}</p>
                      )}
                      {item.blocker && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                          <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                          {item.blocker}
                        </div>
                      )}
                    </div>
                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={cn("text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border", priority.text, priority.bg, priority.border)}>
                        {item.priority}
                      </span>
                      <span className={cn("text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border", status.text, status.bg, status.border)}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </PremiumCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Blockers + Next 30 days */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PremiumCard glowColor="rgba(239,68,68,0.08)">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04]">
            <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <SectionLabel>Blockers & Risks</SectionLabel>
          </div>
          <div className="p-4 space-y-2">
            {blockers.length === 0 ? (
              <p className="text-sm text-slate-600 py-4 text-center">No active blockers.</p>
            ) : blockers.map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                <p className="text-sm text-white leading-snug">{item.title}</p>
                <p className="text-xs text-red-400 mt-1.5 font-mono">{item.blocker}</p>
              </div>
            ))}
          </div>
        </PremiumCard>

        <PremiumCard glowColor="rgba(109,74,230,0.08)">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04]">
            <ArrowRight className="h-4 w-4 text-violet-400 flex-shrink-0" />
            <SectionLabel>Next 30-Day Focus</SectionLabel>
          </div>
          <div className="p-4 space-y-2">
            {next30.map(item => {
              const color = PILLAR_COLORS[item.pillar] ?? "#6D4AE6";
              return (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                  <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}80` }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{item.title}</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-0.5">{item.dueDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
