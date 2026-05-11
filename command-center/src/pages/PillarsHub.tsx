import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLARS = [
  { name: "Market & Offer Clarity",         slug: "market-offer", color: "#6D4AE6", score: 2.1, trend: "+0.3", modules: 8, completed: 2 },
  { name: "Customer Acquisition",           slug: "acquisition",  color: "#378ADD", score: 3.4, trend: "+0.5", modules: 7, completed: 1 },
  { name: "Sales & Conversion",             slug: "sales",        color: "#1D9E75", score: 1.8, trend: "-0.2", modules: 6, completed: 0 },
  { name: "Profit Optimization",            slug: "profit",       color: "#F59E0B", score: 3.9, trend: "+0.8", modules: 5, completed: 3 },
  { name: "Financial & Performance Control",slug: "finance",      color: "#D85A30", score: 2.6, trend: "+0.1", modules: 6, completed: 1 },
];

const radarData = PILLARS.map(p => ({ subject: p.name.split(" ")[0], score: p.score, fullMark: 5 }));

const itemVars = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.07 } }),
};

const PillarsHub = () => (
  <div className="max-w-6xl mx-auto space-y-10 pb-12">
    <PageHeader
      label="Growth System"
      title="Pillars"
      description="Your five-pillar growth map — scores, trends, and learning progress."
    />

    {/* Radar + pillar score cards */}
    <div className="grid md:grid-cols-2 gap-5">
      {/* Radar chart */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
      >
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

      {/* Pillar score list */}
      <div className="space-y-2.5">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.slug}
            custom={i}
            variants={itemVars}
            initial="hidden"
            animate="show"
          >
            <PremiumCard glowColor={`${pillar.color}1A`} className="flex items-center gap-4 p-4 cursor-pointer">
              <div
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: pillar.color, boxShadow: `0 0 8px ${pillar.color}80` }}
              />
              <span className="text-sm text-slate-300 flex-1 truncate">{pillar.name}</span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: pillar.trend.startsWith("+") ? "#10B981" : "#EF4444" }}>
                  {pillar.trend.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {pillar.trend}
                </span>
                <span className="font-mono text-base font-semibold" style={{ color: pillar.color }}>{pillar.score.toFixed(1)}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Learning progress */}
    <div>
      <SectionLabel className="mb-5">Learning Progress</SectionLabel>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 18 }}
      >
      <PremiumCard glowColor="rgba(255,255,255,0.04)" className="p-6 space-y-5">
        {PILLARS.map((pillar, i) => {
          const pct = (pillar.completed / pillar.modules) * 100;
          return (
            <div key={pillar.slug} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pillar.color }} />
                  <span className="text-sm text-slate-300">{pillar.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600">{pillar.completed} / {pillar.modules} modules</span>
              </div>
              <div className="h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
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

export default PillarsHub;
