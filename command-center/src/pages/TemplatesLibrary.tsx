import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, FileSpreadsheet, File, ExternalLink, Search, Star, Filter, Layers, ArrowRight } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/PageHeader";

const TEMPLATES = [
  // Financial Control
  { name: "Weekly KPI Dashboard",          pillar: "Financial Control",     color: "#D85A30", format: "Google Sheets", description: "Track your five pillar KPIs week-over-week with automated trend indicators and colour-coded status.",      featured: true  },
  { name: "Cash Flow Projection Model",    pillar: "Financial Control",     color: "#D85A30", format: "Google Sheets", description: "13-week rolling cash flow model with scenario planning, runway tracker, and buffer threshold alerts.",     featured: false },
  { name: "Monthly Financial Review",      pillar: "Financial Control",     color: "#D85A30", format: "Notion",        description: "Structured P&L reading, KPI scoring, variance analysis, and next-month re-planning in one template.",     featured: false },
  { name: "Unit Economics Tracker",        pillar: "Financial Control",     color: "#D85A30", format: "Google Sheets", description: "Track CAC, LTV, payback period, and gross margin per product line with automated unit economics scores.",   featured: false },
  { name: "Revenue Forecast Template",     pillar: "Financial Control",     color: "#D85A30", format: "Google Sheets", description: "Bottom-up revenue forecast using pipeline data, conversion rates, and capacity constraints.",              featured: false },

  // Sales & Conversion
  { name: "Sales Process SOP",             pillar: "Sales & Conversion",   color: "#1D9E75", format: "PDF",           description: "Step-by-step playbook for a repeatable, documented sales process from first touch to signed contract.",    featured: true  },
  { name: "Objection Handling Script",     pillar: "Sales & Conversion",   color: "#1D9E75", format: "Google Docs",   description: "Pre-built responses to the 12 most common objections in B2B service sales, with reframe language.",         featured: false },
  { name: "Discovery Call Framework",      pillar: "Sales & Conversion",   color: "#1D9E75", format: "Notion",        description: "Structured discovery call template — qualification criteria, probing questions, and next-step protocol.",   featured: false },
  { name: "Follow-Up Sequence Builder",    pillar: "Sales & Conversion",   color: "#1D9E75", format: "Google Docs",   description: "7-touch follow-up sequence with email templates, call scripts, and LinkedIn message variants.",              featured: false },
  { name: "Proposal Template",             pillar: "Sales & Conversion",   color: "#1D9E75", format: "PDF",           description: "High-converting proposal template: executive summary, scope, pricing tiers, social proof, and CTA.",       featured: false },

  // Market & Offer
  { name: "ICP Worksheet",                 pillar: "Market & Offer",        color: "#6D4AE6", format: "Notion",        description: "Define your Ideal Customer Profile across 12 firmographic and psychographic dimensions with scoring.",     featured: true  },
  { name: "Offer Positioning Canvas",      pillar: "Market & Offer",        color: "#6D4AE6", format: "PDF",           description: "Map your offer against the 4 positioning levers: price, promise, proof, and differentiation.",            featured: false },
  { name: "Competitor Analysis Grid",      pillar: "Market & Offer",        color: "#6D4AE6", format: "Google Sheets", description: "Systematic grid for mapping 8-10 competitors across 12 positioning dimensions to find open windows.",       featured: false },
  { name: "Messaging Hierarchy Doc",       pillar: "Market & Offer",        color: "#6D4AE6", format: "Google Docs",   description: "Build message architecture from core value prop to individual touchpoint copy for consistent messaging.",    featured: false },
  { name: "Niche Selection Matrix",        pillar: "Market & Offer",        color: "#6D4AE6", format: "Notion",        description: "5-criteria decision matrix for evaluating niche viability, demand signals, and competitive intensity.",     featured: false },

  // Customer Acquisition
  { name: "Funnel Mapping Canvas",         pillar: "Customer Acquisition",  color: "#378ADD", format: "PDF",           description: "Map every touchpoint across your acquisition funnel from cold awareness to close and onboarding.",          featured: true  },
  { name: "Cold Email Sequence Pack",      pillar: "Customer Acquisition",  color: "#378ADD", format: "Google Docs",   description: "5-email B2B cold outreach sequence with subject lines, body copy variants, and deliverability checklist.",   featured: false },
  { name: "Content Calendar",             pillar: "Customer Acquisition",  color: "#378ADD", format: "Notion",        description: "Plan and track content across channels with pillar-linked tagging, repurposing workflow, and analytics.",   featured: false },
  { name: "CAC Tracking Sheet",           pillar: "Customer Acquisition",  color: "#378ADD", format: "Google Sheets", description: "Track cost-per-acquisition across every channel with blended and channel-specific CAC and trend charts.",    featured: false },
  { name: "Referral System Template",     pillar: "Customer Acquisition",  color: "#378ADD", format: "Notion",        description: "Complete referral program structure: ask script, incentive framework, tracking system, and partner tiers.",  featured: false },

  // Profit Optimization
  { name: "Pricing Analysis Template",    pillar: "Profit Optimization",   color: "#F59E0B", format: "Google Sheets", description: "Model tiered pricing scenarios and calculate the margin and revenue impact of each configuration.",           featured: true  },
  { name: "Revenue Leakage Audit",        pillar: "Profit Optimization",   color: "#F59E0B", format: "Notion",        description: "8-category audit of revenue leakage points — from unbilled scope to expired pricing to churn patterns.",    featured: false },
  { name: "Margin Health Dashboard",      pillar: "Profit Optimization",   color: "#F59E0B", format: "Google Sheets", description: "Live gross, net, and contribution margin tracker per offer line with traffic-light threshold alerts.",       featured: false },
  { name: "Upsell Path Builder",          pillar: "Profit Optimization",   color: "#F59E0B", format: "Notion",        description: "Design your upsell and expansion path: trigger criteria, offer sequence, and revenue per client projection.", featured: false },

  // Cross-Pillar
  { name: "Monthly Strategic Review",     pillar: "Cross-Pillar",          color: "#6D4AE6", format: "Notion",        description: "Structured agenda and scoring rubric for your monthly strategic review across all five growth pillars.",     featured: true  },
  { name: "90-Day Operator Roadmap",      pillar: "Cross-Pillar",          color: "#6D4AE6", format: "Notion",        description: "Priority-sequenced 90-day plan with pillar focus, weekly milestones, and KPI targets per initiative.",       featured: false },
  { name: "Business Health Score",        pillar: "Cross-Pillar",          color: "#6D4AE6", format: "Google Sheets", description: "Composite business health score across all 5 pillars with weekly scoring, trend lines, and risk flags.",    featured: false },
];

