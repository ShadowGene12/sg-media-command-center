import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Target, Wrench, Calculator, Search, TrendingUp, FileText, Clock, ArrowRight, Lock } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";

const TOOL_GROUPS = [
  {
    pillar: "Market & Offer", color: "#6D4AE6",
    tools: [
      { name: "Offer Clarity Audit",    icon: Target,    desc: "Score your offer against 12 clarity markers",      lastRun: "3 days ago", route: null },
      { name: "Positioning Analyzer",   icon: Search,    desc: "Map your positioning vs competitors",               lastRun: null,         route: null },
      { name: "ICP Builder",            icon: FileText,  desc: "Build your ideal customer profile step-by-step",    lastRun: null,         route: null },
    ],
  },
  {
    pillar: "Customer Acquisition", color: "#378ADD",
    tools: [
      { name: "Funnel Mapper",           icon: TrendingUp, desc: "Visualize your acquisition funnel end-to-end", lastRun: null,          route: null },
      { name: "Channel Cost Calculator", icon: Calculator, desc: "Calculate true cost per channel",              lastRun: "1 week ago",  route: null },
    ],
  },
  {
    pillar: "Sales & Conversion", color: "#1D9E75",
    tools: [
      { name: "Sales Process Auditor", icon: Wrench, desc: "Audit your sales process maturity",        lastRun: null, route: null },
      { name: "Objection Mapper",      icon: Target, desc: "Document and script objection responses",  lastRun: null, route: null },
    ],
  },
  {
    pillar: "Profit Optimization", color: "#F59E0B",
    tools: [
      { name: "Profit Calculator",  icon: Calculator, desc: "Model margins and find hidden profit leaks",       lastRun: "2 days ago", route: "/tools/profit-calculator" },
      { name: "Pricing Diagnostic", icon: BarChart3,  desc: "Evaluate pricing power and elasticity",            lastRun: null,         route: null },
    ],
  },
  {
    pillar: "Financial Control", color: "#D85A30",
    tools: [
      { name: "KPI Tracker Template", icon: BarChart3,   desc: "Set up your core KPI dashboard",              lastRun: null, route: null },
      { name: "Cash Flow Scanner",    icon: TrendingUp,  desc: "Analyze 90-day cash flow projections",         lastRun: null, route: null },
    ],
  },
];

const cardVars = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.06 } }),
};

const ToolsLibrary = () => {
  const recentTools = TOOL_GROUPS.flatMap(g => g.tools.filter(t => t.lastRun).map(t => ({ ...t, pillar: g.pillar, color: g.color })));

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <PageHeader
        label="Execution Layer"
        title="Tools"
        description="Interactive tools and calculators for every growth pillar."
      />

      {/* Recently used */}
      {recentTools.length > 0 && (
        <div>
          <SectionLabel className="mb-4">Recently Used</SectionLabel>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {recentTools.map((tool, i) => (
              <motion.div key={tool.name} custom={i} variants={cardVars} initial="hidden" animate="show"
                className="min-w-[240px] flex-shrink-0 snap-start rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-4 hover:border-white/[0.12] transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: `${tool.color}15`, borderColor: `${tool.color}30` }}>
                    <tool.icon className="h-4 w-4" style={{ color: tool.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-violet-200 transition-colors">{tool.name}</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-0.5">{tool.lastRun}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Grouped by pillar */}
      <div className="space-y-8">
        {TOOL_GROUPS.map((group, gi) => (
          <motion.div key={group.pillar}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + gi * 0.07, type: "spring", stiffness: 100, damping: 18 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: group.color, boxShadow: `0 0 6px ${group.color}80` }} />
              <SectionLabel>{group.pillar}</SectionLabel>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.tools.map((tool, ti) => {
                const isLive = !!tool.route;
                const Wrapper = isLive ? Link : "div";
                const wrapperProps = isLive ? { to: tool.route! } : {};
                return (
                  <Wrapper key={tool.name} {...(wrapperProps as any)}
                    className="group relative rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-5 hover:border-white/[0.12] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col gap-4"
                  >
                    {/* Hover gradient bleed */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${group.color}08, transparent 70%)` }} />

                    <div className="relative z-10 h-10 w-10 rounded-xl flex items-center justify-center border"
                      style={{ backgroundColor: `${group.color}15`, borderColor: `${group.color}30` }}>
                      <tool.icon className="h-4 w-4" style={{ color: group.color }} />
                    </div>

                    <div className="relative z-10 flex-1">
                      <p className="text-sm font-semibold text-white group-hover:text-violet-100 transition-colors leading-snug">{tool.name}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tool.desc}</p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      {tool.lastRun && <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1"><Clock className="h-3 w-3" />{tool.lastRun}</span>}
                      {isLive ? (
                        <button className="flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-white transition-colors ml-auto">
                          Launch <ArrowRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-700 ml-auto">
                          <Lock className="h-3 w-3" /> Coming soon
                        </span>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsLibrary;
