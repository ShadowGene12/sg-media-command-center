import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACTION_ITEMS, PILLARS } from "@/lib/mockData";
import { AlertTriangle, ArrowRight } from "lucide-react";

const statusStyle = (s: string) =>
  s === "In Progress" ? "bg-status-info/10 text-status-info border-0" :
  s === "Pending" ? "bg-status-warning/10 text-status-warning border-0" :
  s === "Completed" ? "bg-status-success/10 text-status-success border-0" :
  "bg-muted text-muted-foreground border-0";

const priorityStyle = (p: string) =>
  p === "High" ? "bg-status-danger/10 text-status-danger border-0" :
  p === "Medium" ? "bg-status-warning/10 text-status-warning border-0" :
  "bg-muted text-muted-foreground border-0";

const statuses = ["All", "In Progress", "Pending", "Not Started"];

export default function ActionPlan() {
  const blockers = ACTION_ITEMS.filter(a => a.blocker);
  const next30 = ACTION_ITEMS.filter(a => a.status !== "Completed").slice(0, 4);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Action Plan & Roadmap</h1>
        <p className="text-muted-foreground mt-1">Strategic implementation roadmap — initiatives, owners, and timelines.</p>
      </div>

      {/* Initiative overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["In Progress", "Pending", "Not Started", "Completed"].map(status => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{ACTION_ITEMS.filter(a => a.status === status).length}</p>
              <p className="text-xs text-muted-foreground mt-1">{status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed action board */}
      <Tabs defaultValue="All">
        <TabsList>
          {statuses.map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
        </TabsList>
        {statuses.map(status => (
          <TabsContent key={status} value={status} className="space-y-3 mt-4">
            {ACTION_ITEMS.filter(a => status === "All" || a.status === status).map(item => {
              const pillar = PILLARS.find(p => p.id === item.pillar);
              return (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-2.5 w-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: `hsl(var(--pillar-${item.pillar}))` }} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-xs text-muted-foreground">{pillar?.name}</span>
                            <span className="text-xs text-muted-foreground">· {item.owner}</span>
                            <span className="text-xs text-muted-foreground">· Due {item.dueDate}</span>
                          </div>
                          {item.notes && <p className="text-xs text-muted-foreground mt-2">{item.notes}</p>}
                          {item.blocker && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-status-danger">
                              <AlertTriangle className="h-3 w-3" />
                              {item.blocker}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge className={priorityStyle(item.priority) + " text-[10px]"}>{item.priority}</Badge>
                        <Badge className={statusStyle(item.status) + " text-[10px]"}>{item.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blockers */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-status-danger" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Blockers & Risks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {blockers.length > 0 ? blockers.map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-status-danger/5 border border-status-danger/10">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-status-danger mt-1">{item.blocker}</p>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground">No active blockers.</p>
            )}
          </CardContent>
        </Card>

        {/* Next 30 Days */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Next 30-Day Focus</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {next30.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--pillar-${item.pillar}))` }} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
