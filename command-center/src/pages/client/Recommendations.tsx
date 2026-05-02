import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RECOMMENDATIONS as RECS, PILLARS } from "@/lib/mockData";
import { Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

const priorityStyle = (p: string) =>
  p === "High" ? "bg-status-danger/10 text-status-danger border-0" :
  p === "Medium" ? "bg-status-warning/10 text-status-warning border-0" :
  "bg-muted text-muted-foreground border-0";

const urgencyStyle = (u: string) =>
  u === "Immediate" ? "bg-status-danger/10 text-status-danger border-0" :
  u === "This Month" ? "bg-status-warning/10 text-status-warning border-0" :
  "bg-muted text-muted-foreground border-0";

const statusStyle = (s: string) =>
  s === "In Progress" ? "bg-status-info/10 text-status-info border-0" :
  s === "Pending" ? "bg-status-warning/10 text-status-warning border-0" :
  "bg-muted text-muted-foreground border-0";

export default function Recommendations() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recommendations</h1>
        <p className="text-muted-foreground mt-1">Strategic recommendations — what to focus on now, what's next, and why.</p>
      </div>

      <div className="space-y-5">
        {RECS.map(rec => {
          const pillar = PILLARS.find(p => p.id === rec.pillar);
          return (
            <Card key={rec.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-base font-medium text-foreground leading-snug">{rec.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${rec.pillar}))` }} />
                        <span className="text-xs text-muted-foreground">{pillar?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={priorityStyle(rec.priority) + " text-[10px]"}>{rec.priority}</Badge>
                    <Badge className={urgencyStyle(rec.urgency) + " text-[10px]"}>{rec.urgency}</Badge>
                    <Badge className={statusStyle(rec.status) + " text-[10px]"}>{rec.status}</Badge>
                  </div>
                </div>

                <div className="ml-8 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Action Steps</p>
                    <div className="space-y-1.5">
                      {rec.actionSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <p className="text-sm text-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-gold/5 border border-gold/10">
                    <ArrowRight className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gold font-medium">Next Decision</p>
                      <p className="text-sm text-foreground mt-0.5">{rec.nextDecision}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
