import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  TrendingUp,
  Shield,
  CheckCircle2
} from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Strategic Business Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Diagnose Your Business Bottlenecks
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get data-driven insights across the five pillars of growth. 
            Identify what's holding you back and unlock your next stage of revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/diagnostics">
              <Button size="lg" className="text-lg px-8">
                Start Free Diagnostic
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Five Pillars Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Five Pillars of Growth
            </h2>
            <p className="text-lg text-muted-foreground">
              Our diagnostic framework analyzes every critical area of your business
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { 
                title: "Market & Offer", 
                icon: Target,
                description: "Clarity on who you serve and what you sell"
              },
              { 
                title: "Customer Acquisition", 
                icon: TrendingUp,
                description: "Systems to attract and capture leads"
              },
              { 
                title: "Sales & Conversion", 
                icon: BarChart3,
                description: "Processes to close deals consistently"
              },
              { 
                title: "Profit Optimization", 
                icon: TrendingUp,
                description: "Economics that drive sustainable growth"
              },
              { 
                title: "Financial Control", 
                icon: Shield,
                description: "Metrics and accountability systems"
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get actionable insights in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              title: "Take a Diagnostic",
              description: "Answer strategic questions about your business across the five pillars"
            },
            {
              step: "2",
              title: "Get Your Report",
              description: "Receive a detailed scorecard showing your strengths and bottlenecks"
            },
            {
              step: "3",
              title: "Take Action",
              description: "Access tailored recommendations and connect with solutions that fit your stage"
            }
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Why Use SG Media Diagnostics?
                </h2>
                <div className="space-y-4">
                  {[
                    "Identify hidden bottlenecks costing you revenue",
                    "Get objective scores across all growth pillars",
                    "Receive prioritized recommendations based on your stage",
                    "Track progress over time with saved reports",
                    "Connect directly to solutions that match your needs"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                      <p className="text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">Free</div>
                    <p className="text-muted-foreground">Core diagnostic access</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span>Business Bottleneck Scanner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span>Five Pillar Scorecards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span>Detailed Reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span>Saved Results Dashboard</span>
                    </li>
                  </ul>
                  <Link to="/diagnostics" className="block">
                    <Button className="w-full" size="lg">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-primary text-white p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Uncover Your Bottlenecks?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of business owners getting clarity on what's actually holding them back
          </p>
          <Link to="/diagnostics">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Free Diagnostic
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </section>
    </AppLayout>
  );
};

export default Index;
