import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreIndicator } from "@/components/ui/score-indicator";
import { StatCard } from "@/components/ui/stat-card";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  FileText, 
  Target, 
  AlertCircle,
  ArrowRight,
  BarChart3,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "Sarah Thompson",
    company: "Growth Solutions LLC",
    overallScore: 62,
    lastAssessment: "2026-03-08",
    assessmentCount: 3
  };

  const pillarScores = [
    { name: "Market & Offer", score: 72, icon: Target },
    { name: "Acquisition", score: 58, icon: TrendingUp },
    { name: "Conversion", score: 65, icon: BarChart3 },
    { name: "Profit", score: 54, icon: DollarSign },
    { name: "Control", score: 61, icon: FileText }
  ];

  const recommendations = [
    {
      priority: "High",
      title: "Fix Customer Acquisition Systems",
      description: "Your acquisition score of 58 indicates unpredictable lead generation. This is limiting growth.",
      action: "Take Acquisition Diagnostic",
      link: "/solutions"
    },
    {
      priority: "Medium",
      title: "Strengthen Profit Systems",
      description: "Unit economics and retention need attention to improve profitability.",
      action: "Take Profit Diagnostic",
      link: "/solutions"
    }
  ];

  return (
    <AppLayout>
      <div className="bg-muted/30 min-h-screen">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
                <p className="text-muted-foreground">{userData.company}</p>
              </div>
              <Link to="/diagnostics">
                <Button>New Assessment</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 text-center shadow-card">
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <ScoreIndicator score={userData.overallScore} size="sm" showLabel={false} />
              </Card>
              <StatCard
                title="Assessments Taken"
                value={userData.assessmentCount}
                icon={FileText}
                variant="primary"
              />
              <StatCard
                title="Primary Bottleneck"
                value="Acquisition"
                icon={AlertCircle}
                variant="warning"
              />
              <StatCard
                title="Last Assessment"
                value={new Date(userData.lastAssessment).toLocaleDateString()}
                icon={TrendingUp}
              />
            </div>

            {/* Pillar Scores */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Five Pillar Scores</h2>
              <div className="grid md:grid-cols-5 gap-4">
                {pillarScores.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <Card key={pillar.name} className="p-6 text-center shadow-card hover:shadow-lg transition-shadow">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ScoreIndicator score={pillar.score} size="sm" showLabel={false} />
                      <h3 className="font-semibold text-sm mt-3">{pillar.name}</h3>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Recommendations</h2>
                <Link to="/recommendations">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <Card key={i} className="p-6 shadow-card">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            rec.priority === "High" 
                              ? "bg-destructive text-destructive-foreground" 
                              : "bg-warning text-warning-foreground"
                          }`}>
                            {rec.priority} Priority
                          </span>
                          <h3 className="text-xl font-bold">{rec.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{rec.description}</p>
                      </div>
                      <Link to={rec.link}>
                        <Button>
                          {rec.action}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Reports</h2>
                <Link to="/reports">
                  <Button variant="outline" size="sm">
                    View All Reports
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Business Bottleneck Scanner", date: "2026-03-08", score: 62 },
                  { title: "Market & Offer Scorecard", date: "2026-03-05", score: 72 }
                ].map((report, i) => (
                  <Card key={i} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <ScoreIndicator score={report.score} size="sm" showLabel={false} />
                    </div>
                    <Link to={`/reports/${i + 1}`}>
                      <Button variant="outline" className="w-full">
                        View Report
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-primary text-white p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold mb-3">Ready to Fix Your Bottlenecks?</h2>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Book a strategy call to create your customized growth roadmap
              </p>
              <Link to="/book-call">
                <Button size="lg" variant="secondary">
                  Book Strategy Call
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
