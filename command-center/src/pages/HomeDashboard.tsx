import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Target, ArrowRight, TrendingUp, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/useOnboarding";
import { toast } from "sonner";
import Tilt from "react-parallax-tilt";

const HomeDashboard = () => {
  useOnboarding('diy');
  const { overallScore, pillars, diyActions, toggleDiyAction } = useCommandStore();
  const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Status bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">{timeOfDay}, Shadow</h1>
          <p className="text-muted-foreground mt-1">Here's your execution focus for today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Day 14 in Command Center</span>
        </div>
      </div>

      {/* The "One Thing" Focus */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Target className="w-48 h-48 text-indigo-500" />
        </div>
        <div className="relative z-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Current Focus
          </h2>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-2">Q3 Outbound Engine Sprint</h3>
          <p className="text-slate-400 text-lg max-w-2xl mb-8">
            You are currently working to increase your reply rate from 2% to 5%. Your sequence draft is pending in the Workspace.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/workspace/wk-1">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] active:scale-95 transition-all duration-200 h-12 px-8">
                Open Workspace Canvas <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Start & Next Steps */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Onboarding / Quick Start Checklist */}
        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Quick Start Checklist
          </h2>
          <div className="space-y-3">
            {[
              { id: 1, text: "Take the Baseline Diagnostic", done: true },
              { id: 2, text: "Read your first Growth Framework", done: true },
              { id: 3, text: "Start your first Execution Sprint", done: true },
              { id: 4, text: "Log your first weekly KPI check-in", done: false },
            ].map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-4 p-3 rounded-xl border border-white/5 transition-all ${item.done ? 'bg-white/5 opacity-60' : 'bg-slate-800/50 border-indigo-500/30'}`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400" />
                  )}
                </div>
                <span className={`text-sm ${item.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Score Summary */}
        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true} glareMaxOpacity={0.05} glarePosition="all" className="h-full">
          <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl bg-skeletal-grid relative overflow-hidden h-full flex flex-col justify-center">
            <h2 className="text-lg font-display font-semibold mb-1">Growth Score</h2>
            <p className="text-sm text-muted-foreground mb-6">Your overarching system health metric.</p>
            <div className="flex items-end gap-3 mb-6">
              <motion.span 
                key={overallScore}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 drop-shadow-[0_0_15px_rgba(109,74,230,0.8)]"
              >
                {overallScore.toFixed(1)}
              </motion.span>
              <span className="text-xl text-[#A8B2BD] font-mono mb-2"> / 25.0</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pillars.slice(0, 3).map((p) => (
                <div key={p.name} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center backdrop-blur-md">
                  <p className="text-[10px] text-[#A8B2BD] mb-1 truncate font-medium uppercase tracking-wider">{p.name}</p>
                  <p className="text-lg font-mono font-bold" style={{ color: p.color }}>{p.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      </div>

    </div>
  );
};

export default HomeDashboard;
