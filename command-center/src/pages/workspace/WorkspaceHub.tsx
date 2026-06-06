import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase, TrendingUp, Plus, ArrowRight, Lock,
  Clock, FileText, Calculator, Target, Search,
  BarChart3, Mail, PieChart, Layout, Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PremiumBadge } from "@/components/PremiumBadge";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PremiumCard } from "@/components/PremiumCard";

const ACTIVE_WORKSPACES = [
  {
    id: "wk-1",
    title: "Q3 Outbound Engine",
    pillar: "Customer Acquisition",
    color: "#378ADD",
    type: "Sequence Builder",
    lastEdited: "2 hours ago",
    progress: 40,
    description: "Cold email + LinkedIn outbound system for mid-market B2B prospects",
  },
];

const TEMPLATE_GROUPS = [
  {
    label: "Market & Offer",
    color: "#6D4AE6",
    templates: [
      { name: "Offer Positioning Canvas",  icon: Target,      desc: "Map your offer against price, promise, proof, and differentiation" },
      { name: "ICP Definition Builder",    icon: Search,      desc: "Build your ideal customer profile step-by-step" },
      { name: "Competitor Analysis Grid",  icon: Layout,      desc: "Systematically map and compare competitor positioning" },
    ],
  },
  {
    label: "Customer Acquisition",
    color: "#378ADD",
    templates: [
      { name: "Cold Email Sequence",       icon: Mail,        desc: "End-to-end cold outreach system: messaging + cadence" },
      { name: "Funnel Mapping Canvas",     icon: TrendingUp,  desc: "Visualise your acquisition funnel end-to-end" },
      { name: "Lead Scoring Matrix",       icon: BarChart3,   desc: "Score and prioritise inbound leads on 8 dimensions" },
    ],
  },
  {
    label: "Sales & Conversion",
    color: "#1D9E75",
    templates: [
      { name: "Sales Process Documenter",  icon: FileText,    desc: "Build your repeatable sales playbook from scratch" },
      { name: "Objection Script Builder",  icon: Target,      desc: "Script responses to your top 12 sales objections" },
    ],
  },
  {
    label: "Profit Optimization",
    color: "#F59E0B",
    templates: [
      { name: "Pricing Model",             icon: Calculator,  desc: "Model tiered pricing scenarios and calculate margin impact" },
      { name: "Revenue Leakage Audit",     icon: PieChart,    desc: "Identify and quantify revenue leakage across 8 categories" },
      { name: "Margin Optimiser",          icon: BarChart3,   desc: "Find the cost adjustments that move your net margin most" },
    ],
  },
  {
    label: "Financial Control",
    color: "#D85A30",
    templates: [
      { name: "Cash Flow Projector",       icon: TrendingUp,  desc: "13-week rolling cash flow model with scenario planning" },
      { name: "KPI Dashboard",             icon: BarChart3,   desc: "Track your 12 core KPIs with trend indicators and alerts" },
    ],
  },
];

// ─── Reveal wrapper ────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function WorkspaceHub() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const freeLimit = 1;
  const currentUsage = ACTIVE_WORKSPACES.length;
  const totalTemplates = TEMPLATE_GROUPS.reduce((a, g) => a + g.templates.length, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} featureName="unlimited workspaces and premium templates" />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Execution Layer"
          title="Workspace"
          description="Your active execution environments. Turn frameworks into actionable reality."
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

      {/* Bento hero */}
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl p-7 bento-card grain-overlay"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(55,138,221,0.15)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Briefcase className="w-56 h-56 text-blue-300" />
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(55,138,221,0.08) 0%, transparent 55%)" }} />

          <div className="relative z-10 grid md:grid-cols-3 gap-5 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3 text-[10px] font-mono tracking-widest text-sky-400/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse inline-block" />
                Execution Environment
              </div>
              <h2 className="text-2xl font-display font-light text-white tracking-tight mb-2">
                Where strategy becomes execution
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Each canvas is a live execution environment — linked to your SOPs, your KPIs, and your bottleneck. Build, track, iterate.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Active",     value: String(currentUsage),   color: "#378ADD" },
                { label: "Templates",  value: String(totalTemplates),  color: "#1D9E75" },
                { label: "Pillars",    value: "5",                     color: "#6D4AE6" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 120, damping: 18 }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${s.color}20` }}
                >
                  <p className="text-2xl font-display font-light" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[9px] font-mono text-slate-600">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Active canvases */}
      <div>
        <SectionLabel className="mb-5">Recent Canvases</SectionLabel>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVE_WORKSPACES.map((ws, i) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 18 }}
            >
              <div
                className="group relative overflow-hidden rounded-2xl bento-card bento-shine grain-overlay"
                style={{
                  background: "rgba(0,0,0,0.42)",
                  border: `1px solid ${ws.color}20`,
                  borderTop: `1px solid ${ws.color}30`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Progress bar */}
                <div className="h-0.5 bg-white/[0.04] w-full">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: ws.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${ws.progress}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${ws.color}0D, transparent 60%)` }} />

                <div className="p-5 flex flex-col gap-4 relative z-10">
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
                    <p className="text-xs text-slate-500 mt-1">{ws.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${ws.progress}%`, backgroundColor: ws.color }} />
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: ws.color }}>{ws.progress}%</span>
                  </div>

                  <Link to={`/workspace/${ws.id}`}>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200">
                      <span>Open Canvas</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add canvas slot */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ACTIVE_WORKSPACES.length * 0.08, type: "spring", stiffness: 100, damping: 18 }}
          >
            <button
              onClick={() => setShowUpgrade(true)}
              className="w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed border-white/[0.07] hover:border-violet-500/30 flex flex-col items-center justify-center gap-3 text-center p-6 transition-all duration-300 group"
            >
              <div className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                <Lock className="h-4 w-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Unlock Unlimited Canvases</p>
                <p className="text-xs text-slate-600 mt-0.5">Upgrade to Operator</p>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Templates — grouped by pillar */}
      <div className="pt-2 border-t border-white/[0.04]">
        <div className="flex items-center justify-between mb-6">
          <SectionLabel>Start from a Template</SectionLabel>
          <PremiumBadge className="text-[9px]">OPERATOR TIER</PremiumBadge>
        </div>

        <div className="space-y-6">
          {TEMPLATE_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={0.05 * gi}>
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: group.color, boxShadow: `0 0 6px ${group.color}80` }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{group.label}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {group.templates.map((template, i) => (
                    <motion.button
                      key={template.name}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.05 + i * 0.05, type: "spring", stiffness: 120, damping: 18 }}
                      onClick={() => setShowUpgrade(true)}
                      className="group flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: "rgba(0,0,0,0.38)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 0% 0%, ${group.color}08, transparent 70%)` }} />

                      <div className="relative z-10 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border"
                        style={{ backgroundColor: `${group.color}15`, borderColor: `${group.color}25` }}>
                        <template.icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                      </div>

                      <div className="relative z-10 flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors leading-snug">{template.name}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed line-clamp-2">{template.desc}</p>
                      </div>

                      <Lock className="relative z-10 h-3 w-3 text-slate-700 group-hover:text-violet-400 transition-colors flex-shrink-0 mt-0.5" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
