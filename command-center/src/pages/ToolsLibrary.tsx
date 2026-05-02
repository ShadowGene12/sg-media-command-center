import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Target, Wrench, BookOpen, Calculator, Search, TrendingUp, FileText } from "lucide-react";

const TOOL_GROUPS = [
  {
    pillar: "Market & Offer",
    color: "#6D4AE6",
    tools: [
      { name: "Offer Clarity Audit", icon: Target, desc: "Score your offer against 12 clarity markers", lastRun: "3 days ago" },
      { name: "Positioning Analyzer", icon: Search, desc: "Map your positioning vs competitors", lastRun: null },
      { name: "ICP Builder", icon: FileText, desc: "Build your ideal customer profile step-by-step", lastRun: null },
    ]
  },
  {
    pillar: "Customer Acquisition",
    color: "#378ADD",
    tools: [
      { name: "Funnel Mapper", icon: TrendingUp, desc: "Visualize your acquisition funnel end-to-end", lastRun: null },
      { name: "Channel Cost Calculator", icon: Calculator, desc: "Calculate true cost per channel", lastRun: "1 week ago" },
    ]
  },
  {
    pillar: "Sales & Conversion",
    color: "#1D9E75",
    tools: [
      { name: "Sales Process Auditor", icon: Wrench, desc: "Audit your sales process maturity", lastRun: null },
      { name: "Objection Mapper", icon: Target, desc: "Document and script objection responses", lastRun: null },
    ]
  },
  {
    pillar: "Profit Optimization",
    color: "#F59E0B",
    tools: [
      { name: "Profit Calculator", icon: Calculator, desc: "Model margins and find hidden profit leaks", lastRun: "2 days ago" },
      { name: "Pricing Diagnostic", icon: BarChart3, desc: "Evaluate pricing power and elasticity", lastRun: null },
    ]
  },
  {
    pillar: "Financial Control",
    color: "#D85A30",
    tools: [
      { name: "KPI Tracker Template", icon: BarChart3, desc: "Set up your core KPI dashboard", lastRun: null },
      { name: "Cash Flow Scanner", icon: TrendingUp, desc: "Analyze 90-day cash flow projections", lastRun: null },
    ]
  },
];

const ToolsLibrary = () => {
  // Recently used tools
  const recentTools = TOOL_GROUPS.flatMap(g => g.tools.filter(t => t.lastRun).map(t => ({ ...t, pillar: g.pillar, color: g.color })));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Tools</h1>
        <p className="text-muted-foreground mt-1">Interactive tools and calculators for every growth pillar.</p>
      </div>

      {/* Recently used */}
      {recentTools.length > 0 && (
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Recently Used</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
            {recentTools.map((tool) => (
              <div key={tool.name} className="min-w-[260px] flex-shrink-0 snap-start bg-card/30 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:bg-card/50 hover:border-white/20 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tool.color}15` }}>
                    <tool.icon className="h-5 w-5" style={{ color: tool.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">{tool.lastRun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All tools grouped by pillar */}
      {TOOL_GROUPS.map((group) => (
        <div key={group.pillar}>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: group.color }} />
            {group.pillar}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.tools.map((tool) => {
              const isProfitCalc = tool.name === "Profit Calculator";
              const Wrapper = isProfitCalc ? Link : 'div';
              const props = isProfitCalc ? { to: "/tools/profit-calculator" } : {};
              
              return (
                <Wrapper 
                  {...props}
                  key={tool.name} 
                  className="bg-card/30 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:bg-card/50 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4 relative z-10" style={{ backgroundColor: `${group.color}15` }}>
                    <tool.icon className="h-5 w-5" style={{ color: group.color }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1 relative z-10 text-foreground">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 relative z-10">{tool.desc}</p>
                  <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity relative z-10 bg-black/20 backdrop-blur border-white/10 hover:bg-white/10 hover:text-white">
                    {isProfitCalc ? "Launch tool →" : "Coming soon"}
                  </Button>
                </Wrapper>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsLibrary;
