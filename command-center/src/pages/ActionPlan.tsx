import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, AlertCircle, Clock } from "lucide-react";
import { useCommandStore } from "@/lib/store";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; icon: typeof Circle; className: string }> = {
  not_started: { label: "Not started", icon: Circle, className: "text-muted-foreground" },
  in_progress: { label: "In progress", icon: Clock, className: "text-[#378ADD]" },
  blocked: { label: "Blocked", icon: AlertCircle, className: "text-[#EF4444]" },
  completed: { label: "Completed", icon: CheckCircle2, className: "text-[#10B981]" },
};

const ActionPlan = () => {
  const { diyActions, toggleDiyAction } = useCommandStore();

  const counts = {
    not_started: diyActions.filter(a => a.status === "not_started").length,
    in_progress: diyActions.filter(a => a.status === "in_progress").length,
    blocked: diyActions.filter(a => a.status === "blocked").length,
    completed: diyActions.filter(a => a.status === "completed").length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Action Plan</h1>
          <p className="text-muted-foreground mt-1">Track and execute your highest-leverage fixes.</p>
        </div>
        <Button>+ Add action</Button>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(counts).map(([status, count]) => {
          const config = statusConfig[status];
          return (
            <div key={status} className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 transition-all hover:bg-card/60">
              <div className="flex items-center gap-2 mb-2">
                <config.icon className={`h-4 w-4 ${config.className}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{config.label}</span>
              </div>
              <p className="text-2xl font-mono font-bold">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Action list */}
      <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="space-y-3">
          {diyActions.map((action) => {
            const config = statusConfig[action.status];
            const isDone = action.status === "completed";
            return (
              <div 
                key={action.id} 
                className={`flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:border-white/20 hover:bg-white/10 transition-all duration-300 ${isDone ? 'opacity-50' : ''}`}
                onClick={() => {
                  toggleDiyAction(action.id);
                  if (!isDone) {
                    toast.success("Action completed!", {
                      description: `Growth Score updated to ${useCommandStore.getState().overallScore.toFixed(1)}`,
                    });
                  }
                }}
              >
                <button className={`h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isDone ? 'bg-[#10B981] border-[#10B981]' : 'border-muted-foreground hover:border-primary'}`}>
                  {isDone && <CheckCircle2 className="h-4 w-4 text-white" />}
                </button>
                <span className={`flex-1 text-sm transition-all ${isDone ? 'line-through text-muted-foreground' : 'font-medium text-foreground'}`}>{action.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold hidden sm:inline-block" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  {action.pillar}
                </span>
                <span className="text-xs text-muted-foreground font-mono hidden md:inline-block">{action.due}</span>
                <config.icon className={`h-4 w-4 ${config.className} flex-shrink-0`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
