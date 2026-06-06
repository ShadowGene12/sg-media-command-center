import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PlayCircle, Target, ArrowRight, Lock, Clock, Map, Zap, TrendingUp, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TierLockedCard } from "@/components/TierLockedCard";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const PILLAR_COLORS: Record<string, string> = {
  "Sales & Conversion":    "#1D9E75",
  "Market & Offer":        "#6D4AE6",
  "Customer Acquisition":  "#378ADD",
  "Profit Optimization":   "#F59E0B",
  "Financial Control":     "#D85A30",
};

const MOCK_PATHWAYS = [
  {
    id: "sales-engine",
    title: "Fix Your Sales Conversion Engine",
    bottleneck: "Sales & Conversion",
    duration: "4 Weeks",
    steps: 8,
    description: "Build a repeatable, trainable sales process to close more qualified leads without relying on founder magic.",
    status: "active" as const,
    progress: 25,
    locked: false,
    difficulty: "Intermediate",
    outcomes: ["Documented sales process", "Follow-up sequences", "Close rate improvement"],
  },
  {
    id: "offer-clarity",
    title: "The Offer Clarity Protocol",
    bottleneck: "Market & Offer",
    duration: "2 Weeks",
    steps: 5,
    description: "Transform a confusing service into a highly-desirable productised offer that prospects actually understand and buy.",
    status: "available" as const,
    progress: 0,
    locked: false,
    difficulty: "Foundational",
    outcomes: ["Positioning statement", "Clear deliverable scope", "Pricing framework"],
  },
  {
    id: "outbound-machine",
    title: "Build the Outbound Machine",
    bottleneck: "Customer Acquisition",
    duration: "3 Weeks",
    steps: 7,
    description: "Systematise cold outreach from zero to a reliable engine: ICP, messaging, cadence, and reply management.",
    status: "available" as const,
    progress: 0,
    locked: false,
    difficulty: "Intermediate",
    outcomes: ["Cold outreach system", "Messaging hierarchy", "Reply tracking SOP"],
  },
  {
    id: "profit-leak",
    title: "Plug the Profit Leaks",
    bottleneck: "Profit Optimization",
    duration: "3 Weeks",
    steps: 6,
    description: "Audit your expenses, renegotiate vendor contracts, fix pricing structure, and improve gross margin by 5-10%.",
    status: "locked" as const,
    progress: 0,
    locked: true,
    difficulty: "Advanced",
    outcomes: ["Margin audit", "Pricing restructure", "Revenue leakage fixes"],
  },
  {
    id: "kpi-command",
    title: "Build Your KPI Command Centre",
    bottleneck: "Financial Control",
    duration: "2 Weeks",
    steps: 4,
    description: "Define, instrument, and start tracking the 12 KPIs that actually predict business health before problems compound.",
    status: "locked" as const,
    progress: 0,
    locked: true,
    difficulty: "Foundational",
    outcomes: ["12-KPI dashboard", "Weekly review habit", "Variance analysis routine"],
  },
  {
    id: "content-acquisition",
    title: "Content-Led Acquisition Engine",
    bottleneck: "Customer Acquisition",
    duration: "6 Weeks",
    steps: 10,
    description: "Build a systematic content system that generates qualified inbound leads — not vanity metrics — within 6 weeks.",
    status: "locked" as const,
    progress: 0,
    locked: true,
    difficulty: "Advanced",
    outcomes: ["Content calendar", "Distribution system", "Lead attribution tracking"],
  },
  {
    id: "pricing-power",
    title: "The Pricing Power Protocol",
    bottleneck: "Profit Optimization",
    duration: "2 Weeks",
    steps: 5,
    description: "Move from cost-plus to value-based pricing — reframe, restructure, and raise without losing quality clients.",
    status: "locked" as const,
    progress: 0,
    locked: true,
    difficulty: "Advanced",
    outcomes: ["Value-based pricing model", "Tiered offer structure", "Objection handling for price"],
  },
];

