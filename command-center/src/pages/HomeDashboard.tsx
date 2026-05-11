import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Target, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/useOnboarding";
import { PremiumCard } from "@/components/PremiumCard";

const CircularGauge = ({ value, max }: { value: number; max: number }) => {
  const r = 52;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        {/* Value arc */}
        <motion.circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
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
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-display font-light text-white tracking-tighter">{value.toFixed(1)}</span>
        <span className="text-[10px] font-mono text-slate-600">/ {max}</span>
      </div>
    </div>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.1, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HomeDashboard = () => {
  useOnboarding('diy');
  const { overallScore } = useCommandStore();
  const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 pt-8 px-4 sm:px-6">
      {/* Header Area - Cinematic Agent Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400/80 uppercase">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>System Online • Session Active</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-light text-white tracking-tight">
          <TypewriterText text={`${timeOfDay}, Shadow.`} />
        </h1>
        <p className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
          Your systems are optimal. I have analyzed your pipeline and queued your high-leverage actions for today.
        </p>
      </motion.div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Main Focus Area - Large spanning card */}
        <motion.div variants={itemVars} className="md:col-span-8">
          <PremiumCard glowColor="rgba(139, 92, 246, 0.12)" className="h-full min-h-[300px] p-8 sm:p-10 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
              <Target className="w-64 h-64 text-violet-300" />
            </div>

            <div className="relative z-10 space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-wide">
                <Activity className="w-3 h-3" />
                Active Sprint
              </div>

              <div>
                <h3 className="text-3xl font-display font-medium text-white mb-3">Q3 Outbound Engine</h3>
                <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                  Objective: Increase cold reply rate from 2% to 5%. <br/>
                  Current Status: Awaiting sequence approval in the Workspace.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <Link to="/workspace/wk-1">
                <Button className="bg-white hover:bg-white/95 text-black rounded-full px-8 h-12 font-medium transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_32px_rgba(255,255,255,0.20)]">
                  Enter Workspace <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Growth Score / Metrics - Narrow column */}
        <motion.div variants={itemVars} className="md:col-span-4 flex flex-col gap-6">
          <PremiumCard glowColor="rgba(0, 210, 255, 0.08)" className="p-8 flex-1 flex flex-col justify-center items-center text-center">
            <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-5">System Score</p>
            {/* Circular gauge */}
            <CircularGauge value={overallScore} max={25} />
            <p className="text-xs text-slate-500 mt-4">Trailing 30 days</p>

            {/* Sparkline */}
            <div className="w-full h-8 mt-5 flex items-end justify-between gap-1 opacity-40">
              {[4, 5, 3, 6, 7, 5, 8, 9].map((h, i) => (
                <div key={i} className="w-full bg-cyan-400/50 rounded-t-sm" style={{ height: `${h * 10}%` }} />
              ))}
            </div>
          </PremiumCard>
        </motion.div>

        {/* Action Items List */}
        <motion.div variants={itemVars} className="md:col-span-12">
          <PremiumCard glowColor="rgba(255, 255, 255, 0.05)" className="p-8">
            <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-6">Required Actions</h2>
            <div className="space-y-1">
              {[
                { id: 1, text: "Review generated copy for LinkedIn sequence", time: "2h ago", done: false },
                { id: 2, text: "Approve budget allocation for Q3 Ads", time: "5h ago", done: false },
                { id: 3, text: "Log weekly KPI check-in", time: "1d ago", done: true },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02] ${item.done ? 'opacity-40' : ''}`}
                >
                  <button className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${item.done ? 'bg-emerald-500/20 border-emerald-500/50' : 'border-slate-600 hover:border-violet-400'}`}>
                    {item.done && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </button>
                  <span className={`text-sm flex-1 ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                  <span className="text-xs text-slate-600 font-mono hidden sm:block">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HomeDashboard;
