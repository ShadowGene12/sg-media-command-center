import jsPDF from "jspdf";

interface PillarScore {
  name: string;
  score: number;
  color: string;
}

interface DiagnosticData {
  firstName?: string;
  businessName?: string;
  overallScore: number;
  primaryPillar: string;
  pillars: PillarScore[];
  viewId?: string;
  date?: string;
}

const PILLAR_DISPLAY: Record<string, string> = {
  market_offer: "Market & Offer Clarity",
  acquisition:  "Customer Acquisition",
  sales:        "Sales & Conversion",
  profit:       "Profit Optimization",
  finance:      "Financial & Performance Control",
};

const PILLAR_ANALYSIS: Record<string, { surface: string; system: string; foundation: string; action: string }> = {
  sales: {
    surface: "Low close rates and inconsistent deal flow. Prospects enter the pipeline but stall or disappear without clear reason.",
    system: "No documented sales process exists. Each conversation is improvised — conversion depends on who is selling and their energy that day.",
    foundation: "The business treats sales as a talent problem rather than a systems problem. Without a repeatable process, scaling is structurally impossible.",
    action: "Document your current best sales conversation as a step-by-step process. Script your top 3 objection responses. Implement a 5-touch follow-up sequence for every qualified lead.",
  },
  acquisition: {
    surface: "Unpredictable lead volume and high CAC. Some channels work but none are systematised.",
    system: "No formal channel attribution or CAC tracking per channel. Acquisition decisions are based on gut feel, not data.",
    foundation: "Acquisition is treated as a marketing function rather than an engineering problem. Every channel needs a system, not just activity.",
    action: "Calculate CAC per channel using last 90 days of data. Identify your lowest-CAC channel. Build a repeatable system for that channel before investing in others.",
  },
  market_offer: {
    surface: "Long sales cycles, frequent price objections, and difficulty explaining what you do clearly.",
    system: "The offer lacks a specific, measurable outcome for a precisely defined audience. Every pitch feels like a custom proposal.",
    foundation: "The business has not made the hard decision about who it is NOT for. Trying to serve everyone means the offer fits no one perfectly.",
    action: "Complete the 12-point Offer Clarity Audit in your SOP library. Rewrite your offer headline using: We help [audience] achieve [specific outcome] in [timeframe] without [objection].",
  },
  profit: {
    surface: "Revenue is growing but profit is not keeping pace. Margins feel thin but the root cause is unclear.",
    system: "No systematic tracking of per-client or per-service profitability. Pricing is based on market rate rather than value delivered.",
    foundation: "The business has never done a full margin audit. Cost structure has accumulated without strategic review.",
    action: "Calculate gross margin and net margin for each service line. Identify your three most profitable clients and understand what makes them different. Implement a monthly P&L review.",
  },
  finance: {
    surface: "Cash flow surprises. Decisions made without reliable data. Month-end is always uncertain.",
    system: "No KPI dashboard reviewed on a regular cadence. Cash flow is tracked by bank balance, not by forecast.",
    foundation: "Financial visibility is treated as an accounting function rather than an operational intelligence layer.",
    action: "Define your 5 core KPIs and set a weekly review time. Build a 90-day rolling cash flow forecast. Set a minimum cash reserve threshold with an automatic alert.",
  },
};

