import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Target, ArrowRight, CheckCircle2, Sparkles, Lightbulb, Lock, Loader2 } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/useOnboarding";
import { PremiumCard } from "@/components/PremiumCard";

// ─── Circular gauge ────────────────────────────────────────────
const CircularGauge = ({ value, max }: { value: number; max: number }) => {
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(value / max, 1));
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <motion.circle
          cx="60" cy="60" r={r}
          fill="none" stroke="url(#gaugeGrad)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D4AE6" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-display font-light text-white tracking-tighter">{value.toFixed(1)}</span>
        <span className="text-[10px] font-mono text-slate-600">/ {max}</span>
      </div>
    </div>
  );
};

// ─── Typewriter ────────────────────────────────────────────────
const TypewriterText = ({ text }: { text: string }) => (
  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeIn" }} className="inline-block">
    {text.split("").map((char, i) => (
      <motion.span key={i} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.1, delay: i * 0.03 }}>
        {char}
      </motion.span>
    ))}
  </motion.span>
);

const containerVars = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

// ─── Main component ────────────────────────────────────────────
const HomeDashboard = () => {
  useOnboarding("diy");
  const { startTrial, trialDay, tier, dailyInsight } = useCommandStore();
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";
  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Shadow";

  // Start trial on first load
  useEffect(() => { startTrial(); }, []); // eslint-disable-line

  const isTrialActive   = trialDay >= 1 && trialDay <= 7;
  const isTrialExpiring = trialDay >= 5 && trialDay <= 7;
  const postTrial       = trialDay > 7;

  // ── Pending diagnostic from localStorage (shown before DB flush completes) ─
  const pendingDiagnostic = (() => {
    try {
      const raw = localStorage.getItem('pending_diagnostic');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();

  // ── Fetch latest diagnostic ──────────────────────────────────
  const { data: diagnostic, isLoading: diagLoading } = useQuery({
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

  // ── Fetch action items ───────────────────────────────────────
  const { data: actions = [], isLoading: actionsLoading } = useQuery({
    queryKey: ["action-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("action_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(6);
      return data ?? [];
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  // ── Toggle action status ─────────────────────────────────────
  const toggleAction = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === "completed" ? "not_started" : "completed";
      await supabase.from("action_items").update({ status: newStatus }).eq("id", id);
      return { id, newStatus };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["action-items", user?.id] }),
  });

  // ── Use DB diagnostic, fall back to pending localStorage one ─
  const activeDiagnostic = diagnostic ?? pendingDiagnostic;

  // ── Derive overall score ─────────────────────────────────────
  const overallScore = activeDiagnostic?.overall_score ?? 0;

  const loading = diagLoading || actionsLoading;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-8 px-4 sm:px-6">

      {/* Trial banner */}
      {isTrialActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className={`flex items-center justify-between px-5 py-3 rounded-xl border text-sm ${
            isTrialExpiring ? "bg-amber-500/[0.07] border-amber-500/20" : "bg-violet-500/[0.06] border-violet-500/15"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isTrialExpiring ? "bg-amber-400" : "bg-violet-400"}`} />
            <span className={`font-mono text-xs ${isTrialExpiring ? "text-amber-400" : "text-violet-400"}`}>
              {trialDay === 7 ? "Trial ends tonight — your report stays free forever" : `Day ${trialDay} of 7 — full access active`}
            </span>
          </div>
          {isTrialExpiring && (
            <Link to="/upgrade">
              <Button size="sm" className="h-7 px-3 text-xs bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-[0_0_12px_rgba(109,74,230,0.3)]">
                Unlock Operator
              </Button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Post-trial banner */}
      {postTrial && tier === "free" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center justify-between px-5 py-3 rounded-xl border border-white/[0.07] bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-slate-500" />
            <span className="font-mono text-xs text-slate-500">Trial ended · Your report is still yours · Fix path requires Operator</span>
          </div>
          <Link to="/upgrade">
            <div className="animated-laser-border rounded-full p-px">
              <div className="bg-[#050505] rounded-full px-3 py-1 text-[10px] font-mono text-violet-400 font-semibold">Upgrade</div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400/80 uppercase">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>System Online • Session Active</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
          <TypewriterText text={`${timeOfDay}, ${firstName}.`} />
        </h1>
        <p className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
          {activeDiagnostic
            ? `Your primary bottleneck is in ${activeDiagnostic.primary_pillar?.replace(/_/g, " ") || "Sales & Conversion"}. I've queued your highest-leverage actions.`
            : "Your systems are online. Take the Bottleneck Detector to get your personalised diagnostic."}
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
        </div>
      ) : (
        <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Active Sprint / Bottleneck card — 8/12 */}
          <motion.div variants={itemVars} className="md:col-span-8">
            <PremiumCard glowColor="rgba(139, 92, 246, 0.12)" className="h-full min-h-[300px] p-8 sm:p-10 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                <Target className="w-64 h-64 text-violet-300" />
              </div>
              <div className="relative z-10 space-y-6 flex-1">
                {activeDiagnostic ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-wide">
                      <Activity className="w-3 h-3" />
                      Primary Bottleneck Identified
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-light text-white mb-3">
                        {activeDiagnostic.primary_pillar?.replace(/_/g, " & ").replace(/market offer/i, "Market & Offer") || "Sales & Conversion"}
                      </h3>
                      <p className="text-slate-400 text-base max-w-xl leading-relaxed font-light">
                        Score: <span className="font-mono text-violet-400">
                          {activeDiagnostic.pillar_scores?.[activeDiagnostic.primary_pillar ?? "sales"] ?? "—"}
                        </span> / 5.0 · Your diagnostic is ready. Explore your full report to map the fix path.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-wide">
                      <Activity className="w-3 h-3" />
                      No Diagnostic Yet
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-light text-white mb-3">Take the Bottleneck Detector</h3>
                      <p className="text-slate-400 text-base max-w-xl leading-relaxed font-light">
                        15 questions. 4 minutes. Your full 5-pillar diagnostic mapped and ready inside Command Center.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="relative z-10 mt-8">
                {activeDiagnostic ? (
                  <Link to="/pillars">
                    <Button className="bg-white hover:bg-white/95 text-black rounded-full px-8 h-12 font-medium transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_32px_rgba(255,255,255,0.20)]">
                      View Bottleneck Report <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/detector/flow">
                    <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 h-12 font-medium shadow-[0_0_20px_rgba(109,74,230,0.4)] hover:shadow-[0_0_32px_rgba(109,74,230,0.5)] transition-all">
                      Take the Detector <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </PremiumCard>
          </motion.div>

          {/* Score gauge — 4/12 */}
          <motion.div variants={itemVars} className="md:col-span-4 flex flex-col gap-6">
            <PremiumCard glowColor="rgba(0, 210, 255, 0.08)" className="p-8 flex-1 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-5">System Score</p>
              <CircularGauge value={overallScore} max={25} />
              <p className="text-xs text-slate-500 mt-4">
                {activeDiagnostic?.created_at ? `Diagnostic: ${new Date(activeDiagnostic.created_at).toLocaleDateString()}` : activeDiagnostic ? "Diagnostic ready" : "No diagnostic yet"}
              </p>
              <div className="w-full h-8 mt-5 flex items-end justify-between gap-1 opacity-40">
                {[4, 5, 3, 6, 7, 5, 8, 9].map((h, i) => (
                  <div key={i} className="w-full bg-cyan-400/50 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                ))}
              </div>
            </PremiumCard>
          </motion.div>

          {/* Required Actions — 12/12 */}
          <motion.div variants={itemVars} className="md:col-span-12">
            <PremiumCard glowColor="rgba(255,255,255,0.05)" className="p-8">
              <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-6">Required Actions</h2>
              {actions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 text-sm font-light">No actions yet — take the Bottleneck Detector to generate your action plan.</p>
                  <Link to="/detector/flow" className="mt-4 inline-block text-xs text-violet-400 hover:text-violet-300 font-mono transition-colors">
                    Take the Detector →
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  {actions.slice(0, 3).map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleAction.mutate({ id: item.id, status: item.status })}
                      className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02] cursor-pointer ${item.status === "completed" ? "opacity-40" : ""}`}
                    >
                      <button className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${item.status === "completed" ? "bg-emerald-500/20 border-emerald-500/50" : "border-slate-600 hover:border-violet-400"}`}>
                        {item.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      </button>
                      <span className={`text-sm flex-1 font-light ${item.status === "completed" ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.pillar_color && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.pillar_color }} />}
                        {item.due_date && <span className="text-xs text-slate-600 font-mono hidden sm:block">{item.due_date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {actions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <Link to="/actions" className="text-xs text-slate-600 hover:text-violet-400 font-mono transition-colors">
                    View all {actions.length} actions →
                  </Link>
                </div>
              )}
            </PremiumCard>
          </motion.div>

          {/* Day 3 unlock */}
          {isTrialActive && trialDay >= 3 && (
            <motion.div variants={itemVars} className="md:col-span-12">
              <PremiumCard glowColor="rgba(109,74,230,0.12)" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-violet-400">Day 3 Unlock</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-mono border border-violet-500/20">New</span>
                    </div>
                    <h3 className="text-base font-display font-medium text-white mb-1">Full Bottleneck Chain — Secondary Analysis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3 font-light">
                      Your report now shows the full bottleneck chain across all 5 pillars with root-cause mapping. Most operators find their real bottleneck isn't the obvious one.
                    </p>
                    <Link to="/pillars">
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border border-violet-500/20 rounded-lg">
                        View full diagnostic chain →
                      </Button>
                    </Link>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {/* Day 6 unlock */}
          {isTrialActive && trialDay >= 6 && (
            <motion.div variants={itemVars} className="md:col-span-12">
              <PremiumCard glowColor="rgba(245,158,11,0.10)" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400">Day 6 Unlock</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20">Live</span>
                    </div>
                    <h3 className="text-base font-display font-medium text-white mb-1">Your 30-Day Operator Roadmap</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3 font-light">
                      Personalized 30-day fix sequence based on your bottleneck chain. Weekly priorities, SOPs to deploy, and metrics to track.
                    </p>
                    <Link to="/pathways">
                      <Button size="sm" className="h-8 px-4 text-xs bg-amber-500/90 hover:bg-amber-500 text-black font-medium rounded-lg shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                        View your 30-day roadmap →
                      </Button>
                    </Link>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {/* Daily Operator Insight */}
          {dailyInsight && isTrialActive && (
            <motion.div variants={itemVars} className="md:col-span-12">
              <PremiumCard glowColor="rgba(255,255,255,0.04)" className="p-6 border-white/[0.05]">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: dailyInsight.color + "15", border: `1px solid ${dailyInsight.color}25` }}
                  >
                    <Lightbulb className="w-5 h-5" style={{ color: dailyInsight.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: dailyInsight.color }}>
                        Day {trialDay} · Operator Insight
                      </span>
                      <span className="text-[9px] font-mono text-slate-600">/ {dailyInsight.pillar}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3 font-light">{dailyInsight.content}</p>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className="text-xs text-slate-500 font-mono">{dailyInsight.action}</span>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default HomeDashboard;
