import { motion } from "framer-motion";
import { Bookmark, Clock, ArrowRight, BookOpen, FileText, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

const MOCK_SAVED = [
  { id: "sop-1", title: "The Perfect Sales Script Template", pillar: "Sales & Conversion", color: "#1D9E75", type: "SOP", time: "15 min read", progress: 60 },
  { id: "sop-3", title: "LinkedIn Outbound System", pillar: "Customer Acquisition", color: "#378ADD", type: "Pathway", time: "4 weeks", progress: 0 },
];

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

export default function LibrarySaved() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <PageHeader
        label="Knowledge Base"
        title="Saved Items"
        description="Your bookmarked SOPs, frameworks, and tools."
      />

      {MOCK_SAVED.length === 0 ? (
        <EmptyState
          icons={[BookOpen, FileText, Compass]}
          title="Nothing saved yet"
          description="Explore the library to find and save resources you want to implement."
          action={{ label: "Browse Library", onClick: () => {} }}
          className="min-h-[320px]"
        />
      ) : (
        <div>
          <SectionLabel className="mb-5">Saved — {MOCK_SAVED.length} items</SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_SAVED.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVars}
                initial="hidden"
                animate="show"
                className="group relative rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Progress bar at top */}
                {item.progress > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/[0.04]">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                )}

                <div className="p-5 flex flex-col gap-4 pt-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
                      style={{ color: item.color, backgroundColor: `${item.color}18`, borderColor: `${item.color}30` }}
                    >
                      {item.type}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
                      <Clock className="h-3 w-3" /> {item.time}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors duration-200">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.pillar}</p>
                  </div>

                  <Link to={`/library/${item.id}`}>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.10] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200">
                      <span>{item.progress > 0 ? "Continue" : "View Resource"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
