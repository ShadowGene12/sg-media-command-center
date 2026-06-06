import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, Target, Wrench, Calculator, Search,
  TrendingUp, FileText, Clock, ArrowRight, Lock,
  Sparkles, Zap, DollarSign, ShieldCheck, Layers,
  LineChart, Users, PieChart, RefreshCw, Star,
} from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";

const TOOL_GROUPS = [
  {
    pillar: "Market & Offer", color: "#6D4AE6",
    tools: [
      { name: "Offer Clarity Audit",     icon: Target,       desc: "Score your offer against 12 clarity markers across price, promise, proof, and differentiation.",  lastRun: "3 days ago", route: null,                       status: "live" as const  },
      { name: "Positioning Analyzer",    icon: Search,       desc: "Map your positioning against competitors to find untapped windows and differentiation angles.",       lastRun: null,         route: null,                       status: "coming" as const },
      { name: "ICP Builder",             icon: Users,        desc: "Build your ideal customer profile step-by-step across 8 firmographic and psychographic dimensions.", lastRun: null,         route: null,                       status: "coming" as const },
      { name: "Messaging Clarity Score", icon: FileText,     desc: "Assess the clarity and persuasion strength of your core messaging across 6 communication layers.",    lastRun: null,         route: null,                       status: "coming" as const },
    ],
  },
  {
    pillar: "Customer Acquisition", color: "#378ADD",
    tools: [
      { name: "Funnel Mapper",             icon: TrendingUp,  desc: "Visualise and measure your acquisition funnel end-to-end — from cold traffic to client conversion.", lastRun: null,          route: null,                       status: "coming" as const },
      { name: "Channel Cost Calculator",   icon: Calculator,  desc: "Calculate your true cost-per-acquisition per channel with blended CAC and ROI benchmarks.",          lastRun: "1 week ago",  route: null,                       status: "live" as const  },
      { name: "Lead Scoring Engine",       icon: Star,        desc: "Score inbound leads on 8 dimensions to prioritise which conversations deserve immediate attention.",   lastRun: null,         route: null,                       status: "coming" as const },
      { name: "Content ROI Tracker",       icon: BarChart3,   desc: "Measure the lead generation ROI of your content pieces across organic, paid, and referral channels.", lastRun: null,         route: null,                       status: "coming" as const },
    ],
  },
  {
    pillar: "Sales & Conversion", color: "#1D9E75",
    tools: [
      { name: "Sales Process Auditor",    icon: Wrench,      desc: "Score your sales process maturity across 5 stages: qualification, discovery, proposal, close, follow-up.", lastRun: null,     route: null,                       status: "coming" as const },
      { name: "Objection Mapper",         icon: Target,      desc: "Document, categorise, and script responses to objections to build a replicable sales playbook.",          lastRun: null,     route: null,                       status: "coming" as const },
      { name: "Conversion Rate Analyser", icon: LineChart,   desc: "Diagnose your funnel stage-by-stage conversion rates and identify the highest-leverage improvement zone.", lastRun: null,    route: null,                       status: "coming" as const },
      { name: "Pipeline Velocity Tool",   icon: Zap,         desc: "Measure how fast deals move through your pipeline and identify the stages causing the most drag.",         lastRun: null,    route: null,                       status: "coming" as const },
    ],
  },
  {
    pillar: "Profit Optimization", color: "#F59E0B",
    tools: [
      { name: "Profit Calculator",        icon: Calculator,  desc: "Model your margins end-to-end — gross, net, and contribution — and find hidden profit leakage points.",    lastRun: "2 days ago", route: "/tools/profit-calculator", status: "live" as const  },
      { name: "Pricing Diagnostic",       icon: DollarSign,  desc: "Evaluate your pricing power, perceived value gap, and upgrade path potential across your offer stack.",     lastRun: null,         route: null,                       status: "live" as const  },
      { name: "Revenue Leakage Scanner",  icon: ShieldCheck, desc: "Run through 8 categories of revenue leakage and quantify how much is leaving your business each month.",     lastRun: null,        route: null,                       status: "coming" as const },
      { name: "Margin Optimiser",         icon: PieChart,    desc: "Identify the cost structure adjustments that will move your net margin the most with the least disruption.", lastRun: null,        route: null,                       status: "coming" as const },
    ],
  },
  {
    pillar: "Financial Control", color: "#D85A30",
    tools: [
      { name: "KPI Tracker Template",     icon: BarChart3,   desc: "Set up your core 12 KPI dashboard — automated scoring, traffic-light status, and trend visualisation.",    lastRun: null, route: null,                       status: "coming" as const },
      { name: "Cash Flow Scanner",        icon: TrendingUp,  desc: "Analyse your 13-week cash flow position and identify upcoming crunch points before they become crises.",    lastRun: null, route: null,                       status: "coming" as const },
      { name: "Revenue Forecaster",       icon: LineChart,   desc: "Build a bottom-up revenue forecast from pipeline data, conversion rates, and capacity constraints.",         lastRun: null, route: null,                       status: "coming" as const },
      { name: "Business Score Reporter",  icon: RefreshCw,   desc: "Generate a full 5-pillar business health score with trend comparison across your last 3 diagnostics.",       lastRun: null, route: null,                       status: "coming" as const },
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

// ─── Tool card ─────────────────────────────────────────────────────────────────
const ToolCard = ({ tool, color, index }: { tool: typeof TOOL_GROUPS[0]["tools"][0]; color: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const isLive = !!tool.route || tool.status === "live";
  const Wrapper = tool.route ? Link : "div";
  const wrapperProps = tool.route ? { to: tool.route } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Wrapper
        {...(wrapperProps as any)}
        className="group relative rounded-2xl overflow-hidden flex flex-col gap-4 p-5 transition-all duration-300 bento-card bento-shine"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          cursor: tool.route ? "pointer" : "default",
        }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `radial-gradient(circle at 0% 0%, ${color}08, transparent 70%)` }} />

        <div className="relative z-10 flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center border flex-shrink-0"
            style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}>
            <tool.icon className="h-4 w-4" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white group-hover:text-violet-100 transition-colors leading-snug">{tool.name}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{tool.desc}</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          {tool.lastRun && (
            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {tool.lastRun}
            </span>
          )}
          {tool.route ? (
            <button className="flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-white transition-colors ml-auto">
              Launch <ArrowRight className="h-3 w-3" />
            </button>
          ) : tool.status === "live" ? (
            <span className="flex items-center gap-1.5 text-[10px] font-mono ml-auto px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${color}15`, color, borderColor: `${color}30` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-700 ml-auto">
              <Lock className="h-3 w-3" /> Coming soon
            </span>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
};

const ToolsLibrary = () => {
  const [search, setSearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState("All");

  const allTools = TOOL_GROUPS.flatMap(g => g.tools.map(t => ({ ...t, pillar: g.pillar, color: g.color })));
  const recentTools = allTools.filter(t => t.lastRun);
  const liveCount = allTools.filter(t => t.route || t.status === "live").length;

  const filteredGroups = TOOL_GROUPS
    .filter(g => pillarFilter === "All" || g.pillar === pillarFilter)
    .map(g => ({
      ...g,
      tools: g.tools.filter(t =>
        !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Execution Layer"
          title="Tools"
          description="Interactive calculators and auditors for every growth pillar."
        />
        <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-[11px] font-mono text-slate-400">{liveCount} live tools</span>
          </div>
        </div>
      </div>

      {/* Bento hero */}
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl p-7 bento-card grain-overlay"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(109,74,230,0.15)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Wrench className="w-56 h-56 text-violet-300" />
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(109,74,230,0.10) 0%, transparent 55%)" }} />

          <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3 text-[10px] font-mono tracking-widest text-violet-400/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
                Interactive Tools · {liveCount} Live
              </div>
              <h2 className="text-2xl font-display font-light text-white tracking-tight mb-2">
                Your growth toolkit, built for operators
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Every tool maps directly to a pillar — diagnose your numbers, model scenarios, and get instant prioritisation signals.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {TOOL_GROUPS.slice(0, 4).map((g, i) => (
                <motion.div
                  key={g.pillar}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 120, damping: 18 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${g.color}20`,
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${g.color}15`, border: `1px solid ${g.color}25` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                  </div>
                  <p className="text-[9px] font-mono text-slate-500 leading-tight">{g.pillar.split(" ")[0]}</p>
                  <p className="text-sm font-display font-light" style={{ color: g.color }}>{g.tools.length}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Recently used */}
      {recentTools.length > 0 && (
        <Reveal delay={0.05}>
          <div>
            <SectionLabel className="mb-4">Recently Used</SectionLabel>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {recentTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18 }}
                  className="min-w-[220px] flex-shrink-0 snap-start rounded-xl group cursor-pointer"
                  style={{
                    background: "rgba(0,0,0,0.42)",
                    border: `1px solid ${tool.color}20`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div className="p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                      style={{ backgroundColor: `${tool.color}15`, borderColor: `${tool.color}30` }}>
                      <tool.icon className="h-4 w-4" style={{ color: tool.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-violet-200 transition-colors truncate">{tool.name}</p>
                      <p className="text-[10px] font-mono text-slate-600 mt-0.5">{tool.lastRun}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Search + pillar filter */}
      <Reveal delay={0.05}>
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              placeholder="Search tools..."
              className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...TOOL_GROUPS.map(g => g.pillar)].map(f => {
              const g = TOOL_GROUPS.find(g => g.pillar === f);
              const col = g?.color ?? "#6D4AE6";
              return (
                <button
                  key={f}
                  onClick={() => setPillarFilter(f)}
                  className={`h-7 px-3 rounded-full text-[10px] font-mono transition-all border ${
                    pillarFilter === f ? "text-white" : "text-slate-600 border-white/[0.05] hover:text-slate-300 hover:border-white/[0.10]"
                  }`}
                  style={pillarFilter === f ? { backgroundColor: col + "18", borderColor: col + "40", color: col } : {}}
                >
                  {f === "All" ? "All Pillars" : f.split(" ")[0] + " & " + (f.split(" ")[1] ?? "")}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Grouped by pillar */}
      <div className="space-y-8">
        {filteredGroups.map((group, gi) => (
          <Reveal key={group.pillar} delay={0.05 * gi}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 6px ${group.color}80` }} />
                <SectionLabel>{group.pillar}</SectionLabel>
                <span className="text-[9px] font-mono text-slate-700 ml-auto">{group.tools.length} tools</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.tools.map((tool, ti) => (
                  <ToolCard key={tool.name} tool={tool} color={group.color} index={gi * 4 + ti} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default ToolsLibrary;
