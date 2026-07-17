import { motion } from "framer-motion";
import { Calendar, FileText, TrendingUp, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

import { useAuth } from "@/lib/auth";
import { useCommandStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const FALLBACK_REVIEWS = [
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
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.1 },
  }),
};

export default function ReviewsHub() {
  const { user } = useAuth();

  const { data: dbReviews } = useQuery({
    queryKey: ["reviews", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Reviews table error (using fallback):", error.message);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  const reviews = dbReviews && dbReviews.length > 0 ? dbReviews : FALLBACK_REVIEWS;
  const { tier } = useCommandStore();

  if (tier === "free") {
    return (
      <div className="max-w-3xl mx-auto space-y-10 pb-12 pt-10 px-4 text-center">
        <PremiumCard glowColor="rgba(139, 92, 246, 0.12)" className="p-10 md:p-14 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-3xl font-display font-light text-white mb-4">Reviews & Reflection Locked</h2>
          <p className="text-slate-400 max-w-lg mb-8 leading-relaxed font-light">
            Your free tier includes permanent access to your Bottleneck Report and dashboard. Upgrade to Operator to unlock monthly self-reviews and progress tracking.
          </p>
          <Link to="/upgrade">
            <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 h-12 font-medium shadow-[0_0_20px_rgba(109,74,230,0.4)] hover:shadow-[0_0_32px_rgba(109,74,230,0.5)] transition-all">
              Unlock Operator Access <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
        </PremiumCard>
      </div>
    );
  }

  return (
  <div className="max-w-6xl mx-auto space-y-10 pb-12">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <PageHeader
        label="Progress Cadence"
        title="Reviews"
        description="Monthly self-reviews to track progress and re-prioritize your focus."
      />
      <button className="flex-shrink-0 h-10 px-5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-all active:scale-95 self-start md:self-end shadow-[0_0_20px_rgba(109,74,230,0.2)]">
        Start Monthly Review
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
          <p className="text-sm font-semibold text-white">
            Time for your monthly self-review
          </p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Next re-diagnostic due in 8 days · April 30, 2026
          </p>
        </div>
      </div>
      <button className="flex-shrink-0 flex items-center gap-2 h-9 px-5 rounded-xl border border-white/[0.10] bg-white/[0.04] text-sm text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200 self-start md:self-center">
        Start Review <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </motion.div>

    {/* Review history */}
    <div>
      <SectionLabel className="mb-5">Review History</SectionLabel>
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id ?? review.month}
            custom={i}
            variants={cardVars}
            initial="hidden"
            animate="show"
          >
            <PremiumCard glowColor={`${review.color}1A`} className="group">
              {/* Top accent line */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(to right, ${review.color}60, transparent)`,
                }}
              />

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${review.color}18`,
                        borderColor: `${review.color}30`,
                      }}
                    >
                      <FileText
                        className="h-4 w-4"
                        style={{ color: review.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {review.month_name ?? review.month}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Focus: {review.focus_area ?? review.focus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        Score
                      </p>
                      <p className="font-mono text-xl font-light text-white mt-0.5">
                        {Number(review.score).toFixed(1)}
                        <span className="text-xs text-slate-600 font-mono">
                          {" "}
                          / 25.0
                        </span>
                      </p>
                    </div>
                    <button className="h-8 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-500 hover:text-white hover:border-white/[0.14] transition-all opacity-0 group-hover:opacity-100">
                      View Full Review
                    </button>
                  </div>
                </div>

                <ul className="space-y-1.5 border-t border-white/[0.04] pt-4">
                  {review.reflections.map((r, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-slate-500"
                    >
                      <div
                        className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: review.color }}
                      />
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
}
