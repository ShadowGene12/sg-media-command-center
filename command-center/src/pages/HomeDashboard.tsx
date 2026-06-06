import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Activity, Target, ArrowRight, CheckCircle2, Sparkles,
  Lightbulb, Lock, Loader2, BookOpen, Flag, TrendingUp,
  Zap, Brain, BarChart3, Clock, ChevronRight, Flame,
} from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useOnboarding } from "@/lib/useOnboarding";

// ─── Mouse-tracking glow card ──────────────────────────────────────────────
const GlowCard = ({
  children, className = "", glowColor = "rgba(109,74,230,0.15)", style = {},
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className={`relative overflow-hidden rounded-2xl grain-overlay bento-card bento-shine ${className}`}
      style={{
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// ─── Circular gauge ────────────────────────────────────────────────────────
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
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D4AE6" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-display font-light text-white tracking-tighter stat-number"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {value.toFixed(1)}
        </motion.span>
        <span className="text-[10px] font-mono text-slate-600">/ {max}</span>
      </div>
    </div>
  );
};

// ─── Typewriter ────────────────────────────────────────────────────────────
const TypewriterText = ({ text }: { text: string }) => (
  <span className="inline-block">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.08, delay: i * 0.025 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

// ─── Mini sparkline ────────────────────────────────────────────────────────
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8 w-full">
      {data.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: color + "60" }}
          initial={{ height: 0 }}
          animate={{ height: `${(h / max) * 100}%` }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// ─── Stat card ─────────────────────────────────────────────────────────────
const StatCard = ({
  icon: Icon, label, value, sub, color, delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ delay, type: "spring", stiffness: 100, damping: 18 }}
  >
    <GlowCard glowColor={color + "20"} className="p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: color + "18", border: `1px solid ${color}30` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600">{label}</span>
      </div>
      <div className="space-y-0.5">
        <p className="text-2xl font-display font-light text-white tracking-tight stat-number">{value}</p>
        {sub && <p className="text-[10px] font-mono text-slate-600">{sub}</p>}
      </div>
    </GlowCard>
  </motion.div>
);

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 16 } },
};

