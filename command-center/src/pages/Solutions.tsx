import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Shield,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const solutions = [
  {
    id: "offer-diagnostic",
    title: "Offer Positioning Diagnostic",
    description: "Comprehensive analysis of your market positioning, ideal customer definition, and offer structure",
    pillar: "Market & Offer Clarity",
    icon: Target,
    deliverables: [
      "Ideal customer profile analysis",
      "Competitive positioning map",
      "Offer structure recommendations",
      "Messaging framework"
    ],
    investment: "$2,500",
    duration: "2 weeks"
  },
  {
    id: "acquisition-diagnostic",
    title: "Acquisition System Diagnostic",
    description: "Deep-dive into your traffic, lead generation, and prospect capture infrastructure",
    pillar: "Customer Acquisition",
    icon: TrendingUp,
    deliverables: [
      "Channel effectiveness audit",
      "Lead magnet optimization",
      "Funnel conversion analysis",
      "Attribution system design"
    ],
    investment: "$2,500",
    duration: "2 weeks"
  },
  {
    id: "conversion-diagnostic",
    title: "Sales & Conversion Diagnostic",
    description: "Detailed review of your sales process, closing protocols, and deal recovery systems",
    pillar: "Sales & Conversion",
    icon: BarChart3,
    deliverables: [
      "Sales process audit",
      "Objection handling framework",
      "Closing protocol design",
      "CRM optimization"
    ],
    investment: "$2,500",
    duration: "2 weeks"
  },
  {
    id: "profit-diagnostic",
    title: "Profit Leak Diagnostic",
    description: "Comprehensive analysis of unit economics, retention, and operational efficiency",
    pillar: "Profit Optimization",
    icon: DollarSign,
    deliverables: [
      "Unit economics breakdown",
      "Retention system audit",
      "Cost structure analysis",
      "Revenue expansion opportunities"
    ],
    investment: "$2,500",
    duration: "2 weeks"
  },
  {
    id: "control-diagnostic",
    title: "Control System Diagnostic",
    description: "KPI architecture, forecasting systems, and accountability framework assessment",
    pillar: "Financial Control",
    icon: Shield,
    deliverables: [
      "KPI dashboard design",
      "Forecasting model",
      "Budget framework",
      "Review cadence structure"
    ],
    investment: "$2,500",
    duration: "2 weeks"
  },
  {
    id: "growth-infrastructure",
    title: "Growth Infrastructure Program",
    description: "12-week implementation program to build complete growth systems across all five pillars",
    pillar: "Complete System",
    icon: TrendingUp,
    deliverables: [
      "All five diagnostic deep-dives",
      "Complete system implementation",
      "Team training & handoff",
      "Ongoing optimization support"
    ],
    investment: "$15,000",
    duration: "12 weeks"
  }
];

const Solutions = () => {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Solutions & Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Professional diagnostics and implementation programs to fix your growth bottlenecks
            </p>
          </div>
        </div>
      </section>

      {/* Paid Diagnostics */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Deep-Dive Diagnostics</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis with actionable implementation roadmaps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {solutions.slice(0, 5).map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.id} className="p-8 shadow-card hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary mb-3">
                      {solution.pillar}
                    </span>
                    <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      {solution.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Investment</p>
                      <p className="text-2xl font-bold">{solution.investment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{solution.duration}</p>
                    </div>
                    <Link to="/book-call">
                      <Button>
                        Inquire
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Growth Infrastructure Program */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          {solutions.slice(5).map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.id} className="max-w-5xl mx-auto overflow-hidden shadow-xl border-primary/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-12 space-y-6">
                    <div>
                      <div className="w-16 h-16 rounded-xl bg-gradient-premium flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="inline-block px-3 py-1 rounded text-sm font-medium bg-accent/10 text-accent mb-3">
                        Featured Program
                      </span>
                      <h3 className="text-3xl font-bold mb-3">{solution.title}</h3>
                      <p className="text-lg text-muted-foreground">{solution.description}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{solution.investment}</span>
                      <span className="text-muted-foreground">/ {solution.duration}</span>
                    </div>

                    <Link to="/book-call">
                      <Button size="lg" className="w-full">
                        Schedule Discovery Call
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-muted/50 p-12 flex flex-col justify-center">
                    <h4 className="font-semibold mb-4 text-lg">Program Includes:</h4>
                    <ul className="space-y-3">
                      {solution.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto bg-gradient-primary text-white p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Solution Fits?</h2>
          <p className="text-lg mb-8 opacity-90">
            Book a free strategy call to discuss your specific situation and get personalized recommendations
          </p>
          <Link to="/book-call">
            <Button size="lg" variant="secondary">
              Book Free Strategy Call
            </Button>
          </Link>
        </Card>
      </section>
    </AppLayout>
  );
};

export default Solutions;
