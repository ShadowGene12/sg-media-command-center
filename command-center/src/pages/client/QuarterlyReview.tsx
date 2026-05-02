import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVIEWS, PILLARS } from "@/lib/mockData";
import { ArrowRight, MessageSquare, AlertTriangle, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function QuarterlyReview() {
  const r = REVIEWS.quarterly;
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quarterly Review</h1>
        <Badge variant="outline" className="mt-2">{r.quarter}</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Quarter Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
        </CardContent>
      </Card>

      {/* Pillar Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Progress by Pillar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {r.pillarProgress.map(pp => {
            const pillar = PILLARS.find(p => p.id === pp.pillar);
            return (
              <div key={pp.pillar}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${pp.pillar}))` }} />
                    <span className="text-sm font-medium text-foreground">{pillar?.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{pp.progress}%</span>
                </div>
                <Progress value={pp.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1.5">{pp.notes}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Key Business Lessons</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.lessons.map((l, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">{i + 1}</span>
                <p className="text-sm text-foreground">{l}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Strategic Decisions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.strategicDecisions.map((d, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-info/5">
                <div className="h-1.5 w-1.5 rounded-full bg-status-info mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{d}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-status-warning" />
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Unresolved Bottlenecks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {r.unresolvedBottlenecks.map((b, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-warning/5">
              <div className="h-1.5 w-1.5 rounded-full bg-status-warning mt-1.5 shrink-0" />
              <p className="text-sm text-foreground">{b}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Next Quarter Priorities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.nextQuarterPriorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <p className="text-sm text-foreground">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gold" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Long-Term Recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.longTermRecommendations}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
