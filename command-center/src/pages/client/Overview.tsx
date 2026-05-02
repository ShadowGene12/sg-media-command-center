import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORGANIZATION, PILLARS, KPI_DATA, REPORTS, ACTION_ITEMS, MILESTONES, RECOMMENDATIONS as RECS } from "@/lib/mockData";
import { ArrowUpRight, ArrowRight, Target, TrendingUp, CalendarCheck, FileText, Map, Clock, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const statusColor = (s: string) =>
  s === "Completed" ? "bg-status-success/10 text-status-success" :
  s === "In Progress" ? "bg-status-info/10 text-status-info" :
  "bg-muted text-muted-foreground";

export default function Overview() {
  const activePriorities = ACTION_ITEMS.filter(a => a.status === "In Progress");
  const nextMilestone = MILESTONES.find(m => m.status === "In Progress" || m.status === "Upcoming");
  const topRecs = RECS.slice(0, 3);
  const topKpis = KPI_DATA.slice(0, 6);
  const latestReport = REPORTS.filter(r => r.status === "Completed").sort((a,b) => b.date.localeCompare(a.date))[0];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Organization Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{ORGANIZATION.name}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">{ORGANIZATION.engagementSummary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="text-xs">{ORGANIZATION.program}</Badge>
          <Badge variant="outline" className="text-xs">{ORGANIZATION.industry}</Badge>
          <Badge variant="outline" className="text-xs">{ORGANIZATION.currentPhase}</Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Health Score</p>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold text-foreground">{ORGANIZATION.healthScore}</span>
              <span className="text-xs text-status-success mb-1">/ 100</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-status-success" style={{ width: `${ORGANIZATION.healthScore}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Actions</p>
              <Map className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-foreground">{activePriorities.length}</span>
              <span className="text-xs text-muted-foreground ml-2">of {ACTION_ITEMS.length} total</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Reports</p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold text-foreground">{REPORTS.filter(r => r.status === "Completed").length}</span>
              <span className="text-xs text-muted-foreground ml-2">completed</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Next Milestone</p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-foreground truncate">{nextMilestone?.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{nextMilestone?.date}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Priorities */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Active Priorities</CardTitle>
                <Link to="/client/action-plan" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activePriorities.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: `hsl(var(--pillar-${item.pillar}))` }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{item.owner}</span>
                      <span className="text-xs text-muted-foreground">· Due {item.dueDate}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{item.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* KPI Snapshot */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>KPI Snapshot</CardTitle>
                <Link to="/client/kpis" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">Full dashboard <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {topKpis.map(kpi => (
                  <div key={kpi.label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{kpi.label}</p>
                    <p className="text-xl font-bold text-foreground mt-1">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-status-success" />
                      <span className="text-xs text-status-success">{kpi.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Pillar Focus */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Pillar Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {PILLARS.filter(p => ORGANIZATION.pillarFocus.includes(p.id)).map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                  <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--pillar-${p.id}))` }} />
                  <span className="text-sm text-foreground">{p.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Recommendations */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Top Recommendations</CardTitle>
                <Lightbulb className="h-4 w-4 text-gold" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topRecs.map(rec => (
                <div key={rec.id} className="p-3 rounded-lg border bg-card">
                  <p className="text-sm font-medium text-foreground leading-snug">{rec.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-[10px]">{rec.urgency}</Badge>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${rec.pillar}))` }} />
                  </div>
                </div>
              ))}
              <Link to="/client/recommendations" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 pt-1">
                All recommendations <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Latest Report */}
          {latestReport && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Latest Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-foreground">{latestReport.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{latestReport.date}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{latestReport.findings}</p>
                  <Link to="/client/reports" className="text-xs text-status-info hover:underline mt-2 inline-block">View reports →</Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {[
                { label: "Reports", to: "/reports", icon: FileText },
                { label: "Action Plan", to: "/action-plan", icon: Map },
                { label: "Documents", to: "/documents", icon: TrendingUp },
                { label: "Timeline", to: "/timeline", icon: CalendarCheck },
              ].map(link => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 hover:bg-accent text-sm text-foreground transition-colors">
                  <link.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {link.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
