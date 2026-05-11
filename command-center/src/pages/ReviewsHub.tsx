import { motion } from "framer-motion";
import { Calendar, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const REVIEWS = [
  {
    month: "March 2026",
    score: 12.1,
    focus: "Customer Acquisition",
    color: "#378ADD",
    reflections: [
      "Started consistent content publishing",
      "CAC dropped by 15%",
      "Need to improve follow-up cadence",
    ],
  },
  {
    month: "February 2026",
    score: 10.5,
    focus: "Market & Offer Clarity",
    color: "#6D4AE6",
    reflections: [
      "Clarified ICP definition",
      "Repositioned core offer",
      "Pricing still needs work",
    ],
  },
];

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.1 } }),
};

const ReviewsHub = () => (
  <div className="max-w-6xl mx-auto space-y-10 pb-12">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <PageHeader
        label="Progress Cadence"
        title="Reviews"
        description="Monthly self-reviews to track progress and re-prioritize your focus."
      />
      <button className="flex-shrink-0 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-slate-100 transition-all active:scale-95 self-start md:self-end">
        Start monthly review
      </button>
    </div>

    {/* Next review prompt */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
      className="rounded-2xl border border-violet-500/20 bg-violet-500/5 backdrop-blur-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(109,74,230,0.2)]">
          <Calendar className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Time for your monthly self-review</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Next re-diagnostic due in 8 days · April 30, 2026</p>
        </div>
      </div>
      <button className="flex-shrink-0 flex items-center gap-2 h-9 px-5 rounded-xl border border-white/[0.10] bg-white/[0.04] text-sm text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200 self-start md:self-center">
        Start review <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </motion.div>

    {/* Review history */}
    <div>
      <SectionLabel className="mb-5">Review History</SectionLabel>
      <div className="space-y-4">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.month}
            custom={i}
            variants={cardVars}
            initial="hidden"
            animate="show"
          >
            <PremiumCard glowColor={`${review.color}1A`} className="group">
              {/* Top accent line */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${review.color}60, transparent)` }} />

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${review.color}18`, borderColor: `${review.color}30` }}>
                      <FileText className="h-4 w-4" style={{ color: review.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{review.month}</h3>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">Focus: {review.focus}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Score</p>
                      <p className="font-mono text-xl font-light text-white mt-0.5">
                        {review.score.toFixed(1)}
                        <span className="text-xs text-slate-600 font-mono"> / 25.0</span>
                      </p>
                    </div>
                    <button className="h-8 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-500 hover:text-white hover:border-white/[0.14] transition-all opacity-0 group-hover:opacity-100">
                      View full review
                    </button>
                  </div>
                </div>

                <ul className="space-y-1.5 border-t border-white/[0.04] pt-4">
                  {review.reflections.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-500">
                      <div className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: review.color }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ReviewsHub;
