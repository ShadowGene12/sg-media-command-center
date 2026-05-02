import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_DATA, PILLARS } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

export default function KPIs() {
  const grouped = PILLARS.map(p => ({
    ...p,
    kpis: KPI_DATA.filter(k => k.pillar === p.id),
  })).filter(g => g.kpis.length > 0);

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">KPI Dashboard</h1>
        <p className="text-muted-foreground mt-1">Key performance indicators tracked across all five growth pillars.</p>
      </div>

      {/* Top summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_DATA.slice(0, 5).map(kpi => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-status-success" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-status-danger" />
                )}
                <span className={`text-xs ${kpi.trend === "up" ? "text-status-success" : "text-status-danger"}`}>{kpi.change}</span>
                <span className="text-[10px] text-muted-foreground ml-1">{kpi.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pillar-linked KPI sections */}
      {grouped.map(group => (
        <Card key={group.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${group.id}))` }} />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{group.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.kpis.map(kpi => (
                <div key={kpi.label} className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                    <div className="flex items-center gap-1">
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-status-success" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-status-danger" />
                      )}
                      <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-status-success" : "text-status-danger"}`}>{kpi.change}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{kpi.period}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Interpretation */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>SG Media Interpretation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Overall performance trajectory is positive. Acquisition metrics are strengthening with lead volume up 12% and qualified rate improving. The primary area needing attention is close rate — currently at 22% against a 25% target. CAC reduction is on track. Recommend continued focus on sales enablement and follow-up optimization to bridge the conversion gap. Financial indicators are stable with positive cash flow momentum.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
