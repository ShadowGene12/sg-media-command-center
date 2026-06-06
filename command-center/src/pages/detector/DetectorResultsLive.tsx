import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  ArrowRight, CheckCircle2, Download, Sparkles, Loader2,
  LayoutDashboard, Compass, BookOpen, Flag, Briefcase,
  TrendingUp, TrendingDown, Settings, Activity, Target,
  Zap, Lock,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

// Animated counter hook
function useCounter(target: number, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + increment, target);
        setValue(parseFloat(current.toFixed(1)));
        if (current >= target) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);
  return value;
}

// Full CC replica — the real thing, not a small preview
const CommandCenterPreview = () => {
  const overallScore = useCounter(13.8, 600);
  const pct = Math.min((13.8 / 25) * 289, 289);

  const PILLARS = [
    { name: "Market & Offer Clarity", short: "Market & Offer", score: 2.1, color: "#6D4AE6", trend: "+0.3", up: true, pct: 42 },
    { name: "Customer Acquisition",  short: "Acquisition",    score: 3.4, color: "#378ADD", trend: "+0.5", up: true, pct: 68 },
    { name: "Sales & Conversion",    short: "Sales",          score: 1.8, color: "#1D9E75", trend: "-0.2", up: false, pct: 36, critical: true },
    { name: "Profit Optimization",   short: "Profit",         score: 3.9, color: "#F59E0B", trend: "+0.8", up: true, pct: 78 },
    { name: "Financial Control",     short: "Financial",      score: 2.6, color: "#D85A30", trend: "+0.1", up: true, pct: 52 },
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#080808",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -20px 80px rgba(109,74,230,0.12), 0 40px 100px rgba(0,0,0,0.8)",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-[#050505]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-4 flex-1 h-5 bg-white/[0.03] rounded-md flex items-center px-3 gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <span className="text-[10px] text-white/15 font-mono">app.sgmedia.com/command-center</span>
        </div>
        <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] text-emerald-400 font-mono">
          Session Active
        </div>
      </div>

      {/* App shell */}
      <div className="flex" style={{ height: "clamp(460px, 60vh, 680px)" }}>
        {/* Sidebar */}
        <div className="w-16 border-r border-white/[0.04] bg-black/60 flex flex-col flex-shrink-0">
          <div className="h-16 flex items-center justify-center border-b border-white/[0.03]">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"
              style={{ boxShadow: "0 0 12px rgba(139,92,246,0.2)" }}>
              <Briefcase className="w-4 h-4 text-violet-400" />
            </div>
          </div>
          <div className="flex-1 py-4 flex flex-col gap-1.5 items-center px-2.5">
            <div className="w-full h-9 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-[18px] h-[18px] text-slate-700" />
            </div>
            {/* Compass active (Diagnostic) */}
            <div className="w-full h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Compass className="w-[18px] h-[18px] text-violet-400" />
            </div>
            {[BookOpen, Flag, Sparkles].map((Icon, i) => (
              <div key={i} className="w-full h-9 rounded-xl flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] text-slate-700" />
              </div>
            ))}
            <div className="mt-auto">
              {[Lock, Lock].map((Icon, i) => (
                <div key={i} className="w-full h-9 rounded-xl flex items-center justify-center opacity-30 mt-1">
                  <Icon className="w-[14px] h-[14px] text-slate-600" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-12 border-t border-white/[0.03] flex items-center justify-center">
            <Settings className="w-[18px] h-[18px] text-slate-700" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0C]">
          {/* App header */}
          <div className="h-14 border-b border-white/[0.04] flex items-center px-5 gap-3 bg-black/20 flex-shrink-0">
            <div className="flex-1 h-7 max-w-[200px] bg-white/[0.04] rounded-lg flex items-center px-3 gap-2">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="h-2 w-24 bg-white/[0.07] rounded-sm" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              {/* Trial badge */}
              <div className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[9px] text-violet-400 font-mono">Day 1 of 7 — Trial Active</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-[10px] font-mono text-violet-400 font-bold">S</div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-5 md:p-6">
            {/* Page header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1">Growth System</div>
                <h2 className="text-lg font-display font-light text-white tracking-tight">Bottleneck Report</h2>
                <p className="text-xs text-slate-500 mt-0.5">Your 5-pillar diagnostic — scores, root causes, and priority actions.</p>
              </div>
              <button className="text-xs text-white/20 hover:text-white/40 font-mono transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100%-4rem)]">
              {/* Left: Score + Bottleneck */}
              <div className="lg:col-span-4 space-y-4">
                {/* Score gauge */}
                <div className="rounded-2xl p-5"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3">System Score</div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <motion.circle
                          cx="40" cy="40" r="32" fill="none" strokeWidth="6" strokeLinecap="round"
                          stroke="url(#gaugeCC)"
                          initial={{ strokeDasharray: "0 201" }}
                          animate={{ strokeDasharray: `${(13.8 / 25) * 201} 201` }}
                          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="gaugeCC" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6D4AE6" />
                            <stop offset="100%" stopColor="#00D2FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-xl font-light text-white">{overallScore.toFixed(1)}</span>
                        <span className="text-[8px] text-slate-600">/25</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-white/60 mb-1">Overall Growth Score</div>
                      <div className="text-[10px] text-white/30 font-mono">Trailing 30 days</div>
                      <div className="flex items-end gap-0.5 h-6 mt-2 opacity-30">
                        {[4,5,3,6,7,5,8,9].map((h,i) => (
                          <div key={i} className="flex-1 bg-cyan-400/60 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary bottleneck */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(109,74,230,0.08)", border: "1px solid rgba(109,74,230,0.2)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-[9px] text-violet-400 uppercase tracking-widest font-mono">Primary Bottleneck</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Sales & Conversion</div>
                  <div className="font-mono text-2xl font-light text-violet-400 mb-2">1.8 <span className="text-sm text-white/25">/ 5.0</span></div>
                  <div className="text-[10px] text-white/30 mb-3 leading-relaxed">You have a follow-up gap, not a lead gap. 80% of your qualified leads go cold between Day 1 and Day 14.</div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: "#1D9E75" }}
                      initial={{ width: 0 }}
                      animate={{ width: "36%" }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* AI Advisor */}
                <div className="rounded-2xl p-4" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-[9px] text-violet-400 font-mono uppercase tracking-widest">AI Advisor</span>
                    <span className="ml-auto text-[8px] text-white/20 font-mono">7 days active</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-end">
                      <div className="bg-violet-600/20 border border-violet-500/20 rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[80%]">
                        <p className="text-[9px] text-violet-200">Why is my Sales score so low?</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[90%]">
                        <p className="text-[9px] text-white/55 leading-relaxed">Your score reflects a follow-up gap — 4 leads dormant 7+ days. Start by building a 5-touch sequence.</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-7 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center px-3 gap-2">
                    <span className="text-[9px] text-white/15">Ask me about your diagnosis...</span>
                  </div>
                </div>
              </div>

              {/* Right: Pillar scores */}
              <div className="lg:col-span-8 flex flex-col">
                <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-3">Pillar Scores</div>
                <div className="space-y-2.5 flex-1">
                  {PILLARS.map((p, idx) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                      className={`rounded-2xl px-5 py-4 flex items-center gap-4 ${p.critical ? "border border-violet-500/25" : "border border-white/[0.05]"}`}
                      style={{
                        background: p.critical ? "rgba(109,74,230,0.06)" : "rgba(0,0,0,0.4)",
                        borderTop: p.critical ? "1px solid rgba(109,74,230,0.2)" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}80` }} />
                      <span className="text-sm text-slate-300 flex-1 truncate font-light">{p.name}</span>
                      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0 mr-4 w-32">
                        <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ backgroundColor: p.color + "70" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${p.pct}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[10px] font-mono" style={{ color: p.up ? "#10B981" : "#EF4444" }}>
                          {p.up ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                          {" "}{p.trend}
                        </span>
                      </div>
                      <span className="font-mono text-lg font-light flex-shrink-0" style={{ color: p.color }}>
                        {p.score.toFixed(1)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom row: quick stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "SOPs Available", value: "50+", color: "#6D4AE6", icon: BookOpen },
                    { label: "Actions Generated", value: "6", color: "#1D9E75", icon: Activity },
                    { label: "Trial Days Left", value: "7", color: "#F59E0B", icon: Zap },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-xl p-3.5 flex items-center gap-3"
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: stat.color + "15" }}>
                        <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <div className="font-mono text-base font-light text-white">{stat.value}</div>
                        <div className="text-[9px] text-white/30 font-mono">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PILLAR_META = [
  { key: "market_offer", name: "Market & Offer Clarity", color: "#6D4AE6" },
  { key: "acquisition",  name: "Customer Acquisition",   color: "#378ADD" },
  { key: "sales",        name: "Sales & Conversion",     color: "#1D9E75" },
  { key: "profit",       name: "Profit Optimization",    color: "#F59E0B" },
  { key: "finance",      name: "Financial & Performance Control", color: "#D85A30" },
];

const DetectorResultsLive = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const { exportDiagnosticPDF } = await import("@/lib/pdfExport");
      const pending = localStorage.getItem("pending_diagnostic");
      const diag = pending ? JSON.parse(pending) : null;
      const scores = diag?.pillar_scores ?? {};
      await exportDiagnosticPDF({
        firstName: localStorage.getItem("sg_user_email")?.split("@")[0] ?? "Operator",
        businessName: localStorage.getItem("sg_business_name") ?? undefined,
        overallScore: diag?.overall_score ?? 13.8,
        primaryPillar: diag?.primary_pillar ?? "sales",
        pillars: PILLAR_META.map(p => ({ name: p.name, score: scores[p.key] ?? 2.5, color: p.color })),
      });
    } catch (e) {
      console.error("PDF export failed", e);
    } finally {
      setExporting(false);
    }
  };

  const handleEnterCC = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      // Not authed — send to signup, which will redirect to CC after account creation
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <AnimatedBackground />

      {/* Hero text section */}
      <div className="relative pt-24 md:pt-28 pb-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedGroup
            variants={{
              container: { visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
              ...transitionVariants,
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5 mb-8">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-mono">Diagnosis complete</span>
              <span className="h-3.5 w-px bg-emerald-500/20" />
              <span className="text-xs text-white/30 font-mono">7-day full access unlocked</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tight mb-8 leading-[1.05]">
              Your Bottleneck Report is{" "}
              <em className="not-italic text-violet-400">live</em>
              {" "}in Command Center.
            </h1>

            {/* Subtext */}
            <p className="mx-auto max-w-xl text-lg text-white/40 leading-relaxed mb-10 font-light">
              Your primary bottleneck has been identified. Your full 5-pillar diagnostic, SOPs, and AI Advisor are ready — mapped to your specific results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="bg-white/[0.05] rounded-[14px] border border-white/[0.08] p-0.5">
                <Button
                  size="lg"
                  onClick={handleEnterCC}
                  className="h-12 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-base font-medium shadow-[0_0_25px_rgba(109,74,230,0.4)] hover:shadow-[0_0_35px_rgba(109,74,230,0.5)] transition-all"
                >
                  {user ? "View my report in Command Center" : "Create account — Enter Command Center"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg" variant="ghost"
                onClick={handleExportPDF}
                disabled={exporting}
                className="h-12 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 text-base gap-2"
              >
                {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                {exporting ? "Generating..." : "Download PDF snapshot"}
              </Button>
            </div>

            {!user && (
              <p className="mt-4 text-xs text-white/20 font-mono">
                Already have an account?{" "}
                <Link to="/login" className="text-violet-400/70 hover:text-violet-400 transition-colors underline underline-offset-2">
                  Log in
                </Link>
              </p>
            )}
          </AnimatedGroup>
        </div>
      </div>

      {/* Full-width Command Center preview — no fade, no max-width cap */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        className="relative px-4 md:px-8 lg:px-12 pb-0"
      >
        {/* Subtle top glow */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl h-16 bg-violet-600/[0.12] rounded-full blur-3xl pointer-events-none" />
        <CommandCenterPreview />
      </motion.div>
    </div>
  );
};

export default DetectorResultsLive;
