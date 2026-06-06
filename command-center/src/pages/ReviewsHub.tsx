import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar, FileText, TrendingUp, ArrowRight,
  TrendingDown, Minus, BarChart3, Star, Target,
  ChevronRight, Zap, DollarSign,
} from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const REVIEWS = [
  {
    month: "April 2026",
    score: 14.2,
    prev: 12.1,
    focus: "Sales & Conversion",
    color: "#1D9E75",
    status: "improving" as const,
    reflections: [
      "Documented the discovery call process — close rate improved by 8%",
      "Deployed the follow-up sequence: 3 cold leads reopened",
      "Need to fix proposal delivery — too slow post-discovery",
    ],
    wins: 2,
    actions: 5,
    completed: 4,
  },
  {
    month: "March 2026",
    score: 12.1,
    prev: 10.5,
    focus: "Customer Acquisition",
    color: "#378ADD",
    status: "improving" as const,
    reflections: [
      "Started consistent content publishing — 3 posts/week",
      "CAC dropped by 15% after cutting underperforming channels",
      "Need to improve follow-up cadence post-lead capture",
    ],
    wins: 2,
    actions: 6,
    completed: 4,
  },
  {
    month: "February 2026",
    score: 10.5,
    prev: 9.8,
    focus: "Market & Offer Clarity",
    color: "#6D4AE6",
    status: "steady" as const,
    reflections: [
      "Clarified ICP definition — reduced misfit leads by 20%",
      "Repositioned core offer with cleaner promise statement",
      "Pricing structure still unclear — needs restructuring",
    ],
    wins: 2,
    actions: 4,
    completed: 3,
  },
  {
    month: "January 2026",
    score: 9.8,
    prev: 8.4,
    focus: "Market & Offer Clarity",
    color: "#6D4AE6",
    status: "improving" as const,
    reflections: [
      "First time running the bottleneck detector — eye-opening",
      "Identified market positioning as primary bottleneck",
      "Set initial 90-day roadmap for offer repositioning",
    ],
    wins: 1,
    actions: 3,
    completed: 2,
  },
];

const STATUS_CONFIG = {
  improving: { icon: TrendingUp,   label: "Improving",  color: "#1D9E75" },
  declining: { icon: TrendingDown, label: "Declining",  color: "#EF4444" },
  steady:    { icon: Minus,        label: "Steady",     color: "#F59E0B" },
};

const PILLAR_ICONS: Record<string, React.ElementType> = {
  "Sales & Conversion":                 Target,
  "Customer Acquisition":               Zap,
  "Market & Offer Clarity":             Star,
  "Profit Optimization":                DollarSign,
  "Financial & Performance Control":    BarChart3,
};

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

// ─── Score sparkline ───────────────────────────────────────────────────────────
const ScoreSparkline = () => {
  const scores = REVIEWS.slice().reverse().map(r => r.score);
  const max = 25;
  const pts = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * 200;
    const y = 40 - (s / max) * 40;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 200 48" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6D4AE6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6D4AE6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke="#6D4AE6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {scores.map((s, i) => {
        const x = (i / (scores.length - 1)) * 200;
        const y = 40 - (s / max) * 40;
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#6D4AE6" opacity="0.8" />
        );
      })}
    </svg>
  );
};

