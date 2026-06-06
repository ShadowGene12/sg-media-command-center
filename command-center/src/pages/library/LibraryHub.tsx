import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search, BookOpen, Clock, Star, ArrowRight, Filter,
  Loader2, Sparkles, Target, TrendingUp, BarChart3,
  DollarSign, ChevronRight, Zap, Layers, ShieldCheck,
  LineChart, Users, FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { supabase, type SOP } from "@/lib/supabase";

// ─── Static fallback SOP library ──────────────────────────────────────────────
const STATIC_SOPS = [
  // Sales & Conversion
  { id: "s1",  title: "Sales Process Documentation Framework",       summary: "Build a repeatable, step-by-step sales process your whole team can follow — from first contact to close.",          pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "SOPs",       is_popular: true,  read_time_mins: 12, slug: "sales-process-documentation" },
  { id: "s2",  title: "Follow-Up Sequence Builder",                  summary: "A 7-touch follow-up sequence template that re-engages cold leads without feeling desperate.",                         pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "SOPs",       is_popular: true,  read_time_mins: 8,  slug: "follow-up-sequence-builder" },
  { id: "s3",  title: "Objection Handling Playbook",                 summary: "The 12 most common sales objections with proven reframe scripts. Designed for high-trust consultative selling.",      pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "Playbooks",  is_popular: false, read_time_mins: 15, slug: "objection-handling-playbook" },
  { id: "s4",  title: "Conversion Rate Audit Checklist",             summary: "Diagnose where your funnel is leaking. 40-point audit covering awareness, consideration, and decision stages.",       pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "Frameworks", is_popular: false, read_time_mins: 10, slug: "conversion-rate-audit" },
  { id: "s5",  title: "Discovery Call Framework",                    summary: "A structured discovery call script that surfaces the real buying motivation — and positions you as the obvious choice.", pillar: "Sales & Conversion",      pillar_color: "#1D9E75", category: "Frameworks", is_popular: true,  read_time_mins: 11, slug: "discovery-call-framework" },
  { id: "s6",  title: "Proposal-to-Close Playbook",                  summary: "Turn your proposal into a closing tool — structure, pricing presentation, risk removal, and urgency triggers.",       pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "Playbooks",  is_popular: false, read_time_mins: 13, slug: "proposal-to-close" },
  { id: "s7",  title: "Pipeline Velocity Calculator",                summary: "Measure and increase the speed at which deals move through your pipeline — from lead to contract.",                    pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "Frameworks", is_popular: false, read_time_mins: 7,  slug: "pipeline-velocity" },
  { id: "s8",  title: "CRM Hygiene SOP",                             summary: "Standard operating procedure for keeping your CRM clean, accurate, and actually usable for forecasting.",              pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "SOPs",       is_popular: false, read_time_mins: 6,  slug: "crm-hygiene-sop" },

  // Customer Acquisition
  { id: "a1",  title: "Cold Outreach System (Email + LinkedIn)",     summary: "End-to-end outbound system: ICP definition, messaging hierarchy, send cadence, and reply tracking.",                  pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "SOPs",       is_popular: true,  read_time_mins: 14, slug: "cold-outreach-system" },
  { id: "a2",  title: "CAC Efficiency Calculator & Benchmark",       summary: "Understand your true cost per acquired customer across every channel, with industry benchmarks by business type.",    pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "Frameworks", is_popular: false, read_time_mins: 7,  slug: "cac-efficiency-calculator" },
  { id: "a3",  title: "Content-Led Acquisition Playbook",            summary: "Systematic approach to generating qualified inbound leads through strategic content — not spray-and-pray posting.",   pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "Playbooks",  is_popular: true,  read_time_mins: 11, slug: "content-led-acquisition" },
  { id: "a4",  title: "Referral Engine SOP",                         summary: "Turn your existing clients into a predictable referral source. Structure, timing, incentives, and ask scripts.",      pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "SOPs",       is_popular: false, read_time_mins: 9,  slug: "referral-engine-sop" },
  { id: "a5",  title: "Partnership Channel Playbook",                summary: "Build a partner acquisition channel from scratch — ideal partner profiles, activation, and revenue share models.",     pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "Playbooks",  is_popular: false, read_time_mins: 12, slug: "partnership-channel-playbook" },
  { id: "a6",  title: "Paid Ads ROI Framework",                      summary: "Structure your paid advertising to measure and improve return on ad spend across Google, Meta, and LinkedIn.",         pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "Frameworks", is_popular: false, read_time_mins: 10, slug: "paid-ads-roi-framework" },
  { id: "a7",  title: "Lead Scoring Matrix",                         summary: "Score inbound leads on 8 dimensions to instantly prioritise which leads deserve immediate attention.",                 pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "Frameworks", is_popular: true,  read_time_mins: 8,  slug: "lead-scoring-matrix" },
  { id: "a8",  title: "Outbound Sequencing SOP",                     summary: "The exact outbound sequence cadence for B2B services: email, LinkedIn, call, and video touchpoints timed to convert.",  pillar: "Customer Acquisition",     pillar_color: "#378ADD", category: "SOPs",       is_popular: false, read_time_mins: 9,  slug: "outbound-sequencing-sop" },

  // Market & Offer
  { id: "m1",  title: "Offer Positioning Deep Dive",                 summary: "Map your offer against the 4 positioning levers: price, promise, proof, and differentiation. Find the gap fast.",     pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Frameworks", is_popular: true,  read_time_mins: 13, slug: "offer-positioning-deep-dive" },
  { id: "m2",  title: "ICP Definition Worksheet",                    summary: "Move beyond demographics. Build a psychographic, behavioural, and situational ICP that actually attracts buyers.",    pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "SOPs",       is_popular: false, read_time_mins: 8,  slug: "icp-definition-worksheet" },
  { id: "m3",  title: "Market Clarity Score Assessment",             summary: "15-question diagnostic that scores your market positioning clarity and surfaces the single biggest positioning gap.",   pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Frameworks", is_popular: true,  read_time_mins: 6,  slug: "market-clarity-score" },
  { id: "m4",  title: "Competitor Mapping Playbook",                 summary: "Systematic competitor analysis framework: identify positioning windows your competitors have left open.",              pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Playbooks",  is_popular: false, read_time_mins: 10, slug: "competitor-mapping-playbook" },
  { id: "m5",  title: "Offer Productisation Blueprint",              summary: "Convert a bespoke service into a productised offer with defined scope, deliverables, pricing, and turnaround.",        pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Frameworks", is_popular: true,  read_time_mins: 14, slug: "offer-productisation-blueprint" },
  { id: "m6",  title: "Niche Selection Framework",                   summary: "The 5-criteria decision matrix for selecting a profitable, defensible niche before you double down on positioning.",   pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Frameworks", is_popular: false, read_time_mins: 9,  slug: "niche-selection-framework" },
  { id: "m7",  title: "Messaging Hierarchy SOP",                     summary: "Build a message architecture from core value prop down to individual touchpoint copy — so every message says the same thing.",  pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6", category: "SOPs", is_popular: false, read_time_mins: 11, slug: "messaging-hierarchy-sop" },

  // Profit Optimization
  { id: "p1",  title: "Pricing Structure Audit",                     summary: "Diagnose whether your pricing is constraining revenue. Covers structure, anchoring, packaging, and upgrade paths.",   pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "SOPs",       is_popular: true,  read_time_mins: 11, slug: "pricing-structure-audit" },
  { id: "p2",  title: "Revenue Leakage Finder",                      summary: "The 8 places money leaves your business without you noticing — and exactly how to plug each one.",                    pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "Frameworks", is_popular: false, read_time_mins: 9,  slug: "revenue-leakage-finder" },
  { id: "p3",  title: "Margin Health Dashboard Setup",               summary: "Build a live margin tracker in a spreadsheet: gross margin, net margin, and contribution margin per offer.",          pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "SOPs",       is_popular: false, read_time_mins: 8,  slug: "margin-health-dashboard" },
  { id: "p4",  title: "Value-Based Pricing Playbook",                summary: "Shift from cost-plus to value-based pricing — a step-by-step guide to pricing based on client ROI.",                  pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "Playbooks",  is_popular: true,  read_time_mins: 13, slug: "value-based-pricing-playbook" },
  { id: "p5",  title: "Upsell & Expansion Framework",                summary: "Systematically increase revenue from existing clients through upsell paths, add-ons, and retainer upgrades.",         pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "Frameworks", is_popular: false, read_time_mins: 10, slug: "upsell-expansion-framework" },
  { id: "p6",  title: "Cost Structure Audit SOP",                    summary: "Review every line item in your cost base — fixed, variable, and semi-variable — and identify quick-win reductions.",  pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "SOPs",       is_popular: false, read_time_mins: 7,  slug: "cost-structure-audit" },

  // Financial Control
  { id: "f1",  title: "KPI Tracking System",                         summary: "The 12 business KPIs that actually matter — with a setup guide for tracking them weekly without spreadsheet hell.",    pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "SOPs", is_popular: true, read_time_mins: 10, slug: "kpi-tracking-system" },
  { id: "f2",  title: "Cash Flow Visibility Framework",              summary: "Build a 13-week cash flow forecast in one afternoon. Know your runway, your crunch weeks, and your buffer targets.",  pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "Frameworks", is_popular: false, read_time_mins: 12, slug: "cash-flow-visibility" },
  { id: "f3",  title: "Monthly Financial Review SOP",                summary: "A structured monthly financial review process: P&L reading, KPI scoring, variance analysis, and next-month planning.", pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "SOPs", is_popular: false, read_time_mins: 9, slug: "monthly-financial-review" },
  { id: "f4",  title: "Revenue Forecasting Framework",               summary: "Build a bottom-up revenue forecast using pipeline data, conversion rates, and capacity constraints.",                  pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "Frameworks", is_popular: true, read_time_mins: 11, slug: "revenue-forecasting-framework" },
  { id: "f5",  title: "Unit Economics Dashboard",                    summary: "Set up and track the 6 unit economics that reveal whether your business model is fundamentally scalable.",             pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "SOPs", is_popular: false, read_time_mins: 8, slug: "unit-economics-dashboard" },
  { id: "f6",  title: "Quarterly Business Review Playbook",          summary: "Run a high-signal quarterly business review: performance scoring, assumption testing, and 90-day re-planning.",       pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "Playbooks", is_popular: false, read_time_mins: 14, slug: "quarterly-business-review" },

  // Learnings
  { id: "l1",  title: "Why Most Operators Fix the Wrong Thing First", summary: "A breakdown of the 5-pillar bottleneck model and why most business growth advice is structurally backwards.",          pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Learnings", is_popular: true,  read_time_mins: 6,  slug: "why-operators-fix-wrong-thing" },
  { id: "l2",  title: "The 3-Layer Bottleneck Framework",            summary: "Surface symptom → System failure → Foundation issue. Why your bottleneck is almost never what it looks like.",         pillar: "Sales & Conversion",       pillar_color: "#1D9E75", category: "Learnings", is_popular: true,  read_time_mins: 5,  slug: "three-layer-bottleneck" },
  { id: "l3",  title: "Diagnosis vs. Prescription: The Core Error",  summary: "Most consultants prescribe before diagnosing. Here's what that costs operators — and how to spot it in any advice.",  pillar: "Market & Offer Clarity",   pillar_color: "#6D4AE6", category: "Learnings", is_popular: false, read_time_mins: 4,  slug: "diagnosis-vs-prescription" },
  { id: "l4",  title: "Revenue vs. Cash: The Founder Trap",          summary: "Why a business can be growing its revenue and running out of money simultaneously — and how to avoid it.",             pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "Learnings", is_popular: false, read_time_mins: 5, slug: "revenue-vs-cash-trap" },
  { id: "l5",  title: "The Positioning Trap: When Clarity Costs You Clients", summary: "Counterintuitive: niching down often feels like losing leads. Here's the data on why it increases close rate.", pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6", category: "Learnings", is_popular: true, read_time_mins: 6, slug: "positioning-trap" },
  { id: "l6",  title: "Systems vs. Hustle: The Operator Inflection Point", summary: "The moment every founder hits when effort stops producing proportional results — and what the transition looks like.", pillar: "Sales & Conversion", pillar_color: "#1D9E75", category: "Learnings", is_popular: false, read_time_mins: 7, slug: "systems-vs-hustle" },
  { id: "l7",  title: "The CAC Blind Spot in Service Businesses",    summary: "Most service operators undercount their acquisition cost by 40-60%. Here's the accurate calculation and what to do about it.", pillar: "Customer Acquisition", pillar_color: "#378ADD", category: "Learnings", is_popular: false, read_time_mins: 5, slug: "cac-blind-spot" },
  { id: "l8",  title: "Pricing Psychology: How Framing Moves Numbers", summary: "The cognitive biases that make buyers say yes — and how to apply them ethically in your proposals and pricing.",   pillar: "Profit Optimization",      pillar_color: "#F59E0B", category: "Learnings", is_popular: true,  read_time_mins: 6,  slug: "pricing-psychology" },
  { id: "l9",  title: "The Weekly Operator Review Habit",            summary: "The exact 30-minute Monday morning routine that keeps high-performance operators on track without daily micro-management.", pillar: "Financial & Performance Control", pillar_color: "#D85A30", category: "Learnings", is_popular: false, read_time_mins: 4, slug: "weekly-operator-review" },
];

const PILLAR_FILTERS = [
  { label: "All Pillars",        value: "all",        color: "#6D4AE6" },
  { label: "Market & Offer",     value: "market",     color: "#6D4AE6" },
  { label: "Acquisition",        value: "acquisition",color: "#378ADD" },
  { label: "Sales",              value: "sales",      color: "#1D9E75" },
  { label: "Profit",             value: "profit",     color: "#F59E0B" },
  { label: "Financial",          value: "finance",    color: "#D85A30" },
];

const TYPE_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  SOPs:       { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  Frameworks: { text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  Learnings:  { text: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  Playbooks:  { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
};

const PILLAR_ICONS: Record<string, React.ElementType> = {
  "Sales & Conversion":                 Target,
  "Customer Acquisition":               Zap,
  "Market & Offer Clarity":             Sparkles,
  "Profit Optimization":                DollarSign,
  "Financial & Performance Control":    BarChart3,
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

// ─── SOP card ──────────────────────────────────────────────────────────────────
const SOPCard = ({ item, index, featured = false }: { item: typeof STATIC_SOPS[0]; index: number; featured?: boolean }) => {
  const badge = TYPE_BADGE[item.category] ?? TYPE_BADGE.SOPs;
  const Icon = PILLAR_ICONS[item.pillar] ?? BookOpen;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="h-full"
    >
      <div
        className="group relative overflow-hidden rounded-2xl h-full flex flex-col bento-card bento-shine grain-overlay"
        style={{
          background: "rgba(0,0,0,0.42)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Pillar colour strip */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${item.pillar_color}90, transparent)` }} />

        {/* Featured glow */}
        {featured && (
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse at 0% 0%, ${item.pillar_color}10 0%, transparent 60%)`,
          }} />
        )}

        <div className="p-5 flex flex-col gap-4 flex-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${badge.text} ${badge.bg} ${badge.border}`}>
              {item.category.replace(/s$/, "")}
            </span>
            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {item.read_time_mins} min
            </span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: item.pillar_color + "15", border: `1px solid ${item.pillar_color}25` }}>
                <Icon className="w-3.5 h-3.5" style={{ color: item.pillar_color }} />
              </div>
              <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">
                {item.title}
              </p>
            </div>
            {item.summary && (
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 pl-11">{item.summary}</p>
            )}
            <p className="text-[10px] font-mono text-slate-700 pl-11">{item.pillar}</p>
          </div>

          <Link to={`/library/${item.slug}`}>
            <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] hover:border-white/[0.10] text-xs font-mono text-slate-500 hover:text-white transition-all group-hover:border-violet-500/20">
              <span>Open</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Bento hero card ───────────────────────────────────────────────────────────
const BentoHero = ({ category, total }: { category: string; total: number }) => {
  const PILLAR_STATS = [
    { label: "Market & Offer", count: STATIC_SOPS.filter(s => s.pillar === "Market & Offer Clarity").length, color: "#6D4AE6", icon: Sparkles },
    { label: "Acquisition",    count: STATIC_SOPS.filter(s => s.pillar === "Customer Acquisition").length,   color: "#378ADD", icon: Users },
    { label: "Sales",          count: STATIC_SOPS.filter(s => s.pillar === "Sales & Conversion").length,     color: "#1D9E75", icon: TrendingUp },
    { label: "Profit",         count: STATIC_SOPS.filter(s => s.pillar === "Profit Optimization").length,    color: "#F59E0B", icon: DollarSign },
    { label: "Financial",      count: STATIC_SOPS.filter(s => s.pillar === "Financial & Performance Control").length, color: "#D85A30", icon: LineChart },
  ];

  return (
    <Reveal>
      <div className="grid md:grid-cols-12 gap-4">
        {/* Left hero card — 8/12 */}
        <div
          className="md:col-span-8 relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between min-h-[200px] bento-card bento-shine grain-overlay"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(109,74,230,0.18)",
            borderTop: "1px solid rgba(109,74,230,0.28)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none">
            <BookOpen className="w-48 h-48 text-violet-300" />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 0% 100%, rgba(109,74,230,0.12) 0%, transparent 60%)",
          }} />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-violet-400/70 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
              Knowledge Base · Live
            </div>
            <h2 className="text-3xl font-display font-light text-white tracking-tight">
              {category === "All" ? "Growth Library" : category}
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-lg leading-relaxed">
              {total} resources mapped to your bottleneck. Every SOP, framework, and playbook is pillar-tagged and ready to deploy.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-violet">
              <Layers className="w-3 h-3 text-violet-400" />
              <span className="text-[11px] font-mono text-violet-300">{total} resources</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] font-mono text-slate-400">All 5 pillars covered</span>
            </div>
          </div>
        </div>

        {/* Right: pillar stats — 4/12 */}
        <div className="md:col-span-4 flex flex-col gap-2">
          {PILLAR_STATS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl flex-1"
              style={{
                background: "rgba(0,0,0,0.38)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: p.color + "15", border: `1px solid ${p.color}25` }}>
                <p.icon className="w-3 h-3" style={{ color: p.color }} />
              </div>
              <span className="text-xs text-slate-400 flex-1 font-light">{p.label}</span>
              <span className="font-mono text-sm font-semibold" style={{ color: p.color }}>{p.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

// ─── Stats strip ───────────────────────────────────────────────────────────────
const LibraryStats = ({ total }: { total: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[
      { label: "Total Resources", value: String(total),                                                             icon: BookOpen,    color: "#6D4AE6" },
      { label: "SOPs",            value: String(STATIC_SOPS.filter(s => s.category === "SOPs").length),             icon: FileText,    color: "#1D9E75" },
      { label: "Frameworks",      value: String(STATIC_SOPS.filter(s => s.category === "Frameworks").length),       icon: BarChart3,   color: "#378ADD" },
      { label: "Playbooks",       value: String(STATIC_SOPS.filter(s => s.category === "Playbooks").length),        icon: TrendingUp,  color: "#F59E0B" },
    ].map((s, i) => (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.10)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: s.color + "18", border: `1px solid ${s.color}30` }}>
          <s.icon className="w-4 h-4" style={{ color: s.color }} />
        </div>
        <div>
          <p className="text-xl font-display font-light text-white">{s.value}</p>
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{s.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function LibraryHub({
  category = "All",
}: {
  category?: "Learnings" | "SOPs" | "Frameworks" | "Playbooks" | "All";
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pillarFilter, setPillarFilter] = useState("all");

  const { data: dbSops = [], isLoading } = useQuery<SOP[]>({
    queryKey: ["sops", category],
    queryFn: async () => {
      let query = supabase.from("sops").select("*").order("is_popular", { ascending: false });
      if (category !== "All") query = query.eq("category", category);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Merge DB + static — DB takes priority
  const allSops = dbSops.length > 0 ? dbSops : STATIC_SOPS.filter(s => category === "All" || s.category === category) as SOP[];

  const filtered = allSops.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pillar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.summary || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchPillar = pillarFilter === "all" ||
      s.pillar.toLowerCase().includes(pillarFilter.toLowerCase());
    return matchSearch && matchPillar;
  });

  const featured = filtered.filter(s => s.is_popular);
  const rest     = filtered.filter(s => !s.is_popular);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Knowledge Base"
          title={category === "All" ? "Growth Library" : category}
          description="Playbooks, SOPs, and frameworks mapped to your bottleneck. Every resource is pillar-tagged."
        />
        <Link to="/library/saved" className="flex-shrink-0 self-start md:self-end">
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-white hover:border-white/[0.14] hover:bg-white/[0.05] transition-all">
            <Star className="h-3.5 w-3.5" /> Saved
          </button>
        </Link>
      </div>

      {/* Bento hero */}
      <BentoHero category={category} total={allSops.length} />

      {/* Stats strip */}
      <LibraryStats total={allSops.length} />

      {/* Search + filter */}
      <Reveal>
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
              <input
                placeholder={`Search ${category === "All" ? "all resources" : category.toLowerCase()}...`}
                className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-slate-500 hover:text-white hover:bg-white/[0.04] transition-colors flex-shrink-0">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </div>

          {/* Pillar filter pills */}
          <div className="flex flex-wrap gap-2">
            {PILLAR_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setPillarFilter(f.value)}
                className={`h-7 px-3 rounded-full text-[10px] font-mono transition-all ${
                  pillarFilter === f.value
                    ? "text-white border"
                    : "text-slate-600 border border-white/[0.05] hover:text-slate-300 hover:border-white/[0.10]"
                }`}
                style={pillarFilter === f.value ? {
                  backgroundColor: f.color + "18",
                  borderColor: f.color + "40",
                  color: f.color,
                } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Featured / Recommended */}
          {featured.length > 0 && (
            <div>
              <SectionLabel className="mb-5 flex items-center gap-2">
                <Star className="h-3 w-3 text-amber-500/60" />
                Recommended For Your Bottleneck
                <span className="ml-auto text-[9px] font-mono text-slate-600 normal-case tracking-normal">{featured.length} items</span>
              </SectionLabel>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featured.map((item, i) => (
                  <SOPCard key={item.id} item={item as typeof STATIC_SOPS[0]} index={i} featured />
                ))}
              </div>
            </div>
          )}

          {/* All resources */}
          <div>
            <SectionLabel className="mb-5 flex items-center gap-2">
              All {category === "All" ? "Resources" : category}
              <span className="ml-2 text-[9px] font-mono text-slate-600 normal-case tracking-normal">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
            </SectionLabel>

            {filtered.length === 0 ? (
              <EmptyState
                icons={[BookOpen, Search, Star]}
                title="No resources found"
                description={searchTerm ? "Try a different search term or pillar filter." : `No ${category.toLowerCase()} available yet.`}
                action={searchTerm ? { label: "Clear search", onClick: () => setSearchTerm("") } : undefined}
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item, i) => (
                  <SOPCard key={item.id} item={item as typeof STATIC_SOPS[0]} index={i} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