const PILLAR_FILTERS = [
  "All",
  "Financial Control",
  "Sales & Conversion",
  "Market & Offer",
  "Customer Acquisition",
  "Profit Optimization",
  "Cross-Pillar",
];

const FORMAT_STYLES: Record<string, string> = {
  "Google Sheets": "text-emerald-400/80 bg-emerald-500/10 border-emerald-500/20",
  "Google Docs":   "text-sky-400/80 bg-sky-500/10 border-sky-500/20",
  "PDF":           "text-red-400/80 bg-red-500/10 border-red-500/20",
  "Notion":        "text-slate-300/80 bg-white/5 border-white/10",
};

const FORMAT_ICONS: Record<string, React.ElementType> = {
  "Google Sheets": FileSpreadsheet,
  "Google Docs":   FileText,
  "PDF":           FileText,
  "Notion":        File,
};

// ─── Reveal wrapper ────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── Template card ─────────────────────────────────────────────────────────────
const TemplateCard = ({ t, index }: { t: typeof TEMPLATES[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const FmtIcon = FORMAT_ICONS[t.format] ?? FileText;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl flex flex-col gap-0 h-full bento-card bento-shine grain-overlay"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Pillar colour strip */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${t.color}90, transparent)` }} />

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${t.color}0D 0%, transparent 60%)` }} />

        <div className="p-5 flex flex-col gap-4 flex-1 relative z-10">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
              style={{ backgroundColor: `${t.color}15`, borderColor: `${t.color}30` }}
            >
              <FmtIcon className="h-4.5 w-4.5" style={{ color: t.color }} />
            </div>
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border tracking-wide ${FORMAT_STYLES[t.format] ?? "text-slate-400 bg-white/5 border-white/10"}`}>
              {t.format}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5 flex-1">
            <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{t.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{t.description}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04]">
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
        </div>
      </div>
    </motion.div>
  );
};

