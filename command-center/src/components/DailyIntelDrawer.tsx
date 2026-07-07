import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, ArrowRight, Zap } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const DailyIntelDrawer = () => {
  const isDailyIntelOpen = useCommandStore((state) => state.isDailyIntelOpen);
  const setDailyIntelOpen = useCommandStore((state) => state.setDailyIntelOpen);
  const dailyInsight = useCommandStore((state) => state.dailyInsight);
  const trialDay = useCommandStore((state) => state.trialDay);
  const tier = useCommandStore((state) => state.tier);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDailyIntelOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setDailyIntelOpen]);

  const isTrial = tier === "trial";
  
  return (
    <AnimatePresence>
      {isDailyIntelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDailyIntelOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[101] shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex flex-col p-6 sm:p-8 border-b border-white/[0.04]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-display font-medium text-white tracking-wide">
                      Live Intel Feed
                    </h2>
                    {isTrial && (
                      <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">
                        Day {trialDay} of 7
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setDailyIntelOpen(false)}
                  className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {dailyInsight ? (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono tracking-wide text-slate-400">
                    <Lightbulb
                      className="w-3 h-3"
                      style={{ color: dailyInsight.color }}
                    />
                    Tactical Briefing / {dailyInsight.pillar}
                  </div>
                  <p className="text-xl sm:text-2xl font-display font-light text-white leading-tight">
                    {dailyInsight.content}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl font-display font-light text-slate-400 leading-tight">
                    No active intel for today. Your system is fully updated.
                  </p>
                </div>
              )}
            </div>

            {/* Action Area */}
            {dailyInsight && (
              <div className="p-6 sm:p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">
                    Required Action
                  </h3>
                  <div
                    className="p-5 rounded-xl border bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden group"
                    style={{ borderColor: `${dailyInsight.color}30` }}
                  >
                    <div
                      className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                      style={{
                        background: `radial-gradient(circle at top right, ${dailyInsight.color}, transparent 70%)`,
                      }}
                    />
                    <p className="text-sm text-slate-300 font-light relative z-10 leading-relaxed">
                      {dailyInsight.action}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.04]">
                  <Link to="/actions" onClick={() => setDailyIntelOpen(false)}>
                    <Button className="w-full bg-white hover:bg-white/90 text-black rounded-lg h-12 font-medium">
                      Execute in Workspace{" "}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <p className="text-center mt-4 text-[10px] font-mono text-slate-500">
                    Intel expires at 23:59 local time.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
