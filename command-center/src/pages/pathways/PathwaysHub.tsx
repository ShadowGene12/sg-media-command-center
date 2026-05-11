import { motion } from "framer-motion";
import { PlayCircle, Target, ArrowRight, Lock, Clock } from "lucide-react";
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
  { id: "sales-engine",  title: "Fix Your Sales Conversion Engine",    bottleneck: "Sales & Conversion",   duration: "4 Weeks", description: "Build a repeatable, trainable sales process to close more qualified leads without relying on founder magic.",                   status: "active",     progress: 25, locked: false },
  { id: "offer-clarity", title: "The Offer Clarity Protocol",          bottleneck: "Market & Offer",        duration: "2 Weeks", description: "Transform a confusing service into a highly-desirable productized offer that prospects actually understand.",                status: "available",  progress: 0,  locked: false },
  { id: "profit-leak",   title: "Plug the Profit Leaks",               bottleneck: "Profit Optimization",   duration: "3 Weeks", description: "Audit your expenses, renegotiate vendor contracts, and improve your gross margin by 5-10%.",                               status: "locked",     progress: 0,  locked: true },
];

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

export default function PathwaysHub() {
  const active = MOCK_PATHWAYS.filter(p => p.status === "active");
  const available = MOCK_PATHWAYS.filter(p => p.status !== "active");

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <PageHeader
        label="Guided Strategy"
        title="Pathways"
        description="Step-by-step tracks to resolve your core bottlenecks — one at a time."
      />

      <TierLockedCard isLocked={true} title="Unlock Pathways" description="Get step-by-step, actionable pathways tailored to your specific bottlenecks." tierRequired="Pro">
        {/* Active pathway */}
        {active.length > 0 && (
          <div>
            <SectionLabel className="mb-5">Active Pathway</SectionLabel>
            {active.map((pathway, i) => {
              const color = PILLAR_COLORS[pathway.bottleneck] ?? "#6D4AE6";
              return (
                <motion.div
                  key={pathway.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
                >
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
                            <Clock className="w-3 h-3" /> {pathway.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-light text-white mb-2">{pathway.title}</h3>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{pathway.description}</p>
                        <div className="flex items-center gap-4">
                          <Link to={`/pathways/${pathway.id}`}>
                            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-100 transition-all active:scale-95">
                              Resume Pathway <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <span className="text-sm font-mono font-semibold" style={{ color }}>{pathway.progress}% Complete</span>
                        </div>
                      </div>

                      <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
                        <Target className="w-24 h-24 absolute opacity-[0.04]" style={{ color }} />
                        <div className="relative text-center">
                          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Current Step</p>
                          <p className="text-base font-display font-light text-white">Draft the Sales Script</p>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Available pathways */}
        <div className={active.length > 0 ? "pt-4" : ""}>
          <SectionLabel className="mb-5">Available Pathways</SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map((pathway, i) => {
              const color = PILLAR_COLORS[pathway.bottleneck] ?? "#6D4AE6";
              return (
                <motion.div
                  key={pathway.id}
                  custom={i}
                  variants={cardVars}
                  initial="hidden"
                  animate="show"
                >
                  <PremiumCard glowColor={`${color}0D`} className="group relative flex flex-col">
                    {/* Lock overlay */}
                    {pathway.locked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                        <Lock className="h-6 w-6 text-slate-400 mb-3" />
                        <Link to="/upgrade">
                          <button className="h-8 px-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors">
                            Unlock Pro Tier
                          </button>
                        </Link>
                      </div>
                    )}

                    <div className="p-5 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                          style={{ color, backgroundColor: `${color}18`, borderColor: `${color}30` }}>
                          {pathway.bottleneck}
                        </span>
                        {pathway.locked
                          ? <Lock className="h-3.5 w-3.5 text-slate-600" />
                          : <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1"><Clock className="w-3 h-3" />{pathway.duration}</span>
                        }
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{pathway.title}</h3>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">{pathway.description}</p>
                      </div>

                      <Link to={`/pathways/${pathway.id}`}>
                        <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200">
                          <span>View Details</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </TierLockedCard>
    </div>
  );
}
