import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Search, 
  Target, 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Shield,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";

const diagnostics = [
  {
    id: "bottleneck-scanner",
    title: "Business Bottleneck Scanner",
    description: "Comprehensive assessment across all five pillars to identify your #1 growth constraint",
    icon: Search,
    duration: "15-20 min",
    featured: true,
    pillars: ["All Pillars"],
    benefits: [
      "Overall business health score",
      "Primary bottleneck identification",
      "Pillar-by-pillar breakdown",
      "Prioritized action plan"
    ]
  },
  {
    id: "market-offer-clarity",
    title: "Market & Offer Clarity Scorecard",
    description: "Assess how well you understand your market, define your ideal customer, and structure your offer",
    icon: Target,
    duration: "10-12 min",
    pillars: ["Pillar 1"],
    benefits: [
      "Market positioning score",
      "Offer structure clarity",
      "Messaging alignment check",
      "Differentiation analysis"
    ]
  },
  {
    id: "customer-acquisition",
    title: "Customer Acquisition Scorecard",
    description: "Evaluate your traffic, lead generation, and prospect capture systems",
    icon: TrendingUp,
    duration: "10-12 min",
    pillars: ["Pillar 2"],
    benefits: [
      "Channel effectiveness rating",
      "Lead magnet quality score",
      "Capture infrastructure audit",
      "Attribution system check"
    ]
  },
  {
    id: "sales-conversion",
    title: "Sales & Conversion Scorecard",
    description: "Analyze your sales process, closing protocols, and objection handling systems",
    icon: BarChart3,
    duration: "10-12 min",
    pillars: ["Pillar 3"],
    benefits: [
      "Sales process efficiency",
      "Conversion protocol audit",
      "Objection handling gaps",
      "Follow-up system review"
    ]
  },
  {
    id: "profit-optimization",
    title: "Profit Optimization Scorecard",
    description: "Review your unit economics, retention systems, and operational efficiency",
    icon: DollarSign,
    duration: "10-12 min",
    pillars: ["Pillar 4"],
    benefits: [
      "Unit economics health",
      "Revenue expansion opportunities",
      "Retention system audit",
      "Cost structure analysis"
    ]
  },
  {
    id: "financial-control",
    title: "Financial & Performance Control Scorecard",
    description: "Assess your KPIs, forecasting, budgeting, and accountability systems",
    icon: Shield,
    duration: "10-12 min",
    pillars: ["Pillar 5"],
    benefits: [
      "KPI architecture review",
      "Forecasting capability check",
      "Budget discipline score",
      "Accountability system audit"
    ]
  }
];

const Diagnostics = () => {
  const featuredDiagnostic = diagnostics.find(d => d.featured);
  const pillarDiagnostics = diagnostics.filter(d => !d.featured);

  return (
    <AppLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Business Diagnostics Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Identify exactly what's holding your business back with our strategic assessment tools
            </p>
          </div>
        </div>
      </section>

      {/* Featured Diagnostic */}
      {featuredDiagnostic && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Start Here
            </div>
          </div>
          <Card className="overflow-hidden shadow-lg border-primary/20">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <featuredDiagnostic.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3">{featuredDiagnostic.title}</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {featuredDiagnostic.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredDiagnostic.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>{featuredDiagnostic.pillars.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/diagnostics/${featuredDiagnostic.id}`}>
                  <Button size="lg" className="w-full md:w-auto">
                    Start Diagnostic
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-muted/50 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-semibold mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  {featuredDiagnostic.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Pillar Scorecards */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Pillar-Specific Scorecards</h2>
          <p className="text-muted-foreground">
            Deep-dive assessments for each critical area of your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillarDiagnostics.map((diagnostic) => {
            const Icon = diagnostic.icon;
            return (
              <Card key={diagnostic.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{diagnostic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {diagnostic.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{diagnostic.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {diagnostic.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to={`/diagnostics/${diagnostic.id}`}>
                    <Button variant="outline" className="w-full">
                      Take Assessment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Mini-Diagnostics & Calculators</h2>
          <p className="text-muted-foreground">
            Quick-check tools launching soon
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Pricing Clarity Check",
            "Messaging Gap Audit",
            "Lead Response Test",
            "Profit Leak Detector",
            "KPI Health Check",
            "Cash Flow Stress Test",
            "ROI Calculator",
            "Customer LTV Calculator"
          ].map((tool, i) => (
            <Card key={i} className="p-4 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{tool}</span>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Diagnostics;
