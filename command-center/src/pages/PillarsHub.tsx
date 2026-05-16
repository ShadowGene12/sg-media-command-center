import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const PILLAR_META = [
  { key: "market_offer", name: "Market & Offer Clarity",          slug: "market-offer", color: "#6D4AE6", modules: 8 },
  { key: "acquisition",  name: "Customer Acquisition",            slug: "acquisition",  color: "#378ADD", modules: 7 },
  { key: "sales",        name: "Sales & Conversion",              slug: "sales",        color: "#1D9E75", modules: 6 },
  { key: "profit",       name: "Profit Optimization",             slug: "profit",       color: "#F59E0B", modules: 5 },
  { key: "finance",      name: "Financial & Performance Control", slug: "finance",      color: "#D85A30", modules: 6 },
];

const FALLBACK_SCORES: Record<string, number> = {
  market_offer: 2.1, acquisition: 3.4, sales: 1.8, profit: 3.9, finance: 2.6,
};

const itemVars = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 18, delay: i * 0.07 } }),
};

const PillarsHub = () => {
  const { user } = useAuth();

  const { data: diagnostic, isLoading } = useQuery({
    queryKey: ["latest-diagnostic", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("diagnostics")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
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

  const radarData = pillars.map(p => ({
    subject: p.name.split(" ")[0],
    score: p.score,
    fullMark: 5,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <PageHeader
        label="Growth System"
        title="Pillars"
        description={diagnostic ? `Bottleneck Report — ${new Date(diagnostic.created_at).toLocaleDateString()}` : "Your five-pillar growth map."}
      />

      {!diagnostic && (
        <div className="px-5 py-3 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-mono text-violet-400">
            Showing sample data — <Link to="/detector/flow" className="underline underline-offset-2 hover:text-violet-300">take the Detector</Link> to see your real scores
          </span>
        </div>
      )}

      {/* Radar + pillar score cards */}
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}>
          <PremiumCard glowColor="rgba(109,74,230,0.10)" className="p-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#515B68", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#6D4AE6" fill="#6D4AE6" fillOpacity={0.15} strokeWidth={2} dot={{ fill: "#6D4AE6", r: 3 }} />
              </RadarChart>
            </ResponsiveContainer>
          </PremiumCard>
        </motion.div>

        <div className="space-y-2.5">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.slug} custom={i} variants={itemVars} initial="hidden" animate="show">
              <PremiumCard
                glowColor={`${pillar.color}1A`}
                className={`flex items-center gap-4 p-4 cursor-pointer group ${pillar.isPrimary ? "border-violet-500/20" : ""}`}
                style={pillar.isPrimary ? { borderColor: "rgba(109,74,230,0.2)", background: "rgba(109,74,230,0.05)" } as React.CSSProperties : undefined}
              >
                <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.color, boxShadow: `0 0 8px ${pillar.color}80` }} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-300 font-light truncate block">{pillar.name}</span>
                  {pillar.isPrimary && (
                    <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest">Primary Bottleneck</span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-base font-light" style={{ color: pillar.color }}>{pillar.score.toFixed(1)}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Three-layer breakdown for primary bottleneck */}
      {diagnostic && (
        <div>
          <SectionLabel className="mb-5">Primary Bottleneck — Deep Dive</SectionLabel>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Surface Symptom",  color: "#EF4444", content: "Low close rates and inconsistent deal flow. Prospects enter the pipeline but stall or disappear without a clear handoff." },
              { label: "System Failure",   color: "#F59E0B", content: "No documented sales process. Each conversation is improvised — conversion depends on who is selling and their energy that day." },
              { label: "Foundation Issue", color: "#6D4AE6", content: "Sales is treated as a talent problem, not a systems problem. Without a repeatable process, scaling is structurally impossible." },
            ].map((layer, i) => (
              <motion.div key={layer.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <PremiumCard glowColor={`${layer.color}15`} className="p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: layer.color }}>{layer.label}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{layer.content}</p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Learning progress */}
      <div>
        <SectionLabel className="mb-5">Pillar Progress</SectionLabel>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 18 }}>
          <PremiumCard glowColor="rgba(255,255,255,0.04)" className="p-6 space-y-5">
            {pillars.map((pillar, i) => {
              const pct = (pillar.score / 5) * 100;
              return (
                <div key={pillar.slug} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pillar.color }} />
                      <span className="text-sm text-slate-300 font-light">{pillar.name}</span>
                    </div>
                    <span className="font-mono text-sm" style={{ color: pillar.color }}>{pillar.score.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: pillar.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </PremiumCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PillarsHub;
