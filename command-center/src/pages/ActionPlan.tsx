import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Clock, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

type ActionStatus = "not_started" | "in_progress" | "completed" | "blocked";

const STATUS_CONFIG: Record<ActionStatus, { label: string; icon: React.ElementType; bg: string; border: string; text: string }> = {
  not_started: { label: "Not Started", icon: Circle,       bg: "bg-white/5",        border: "border-white/10",       text: "text-slate-500"  },
  in_progress: { label: "In Progress", icon: Clock,        bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-400" },
  blocked:     { label: "Blocked",     icon: AlertCircle,  bg: "bg-red-500/10",     border: "border-red-500/20",     text: "text-red-400"    },
  completed:   { label: "Completed",   icon: CheckCircle2, bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400"},
};

const rowVars = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20, delay: i * 0.05 } }),
};

const ActionPlan = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Load from Supabase
  const { data: actions = [], isLoading } = useQuery({
    queryKey: ["action-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("action_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
    staleTime: 15_000,
  });

  // Toggle status
  const toggle = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ActionStatus }) => {
      const next: ActionStatus = status === "completed" ? "not_started" : "completed";
      const { error } = await supabase.from("action_items").update({ status: next }).eq("id", id);
      if (error) throw error;
      return next;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["action-items", user?.id] });
      toast.success("Action updated");
    },
    onError: () => toast.error("Failed to update action"),
  });

  // Add new action
  const addAction = useMutation({
    mutationFn: async (title: string) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("action_items").insert({
        user_id: user.id,
        title,
        status: "not_started",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["action-items", user?.id] });
      setNewTitle("");
      setAdding(false);
      toast.success("Action added");
    },
    onError: () => toast.error("Failed to add action"),
  });

  const counts = {
    not_started: actions.filter((a: any) => a.status === "not_started").length,
    in_progress: actions.filter((a: any) => a.status === "in_progress").length,
    blocked:     actions.filter((a: any) => a.status === "blocked").length,
    completed:   actions.filter((a: any) => a.status === "completed").length,
  };

  const completedPct = actions.length > 0 ? Math.round((counts.completed / actions.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Execution"
          title="Action Plan"
          description="Track and execute your highest-leverage fixes across all five pillars."
        />
        <button
          onClick={() => setAdding(true)}
          className="flex-shrink-0 self-start md:self-end flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Plus className="h-4 w-4" /> Add action
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.entries(STATUS_CONFIG) as [ActionStatus, typeof STATUS_CONFIG[ActionStatus]][]).map(([status, cfg]) => {
          const Icon = cfg.icon;
          return (
            <motion.div key={status} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <PremiumCard glowColor="rgba(255,255,255,0.04)" className={`p-5 border ${cfg.border} ${cfg.bg}`}>
                <Icon className={`h-5 w-5 mb-3 ${cfg.text}`} />
                <p className="text-2xl font-display font-light text-white">{counts[status]}</p>
                <p className={`text-xs font-mono mt-1 ${cfg.text}`}>{cfg.label}</p>
              </PremiumCard>
            </motion.div>
          );
        })}
      </div>

      {/* Progress banner */}
      {actions.length > 0 && (
        <PremiumCard glowColor="rgba(109,74,230,0.08)" className="px-6 py-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
              <span>{counts.completed} of {actions.length} actions complete</span>
              <span>{completedPct}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6D4AE6, #00D2FF)" }}
                initial={{ width: 0 }}
                animate={{ width: `${completedPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Add action form */}
      {adding && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <PremiumCard className="p-4 flex gap-3">
            <input
              autoFocus
              placeholder="Describe the action to take..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && newTitle.trim()) addAction.mutate(newTitle.trim()); if (e.key === "Escape") setAdding(false); }}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
            />
            <button
              onClick={() => newTitle.trim() && addAction.mutate(newTitle.trim())}
              disabled={addAction.isPending || !newTitle.trim()}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono disabled:opacity-50 transition-colors"
            >
              {addAction.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Add"}
            </button>
            <button onClick={() => setAdding(false)} className="px-3 py-2 rounded-xl text-slate-500 hover:text-white text-xs font-mono">Cancel</button>
          </PremiumCard>
        </motion.div>
      )}

      {/* Action list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
        </div>
      ) : actions.length === 0 ? (
        <PremiumCard className="p-12 text-center">
          <Circle className="w-8 h-8 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-light">No actions yet.</p>
          <p className="text-slate-600 text-xs font-mono mt-1">Take the Bottleneck Detector to auto-generate your action plan, or add actions manually.</p>
        </PremiumCard>
      ) : (
        <div>
          <SectionLabel className="mb-5">All Actions — {actions.length} items</SectionLabel>
          <PremiumCard glowColor="rgba(255,255,255,0.04)" className="divide-y divide-white/[0.03]">
            {actions.map((item: any, i: number) => {
              const cfg = STATUS_CONFIG[item.status as ActionStatus] ?? STATUS_CONFIG.not_started;
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={rowVars}
                  initial="hidden"
                  animate="show"
                  onClick={() => toggle.mutate({ id: item.id, status: item.status })}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer group ${item.status === "completed" ? "opacity-50" : ""}`}
                >
                  <button className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${item.status === "completed" ? "bg-emerald-500/20 border-emerald-500/40" : "border-slate-700 group-hover:border-violet-400/50"}`}>
                    {item.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-light leading-snug ${item.status === "completed" ? "line-through text-slate-500" : "text-slate-200"}`}>
                      {item.title}
                    </p>
                    {item.pillar && (
                      <div className="flex items-center gap-1.5 mt-1">
                        {item.pillar_color && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.pillar_color }} />}
                        <span className="text-[10px] font-mono text-slate-600">{item.pillar}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {item.due_date && (
                      <span className="text-[10px] font-mono text-slate-600 hidden sm:block">{item.due_date}</span>
                    )}
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </PremiumCard>
        </div>
      )}
    </div>
  );
};

export default ActionPlan;
