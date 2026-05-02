import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVIEWS } from "@/lib/mockData";
import { CheckCircle2, AlertCircle, ArrowRight, MessageSquare } from "lucide-react";

export default function WeeklyReview() {
  const r = REVIEWS.weekly;
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Weekly Review</h1>
        <div className="flex items-center gap-3 mt-1">
          <Badge variant="outline">{r.week}</Badge>
          <span className="text-muted-foreground text-sm">{r.date}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(r.metrics).map(([key, val]) => (
          <Card key={key}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{val}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-status-success" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Wins</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.wins.map((w, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-success/5">
                <div className="h-1.5 w-1.5 rounded-full bg-status-success mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{w}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-status-warning" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-warning/5">
                <div className="h-1.5 w-1.5 rounded-full bg-status-warning mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{issue}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gold" />
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>SG Media Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{r.sgNotes}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Next Priorities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.nextPriorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <p className="text-sm text-foreground">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Accountability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.accountability.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm text-foreground">{a.item}</p>
                  <p className="text-xs text-muted-foreground">{a.owner}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{a.due}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Decisions Made</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {r.decisions.map((d, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
              <CheckCircle2 className="h-3.5 w-3.5 text-status-info shrink-0" />
              <p className="text-sm text-foreground">{d}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
