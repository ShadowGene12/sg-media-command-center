import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowRight, RotateCcw, Clock, TrendingUp, Zap, Activity, ChevronRight } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const DIAGNOSTICS = [
  {
    name: "Master Bottleneck Scanner",
    desc: "Full 25-question diagnostic across all 5 pillars — your definitive growth health score",
    time: "~15 min",
    accent: true,
    color: "#6D4AE6",
    lastRun: "14 days ago",
    score: "14.2 / 25.0",
    improvement: "+2.1",
    trend: "up" as const,
  },
  { name: "Market & Offer Clarity",            desc: "Deep-dive into target market definition, offer positioning, and ICP alignment",          time: "~8 min",  color: "#6D4AE6", lastRun: null,          score: null, improvement: null, trend: "up" as const },
  { name: "Customer Acquisition",              desc: "Channel mix analysis, CAC tracking, lead source consistency, and inbound quality",       time: "~8 min",  color: "#378ADD", lastRun: null,          score: null, improvement: null, trend: "up" as const },
  { name: "Sales & Conversion",                desc: "Process maturity, conversion rate gaps, follow-up cadence, and deal velocity",          time: "~8 min",  color: "#1D9E75", lastRun: null,          score: null, improvement: null, trend: "up" as const },
  { name: "Profit Optimization",               desc: "Margin analysis, pricing power, cost structure health, and upsell path readiness",      time: "~8 min",  color: "#F59E0B", lastRun: null,          score: null, improvement: null, trend: "up" as const },
  { name: "Financial & Performance Control",   desc: "KPI tracking maturity, cash flow visibility, forecasting accuracy, and review cadence", time: "~8 min",  color: "#D85A30", lastRun: null,          score: null, improvement: null, trend: "up" as const },
];

const HISTORY = [
  { name: "Master Bottleneck Scanner", date: "April 8, 2026",   score: "14.2", max: "25.0", delta: "+2.1", primary: "Sales & Conversion",   color: "#1D9E75" },
  { name: "Master Bottleneck Scanner", date: "March 8, 2026",   score: "12.1", max: "25.0", delta: "+1.6", primary: "Market & Offer",        color: "#6D4AE6" },
  { name: "Master Bottleneck Scanner", date: "February 8, 2026",score: "10.5", max: "25.0", delta: "+0.7", primary: "Market & Offer",        color: "#6D4AE6" },
  { name: "Master Bottleneck Scanner", date: "January 8, 2026", score: "9.8",  max: "25.0", delta: "—",    primary: "Market & Offer",        color: "#6D4AE6" },
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

// ─── Mini sparkline trend ──────────────────────────────────────────────────────
const TrendSparkline = () => {
  const scores = HISTORY.slice().reverse().map(h => parseFloat(h.score));
  const max = 25;
  const pts = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * 80;
    const y = 20 - (s / max) * 20;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 80 24" className="w-20 h-6" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="#1D9E75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {scores.map((s, i) => {
        const x = (i / (scores.length - 1)) * 80;
        const y = 20 - (s / max) * 20;
        return <circle key={i} cx={x} cy={y} r="2" fill="#1D9E75" opacity={i === scores.length - 1 ? 1 : 0.5} />;
      })}
    </svg>
  );
};

