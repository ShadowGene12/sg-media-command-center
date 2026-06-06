import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Download, Mail, Wrench, BookOpen, Target, BarChart3, CheckSquare, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// --- Mock data (will come from Supabase later) ---
const MOCK_DIAGNOSTIC = {
  firstName: "Shadow",
  date: "April 22, 2026",
  viewId: "BD-8F2A",
  overallScore: 13.8,
  pillars: [
    {
      name: "Market & Offer Clarity",
      shortName: "Market & Offer",
      slug: "market-offer",
      color: "#6D4AE6",
      score: 2.1,
      isPrimary: false,
    },
    {
      name: "Customer Acquisition",
      shortName: "Acquisition",
      slug: "acquisition",
      color: "#378ADD",
      score: 3.4,
      isPrimary: false,
    },
    {
      name: "Sales & Conversion",
      shortName: "Sales",
      slug: "sales",
      color: "#1D9E75",
      score: 1.8,
      isPrimary: true,
      diagnosis: {
        surfaceSymptom:
          "Low close rates and inconsistent deal flow. Prospects enter the pipeline but stall or disappear without clear reason, leading to revenue volatility month-over-month.",
        systemFailure:
          "No documented sales process exists. Each conversation is improvised, which means conversion depends entirely on who is selling and their energy level that day. There is no objection handling framework or follow-up cadence.",
        foundationIssue:
          "The business treats sales as a talent problem rather than a systems problem. Without a repeatable, trainable process, scaling the team or improving conversion is structurally impossible.",
        topAction:
          "Document your current best sales conversation as a step-by-step process. Identify the 3 most common objections and write scripted responses. Implement a 5-touch follow-up sequence for every qualified lead.",
      },
    },
    {
      name: "Profit Optimization",
      shortName: "Profit",
      slug: "profit",
      color: "#F59E0B",
      score: 3.9,
      isPrimary: false,
    },
    {
      name: "Financial & Performance Control",
      shortName: "Financial",
      slug: "finance",
      color: "#D85A30",
      score: 2.6,
      isPrimary: false,
    },
  ],
};

const LOCKED_TOOLS = [
  { name: "Profit Calculator", icon: BarChart3, desc: "Model margins and find hidden profit leaks" },
  { name: "Offer Clarity Audit", icon: Target, desc: "Score your offer against 12 clarity markers" },
  { name: "Funnel Mapper", icon: Wrench, desc: "Visualize your acquisition funnel end-to-end" },
  { name: "Pillar Deep-Dives", icon: BookOpen, desc: "Structured learning for every growth pillar" },
  { name: "Action Plan System", icon: CheckSquare, desc: "Track and execute your highest-leverage fixes" },
];

const radarData = MOCK_DIAGNOSTIC.pillars.map((p) => ({
  subject: p.shortName,
  score: p.score,
  fullMark: 5,
}));

const primaryPillar = MOCK_DIAGNOSTIC.pillars.find((p) => p.isPrimary)!;
const lockedPillars = MOCK_DIAGNOSTIC.pillars.filter((p) => !p.isPrimary);

function getScoreLabel(score: number) {
  if (score <= 1.5) return "critical";
  if (score <= 2.5) return "weak";
  if (score <= 3.5) return "average";
  if (score <= 4.5) return "good";
  return "excellent";
}

function getScoreColor(score: number) {
  if (score <= 1.5) return "#EF4444";
  if (score <= 2.5) return "#F59E0B";
  if (score <= 3.5) return "#F59E0B";
  return "#10B981";
}

