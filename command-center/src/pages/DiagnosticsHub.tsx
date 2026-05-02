import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Activity, BarChart3 } from "lucide-react";

const DIAGNOSTICS = [
  { name: "Master Bottleneck Scanner", desc: "Full 25-question diagnostic across all 5 pillars", time: "~15 min", accent: true, lastRun: "14 days ago" },
  { name: "Market & Offer Clarity", desc: "Deep-dive into target market and offer positioning", time: "~8 min", color: "#6D4AE6", lastRun: null },
  { name: "Customer Acquisition", desc: "Channel mix, CAC tracking, lead consistency", time: "~8 min", color: "#378ADD", lastRun: null },
  { name: "Sales & Conversion", desc: "Process maturity, conversion rate, follow-up cadence", time: "~8 min", color: "#1D9E75", lastRun: null },
  { name: "Profit Optimization", desc: "Margin analysis, pricing power, cost structure", time: "~8 min", color: "#F59E0B", lastRun: null },
  { name: "Financial & Performance Control", desc: "KPI tracking, cash flow visibility, review cadence", time: "~8 min", color: "#D85A30", lastRun: null },
];

const DiagnosticsHub = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Diagnostics</h1>
        <p className="text-muted-foreground mt-1">Run, compare, and track your growth diagnostics over time.</p>
      </div>

      {/* Current state panel */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Last diagnostic: 14 days ago</p>
            <p className="text-sm text-muted-foreground">Overall score: 14.2 / 25.0</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>Run new diagnostic</Button>
          <Button variant="outline">Compare with previous</Button>
        </div>
      </div>

      {/* Available diagnostics grid */}
      <div>
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Available Diagnostics</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIAGNOSTICS.map((diag) => (
            <div key={diag.name} className={`bg-card border rounded-xl p-5 hover:border-primary/40 transition-all ${diag.accent ? 'border-primary/30 shadow-[0_0_20px_-5px_rgba(109,74,230,0.2)]' : 'border-border'}`}>
              {diag.color && (
                <div className="h-1 w-8 rounded-full mb-4" style={{ backgroundColor: diag.color }} />
              )}
              {diag.accent && (
                <div className="h-1 w-8 rounded-full mb-4 bg-primary" />
              )}
              <h3 className="font-display font-semibold mb-1">{diag.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{diag.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{diag.time}</span>
                <Button size="sm" variant={diag.lastRun ? "outline" : "default"}>
                  {diag.lastRun ? `Retake` : "Start →"}
                </Button>
              </div>
              {diag.lastRun && (
                <p className="text-xs text-muted-foreground mt-2 font-mono">Last run: {diag.lastRun}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic history */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-display font-semibold mb-4">Diagnostic History</h2>
        <div className="space-y-3">
          {[
            { name: "Master Bottleneck Scanner", date: "April 8, 2026", score: "14.2 / 25.0" },
            { name: "Master Bottleneck Scanner", date: "March 8, 2026", score: "12.1 / 25.0" },
          ].map((entry, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/30 transition-colors">
              <div>
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{entry.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold">{entry.score}</span>
                <Button size="sm" variant="ghost">View report</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsHub;
