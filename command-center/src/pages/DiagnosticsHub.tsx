import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowRight, RotateCcw, Clock } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const DIAGNOSTICS = [
  {
    name: "Master Bottleneck Scanner",
    desc: "Full 25-question diagnostic across all 5 pillars",
    time: "~15 min",
    accent: true,
    color: "#6D4AE6",
    lastRun: "14 days ago",
    score: "14.2 / 25.0",
  },
  { name: "Market & Offer Clarity", desc: "Deep-dive into target market and offer positioning", time: "~8 min", color: "#6D4AE6", lastRun: null, score: null },
  { name: "Customer Acquisition", desc: "Channel mix, CAC tracking, lead consistency", time: "~8 min", color: "#378ADD", lastRun: null, score: null },
  { name: "Sales & Conversion", desc: "Process maturity, conversion rate, follow-up cadence", time: "~8 min", color: "#1D9E75", lastRun: null, score: null },
  { name: "Profit Optimization", desc: "Margin analysis, pricing power, cost structure", time: "~8 min", color: "#F59E0B", lastRun: null, score: null },
  { name: "Financial & Performance Control", desc: "KPI tracking, cash flow visibility, review cadence", time: "~8 min", color: "#D85A30", lastRun: null, score: null },
];

const HISTORY = [
  { name: "Master Bottleneck Scanner", date: "April 8, 2026", score: "14.2", max: "25.0" },
  { name: "Master Bottleneck Scanner", date: "March 8, 2026", score: "12.1", max: "25.0" },
];

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18 } },
};

const DiagnosticsHub = () => (
  <div className="max-w-6xl mx-auto space-y-10 pb-12">
    <PageHeader
      label="Health Monitoring"
      title="Diagnostics"
      description="Run, compare, and track your growth diagnostics over time."
    />

    {/* Status panel */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
      className="rounded-2xl border border-violet-500/20 bg-violet-500/5 backdrop-blur-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(109,74,230,0.2)]">
          <BarChart3 className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Last diagnostic: <span className="text-violet-400 font-mono">14 days ago</span></p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Overall score: 14.2 / 25.0</p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Link to="/detector/flow">
          <Button className="bg-white hover:bg-slate-100 text-black rounded-full h-10 px-5 text-sm font-medium">
            Run new diagnostic <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
        <Button variant="outline" className="rounded-full h-10 px-5 text-sm border-white/10 text-slate-400 hover:text-white">
          Compare
        </Button>
      </div>
    </motion.div>

    {/* Available diagnostics */}
    <div>
      <SectionLabel className="mb-5">Available Diagnostics</SectionLabel>
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {DIAGNOSTICS.map((diag) => (
          <motion.div key={diag.name} variants={cardVars}>
            <PremiumCard
              glowColor={`${diag.color}1A`}
              className="p-6 flex flex-col gap-4 h-full"
              style={{
                borderColor: diag.accent ? `${diag.color}35` : undefined,
                boxShadow: diag.accent ? `0 0 30px -8px ${diag.color}20` : undefined,
              } as React.CSSProperties}
            >
            {/* Color accent bar */}
            <div className="h-0.5 w-10 rounded-full" style={{ backgroundColor: diag.color, boxShadow: `0 0 8px ${diag.color}80` }} />

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">{diag.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{diag.desc}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-mono text-slate-600">{diag.time}</span>
                {diag.lastRun && (
                  <>
                    <span className="text-slate-700 mx-1">·</span>
                    <span className="text-[10px] font-mono text-slate-600">Last: {diag.lastRun}</span>
                  </>
                )}
              </div>
              <Link to="/detector/flow">
                <button
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                  style={{ color: diag.color }}
                >
                  {diag.lastRun ? <><RotateCcw className="w-3 h-3" /> Retake</> : <>Start <ArrowRight className="w-3 h-3" /></>}
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* History */}
    <div>
      <SectionLabel className="mb-4">Diagnostic History</SectionLabel>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 18 }}>
        <PremiumCard glowColor="rgba(109,74,230,0.08)">
          {HISTORY.map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-white/[0.03] last:border-0 group">
              <div>
                <p className="text-sm text-slate-200">{entry.name}</p>
                <p className="text-xs font-mono text-slate-600 mt-0.5">{entry.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-mono text-sm font-semibold text-violet-400">{entry.score}</span>
                  <span className="font-mono text-xs text-slate-600">/{entry.max}</span>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View report
                </Button>
              </div>
            </div>
          ))}
        </PremiumCard>
      </motion.div>
    </div>
  </div>
);

export default DiagnosticsHub;