const DetectorResults = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("pdf-content");
      if (!element) return;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#0A0A0C", // Force dark background
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SG_Diagnostic_${MOCK_DIAGNOSTIC.firstName}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* --- Section 1: Header band --- */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Here's your diagnostic, {MOCK_DIAGNOSTIC.firstName}.
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Completed on {MOCK_DIAGNOSTIC.date} · View ID: {MOCK_DIAGNOSTIC.viewId}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownloadPdf} disabled={isGenerating} variant="outline" size="sm" className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10">
            {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            {isGenerating ? "Generating..." : "Download PDF"}
          </Button>
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10">
            <Mail className="h-4 w-4 mr-2" /> Email copy
          </Button>
        </div>
      </div>

      <div id="pdf-content" className="space-y-8">
        {/* --- Section 2: Score overview card --- */}
        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: pillar score bars */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
              Pillar Scores
            </h3>
            {MOCK_DIAGNOSTIC.pillars.map((pillar) => (
              <div key={pillar.slug} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{pillar.name}</span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: pillar.color }}
                  >
                    {pillar.score.toFixed(1)}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(pillar.score / 5) * 100}%`,
                      backgroundColor: pillar.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: radar chart + overall score */}
          <div className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#333A44" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#A8B2BD", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 5]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#6D4AE6"
                  fill="#6D4AE6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Growth Infrastructure Score
              </p>
              <p className="text-5xl font-mono font-bold text-foreground">
                {MOCK_DIAGNOSTIC.overallScore.toFixed(1)}
                <span className="text-xl text-muted-foreground"> / 25.0</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 3: Primary bottleneck diagnosis (UNLOCKED) --- */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 border-l-4 shadow-lg" style={{ borderLeftColor: primaryPillar.color }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full mb-2"
              style={{
                backgroundColor: `${primaryPillar.color}20`,
                color: primaryPillar.color,
              }}
            >
              {primaryPillar.name}
            </span>
            <h2 className="text-xl font-display font-semibold">
              Your primary bottleneck
            </h2>
          </div>
          <div className="text-right">
            <p
              className="text-4xl font-mono font-bold"
              style={{ color: primaryPillar.color }}
            >
              {primaryPillar.score.toFixed(1)}{" "}
              <span className="text-lg text-muted-foreground">/ 5.0</span>
            </p>
            <p
              className="text-sm font-mono uppercase tracking-wider font-semibold"
              style={{ color: getScoreColor(primaryPillar.score) }}
            >
              {getScoreLabel(primaryPillar.score)}
            </p>
          </div>
        </div>

        {/* Three-layer breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary/30 border border-border/50 rounded-lg p-5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Surface Symptom
            </h4>
            <p className="text-sm leading-relaxed">
              {primaryPillar.diagnosis?.surfaceSymptom}
            </p>
          </div>
          <div className="bg-secondary/30 border border-border/50 rounded-lg p-5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              System Failure
            </h4>
            <p className="text-sm leading-relaxed">
              {primaryPillar.diagnosis?.systemFailure}
            </p>
          </div>
          <div className="bg-secondary/30 border border-border/50 rounded-lg p-5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Foundation Issue
            </h4>
            <p className="text-sm leading-relaxed">
              {primaryPillar.diagnosis?.foundationIssue}
            </p>
          </div>
        </div>

        {/* Top priority action */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
          <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" /> Top priority action
          </h4>
          <p className="text-sm leading-relaxed">
            {primaryPillar.diagnosis?.topAction}
          </p>
        </div>
      </div>

      {/* --- Section 4: Recommended Pathway --- */}
      <div className="bg-gradient-to-br from-violet-900/20 to-black/20 border border-violet-500/25 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.15)]">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target className="w-32 h-32 text-violet-400" />
        </div>
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2 block">Recommended Pathway</span>
          <h2 className="text-3xl font-bold text-white mb-3">Fix Your Sales Conversion Engine</h2>
          <p className="text-violet-200 max-w-2xl mb-8 leading-relaxed">
            Based on your primary bottleneck, we recommend starting this 4-week guided pathway. 
            It will take you step-by-step through documenting your sales process, handling objections, and building a follow-up cadence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/pathways/sales-engine">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-500 text-white px-8 h-12 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                Start Pathway
              </Button>
            </Link>
            <Link to="/sprints/new?bottleneck=sales">
              <Button size="lg" variant="outline" className="border-violet-500/25 hover:bg-violet-500/10 text-white h-12">
                <CheckSquare className="w-4 h-4 mr-2" /> Start a Sprint
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Section 5: Recommended SOPs & AI --- */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> 
            Recommended SOPs from the Library
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'The Perfect Sales Script Template', time: '15 min read', type: 'Template' },
              { title: 'Objection Handling Matrix', time: '10 min read', type: 'Framework' },
              { title: '5-Touch Follow-up Sequence', time: '20 min read', type: 'SOP' }
            ].map((sop, i) => (
              <Link key={i} to="/library/sample-sop" className="group block">
                <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-5 hover:border-primary/40 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-md mb-3 inline-block">{sop.type}</span>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">{sop.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">{sop.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" /> 
            AI Advisor
          </h3>
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Need help interpreting this?</h4>
            <p className="text-sm text-slate-400 mb-6">Ask the AI Advisor specific questions about your diagnostic results.</p>
            <Link to="/advisor" className="w-full">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-white/10">
                Ask AI Advisor
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* End of pdf-content */}
      </div>
    </div>
  );
};

export default DetectorResults;
