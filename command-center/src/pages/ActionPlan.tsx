import { motion } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Clock, Plus } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { toast } from "sonner";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const STATUS_CONFIG = {
  not_started: { label: "Not Started", icon: Circle,       color: "#515B68", bg: "bg-white/5",        border: "border-white/10",        text: "text-slate-500"  },
  in_progress: { label: "In Progress", icon: Clock,        color: "#378ADD", bg: "bg-sky-500/10",     border: "border-sky-500/20",      text: "text-sky-400"    },
  blocked:     { label: "Blocked",     icon: AlertCircle,  color: "#EF4444", bg: "bg-red-500/10",     border: "border-red-500/20",      text: "text-red-400"    },
  completed:   { label: "Completed",   icon: CheckCircle2, color: "#10B981", bg: "bg-emerald-500/10", border: "border-emerald-500/20",  text: "text-emerald-400"},
};

const rowVars = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 20, delay: i * 0.05 } }),
};

const ActionPlan = () => {
  const { diyActions, toggleDiyAction, overallScore } = useCommandStore();

  const counts = {
    not_started: diyActions.filter(a => a.status === "not_started").length,
    in_progress: diyActions.filter(a => a.status === "in_progress").length,
    blocked:     diyActions.filter(a => a.status === "blocked").length,
    completed:   diyActions.filter(a => a.status === "completed").length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="DIY Tier"
          title="Action Plan"
          description="Track and execute your highest-leverage fixes across all five pillars."
        />
        <button className="flex-shrink-0 self-start md:self-end flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]">
          <Plus className="h-4 w-4" /> Add action
        </button>
      </div>

      {/* Status summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {(Object.entries(counts) as [keyof typeof STATUS_CONFIG, number][]).map(([status, count]) => {
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className={`rounded-xl border bg-black/40 backdrop-blur-md p-4 transition-all duration-200 ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-3.5 w-3.5 ${cfg.text}`} />
                <span className={`text-[10px] font-mono uppercase tracking-widest ${cfg.text}`}>{cfg.label}</span>
              </div>
              <p className={`text-2xl font-display font-light ${cfg.text}`}>{count}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Score banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 100, damping: 18 }}
        className="rounded-2xl border border-violet-500/15 bg-violet-500/5 backdrop-blur-md px-6 py-4 flex items-center justify-between"
      >
        <div>
          <p className="text-[10px] font-mono text-violet-400/70 uppercase tracking-widest">Current Growth Score</p>
          <p className="text-3xl font-display font-light text-white mt-1">{overallScore.toFixed(1)} <span className="text-sm font-mono text-slate-600">/ 25.0</span></p>
        </div>
        <p className="text-xs text-slate-500 text-right max-w-[200px] leading-relaxed">Complete actions to increase your score and unlock insights.</p>
      </motion.div>

      {/* Action list */}
      <div>
        <SectionLabel className="mb-4">{diyActions.length} Actions</SectionLabel>
        <PremiumCard glowColor="rgba(255,255,255,0.05)">
          {diyActions.map((action, i) => {
            const cfg = STATUS_CONFIG[action.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.not_started;
            const Icon = cfg.icon;
            const isDone = action.status === "completed";
            return (
              <motion.div
                key={action.id}
                custom={i}
                variants={rowVars}
                initial="hidden"
                animate="show"
                onClick={() => {
                  toggleDiyAction(action.id);
                  if (!isDone) toast.success("Action completed!", { description: `Score updated to ${useCommandStore.getState().overallScore.toFixed(1)}` });
                }}
                className={`flex items-center gap-4 px-5 py-4 border-b border-white/[0.03] last:border-0 cursor-pointer hover:bg-white/[0.02] transition-colors ${isDone ? "opacity-40" : ""}`}
              >
                {/* Checkbox */}
                <button className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isDone ? "bg-emerald-500/20 border-emerald-500/50" : "border-slate-600 hover:border-violet-400"}`}>
                  {isDone && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                </button>

                {/* Title */}
                <span className={`flex-1 text-sm transition-all ${isDone ? "line-through text-slate-600" : "text-slate-200"}`}>
                  {action.title}
                </span>

                {/* Pillar badge */}
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block"
                  style={{ backgroundColor: `${action.color}18`, color: action.color, border: `1px solid ${action.color}30` }}>
                  {action.pillar}
                </span>

                {/* Due date */}
                <span className="text-[10px] font-mono text-slate-600 hidden md:inline-block">{action.due}</span>

                {/* Status icon */}
                <Icon className={`h-4 w-4 ${cfg.text} flex-shrink-0`} />
              </motion.div>
            );
          })}
        </PremiumCard>
      </div>
    </div>
  );
};

export default ActionPlan;
