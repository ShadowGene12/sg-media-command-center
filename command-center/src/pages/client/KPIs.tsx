import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { KPI_DATA, PILLARS } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

// Parses a formatted value string into { prefix, number, suffix }
function parseValue(raw: string) {
  const match = raw.match(/^([€$£%]?)(\d[\d,.hH]*)(.*)$/);
  if (!match) return { prefix: "", number: NaN, suffix: "", raw };
  const numStr = match[2].replace(/,/g, "");
  const num = parseFloat(numStr);
  return { prefix: match[1], number: isNaN(num) ? 0 : num, suffix: match[3], raw };
}

function CountUp({ value, color }: { value: string; color: string }) {
  const parsed = parseValue(value);
  const motionVal = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasDecimals = parsed.raw.includes(".");

  useEffect(() => {
    if (isNaN(parsed.number)) return;
    const ctrl = animate(motionVal, parsed.number, { duration: 1.2, ease: "easeOut", delay: 0.3 });
    const unsub = motionVal.on("change", (v) => {
      if (ref.current) {
        const formatted = hasDecimals ? v.toFixed(1) : Math.round(v).toLocaleString();
        ref.current.textContent = `${parsed.prefix}${formatted}${parsed.suffix}`;
      }
    });
    return () => { ctrl.stop(); unsub(); };
  }, []);

  if (isNaN(parsed.number)) {
    return <span className="text-2xl font-display font-light tracking-tight" style={{ color }}>{value}</span>;
  }
  return (
    <span ref={ref} className="text-2xl font-display font-light tracking-tight" style={{ color }}>
      {parsed.prefix}0{parsed.suffix}
    </span>
  );
}

const PILLAR_COLORS: Record<number, string> = {
  1: "#6D4AE6",
  2: "#378ADD",
  3: "#1D9E75",
  4: "#F59E0B",
  5: "#D85A30",
};

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18 } },
};

export default function KPIs() {
  const grouped = PILLARS.map(p => ({
    ...p,
    color: PILLAR_COLORS[p.id] ?? "#6D4AE6",
    kpis: KPI_DATA.filter(k => k.pillar === p.id),
  })).filter(g => g.kpis.length > 0);

  return (
    <div className="space-y-10 max-w-7xl pb-12">
      <PageHeader
        label="Performance Tracking"
        title="KPI Dashboard"
        description="Key performance indicators tracked across all five growth pillars."
      />

      {/* Top 5 summary strip */}
      <div>
        <SectionLabel className="mb-4">Top Metrics — Trailing 30 Days</SectionLabel>
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {KPI_DATA.slice(0, 5).map((kpi) => (
            <motion.div key={kpi.label} variants={itemVars}>
              <PremiumCard glowColor="rgba(255,255,255,0.05)" className="p-5 flex flex-col gap-2 transition-all duration-300">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{kpi.label}</p>
                <CountUp value={kpi.value} color="#ffffff" />
                <div className="flex items-center gap-1">
                  {kpi.trend === "up"
                    ? <ArrowUpRight className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                    : <ArrowDownRight className="h-3 w-3 text-red-400 flex-shrink-0" />}
                  <span className={`text-xs font-mono font-semibold ${kpi.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>{kpi.change}</span>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pillar-linked KPI sections */}
      <div className="space-y-5">
        <SectionLabel className="mb-0">Breakdown by Pillar</SectionLabel>
        {grouped.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 + 0.3, type: "spring", stiffness: 100, damping: 18 }}
          >
            <PremiumCard glowColor={`${group.color}1A`}>
              {/* Pillar header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04]">
                <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}80` }} />
                <span className="text-sm font-semibold text-white">{group.name}</span>
                <span className="ml-auto text-xs font-mono text-slate-600">{group.kpis.length} metrics</span>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
                {group.kpis.map((kpi) => (
                  <div key={kpi.label} className="p-5 bg-black/20 group hover:bg-white/[0.02] transition-colors duration-200">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">{kpi.label}</p>
                    <div className="flex items-end justify-between">
                      <CountUp value={kpi.value} color={group.color} />
                      <div className="flex items-center gap-1 mb-0.5">
                        {kpi.trend === "up"
                          ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                          : <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />}
                        <span className={`text-sm font-mono font-semibold ${kpi.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>{kpi.change}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-600 font-mono mt-1">{kpi.period}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>

      {/* Interpretation card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 18 }}
      >
      <PremiumCard glowColor="rgba(109,74,230,0.08)" className="p-6 flex gap-4">
        <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-violet-400" />
        </div>
        <div>
          <p className="text-xs font-mono text-violet-400/80 uppercase tracking-widest mb-2">SG Media Interpretation</p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Overall performance trajectory is positive. Acquisition metrics are strengthening with lead volume up 12% and qualified rate improving. The primary area needing attention is close rate — currently at 22% against a 25% target. CAC reduction is on track. Recommend continued focus on sales enablement and follow-up optimization to bridge the conversion gap. Financial indicators are stable with positive cash flow momentum.
          </p>
        </div>
      </PremiumCard>
      </motion.div>
    </div>
  );
}