// ─── Review card ──────────────────────────────────────────────────────────────
const ReviewCard = ({ review, index }: { review: typeof REVIEWS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const cfg = STATUS_CONFIG[review.status];
  const StatusIcon = cfg.icon;
  const PillarIcon = PILLAR_ICONS[review.focus] ?? Target;
  const delta = review.score - review.prev;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl bento-card bento-shine grain-overlay"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Pillar colour strip */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${review.color}80, transparent)` }} />

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${review.color}08, transparent 60%)` }} />

        <div className="p-6 relative z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                style={{ backgroundColor: `${review.color}18`, borderColor: `${review.color}30` }}>
                <FileText className="h-4 w-4" style={{ color: review.color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{review.month}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <PillarIcon className="h-3 w-3" style={{ color: review.color }} />
                  <p className="text-[10px] font-mono text-slate-500">Focus: {review.focus}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Status */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${cfg.color}15`, border: `1px solid ${cfg.color}25` }}>
                <StatusIcon className="h-3 w-3" style={{ color: cfg.color }} />
                <span className="text-[10px] font-mono" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-light text-white">{review.score.toFixed(1)}</span>
                  <span className="font-mono text-xs text-slate-600">/ 25.0</span>
                </div>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  {delta >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400" />
                  )}
                  <span className={`text-[10px] font-mono ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {delta >= 0 ? "+" : ""}{delta.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full liquid-glass">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono text-slate-400">{review.wins} wins</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full liquid-glass">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-[10px] font-mono text-slate-400">{review.completed}/{review.actions} actions done</span>
            </div>
            {/* Mini progress */}
            <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden ml-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: review.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(review.completed / review.actions) * 100}%` } : {}}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Reflections */}
          <ul className="space-y-1.5 border-t border-white/[0.04] pt-4">
            {review.reflections.map((r, j) => (
              <li key={j} className="flex items-start gap-2 text-xs text-slate-500">
                <div className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: review.color }} />
                {r}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-end">
            <button className="flex items-center gap-1.5 text-[10px] font-mono text-slate-700 hover:text-violet-400 transition-colors group-hover:opacity-100 opacity-0">
              View full review <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsHub = () => {
  const avgScore = (REVIEWS.reduce((a, r) => a + r.score, 0) / REVIEWS.length).toFixed(1);
  const latestDelta = REVIEWS[0].score - REVIEWS[0].prev;
  const totalWins = REVIEWS.reduce((a, r) => a + r.wins, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Progress Cadence"
          title="Reviews"
          description="Monthly self-reviews to track momentum and re-prioritise your focus pillar."
        />
        <button className="flex-shrink-0 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-100 transition-all active:scale-95 self-start md:self-end shadow-[0_0_20px_rgba(255,255,255,0.08)]">
          Start monthly review
        </button>
      </div>

      {/* Next review prompt */}
      <Reveal>
        <div
          className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(109,74,230,0.08) 0%, transparent 60%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(109,74,230,0.2)]">
              <Calendar className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Time for your monthly self-review</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Next re-diagnostic due in 8 days · May 31, 2026</p>
            </div>
          </div>
          <button className="relative z-10 flex-shrink-0 flex items-center gap-2 h-9 px-5 rounded-xl border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 hover:text-white hover:bg-violet-500/20 transition-all duration-200 self-start md:self-center">
            Start review <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </Reveal>

      {/* Bento stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Reviews",   value: String(REVIEWS.length),       icon: FileText,    color: "#6D4AE6", sub: "all time"         },
          { label: "Current Score",   value: String(REVIEWS[0].score),     icon: BarChart3,   color: "#1D9E75", sub: "/ 25.0"            },
          { label: "Score Trend",     value: `+${latestDelta.toFixed(1)}`, icon: TrendingUp,  color: "#378ADD", sub: "vs last month"     },
          { label: "Wins Logged",     value: String(totalWins),            icon: Star,        color: "#F59E0B", sub: "across all reviews" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
            className="rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.42)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
            }}
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

      {/* Score timeline */}
      <Reveal delay={0.05}>
        <div
          className="rounded-2xl p-6 relative overflow-hidden bento-card"
          style={{
            background: "rgba(0,0,0,0.42)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Score Timeline</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono text-slate-500">Avg</span>
              <span className="font-mono text-sm text-violet-400 font-semibold">{avgScore}</span>
              <span className="text-xs font-mono text-slate-600">/ 25.0</span>
            </div>
          </div>

          <div className="relative">
            <ScoreSparkline />
            <div className="flex justify-between mt-2">
              {REVIEWS.slice().reverse().map(r => (
                <div key={r.month} className="text-center flex-1">
                  <p className="text-[9px] font-mono text-slate-600">{r.month.split(" ")[0].slice(0, 3)}</p>
                  <p className="text-[10px] font-mono mt-0.5" style={{ color: "#6D4AE6" }}>{r.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score milestones */}
          <div className="mt-5 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-3">
            {[
              { label: "All-Time High",   value: Math.max(...REVIEWS.map(r => r.score)).toFixed(1), color: "#1D9E75" },
              { label: "Average",         value: avgScore,                                             color: "#6D4AE6" },
              { label: "Improvement",     value: `+${(REVIEWS[0].score - REVIEWS[REVIEWS.length-1].score).toFixed(1)}`, color: "#378ADD" },
            ].map(m => (
              <div key={m.label} className="text-center p-3 rounded-xl"
                style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                <p className="font-mono text-lg font-light" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Review history */}
      <div>
        <SectionLabel className="mb-5 flex items-center gap-2">
          Review History
          <span className="ml-auto text-[9px] font-mono text-slate-600 normal-case tracking-normal">{REVIEWS.length} reviews</span>
        </SectionLabel>
        <div className="space-y-4">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.month} review={review} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsHub;