// ─── Main component ────────────────────────────────────────────────────────
const HomeDashboard = () => {
  useOnboarding("diy");
  const { startTrial, trialDay, tier, dailyInsight } = useCommandStore();
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const hr = new Date().getHours();
  const timeOfDay = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Shadow";

  useEffect(() => { startTrial(); }, []); // eslint-disable-line

  const isTrialActive = trialDay >= 1 && trialDay <= 7;
  const isTrialExpiring = trialDay >= 5 && trialDay <= 7;
  const postTrial = trialDay > 7;

  const pendingDiagnostic = (() => {
    try { const raw = localStorage.getItem("pending_diagnostic"); return raw ? JSON.parse(raw) : null; }
    catch { return null; }
  })();

  const { data: diagnostic, isLoading: diagLoading } = useQuery({
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

  const { data: actions = [], isLoading: actionsLoading } = useQuery({
    queryKey: ["action-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("action_items").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(6);
      return data ?? [];
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  const toggleAction = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === "completed" ? "not_started" : "completed";
      await supabase.from("action_items").update({ status: newStatus }).eq("id", id);
      return { id, newStatus };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["action-items", user?.id] }),
  });

  const activeDiagnostic = diagnostic ?? pendingDiagnostic;
  const overallScore = activeDiagnostic?.overall_score ?? 0;
  const completedActions = actions.filter(a => a.status === "completed").length;
  const loading = diagLoading || actionsLoading;

  const PILLARS = [
    { key: "market_offer", name: "Market & Offer",       color: "#6D4AE6" },
    { key: "acquisition",  name: "Acquisition",          color: "#378ADD" },
    { key: "sales",        name: "Sales & Conversion",   color: "#1D9E75" },
    { key: "profit",       name: "Profit Optimization",  color: "#F59E0B" },
    { key: "finance",      name: "Financial Control",    color: "#D85A30" },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 pt-6 px-4 sm:px-6 space-y-6">

      {/* ── Trial / Post-trial banners ── */}
      {isTrialActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className={`liquid-glass flex items-center justify-between px-5 py-3 rounded-xl text-sm ${
            isTrialExpiring ? "border-amber-500/20 !bg-amber-500/[0.06]" : ""
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

      {postTrial && tier === "free" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="liquid-glass flex items-center justify-between px-5 py-3 rounded-xl"
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

      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-violet-400/70 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
          System Online · Session Active
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
          <TypewriterText text={`${timeOfDay}, ${firstName}.`} />
        </h1>
        <p className="text-base text-slate-400 font-light max-w-2xl leading-relaxed">
          {activeDiagnostic
            ? `Primary bottleneck: ${activeDiagnostic.primary_pillar?.replace(/_/g, " ") || "Sales & Conversion"}. Highest-leverage actions queued below.`
            : "Your systems are online. Take the Bottleneck Detector to get your personalised diagnostic."}
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-violet-500/30 shadow-[0_0_20px_rgba(109,74,230,0.4)]"
          />
        </div>
      ) : (
        <>
          {/* ── Row 1: Stats strip ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={BarChart3}   label="System Score"     value={overallScore > 0 ? overallScore.toFixed(1) : "—"} sub="/ 25 max"           color="#6D4AE6" delay={0.10} />
            <StatCard icon={CheckCircle2} label="Actions Done"    value={completedActions}                                  sub={`of ${actions.length} total`} color="#1D9E75" delay={0.15} />
            <StatCard icon={BookOpen}    label="SOPs Available"   value="50+"                                               sub="mapped to pillars"   color="#378ADD" delay={0.20} />
            <StatCard icon={Flame}       label="Day Streak"        value={trialDay > 0 ? trialDay : 1}                     sub="days active"         color="#F59E0B" delay={0.25} />
          </div>

          {/* ── Row 2: Bento main area ── */}
          <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Primary bottleneck / CTA — 8/12 */}
            <motion.div variants={itemVars} className="md:col-span-8">
              <GlowCard glowColor="rgba(109,74,230,0.18)" className="h-full min-h-[280px] p-8 flex flex-col justify-between">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <Target className="w-56 h-56 text-violet-300" />
                </div>
                {/* Top gradient strip */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                <div className="relative z-10 space-y-5 flex-1">
                  {activeDiagnostic ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-violet text-violet-300 text-xs font-mono">
                          <Activity className="w-3 h-3" />
                          Primary Bottleneck Identified
                        </div>
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                          {activeDiagnostic.created_at ? new Date(activeDiagnostic.created_at).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-light text-white mb-2 tracking-tight">
                          {activeDiagnostic.primary_pillar?.replace(/_/g, " & ").replace(/market offer/i, "Market & Offer") || "Sales & Conversion"}
                        </h3>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed font-light">
                          Score: <span className="font-mono text-violet-400">
                            {activeDiagnostic.pillar_scores?.[activeDiagnostic.primary_pillar ?? "sales"] ?? "—"}
                          </span> / 5.0 · Your diagnostic is ready. View the full report to map the fix path.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-violet text-violet-300 text-xs font-mono">
                        <Zap className="w-3 h-3" />
                        Start Here
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-light text-white mb-2 tracking-tight">Take the Bottleneck Detector</h3>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed font-light">
                          15 questions. 4 minutes. Your full 5-pillar diagnostic mapped and ready inside Command Center.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-3">
                  {activeDiagnostic ? (
                    <Link to="/pillars">
                      <Button className="bg-white hover:bg-white/95 text-black rounded-full px-7 h-11 font-medium shadow-[0_0_24px_rgba(255,255,255,0.10)] hover:shadow-[0_0_32px_rgba(255,255,255,0.22)] transition-all text-sm">
                        View Bottleneck Report <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/detector/flow">
                      <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-7 h-11 font-medium shadow-[0_0_24px_rgba(109,74,230,0.4)] hover:shadow-[0_0_36px_rgba(109,74,230,0.55)] transition-all text-sm">
                        Take the Detector <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/diagnostics" className="text-xs font-mono text-slate-600 hover:text-violet-400 transition-colors">
                    View history →
                  </Link>
                </div>
              </GlowCard>
            </motion.div>

            {/* Score gauge — 4/12 */}
            <motion.div variants={itemVars} className="md:col-span-4 flex flex-col gap-4">
              <GlowCard glowColor="rgba(0,210,255,0.08)" className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">System Score</p>
                <CircularGauge value={overallScore} max={25} />
                <Sparkline data={[4,5,3,6,7,5,8,9]} color="#00D2FF" />
                <p className="text-[9px] font-mono text-slate-600 mt-3">
                  {activeDiagnostic ? "Last diagnostic" : "No diagnostic yet"}
                </p>
              </GlowCard>
            </motion.div>

            {/* 5-Pillar mini scorecards — full width */}
            <motion.div variants={itemVars} className="md:col-span-12">
              <GlowCard glowColor="rgba(255,255,255,0.04)" className="p-6">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">5-Pillar Overview</h2>
                  <Link to="/pillars" className="text-[10px] font-mono text-slate-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                    Full report <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {PILLARS.map((pillar) => {
                    const score = activeDiagnostic?.pillar_scores?.[pillar.key] ?? null;
                    const pct = score ? (score / 5) * 100 : 0;
                    const isPrimary = activeDiagnostic?.primary_pillar === pillar.key;
                    return (
                      <div
                        key={pillar.key}
                        className={`rounded-xl p-4 space-y-3 transition-all duration-300 hover:bg-white/[0.03] cursor-pointer ${
                          isPrimary ? "border border-violet-500/25 bg-violet-500/[0.04]" : "border border-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pillar.color, boxShadow: `0 0 8px ${pillar.color}80` }} />
                          {isPrimary && <span className="text-[8px] font-mono text-violet-400 uppercase tracking-widest">Primary</span>}
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-light leading-snug">{pillar.name}</p>
                          <p className="text-xl font-display font-light mt-1 stat-number" style={{ color: score ? pillar.color : "rgba(255,255,255,0.15)" }}>
                            {score ? score.toFixed(1) : "—"}
                          </p>
                        </div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: pillar.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlowCard>
            </motion.div>

            {/* Required Actions — 8/12 */}
            <motion.div variants={itemVars} className="md:col-span-8">
              <GlowCard glowColor="rgba(255,255,255,0.05)" className="p-6 h-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Required Actions</h2>
                  {actions.length > 0 && (
                    <Link to="/actions" className="text-[10px] font-mono text-slate-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                      All {actions.length} <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
                {actions.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                      <Target className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm font-light">No actions yet — take the Bottleneck Detector.</p>
                    <Link to="/detector/flow" className="mt-3 inline-block text-xs text-violet-400 hover:text-violet-300 font-mono transition-colors">
                      Take the Detector →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {actions.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleAction.mutate({ id: item.id, status: item.status })}
                        className={`group flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/[0.03] cursor-pointer ${item.status === "completed" ? "opacity-40" : ""}`}
                      >
                        <button className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${item.status === "completed" ? "bg-emerald-500/15 border-emerald-500/40" : "border-slate-700 hover:border-violet-400/60"}`}>
                          {item.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        </button>
                        <span className={`text-sm flex-1 font-light leading-snug ${item.status === "completed" ? "line-through text-slate-600" : "text-slate-200"}`}>
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.pillar_color && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.pillar_color }} />}
                          {item.due_date && <span className="text-[10px] text-slate-600 font-mono hidden sm:block">{item.due_date}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlowCard>
            </motion.div>

            {/* Quick nav cards — 4/12 */}
            <motion.div variants={itemVars} className="md:col-span-4 flex flex-col gap-3">
              {[
                { icon: BookOpen, label: "SOP Library",     sub: "50+ playbooks",     href: "/library/sops",  color: "#378ADD" },
                { icon: Flag,     label: "Sprints",          sub: "Track your goals",  href: "/sprints",       color: "#F59E0B" },
                { icon: Brain,    label: "AI Advisor",       sub: "Context-aware",     href: "/advisor",       color: "#6D4AE6" },
                { icon: TrendingUp, label: "Pathways",       sub: "30-day roadmaps",   href: "/pathways",      color: "#1D9E75" },
              ].map((item) => (
                <Link key={item.href} to={item.href}>
                  <GlowCard glowColor={item.color + "15"} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02]">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + "15", border: `1px solid ${item.color}25` }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-200">{item.label}</p>
                      <p className="text-[10px] font-mono text-slate-600">{item.sub}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-700 flex-shrink-0" />
                  </GlowCard>
                </Link>
              ))}
            </motion.div>

            {/* Trial unlocks */}
            {isTrialActive && trialDay >= 3 && (
              <motion.div variants={itemVars} className="md:col-span-6">
                <GlowCard glowColor="rgba(109,74,230,0.14)" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl liquid-glass-violet flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4.5 h-4.5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-violet-400">Day 3 Unlock</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded liquid-glass-violet text-violet-300 font-mono">New</span>
                      </div>
                      <h3 className="text-sm font-display font-medium text-white mb-1.5">Full Bottleneck Chain — Secondary Analysis</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 font-light">Your report now shows the full bottleneck chain across all 5 pillars with root-cause mapping.</p>
                      <Link to="/pillars">
                        <Button size="sm" variant="ghost" className="h-7 px-3 text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border border-violet-500/20 rounded-lg">
                          View full chain →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {isTrialActive && trialDay >= 6 && (
              <motion.div variants={itemVars} className="md:col-span-6">
                <GlowCard glowColor="rgba(245,158,11,0.12)" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4.5 h-4.5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400">Day 6 Unlock</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">Live</span>
                      </div>
                      <h3 className="text-sm font-display font-medium text-white mb-1.5">Your 30-Day Operator Roadmap</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 font-light">Personalized 30-day fix sequence based on your bottleneck chain. Weekly priorities, SOPs to deploy, metrics to track.</p>
                      <Link to="/pathways">
                        <Button size="sm" className="h-7 px-3 text-xs bg-amber-500/90 hover:bg-amber-500 text-black font-medium rounded-lg shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                          View 30-day roadmap →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {/* Daily Operator Insight */}
            {dailyInsight && isTrialActive && (
              <motion.div variants={itemVars} className="md:col-span-12">
                <GlowCard glowColor="rgba(255,255,255,0.04)" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: dailyInsight.color + "15", border: `1px solid ${dailyInsight.color}25` }}>
                      <Lightbulb className="w-4.5 h-4.5" style={{ color: dailyInsight.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: dailyInsight.color }}>
                          Day {trialDay} · Operator Insight
                        </span>
                        <span className="text-[9px] font-mono text-slate-600">/ {dailyInsight.pillar}</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-light mb-3">{dailyInsight.content}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-600" />
                        <span className="text-[10px] font-mono text-slate-500">{dailyInsight.action}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HomeDashboard;
