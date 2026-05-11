import { motion } from "framer-motion";
import { Download, FileText, FileSpreadsheet, File, ExternalLink } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";

const TEMPLATES = [
  { name: "Weekly KPI Dashboard", pillar: "Financial Control", color: "#D85A30", format: "Google Sheets", icon: FileSpreadsheet, description: "Track your five pillar KPIs week-over-week with automated trend indicators." },
  { name: "Sales Process SOP", pillar: "Sales & Conversion", color: "#1D9E75", format: "PDF", icon: FileText, description: "Step-by-step playbook for a repeatable, documented sales process." },
  { name: "ICP Worksheet", pillar: "Market & Offer", color: "#6D4AE6", format: "Notion", icon: File, description: "Define your Ideal Customer Profile across 12 firmographic and psychographic dimensions." },
  { name: "Funnel Mapping Canvas", pillar: "Customer Acquisition", color: "#378ADD", format: "PDF", icon: FileText, description: "Map every touchpoint across your acquisition funnel from cold to close." },
  { name: "Pricing Analysis Template", pillar: "Profit Optimization", color: "#F59E0B", format: "Google Sheets", icon: FileSpreadsheet, description: "Model tiered pricing scenarios and calculate impact on margin and revenue." },
  { name: "Monthly Review Template", pillar: "Cross-Pillar", color: "#6D4AE6", format: "Notion", icon: File, description: "Structured agenda and scoring rubric for your monthly strategic review." },
  { name: "Objection Handling Script", pillar: "Sales & Conversion", color: "#1D9E75", format: "Google Docs", icon: FileText, description: "Pre-built responses to the 12 most common objections in B2B service sales." },
  { name: "Cash Flow Projection", pillar: "Financial Control", color: "#D85A30", format: "Google Sheets", icon: FileSpreadsheet, description: "13-week rolling cash flow model with scenario planning built in." },
  { name: "Content Calendar", pillar: "Customer Acquisition", color: "#378ADD", format: "Notion", icon: File, description: "Plan and track content across channels with pillar-linked tagging." },
];

const FORMAT_STYLES: Record<string, string> = {
  "Google Sheets": "text-emerald-400/80 bg-emerald-500/10 border-emerald-500/20",
  "Google Docs":   "text-sky-400/80 bg-sky-500/10 border-sky-500/20",
  "PDF":           "text-red-400/80 bg-red-500/10 border-red-500/20",
  "Notion":        "text-slate-300/80 bg-white/5 border-white/10",
};

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const cardVars = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18 } },
};

const TemplatesLibrary = () => (
  <div className="max-w-6xl mx-auto space-y-10 pb-12">
    <PageHeader
      label="Resource Library"
      title="Templates & SOPs"
      description="Ready-to-use frameworks, worksheets, and playbooks for every growth pillar."
    />

    <div>
      <SectionLabel className="mb-5">Available Resources — {TEMPLATES.length} items</SectionLabel>
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {TEMPLATES.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVars}
          >
            <PremiumCard
              glowColor={`${t.color}1A`}
              className="group p-6 flex flex-col gap-4 transition-all duration-300"
            >
              {/* Top row: icon + format badge */}
              <div className="flex items-start justify-between">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{ backgroundColor: `${t.color}15`, borderColor: `${t.color}30` }}
                >
                  <t.icon className="h-5 w-5" style={{ color: t.color }} />
                </div>
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border tracking-wide ${FORMAT_STYLES[t.format] ?? "text-slate-400 bg-white/5 border-white/10"}`}>
                  {t.format}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="text-sm font-semibold text-white leading-snug">{t.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
              </div>

              {/* Footer: pillar tag + action */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                <span
                  className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${t.color}18`, color: t.color }}
                >
                  {t.pillar}
                </span>
                <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors duration-200 group/btn">
                  <Download className="h-3.5 w-3.5 group-hover/btn:text-violet-400 transition-colors" />
                  <span className="font-medium">Download</span>
                </button>
              </div>
            </PremiumCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default TemplatesLibrary;
