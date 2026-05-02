import { Button } from "@/components/ui/button";
import { Calendar, FileText, TrendingUp, TrendingDown } from "lucide-react";

const ReviewsHub = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Reviews</h1>
          <p className="text-muted-foreground mt-1">Monthly self-reviews to track progress and re-prioritize.</p>
        </div>
        <Button>Start monthly review</Button>
      </div>

      {/* Next review prompt */}
      <div className="bg-[#221359] border border-[#6D4AE6]/30 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-white">Time for your monthly self-review</p>
            <p className="text-sm text-[#A8B2BD]">Next re-diagnostic due in 8 days · April 30, 2026</p>
          </div>
        </div>
        <Button variant="secondary">Start review →</Button>
      </div>

      {/* Past reviews */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-display font-semibold mb-4">Review History</h2>
        <div className="space-y-4">
          {[
            { month: "March 2026", score: 12.1, delta: null, focus: "Customer Acquisition", reflections: ["Started consistent content publishing", "CAC dropped by 15%", "Need to improve follow-up cadence"] },
            { month: "February 2026", score: 10.5, delta: null, focus: "Market & Offer Clarity", reflections: ["Clarified ICP definition", "Repositioned core offer", "Pricing still needs work"] },
          ].map((review, i) => (
            <div key={i} className="border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold">{review.month}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold">{review.score.toFixed(1)} / 25.0</span>
                  <Button size="sm" variant="ghost">View full review</Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Focus pillar: {review.focus}</p>
              <ul className="text-sm space-y-1">
                {review.reflections.map((r, j) => (
                  <li key={j} className="text-muted-foreground">• {r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsHub;
