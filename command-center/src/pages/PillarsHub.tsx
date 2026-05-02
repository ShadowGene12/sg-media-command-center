import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const PILLARS = [
  { name: "Market & Offer Clarity", slug: "market-offer", color: "#6D4AE6", score: 2.1, trend: "+0.3", modules: 8, completed: 2 },
  { name: "Customer Acquisition", slug: "acquisition", color: "#378ADD", score: 3.4, trend: "+0.5", modules: 7, completed: 1 },
  { name: "Sales & Conversion", slug: "sales", color: "#1D9E75", score: 1.8, trend: "-0.2", modules: 6, completed: 0 },
  { name: "Profit Optimization", slug: "profit", color: "#F59E0B", score: 3.9, trend: "+0.8", modules: 5, completed: 3 },
  { name: "Financial & Performance Control", slug: "finance", color: "#D85A30", score: 2.6, trend: "+0.1", modules: 6, completed: 1 },
];

const radarData = PILLARS.map(p => ({ subject: p.name.split(" ")[0], score: p.score, fullMark: 5 }));

const PillarsHub = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Pillars</h1>
        <p className="text-muted-foreground mt-1">Your personal pillar map and learning progress.</p>
      </div>

      {/* Radar chart + pillar cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke="#333A44" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#A8B2BD", fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="score" stroke="#6D4AE6" fill="#6D4AE6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.slug} className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                  <span className="font-medium text-sm">{pillar.name}</span>
                </div>
                <span className="font-mono text-lg font-bold" style={{ color: pillar.color }}>{pillar.score.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={pillar.trend.startsWith("+") ? "text-[#10B981]" : "text-[#EF4444]"}>
                  {pillar.trend} from last check
                </span>
                <Button size="sm" variant="ghost" className="h-7 text-xs">Enter pillar →</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning progress */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-display font-semibold mb-4">Learning Progress</h2>
        <div className="space-y-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.slug} className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{pillar.name}</span>
                <span className="text-muted-foreground font-mono">{pillar.completed} of {pillar.modules} modules</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(pillar.completed / pillar.modules) * 100}%`, backgroundColor: pillar.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarsHub;
