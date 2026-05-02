import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REPORTS, PILLARS } from "@/lib/mockData";
import { FileText, ArrowRight } from "lucide-react";

const statusStyle = (s: string) =>
  s === "Completed" ? "bg-status-success/10 text-status-success border-0" :
  s === "In Review" ? "bg-status-warning/10 text-status-warning border-0" :
  "bg-muted text-muted-foreground border-0";

export default function Reports() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Assessments & Reports</h1>
        <p className="text-muted-foreground mt-1">Professional report library — diagnostics, audits, and strategic assessments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REPORTS.map(report => {
          const pillar = PILLARS.find(p => p.id === report.pillar);
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{report.title}</CardTitle>
                  </div>
                  <Badge className={statusStyle(report.status) + " text-[10px]"}>{report.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{report.findings}</p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${report.pillar}))` }} />
                    <span className="text-xs text-muted-foreground">{pillar?.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                </div>
                {report.recommendations > 0 && (
                  <div className="flex items-center gap-1 text-xs text-status-info">
                    <ArrowRight className="h-3 w-3" />
                    {report.recommendations} recommendations linked
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
