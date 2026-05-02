import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MILESTONES } from "@/lib/mockData";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";

const statusIcon = (s: string) =>
  s === "Completed" ? <CheckCircle2 className="h-5 w-5 text-status-success" /> :
  s === "In Progress" ? <Clock className="h-5 w-5 text-status-info" /> :
  <Circle className="h-5 w-5 text-muted-foreground/40" />;

const statusBadge = (s: string) =>
  s === "Completed" ? "bg-status-success/10 text-status-success border-0" :
  s === "In Progress" ? "bg-status-info/10 text-status-info border-0" :
  "bg-muted text-muted-foreground border-0";

export default function Timeline() {
  const phases = Array.from(new Set(MILESTONES.map(m => m.phase)));

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Timeline & Milestones</h1>
        <p className="text-muted-foreground mt-1">Visual progress through your strategic engagement journey.</p>
      </div>

      {/* Phase summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {phases.map(phase => {
          const items = MILESTONES.filter(m => m.phase === phase);
          const completed = items.filter(m => m.status === "Completed").length;
          return (
            <Card key={phase}>
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{phase}</p>
                <p className="text-lg font-bold text-foreground mt-1">{completed}/{items.length}</p>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-status-success transition-all" style={{ width: `${(completed / items.length) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
        <div className="space-y-1">
          {MILESTONES.map((m, i) => (
            <div key={m.id} className="relative flex items-start gap-4 pl-0">
              <div className="relative z-10 bg-background p-0.5 shrink-0">
                {statusIcon(m.status)}
              </div>
              <Card className="flex-1 mb-3">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{m.date}</span>
                        <span className="text-xs text-muted-foreground">· {m.phase}</span>
                      </div>
                    </div>
                    <Badge className={statusBadge(m.status) + " text-[10px]"}>{m.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
