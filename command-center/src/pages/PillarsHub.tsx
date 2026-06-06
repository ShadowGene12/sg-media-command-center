import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ChevronRight, AlertTriangle, CheckCircle, Minus } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const PILLAR_META = [
  { key: "market_offer", name: "Market & Offer Clarity",          slug: "market-offer", color: "#6D4AE6", modules: 8,
    description: "How clearly you've defined your market, ICP, and offer differentiation.",
    fix: "Redefine your ICP, run a competitor gap analysis, refine your offer positioning statement." },
  { key: "acquisition",  name: "Customer Acquisition",            slug: "acquisition",  color: "#378ADD", modules: 7,
    description: "The efficiency and scalability of your lead generation across all channels.",
    fix: "Audit your CAC per channel, cut underperformers, double down on the top-1 source." },
  { key: "sales",        name: "Sales & Conversion",              slug: "sales",        color: "#1D9E75", modules: 6,
    description: "How systematically you convert pipeline into paying clients.",
    fix: "Document your sales process, build a follow-up sequence, reduce decision friction." },
  { key: "profit",       name: "Profit Optimization",             slug: "profit",       color: "#F59E0B", modules: 5,
    description: "Whether your pricing, packaging, and margins are built for durable profitability.",
    fix: "Audit pricing structure, identify revenue leakage points, add a premium tier." },
  { key: "finance",      name: "Financial & Performance Control", slug: "finance",      color: "#D85A30", modules: 6,
    description: "Visibility into your numbers — cash flow, KPIs, and performance tracking.",
    fix: "Build a 13-week cash flow model, define your 5 core KPIs, set weekly review cadence." },
];

const FALLBACK_SCORES: Record<string, number> = {
  market_offer: 2.1, acquisition: 3.4, sales: 1.8, profit: 3.9, finance: 2.6,
};

const SCORE_LABELS: { threshold: number; label: string; color: string; icon: React.ElementType }[] = [
  { threshold: 4.0, label: "Strong",    color: "#1D9E75", icon: CheckCircle   },
  { threshold: 2.5, label: "Moderate",  color: "#F59E0B", icon: Minus         },
  { threshold: 0,   label: "Critical",  color: "#EF4444", icon: AlertTriangle },
];

const getScoreState = (score: number) =>
  SCORE_LABELS.find(s => score >= s.threshold) ?? SCORE_LABELS[2];

// ─── Reveal ────────────────────────────────────────────────────────────────
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

// ─── Glass card ────────────────────────────────────────────────────────────
const GlassCard = ({
  children, className = "", style = {}, glowColor = "transparent",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl bento-card ${className}`}
    style={{
      background: "rgba(0,0,0,0.42)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      backdropFilter: "blur(20px)",
      ...style,
    }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    {glowColor !== "transparent" && (
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 0% 0%, ${glowColor} 0%, transparent 55%)`,
      }} />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

