import { motion } from "framer-motion";
import { ArrowLeft, Clock, Target, Calendar, CheckSquare, MessageSquare, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SectionLabel } from "@/components/PageHeader";

const PILLAR_COLOR = "#1D9E75";

const MOCK_CHECKINS = [
  { week: 2, date: "Oct 15", metric: 22, note: "Implemented new follow-up script. Seeing early signs of higher response rate, but team needs more roleplay." },
  { week: 1, date: "Oct 8",  metric: 18, note: "Rolled out discovery template. Still getting used to it." },
];

export default function SprintDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back link */}
      <Link to="/sprints" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sprints
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-white/[0.04]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: PILLAR_COLOR, backgroundColor: `${PILLAR_COLOR}18`, borderColor: `${PILLAR_COLOR}30` }}>
              Sales & Conversion
            </span>
            {/* Pulsing active badge */}
            <span className="flex items-center gap-2 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Active
            </span>
          </div>
          <h1 className="text-4xl font-display font-light text-white tracking-tight mb-3">Increase Sales Close Rate</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Pathway: Sales Engine</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Ends: Nov 12</span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Link to={`/sprints/${id}/checkin`}>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 hover:bg-violet-500/20 transition-all">
              <CheckSquare className="w-4 h-4" /> Log Check-in
            </button>
          </Link>
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:border-white/[0.16] transition-all">
            End Early
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="md:col-span-2 space-y-6">
          {/* Metric card */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
            className="rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-8 overflow-hidden"
            style={{ borderColor: `${PILLAR_COLOR}20` }}>
            <div className="flex justify-between items-end">
              {[
                { label: "Baseline", value: "15%", muted: true },
                { label: "Current",  value: "22%", muted: false },
                { label: "Target",   value: "35%", muted: true },
              ].map(({ label, value, muted }) => (
                <div key={label} className="text-center flex-1">
                  <p className={`font-display font-light tracking-tighter ${muted ? "text-2xl text-slate-500" : "text-5xl"}`}
                    style={!muted ? { color: PILLAR_COLOR } : undefined}>
                    {value}
                  </p>
                  <p className={`text-[10px] font-mono uppercase tracking-widest mt-2 ${muted ? "text-slate-600" : "font-semibold"}`}
                    style={!muted ? { color: PILLAR_COLOR } : undefined}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] font-mono text-slate-600 mt-6">Metric: Close Rate (Qualified to Closed-Won)</p>
          </motion.div>

          {/* Check-in history */}
          <div>
            <SectionLabel className="mb-4">Check-in History</SectionLabel>
            <div className="space-y-3">
              {MOCK_CHECKINS.map((checkin, i) => (
                <motion.div key={checkin.week}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, type: "spring", stiffness: 100, damping: 18 }}
                  className="rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-semibold text-violet-400">Week {checkin.week}</span>
                      <span className="text-[10px] font-mono text-slate-600">{checkin.date}</span>
                    </div>
                    <span className="font-mono text-lg font-light" style={{ color: PILLAR_COLOR }}>{checkin.metric}%</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">"{checkin.note}"</p>
                  <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-start gap-3">
                    <Sparkles className="h-3.5 w-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="text-violet-400 font-medium">AI Insight: </span>
                      You've improved 4% over baseline. Focus this week on making sure the team isn't rushing the discovery phase just to use the new script.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Sprint details */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}
            className="rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04]"><SectionLabel>Sprint Details</SectionLabel></div>
            <div className="p-5 space-y-3 text-sm">
              {[
                { label: "Days Remaining",  value: "12 Days",       valueClass: "text-white" },
                { label: "Check-in Cadence",value: "Every Friday",  valueClass: "text-white" },
                { label: "Status",          value: "On Track",      valueClass: "text-emerald-400" },
              ].map(({ label, value, valueClass }) => (
                <div key={label} className="flex justify-between py-2 border-b border-white/[0.03] last:border-0">
                  <span className="text-slate-500 text-xs">{label}</span>
                  <span className={`text-xs font-mono font-semibold ${valueClass}`}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Advisor CTA */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 18 }}
            className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 text-center">
            <Sparkles className="h-5 w-5 text-violet-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white mb-1.5">Need a strategy pivot?</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Discuss your sprint progress and roadblocks with the AI Advisor.</p>
            <Link to="/advisor">
              <button className="w-full h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(109,74,230,0.3)] hover:shadow-[0_0_20px_rgba(109,74,230,0.4)]">
                Consult AI Advisor
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