const TemplatesLibrary = () => {
  const [search, setSearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState("All");

  const filtered = TEMPLATES.filter(t => {
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.pillar.toLowerCase().includes(search.toLowerCase());
    const matchPillar = pillarFilter === "All" || t.pillar === pillarFilter;
    return matchSearch && matchPillar;
  });

  const featured = TEMPLATES.filter(t => t.featured);

  const PILLAR_COLORS: Record<string, string> = {
    "Financial Control":    "#D85A30",
    "Sales & Conversion":   "#1D9E75",
    "Market & Offer":       "#6D4AE6",
    "Customer Acquisition": "#378ADD",
    "Profit Optimization":  "#F59E0B",
    "Cross-Pillar":         "#6D4AE6",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Resource Library"
          title="Templates & SOPs"
          description="Ready-to-use frameworks, worksheets, and playbooks for every growth pillar."
        />
        <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass">
            <Layers className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] font-mono text-slate-400">{TEMPLATES.length} templates</span>
          </div>
        </div>
      </div>

      {/* Bento hero — featured templates */}
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl p-6 bento-card bento-shine grain-overlay"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(109,74,230,0.15)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 100% 0%, rgba(55,138,221,0.06) 0%, transparent 50%)",
          }} />

          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Featured Templates</span>
            </div>
            <span className="text-[9px] font-mono text-slate-700">{featured.length} items</span>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {featured.map((t, i) => {
              const FmtIcon = FORMAT_ICONS[t.format] ?? FileText;
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                  className="group relative overflow-hidden rounded-xl p-3.5 cursor-pointer transition-all hover:bg-white/[0.04]"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${t.color}20`,
                    borderTop: `1px solid ${t.color}35`,
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${t.color}08, transparent 70%)` }} />
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2.5"
                    style={{ background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
                    <FmtIcon className="w-3 h-3" style={{ color: t.color }} />
                  </div>
                  <p className="text-[11px] font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{t.name}</p>
                  <p className="text-[9px] font-mono mt-1.5" style={{ color: t.color }}>{t.pillar}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Templates", value: String(TEMPLATES.length),                                                          color: "#6D4AE6" },
          { label: "Sheets / Excel",  value: String(TEMPLATES.filter(t => t.format === "Google Sheets").length),                color: "#1D9E75" },
          { label: "Notion / Docs",   value: String(TEMPLATES.filter(t => ["Notion","Google Docs"].includes(t.format)).length), color: "#378ADD" },
          { label: "Pillars Covered", value: "6",                                                                                color: "#F59E0B" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 120, damping: 18 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.10)" }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}80` }} />
            <div>
              <p className="text-xl font-display font-light text-white">{s.value}</p>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search + filter */}
      <Reveal>
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              placeholder="Search templates..."
              className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PILLAR_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setPillarFilter(f)}
                className={`h-7 px-3 rounded-full text-[10px] font-mono transition-all ${
                  pillarFilter === f
                    ? "text-white border"
                    : "text-slate-600 border border-white/[0.05] hover:text-slate-300 hover:border-white/[0.10]"
                }`}
                style={pillarFilter === f && f !== "All" ? {
                  backgroundColor: PILLAR_COLORS[f] + "18",
                  borderColor: PILLAR_COLORS[f] + "40",
                  color: PILLAR_COLORS[f],
                } : pillarFilter === f ? {
                  backgroundColor: "rgba(109,74,230,0.15)",
                  borderColor: "rgba(109,74,230,0.35)",
                  color: "#8B6CF6",
                } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* All templates */}
      <div>
        <SectionLabel className="mb-5 flex items-center gap-2">
          {pillarFilter === "All" ? "All Templates" : pillarFilter}
          <span className="ml-2 text-[9px] font-mono text-slate-600 normal-case tracking-normal">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
        </SectionLabel>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-500 text-sm font-light">No templates match your search.</p>
            <button
              onClick={() => { setSearch(""); setPillarFilter("All"); }}
              className="mt-3 text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors"
            >
              Clear filters →
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <TemplateCard key={t.name} t={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesLibrary;
