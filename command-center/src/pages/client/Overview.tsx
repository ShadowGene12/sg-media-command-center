import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ORGANIZATION, PILLARS, KPI_DATA, REPORTS, ACTION_ITEMS, MILESTONES, RECOMMENDATIONS as RECS } from "@/lib/mockData";
import { ArrowUpRight, ArrowRight, Target, TrendingUp, CalendarCheck, FileText, Map, Clock, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6", 2: "#378ADD", 3: "#1D9E75", 4: "#F59E0B", 5: "#D85A30",
};

const URGENCY_COLORS: Record<string, string> = {
  High: "text-red-400 bg-red-500/10 border-red-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Low: "text-slate-400 bg-white/5 border-white/10",
  Immediate: "text-red-400 bg-red-500/10 border-red-500/20",
};

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18 } },
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <PremiumCard glowColor="rgba(139,92,246,0.08)" className={className}>
    {children}
  </PremiumCard>
);

export default function Overview() {
  const activePriorities = ACTION_ITEMS.filter(a => a.status === "In Progress");
  const nextMilestone = MILESTONES.find(m => m.status === "In Progress" || m.status === "Upcoming");
  const topRecs = RECS.slice(0, 3);
  const topKpis = KPI_DATA.slice(0, 6);
  const latestReport = REPORTS.filter(r => r.status === "Completed").sort((a, b) => b.date.localeCompare(a.date))[0];

  const summaryCards = [
    { label: "Health Score", value: `${ORGANIZATION.healthScore}`, sub: "/ 100", icon: Target, accent: "#10B981", progress: ORGANIZATION.healthScore },
    { label: "Active Actions", value: `${activePriorities.length}`, sub: `of ${ACTION_ITEMS.length} total`, icon: Map, accent: "#6D4AE6" },
    { label: "Reports", value: `${REPORTS.filter(r => r.status === "Completed").length}`, sub: "completed", icon: FileText, accent: "#378ADD" },
    { label: "Next Milestone", value: nextMilestone?.title ?? "—", sub: nextMilestone?.date, icon: Clock, accent: "#F59E0B", text: true },
  ];

  return (
    <div className="space-y-10 max-w-7xl pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <p className="text-xs font-mono tracking-widest text-violet-400/80 uppercase">Client Portal — DFY Tier</p>
        <h1 className="text-4xl font-display font-light text-white tracking-tight">{ORGANIZATION.name}</h1>
        <p className="text-base text-slate-400 font-light max-w-2xl leading-relaxed">{ORGANIZATION.engagementSummary}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[ORGANIZATION.program, ORGANIZATION.industry, ORGANIZATION.currentPhase].map(tag => (
            <span key={tag} className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-slate-500 bg-white/[0.02]">{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Summary cards */}
      <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <motion.div key={card.label} variants={itemVars}>
            <GlassCard className="p-5 flex flex-col gap-3 hover:border-white/[0.12] transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{card.label}</p>
                <card.icon className="h-3.5 w-3.5 text-slate-600" />
              </div>
              {card.text ? (
                <p className="text-sm font-medium text-white truncate leading-snug">{card.value}</p>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-display font-light text-white tracking-tight">{card.value}</span>
                  {card.sub && <span className="text-xs font-mono text-slate-500">{card.sub}</span>}
                </div>
              )}
              {card.text && card.sub && <p className="text-xs font-mono text-slate-600">{card.sub}</p>}
              {card.progress !== undefined && (
                <div className="h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: card.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${card.progress}%` }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Priorities */}
          <GlassCard className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
              <SectionLabel>Active Priorities</SectionLabel>
              <Link to="/client/action-plan" className="text-xs font-mono text-slate-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 space-y-2">
              {activePriorities.map(item => {
                const color = PILLAR_COLORS[item.pillar] ?? "#6D4AE6";
                return (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white leading-snug">{item.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-slate-600">{item.owner}</span>
                        <span className="text-slate-700">·</span>
                        <span className="text-[10px] font-mono text-slate-600">Due {item.dueDate}</span>
                      </div>
                    </div>
                    <span
                      className="flex-shrink-0 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}
                    >
                      {item.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* KPI Snapshot */}
          <GlassCard className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
              <SectionLabel>KPI Snapshot</SectionLabel>
              <Link to="/client/kpis" className="text-xs font-mono text-slate-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                Full dashboard <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {topKpis.map(kpi => {
                const color = PILLAR_COLORS[kpi.pillar] ?? "#6D4AE6";
                return (
                  <div key={kpi.label} className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-slate-600">{kpi.label}</p>
                    <p className="text-xl font-display font-light mt-1" style={{ color }}>{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
                      <span className="text-[10px] font-mono text-emerald-400">{kpi.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Pillar Focus */}
          <GlassCard className="overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.04]">
              <SectionLabel>Pillar Focus</SectionLabel>
            </div>
            <div className="p-4 space-y-2">
              {PILLARS.filter(p => ORGANIZATION.pillarFocus.includes(p.id)).map(p => {
                const color = PILLAR_COLORS[p.id] ?? "#6D4AE6";
                return (
                  <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }} />
                    <span className="text-sm text-slate-300">{p.name}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Top Recommendations */}
          <GlassCard className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
              <SectionLabel>Recommendations</SectionLabel>
              <Lightbulb className="h-3.5 w-3.5 text-amber-500/60" />
            </div>
            <div className="p-4 space-y-2">
              {topRecs.map(rec => {
                const color = PILLAR_COLORS[rec.pillar] ?? "#6D4AE6";
                return (
                  <div key={rec.id} className="p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                    <p className="text-xs text-white leading-snug">{rec.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${URGENCY_COLORS[rec.urgency] ?? ""}`}>
                        {rec.urgency}
                      </span>
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
              <Link to="/client/recommendations" className="text-[10px] font-mono text-slate-600 hover:text-violet-400 transition-colors flex items-center gap-1 pt-1">
                All recommendations <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          </GlassCard>

          {/* Quick Links */}
          <GlassCard className="overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.04]">
              <SectionLabel>Quick Links</SectionLabel>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                { label: "Reports", to: "/client/reports", icon: FileText },
                { label: "Action Plan", to: "/client/action-plan", icon: Map },
                { label: "KPIs", to: "/client/kpis", icon: TrendingUp },
                { label: "Timeline", to: "/client/timeline", icon: CalendarCheck },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-500/20 border border-transparent text-sm text-slate-400 hover:text-white transition-all duration-200"
                >
                  <link.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="text-xs font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