// ─── Diagnostic card ───────────────────────────────────────────────────────────
const DiagCard = ({ diag, index }: { diag: typeof DIAGNOSTICS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl flex flex-col gap-4 p-6 h-full bento-card bento-shine grain-overlay"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: diag.accent ? `1px solid ${diag.color}35` : "1px solid rgba(255,255,255,0.06)",
          borderTop: diag.accent ? `1px solid ${diag.color}50` : "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          boxShadow: diag.accent ? `0 0 30px -8px ${diag.color}20` : undefined,
        }}
      >
        {diag.accent && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent pointer-events-none" />
        )}

        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${diag.color}10 0%, transparent 60%)` }} />

        {/* Color accent bar */}
        <div className="h-0.5 w-10 rounded-full relative z-10"
          style={{ backgroundColor: diag.color, boxShadow: `0 0 8px ${diag.color}80` }} />

        <div className="flex-1 relative z-10">
          <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug group-hover:text-violet-200 transition-colors">{diag.name}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{diag.desc}</p>
        </div>

        {/* Score if run */}
        {diag.score && (
          <div className="relative z-10 flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            style={{ background: `${diag.color}08`, border: `1px solid ${diag.color}20` }}>
            <Activity className="w-3.5 h-3.5 flex-shrink-0" style={{ color: diag.color }} />
            <span className="font-mono text-sm font-semibold" style={{ color: diag.color }}>{diag.score}</span>
            {diag.improvement && (
              <span className="text-[10px] font-mono text-emerald-400 ml-auto">{diag.improvement}</span>
            )}
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.04]">
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
      </div>
    </motion.div>
  );
};

const DiagnosticsHub = () => (
  <div className="max-w-6xl mx-auto space-y-8 pb-16">
    <PageHeader
      label="Health Monitoring"
      title="Diagnostics"
      description="Run, compare, and track your growth diagnostics over time."
    />

    {/* Stats strip */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: "Total Runs",      value: String(HISTORY.length), icon: Activity,   color: "#6D4AE6" },
        { label: "Latest Score",    value: "14.2",                 icon: BarChart3,  color: "#1D9E75" },
        { label: "Score Gain",      value: "+4.4",                 icon: TrendingUp, color: "#378ADD" },
        { label: "Days Since Last", value: "14",                   icon: Clock,      color: "#F59E0B" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(0,0,0,0.42)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(20px)" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: s.color + "18", border: `1px solid ${s.color}30` }}>
            <s.icon className="w-4 h-4" style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-xl font-display font-light text-white">{s.value}</p>
            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Status panel */}
    <Reveal>
      <div
        className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bento-card grain-overlay"
        style={{
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(109,74,230,0.18)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(109,74,230,0.10) 0%, transparent 55%)" }} />

        <div className="flex items-center gap-4 relative z-10">
          <div className="h-12 w-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(109,74,230,0.2)]">
            <BarChart3 className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Last diagnostic: <span className="text-violet-400 font-mono">14 days ago</span>
            </p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Overall score: 14.2 / 25.0</p>
          </div>
        </div>

        {/* Score trend sparkline */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Score trend</p>
            <TrendSparkline />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link to="/detector/flow">
              <Button className="bg-white hover:bg-slate-100 text-black rounded-full h-10 px-5 text-sm font-medium">
                Run new diagnostic <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Reveal>

    {/* Available diagnostics */}
    <div>
      <SectionLabel className="mb-5 flex items-center gap-2">
        Available Diagnostics
        <span className="ml-auto text-[9px] font-mono text-slate-600 normal-case tracking-normal">{DIAGNOSTICS.length} tools</span>
      </SectionLabel>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIAGNOSTICS.map((diag, i) => (
          <DiagCard key={diag.name} diag={diag} index={i} />
        ))}
      </div>
    </div>

    {/* History */}
    <div>
      <SectionLabel className="mb-4 flex items-center gap-2">
        Diagnostic History
        <span className="ml-auto text-[9px] font-mono text-slate-600 normal-case tracking-normal">{HISTORY.length} runs</span>
      </SectionLabel>
      <Reveal delay={0.1}>
        <div
          className="relative overflow-hidden rounded-2xl bento-card"
          style={{
            background: "rgba(0,0,0,0.42)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none" />
          {HISTORY.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-white/[0.03] last:border-0 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-slate-600">{i + 1}</span>
                  {i < HISTORY.length - 1 && <div className="w-px h-3 bg-white/[0.05]" />}
                </div>
                <div>
                  <p className="text-sm text-slate-200">{entry.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs font-mono text-slate-600">{entry.date}</p>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: entry.color, boxShadow: `0 0 4px ${entry.color}80` }} />
                    <span className="text-[10px] font-mono text-slate-600">{entry.primary}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-sm font-semibold text-violet-400">{entry.score}</span>
                    <span className="font-mono text-xs text-slate-600">/{entry.max}</span>
                  </div>
                  {entry.delta !== "—" && (
                    <span className="text-[10px] font-mono text-emerald-400">{entry.delta}</span>
                  )}
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </div>
);

export default DiagnosticsHub;
