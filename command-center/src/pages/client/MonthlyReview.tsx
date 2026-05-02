import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVIEWS } from "@/lib/mockData";
import { TrendingUp, TrendingDown, ArrowRight, MessageSquare } from "lucide-react";

export default function MonthlyReview() {
  const r = REVIEWS.monthly;
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Monthly Review</h1>
        <Badge variant="outline" className="mt-2">{r.month}</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Month Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(r.metricsReview).map(([key, val]) => (
          <Card key={key}>
            <CardContent className="p-4 text-center">
              <p className="text-xl font-bold text-foreground">{val}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-status-success" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>What Improved</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.improved.map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-success/5">
                <div className="h-1.5 w-1.5 rounded-full bg-status-success mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-status-warning" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>What Remains Weak</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.weak.map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-status-warning/5">
                <div className="h-1.5 w-1.5 rounded-full bg-status-warning mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Major Progress Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {r.progressAreas.map((p, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
              <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
              <p className="text-sm text-foreground">{p}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Decisions & Resets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.decisions.map((d, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                <div className="h-1.5 w-1.5 rounded-full bg-status-info mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{d}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Next Month Priorities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {r.nextMonthPriorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <p className="text-sm text-foreground">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gold" />
            <CardTitle className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>SG Media Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{r.recommendations}</p>
        </CardContent>
      </Card>
    </div>
  );
}
