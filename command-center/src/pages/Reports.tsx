import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreIndicator } from "@/components/ui/score-indicator";
import { Link } from "react-router-dom";
import { FileText, Calendar, TrendingUp, ArrowRight, Plus } from "lucide-react";

const mockReports = [
  {
    id: "1",
    diagnosticType: "Business Bottleneck Scanner",
    date: "2026-03-08",
    overallScore: 62,
    primaryBottleneck: "Customer Acquisition",
    status: "Completed"
  },
  {
    id: "2",
    diagnosticType: "Market & Offer Clarity Scorecard",
    date: "2026-03-05",
    overallScore: 72,
    primaryBottleneck: "Messaging Alignment",
    status: "Completed"
  }
];

const Reports = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Reports</h1>
              <p className="text-muted-foreground">
                View and track your diagnostic results over time
              </p>
            </div>
            <Link to="/diagnostics">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </Link>
          </div>

          {/* Recent Reports */}
          {mockReports.length > 0 ? (
            <div className="space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{report.diagnosticType}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(report.date).toLocaleDateString()}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-success-light text-success text-xs font-medium">
                              {report.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                          <p className="text-2xl font-bold">{report.overallScore}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Primary Bottleneck</p>
                          <p className="font-semibold">{report.primaryBottleneck}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <ScoreIndicator score={report.overallScore} size="sm" showLabel={false} />
                      <Link to={`/reports/${report.id}`}>
                        <Button variant="outline">
                          View Report
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center shadow-card">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground mb-6">
                Take your first diagnostic to start tracking your business health
              </p>
              <Link to="/diagnostics">
                <Button>
                  Start First Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
