import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart2, ArrowRight, TrendingUp, History, GitCompare } from "lucide-react";
import { PremiumCard } from "@/components/PremiumCard";
import { PageHeader } from "@/components/PageHeader";

const PILLAR_COLORS: Record<string, string> = {
  "Sales & Conversion":    "#1D9E75",
  "Market & Offer":        "#6D4AE6",
  "Customer Acquisition":  "#378ADD",
  "Profit Optimization":   "#F59E0B",
  "Financial Control":     "#D85A30",
};

const PILLAR_GLOW: Record<string, string> = {
  "#1D9E75": "rgba(29,158,117,0.10)",
  "#6D4AE6": "rgba(109,74,230,0.10)",
  "#378ADD": "rgba(55,138,221,0.10)",
  "#F59E0B": "rgba(245,158,11,0.10)",
  "#D85A30": "rgba(216,90,48,0.10)",
};

const MOCK_HISTORY = [
  { id: "run-3", date: "April 22, 2026",    score: 13.8, bottleneck: "Sales & Conversion", improvement: "+2.1", rank: 3 },
  { id: "run-2", date: "March 15, 2026",    score: 11.7, bottleneck: "Market & Offer",      improvement: "+1.4", rank: 2 },
  { id: "run-1", date: "February 01, 2026", score: 10.3, bottleneck: "Market & Offer",      improvement: null,  rank: 1 },
];

const TREND_POINTS = MOCK_HISTORY.slice().reverse().map(r => r.score);
const maxScore = 25;
const chartH = 80;
const chartW = 260;

function SparkPath() {
  const pts = TREND_POINTS.map((v, i) => {
    const x = (i / (TREND_POINTS.length - 1)) * chartW;
    const y = chartH - (v / maxScore) * chartH;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6D4AE6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6D4AE6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="#6D4AE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${chartH} ${pts} ${chartW},${chartH}`} fill="url(#sparkFill)" />
      {TREND_POINTS.map((v, i) => {
        const x = (i / (TREND_POINTS.length - 1)) * chartW;
        const y = chartH - (v / maxScore) * chartH;
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#6D4AE6" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18 } },
};

export default function DetectorHistory() {
  const latest = MOCK_HISTORY[0];
  const first  = MOCK_HISTORY[MOCK_HISTORY.length - 1];
  const totalGain = (latest.score - first.score).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-2 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Growth Intelligence"
          title="Diagnostic History"
          description="Track your score trajectory and evolving bottlenecks over time."
        />
        <Link to="/detector/flow" className="flex-shrink-0 self-start md:self-end">
          <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/95 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]">
            <BarChart2 className="w-4 h-4" /> New Diagnostic Run
          </button>
        </Link>
      </div>

      {/* Top summary cards */}
      <motion.div variants={containerVars} initial="hidden" animate="show" className="grid md:grid-cols-12 gap-5">

        {/* Trajectory chart */}
        <motion.div variants={itemVars} className="md:col-span-8">
          <PremiumCard glowColor="rgba(109, 74, 230, 0.12)" className="p-8 h-full">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">Score Trajectory</p>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                +{totalGain} total gain
              </span>
            </div>
            <div className="flex items-end gap-6 mb-4 mt-2">
              <div>
                <span className="text-4xl font-display font-light text-white tracking-tighter">{latest.score}</span>
                <span className="text-sm font-mono text-slate-600 ml-1">/ 25.0</span>
              </div>
              <p className="text-sm text-slate-500 pb-1">Latest run · {latest.date}</p>
            </div>
            <SparkPath />
            <div className="flex justify-between mt-2">
              {MOCK_HISTORY.slice().reverse().map(r => (
                <span key={r.id} className="text-[10px] font-mono text-slate-600">{r.date.split(",")[0]}</span>
              ))}
            </div>
          </PremiumCard>
        </motion.div>

        {/* Compare widget */}
        <motion.div variants={itemVars} className="md:col-span-4">
          <PremiumCard glowColor="rgba(0, 210, 255, 0.08)" className="p-8 h-full flex flex-col justify-between">
            <div>
              <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-5">Compare Runs</p>
              <div className="flex items-center justify-center mb-5">
                <GitCompare className="w-10 h-10 text-violet-400/40" />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed text-center">
                Select two past runs to generate a side-by-side scorecard and see exactly what changed.
              </p>
            </div>
            <button className="mt-6 w-full h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-white hover:border-white/[0.16] transition-all">
              Compare Run 1 vs Run 3
            </button>
          </PremiumCard>
        </motion.div>
      </motion.div>

      {/* Past runs list */}
      <div>
        <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-5">Past Runs — {MOCK_HISTORY.length} entries</p>
        <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-3">
          {MOCK_HISTORY.map((run, i) => {
            const color = PILLAR_COLORS[run.bottleneck] ?? "#6D4AE6";
            return (
              <motion.div key={run.id} variants={itemVars}>
                <PremiumCard glowColor={PILLAR_GLOW[color] ?? "rgba(139,92,246,0.10)"}
                  className="group"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-7">
                    {/* Score circle */}
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <svg viewBox="0 0 64 64" className="-rotate-90 w-full h-full">
                        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                        <motion.circle
                          cx="32" cy="32" r="26"
                          fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 26}
                          initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - run.score / maxScore) }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 + 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-display font-light text-white">{run.score}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <p className="text-base font-display font-light text-white">{run.date}</p>
                        {run.improvement && (
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {run.improvement}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">Primary Bottleneck:</span>
                        <span
                          className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                          style={{ color, backgroundColor: `${color}18`, borderColor: `${color}30` }}
                        >
                          {run.bottleneck}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <Link to={`/detector/results/${run.id}`} className="flex-shrink-0">
                      <button className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-white transition-colors font-mono">
                        View Results <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </PremiumCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