// ─── Pillar row card ───────────────────────────────────────────────────────
const PillarCard = ({ pillar, index }: { pillar: typeof PILLAR_META[0] & { score: number; isPrimary: boolean }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const state = getScoreState(pillar.score);
  const StateIcon = state.icon;
  const pct = (pillar.score / 5) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <GlassCard
        glowColor={pillar.isPrimary ? pillar.color + "12" : "transparent"}
        style={pillar.isPrimary ? { borderColor: "rgba(109,74,230,0.22)" } as React.CSSProperties : {}}
        className="group cursor-pointer hover:border-white/[0.10] transition-colors"
      >
        <div className="flex items-center gap-4 p-4">
          {/* Color dot */}
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: pillar.color, boxShadow: `0 0 10px ${pillar.color}80` }} />

          {/* Name + tag */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-slate-200 font-light truncate">{pillar.name}</span>
              {pillar.isPrimary && (
                <span className="text-[8px] font-mono text-violet-400 uppercase tracking-widest px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 flex-shrink-0">
                  Primary Bottleneck
                </span>
              )}
            </div>
            {/* Mini progress */}
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden w-full">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: pillar.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${pct}%` } : {}}
                transition={{ delay: 0.3 + index * 0.07, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Score + status */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <StateIcon className="w-3 h-3" style={{ color: state.color }} />
              <span className="text-[9px] font-mono hidden sm:block" style={{ color: state.color }}>{state.label}</span>
            </div>
            <span className="font-mono text-base font-light w-10 text-right" style={{ color: pillar.color }}>
              {pillar.score.toFixed(1)}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const PillarsHub = () => {
  const { user } = useAuth();

  const { data: diagnostic, isLoading } = useQuery({
    queryKey: ["latest-diagnostic", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from("diagnostics").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(1).maybeSingle();
      return data;
    },
    enabled: !!user,
    staleTime: 60_000,
  });

  const scores: Record<string, number> = diagnostic?.pillar_scores ?? FALLBACK_SCORES;
  const primaryPillar = diagnostic?.primary_pillar ?? "sales";

  const pillars = PILLAR_META.map(p => ({
    ...p,
    score: scores[p.key] ?? FALLBACK_SCORES[p.key] ?? 2.5,
    isPrimary: p.key === primaryPillar,
  }));

  const primaryMeta = pillars.find(p => p.isPrimary)!;
  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const radarData = pillars.map(p => ({
    subject: p.name.split(" ")[0],
    score: p.score,
    fullMark: 5,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div animate={{ scale: [1,1.2,1], opacity: [0.4,1,0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 rounded-full bg-violet-500/30" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <PageHeader
        label="Growth System"
        title="Pillars"
        description={diagnostic
          ? `Bottleneck Report — ${new Date(diagnostic.created_at).toLocaleDateString()}`
          : "Your five-pillar growth map."}
      />

      {!diagnostic && (
        <Reveal>
          <div className="px-5 py-3.5 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-mono text-violet-400">
              Showing sample data — <Link to="/detector/flow" className="underline underline-offset-2 hover:text-violet-300">take the Detector</Link> to see your real scores
            </span>
          </div>
        </Reveal>
      )}

      {/* ── Row 1: Radar + pillar list ── */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Radar chart */}
        <Reveal delay={0.1}>
          <GlassCard glowColor="rgba(109,74,230,0.08)" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Pillar Radar</p>
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-mono text-slate-600">Overall:</div>
                <span className="text-sm font-display font-light text-violet-400">{overallScore.toFixed(1)}</span>
                <span className="text-[10px] font-mono text-slate-600">/ 25</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.04)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#515B68", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#6D4AE6" fill="#6D4AE6" fillOpacity={0.12} strokeWidth={2}
                  dot={{ fill: "#6D4AE6", r: 3, strokeWidth: 0 }} />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
        </Reveal>

        {/* Pillar score list */}
        <div className="space-y-2.5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.slug} pillar={pillar} index={i} />
          ))}
        </div>
      </div>

      {/* ── Row 2: Primary bottleneck deep dive ── */}
      <div>
        <SectionLabel className="mb-5">Primary Bottleneck — 3-Layer Deep Dive</SectionLabel>
        <Reveal delay={0.1}>
          <GlassCard glowColor={primaryMeta.color + "0D"} className="p-6 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryMeta.color, boxShadow: `0 0 10px ${primaryMeta.color}80` }} />
              <h3 className="text-base font-display font-semibold text-white">{primaryMeta.name}</h3>
              <span className="text-[8px] font-mono text-violet-400 uppercase tracking-widest px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                Primary
              </span>
              <span className="ml-auto font-mono text-lg font-light" style={{ color: primaryMeta.color }}>
                {primaryMeta.score.toFixed(1)} / 5.0
              </span>
            </div>
            <p className="text-sm text-slate-400 font-light leading-relaxed mb-4">{primaryMeta.description}</p>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">Fix Path</p>
              <p className="text-sm text-slate-300 font-light">{primaryMeta.fix}</p>
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Surface Symptom",  color: "#EF4444",
              content: diagnostic
                ? "Low close rates and inconsistent deal flow. Prospects enter the pipeline but stall or disappear without a clear handoff process."
                : "Revenue is inconsistent — good months, bad months — with no clear pattern you can influence intentionally." },
            { label: "System Failure",   color: "#F59E0B",
              content: diagnostic
                ? "No documented sales process. Each conversation is improvised — conversion depends on who is selling and their energy that day."
                : "The business runs on founder instinct, not documented systems. Decisions are made reactively, not from data." },
            { label: "Foundation Issue", color: "#6D4AE6",
              content: diagnostic
                ? "Sales is treated as a talent problem, not a systems problem. Without a repeatable process, scaling is structurally impossible."
                : "The market positioning hasn't been explicitly defined — the offer means different things to different people." },
          ].map((layer, i) => (
            <Reveal key={layer.label} delay={0.1 + i * 0.1}>
              <GlassCard glowColor={layer.color + "0D"} className="p-5 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: layer.color }}>{layer.label}</span>
                  <span className="text-[8px] font-mono text-white/15 ml-auto">Layer {i + 1}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{layer.content}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Row 3: Pillar progress bars ── */}
      <div>
        <SectionLabel className="mb-5">Pillar Progress</SectionLabel>
        <Reveal delay={0.1}>
          <GlassCard className="p-6 space-y-5">
            {pillars.map((pillar, i) => {
              const pct = (pillar.score / 5) * 100;
              const state = getScoreState(pillar.score);
              return (
                <div key={pillar.slug} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pillar.color }} />
                      <span className="text-sm text-slate-300 font-light">{pillar.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono hidden sm:block" style={{ color: state.color }}>{state.label}</span>
                      <span className="font-mono text-sm" style={{ color: pillar.color }}>{pillar.score.toFixed(1)} / 5.0</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: pillar.color + "90" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </GlassCard>
        </Reveal>
      </div>

      {/* ── Row 4: Recommended SOPs ── */}
      <div>
        <SectionLabel className="mb-5">Recommended SOPs for Your Primary Bottleneck</SectionLabel>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Sales Process Documentation Framework", time: "12 min", slug: "sales-process-documentation", color: "#1D9E75" },
            { title: "Follow-Up Sequence Builder",            time: "8 min",  slug: "follow-up-sequence-builder",  color: "#1D9E75" },
            { title: "Conversion Rate Audit Checklist",       time: "10 min", slug: "conversion-rate-audit",       color: "#1D9E75" },
          ].map((sop, i) => (
            <Reveal key={sop.slug} delay={0.1 + i * 0.08}>
              <GlassCard className="group">
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${sop.color}80, transparent)` }} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      SOP
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-600 inline-block" /> {sop.time}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-4 leading-snug group-hover:text-violet-200 transition-colors">{sop.title}</p>
                  <Link to={`/library/${sop.slug}`}>
                    <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] text-xs font-mono text-slate-500 hover:text-white transition-all">
                      <span>Open SOP</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarsHub;
