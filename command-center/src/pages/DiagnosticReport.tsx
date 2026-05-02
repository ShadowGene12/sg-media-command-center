import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreIndicator } from "@/components/ui/score-indicator";
import { StatCard } from "@/components/ui/stat-card";
import { useParams, useLocation, Link } from "react-router-dom";
import { 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Share2
} from "lucide-react";

const DiagnosticReport = () => {
  const { diagnosticId } = useParams();
  const location = useLocation();
  const responses = location.state?.responses || {};

  // Calculate mock scores from responses
  const calculateScore = (responses: Record<string, number>) => {
    const values = Object.values(responses);
    if (values.length === 0) return 0;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round((avg / 5) * 100);
  };

  const overallScore = calculateScore(responses);

  // Mock pillar scores
  const pillarScores = [
    { name: "Market & Offer Clarity", score: 72, trend: { value: 5, isPositive: true } },
    { name: "Customer Acquisition", score: 58, trend: { value: 3, isPositive: false } },
    { name: "Sales & Conversion", score: 65, trend: { value: 8, isPositive: true } },
    { name: "Profit Optimization", score: 54, trend: { value: 2, isPositive: false } },
    { name: "Financial Control", score: 61, trend: { value: 0, isPositive: true } }
  ];

  const bottlenecks = [
    {
      pillar: "Customer Acquisition",
      score: 58,
      issue: "Lead generation is unpredictable and inconsistent",
      impact: "Prevents reliable revenue forecasting and growth planning",
      priority: "Primary Bottleneck"
    },
    {
      pillar: "Profit Optimization",
      score: 54,
      issue: "Unit economics and retention systems need strengthening",
      impact: "Limits scalability and sustainable profitability",
      priority: "Secondary Bottleneck"
    }
  ];

  const recommendations = [
    {
      title: "Customer Acquisition Diagnostic",
      description: "Deep-dive analysis to build predictable lead generation systems",
      type: "Paid Diagnostic",
      cta: "Learn More"
    },
    {
      title: "Growth Infrastructure Program",
      description: "Comprehensive implementation for acquisition and profit systems",
      type: "Solution",
      cta: "Explore Program"
    },
    {
      title: "Strategy Call",
      description: "45-minute session to map your growth roadmap",
      type: "Consultation",
      cta: "Book Call"
    }
  ];

  return (
    <AppLayout>
      <div className="bg-muted/30 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Diagnostic Report</h1>
                <p className="text-muted-foreground">Business Bottleneck Scanner Results</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="max-w-5xl mx-auto mb-8">
            <Card className="p-8 md:p-12 text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Overall Business Health Score</h2>
              <ScoreIndicator score={overallScore} size="lg" />
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                Your business shows {overallScore >= 70 ? "strong" : "moderate"} performance overall, 
                with specific opportunities for improvement in customer acquisition and profit systems.
              </p>
            </Card>
          </div>

          {/* Pillar Scores */}
          <div className="max-w-5xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-6">Pillar-by-Pillar Breakdown</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {pillarScores.map((pillar) => (
                <Card key={pillar.name} className="p-6 text-center shadow-card hover:shadow-lg transition-shadow">
                  <ScoreIndicator score={pillar.score} size="sm" showLabel={false} />
                  <h3 className="font-semibold text-sm mt-4">{pillar.name}</h3>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottlenecks */}
          <div className="max-w-5xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-6">Identified Bottlenecks</h2>
            <div className="space-y-4">
              {bottlenecks.map((bottleneck, i) => (
                <Card key={i} className="p-6 shadow-card border-l-4 border-l-destructive">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-destructive-light">
                      <TrendingDown className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-destructive text-destructive-foreground mb-2">
                            {bottleneck.priority}
                          </span>
                          <h3 className="text-xl font-bold">{bottleneck.pillar}</h3>
                        </div>
                        <ScoreIndicator score={bottleneck.score} size="sm" showLabel={false} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Issue:</p>
                            <p className="text-muted-foreground">{bottleneck.issue}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingDown className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Impact:</p>
                            <p className="text-muted-foreground">{bottleneck.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="max-w-5xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec, i) => (
                <Card key={i} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary mb-3">
                        {rec.type}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <Link to="/solutions">
                      <Button className="w-full">
                        {rec.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-primary text-white p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Fix Your Bottlenecks?
              </h2>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Book a strategy call to create your customized growth roadmap
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-call">
                  <Button size="lg" variant="secondary">
                    Book Strategy Call
                  </Button>
                </Link>
                <Link to="/solutions">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Solutions
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DiagnosticReport;