const DIFFICULTY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  "Foundational": { color: "#1D9E75", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "Intermediate":  { color: "#378ADD", bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  "Advanced":      { color: "#F59E0B", bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
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

// ─── Pathway card ─────────────────────────────────────────────────────────────
const PathwayCard = ({ pathway, index }: { pathway: typeof MOCK_PATHWAYS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const color = PILLAR_COLORS[pathway.bottleneck] ?? "#6D4AE6";
  const diff = DIFFICULTY_STYLES[pathway.difficulty];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl flex flex-col bento-card bento-shine grain-overlay h-full"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Pillar strip */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${color}80, transparent)` }} />

        {/* Lock overlay */}
        {pathway.locked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
            <Lock className="h-6 w-6 text-slate-400 mb-3" />
            <Link to="/upgrade">
              <button className="h-8 px-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors">
                Unlock Pro Tier
              </button>
            </Link>
          </div>
        )}

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${color}0D, transparent 60%)` }} />

        <div className="p-5 flex flex-col gap-4 flex-1 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
              style={{ color, backgroundColor: `${color}18`, borderColor: `${color}30` }}>
              {pathway.bottleneck}
            </span>
            {pathway.locked
              ? <Lock className="h-3.5 w-3.5 text-slate-600" />
              : (
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
                  <Clock className="w-3 h-3" /> {pathway.duration}
                </div>
              )
            }
          </div>

          {/* Body */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 group-hover:text-violet-200 transition-colors">
              {pathway.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{pathway.description}</p>
          </div>

          {/* Meta pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${diff.bg} ${diff.border}`}
              style={{ color: diff.color }}>
              {pathway.difficulty}
            </span>
            <span className="text-[9px] font-mono text-slate-600 flex items-center gap-1">
              <Map className="w-2.5 h-2.5" /> {pathway.steps} steps
            </span>
          </div>

          {/* Outcomes */}
          {!pathway.locked && (
            <div className="space-y-1">
              {pathway.outcomes.slice(0, 2).map(o => (
                <div key={o} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-slate-600">{o}</span>
                </div>
              ))}
            </div>
          )}

          <Link to={`/pathways/${pathway.id}`}>
            <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.10] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200">
              <span>View Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PathwaysHub() {
  const active    = MOCK_PATHWAYS.filter(p => p.status === "active");
  const available = MOCK_PATHWAYS.filter(p => p.status === "available");
  const locked    = MOCK_PATHWAYS.filter(p => p.locked);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <PageHeader
        label="Guided Strategy"
        title="Pathways"
        description="Step-by-step tracks to resolve your core bottlenecks — one at a time, in the right order."
      />

      {/* Bento hero */}
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl p-7 bento-card grain-overlay"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(109,74,230,0.15)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Map className="w-56 h-56 text-violet-300" />
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(109,74,230,0.10) 0%, transparent 55%)" }} />

          <div className="relative z-10 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3 text-[10px] font-mono tracking-widest text-violet-400/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
                Guided Pathways · {MOCK_PATHWAYS.length} Available
              </div>
              <h2 className="text-2xl font-display font-light text-white tracking-tight mb-2">
                Your bottleneck, resolved step by step
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl">
                Each pathway is built around a specific bottleneck — structured steps, SOP assignments, and metric targets. Start one at a time.
              </p>
            </div>

            {/* Pathway summary pills */}
            <div className="flex flex-col gap-2">
              {[
                { label: "Active",     count: active.length,    color: "#1D9E75", icon: Zap },
                { label: "Available",  count: available.length, color: "#378ADD", icon: PlayCircle },
                { label: "Locked",     count: locked.length,    color: "#515B68", icon: Lock },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 120, damping: 18 }}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${s.color}20`,
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                    <s.icon className="w-3 h-3" style={{ color: s.color }} />
                  </div>
                  <span className="text-xs text-slate-400 flex-1 font-light">{s.label}</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: s.color }}>{s.count}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <TierLockedCard isLocked={false} title="Unlock Pathways" description="Get step-by-step, actionable pathways tailored to your specific bottlenecks." tierRequired="Pro">

        {/* Active pathway */}
        {active.length > 0 && (
          <div>
            <SectionLabel className="mb-5">Active Pathway</SectionLabel>
            {active.map((pathway) => {
              const color = PILLAR_COLORS[pathway.bottleneck] ?? "#6D4AE6";
              return (
                <Reveal key={pathway.id}>
                  <PremiumCard glowColor={`${color}1A`}>
                    {/* Progress */}
                    <div className="h-0.5 bg-white/[0.04]">
                      <motion.div className="h-full" style={{ backgroundColor: color }}
                        initial={{ width: 0 }} animate={{ width: `${pathway.progress}%` }}
                        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                      />
                    </div>

                    <div className="md:flex">
                      <div className="p-7 md:w-2/3 border-b border-white/[0.04] md:border-b-0 md:border-r md:border-white/[0.04]">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                            style={{ color, backgroundColor: `${color}18`, borderColor: `${color}30` }}>
                            {pathway.bottleneck}
                          </span>
                          <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {pathway.duration} · {pathway.steps} steps
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-light text-white mb-2">{pathway.title}</h3>
                        <p className="text-sm text-slate-400 mb-5 leading-relaxed">{pathway.description}</p>

                        {/* Outcomes */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {pathway.outcomes.map(o => (
                            <span key={o} className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                              {o}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <Link to={`/pathways/${pathway.id}`}>
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-100 transition-all active:scale-95">
                              Resume Pathway <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <span className="text-sm font-mono font-semibold" style={{ color }}>{pathway.progress}% complete</span>
                        </div>
                      </div>

                      <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
                        <Target className="w-24 h-24 absolute opacity-[0.04]" style={{ color }} />
                        <div className="relative text-center">
                          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Current Step</p>
                          <p className="text-base font-display font-light text-white">Draft the Sales Script</p>
                          <p className="text-xs font-mono text-slate-600 mt-1">Step 3 of {pathway.steps}</p>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Available pathways */}
        {available.length > 0 && (
          <div className={active.length > 0 ? "pt-4" : ""}>
            <SectionLabel className="mb-5">Available Pathways</SectionLabel>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {available.map((pathway, i) => (
                <PathwayCard key={pathway.id} pathway={pathway} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Locked pathways */}
        {locked.length > 0 && (
          <div className="pt-4">
            <SectionLabel className="mb-5 flex items-center gap-2">
              Pro Pathways
              <span className="text-[9px] font-mono text-slate-700 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Operator tier
              </span>
            </SectionLabel>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locked.map((pathway, i) => (
                <PathwayCard key={pathway.id} pathway={pathway} index={i} />
              ))}
            </div>
          </div>
        )}
      </TierLockedCard>
    </div>
  );
}