export async function exportDiagnosticPDF(data: DiagnosticData): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const margin = 20;
  const contentW = W - margin * 2;
  let y = margin;

  // ── Helpers ───────────────────────────────────────────────────
  const line = (x1: number, y1: number, x2: number, y2: number, color = [255, 255, 255], alpha = 0.1) => {
    pdf.setDrawColor(color[0], color[1], color[2]);
    pdf.setLineWidth(0.2);
    pdf.line(x1, y1, x2, y2);
  };

  const hex2rgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const fillRect = (x: number, ry: number, w: number, h: number, r: number, g: number, b: number, alpha = 1) => {
    pdf.setFillColor(r, g, b);
    pdf.rect(x, ry, w, h, "F");
  };

  const text = (
    t: string, x: number, ty: number,
    opts: { size?: number; bold?: boolean; color?: [number, number, number]; align?: "left" | "center" | "right"; maxW?: number } = {}
  ) => {
    const { size = 10, bold = false, color = [248, 249, 250], align = "left", maxW } = opts;
    pdf.setFontSize(size);
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    if (maxW) {
      const lines = pdf.splitTextToSize(t, maxW);
      pdf.text(lines, x, ty, { align });
      return lines.length * (size * 0.4);
    }
    pdf.text(t, x, ty, { align });
    return size * 0.4;
  };

  // ── Dark background ───────────────────────────────────────────
  fillRect(0, 0, W, 297, 5, 5, 5);

  // ── Header band ───────────────────────────────────────────────
  fillRect(0, 0, W, 52, 10, 10, 15);

  // SG Media logo text
  text("SG", margin, 18, { size: 14, bold: true, color: [109, 74, 230] });
  text("MEDIA", margin + 10, 18, { size: 14, bold: false, color: [248, 249, 250] });
  text("COMMAND CENTER", margin + 10, 24, { size: 7, color: [168, 178, 189] });

  // View ID + Date
  const dateStr = data.date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  text(`View ID: ${data.viewId || "BD-XXXX"}`, W - margin, 18, { size: 8, color: [168, 178, 189], align: "right" });
  text(dateStr, W - margin, 25, { size: 8, color: [100, 110, 130], align: "right" });

  // Headline
  const name = [data.firstName, data.businessName].filter(Boolean).join(" · ") || "Your";
  text(`${name} Bottleneck Report`, margin, 40, { size: 16, bold: true, color: [248, 249, 250] });
  text("Confidential · SG Media Command Center · Not for distribution", margin, 47, { size: 7, color: [80, 90, 110] });

  y = 62;

  // ── Overall score ─────────────────────────────────────────────
  fillRect(margin, y, contentW, 22, 15, 10, 30);
  text("GROWTH INFRASTRUCTURE SCORE", margin + 6, y + 7, { size: 7, color: [130, 100, 220] });
  text(`${data.overallScore.toFixed(1)} / 25.0`, margin + 6, y + 16, { size: 16, bold: true, color: [248, 249, 250] });

  // Score bar
  const barX = margin + 65;
  const barW = contentW - 70;
  fillRect(barX, y + 9, barW, 5, 30, 25, 50);
  const scorePct = Math.min(data.overallScore / 25, 1);
  fillRect(barX, y + 9, barW * scorePct, 5, 109, 74, 230);
  text("0", barX, y + 20, { size: 7, color: [80, 90, 110] });
  text("25", barX + barW, y + 20, { size: 7, color: [80, 90, 110], align: "right" });

  y += 30;

  // ── Primary bottleneck ────────────────────────────────────────
  const primaryKey = data.primaryPillar;
  const primaryDisplay = PILLAR_DISPLAY[primaryKey] || primaryKey;
  const analysis = PILLAR_ANALYSIS[primaryKey] || PILLAR_ANALYSIS.sales;
  const primaryPillar = data.pillars.find(p => p.name.toLowerCase().includes(primaryKey.replace("_", " ")));
  const primaryScore = primaryPillar?.score ?? 1.8;

  fillRect(margin, y, contentW, 8, 109, 74, 230, 0.15);
  text("▸  PRIMARY BOTTLENECK", margin + 4, y + 5.5, { size: 8, bold: true, color: [109, 74, 230] });
  text(`${primaryDisplay}  ·  ${primaryScore.toFixed(1)} / 5.0`, W - margin - 4, y + 5.5, { size: 8, color: [168, 178, 189], align: "right" });

  y += 14;

  const LAYER_COLORS: Array<[number, number, number]> = [[239, 68, 68], [245, 158, 11], [109, 74, 230]];
  const LAYERS = [
    { label: "SURFACE SYMPTOM", text: analysis.surface },
    { label: "SYSTEM FAILURE", text: analysis.system },
    { label: "FOUNDATION ISSUE", text: analysis.foundation },
  ];

  for (let i = 0; i < LAYERS.length; i++) {
    const [r, g, b] = LAYER_COLORS[i];
    fillRect(margin, y, 3, 28, r, g, b);
    fillRect(margin + 3, y, contentW - 3, 28, 15, 12, 22);
    text(LAYERS[i].label, margin + 8, y + 7, { size: 7, bold: true, color: [r, g, b] });
    const h = text(LAYERS[i].text, margin + 8, y + 13, { size: 8, color: [168, 178, 189], maxW: contentW - 12 });
    y += 34;
  }

  // Top action
  fillRect(margin, y, contentW, 20, 109, 74, 230, 0.08);
  text("PRIORITY ACTION", margin + 6, y + 6, { size: 7, bold: true, color: [109, 74, 230] });
  text(analysis.action, margin + 6, y + 12, { size: 8, color: [200, 210, 220], maxW: contentW - 10 });

  y += 28;

  // ── Pillar scores ─────────────────────────────────────────────
  text("PILLAR SCORES", margin, y, { size: 9, bold: true, color: [168, 178, 189] });
  y += 8;

  for (const pillar of data.pillars) {
    const [r, g, b] = hex2rgb(pillar.color);
    const pct = Math.min(pillar.score / 5, 1);
    const isPrimary = pillar.name.toLowerCase().includes(primaryKey.replace("_", " "));

    if (isPrimary) fillRect(margin, y - 1, contentW, 12, 109, 74, 230, 0.05);

    // Dot
    pdf.setFillColor(r, g, b);
    pdf.circle(margin + 3, y + 4, 2, "F");

    text(pillar.name, margin + 9, y + 6, { size: 8, color: isPrimary ? [200, 190, 255] : [168, 178, 189] });
    text(`${pillar.score.toFixed(1)}`, W - margin, y + 6, { size: 9, bold: true, color: [r, g, b], align: "right" });

    // Bar
    const bx = margin + 9;
    const bw = contentW - 45;
    fillRect(bx, y + 8, bw, 2, 30, 30, 50);
    fillRect(bx, y + 8, bw * pct, 2, r, g, b);

    y += 14;
  }

  y += 4;

  // ── Footer ────────────────────────────────────────────────────
  line(margin, y, W - margin, y);
  y += 5;
  text("This report is generated by SG Media Command Center. The diagnosis is permanent — it is always yours.", margin, y, { size: 7, color: [60, 70, 90], maxW: contentW - 40 });
  text("sgmedia.in", W - margin, y, { size: 7, color: [109, 74, 230], align: "right" });

  const firstName = data.firstName || "report";
  pdf.save(`SG_Diagnostic_${firstName.replace(/\s+/g, "_")}.pdf`);
}
