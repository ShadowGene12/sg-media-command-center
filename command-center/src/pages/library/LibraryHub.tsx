import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, PlayCircle, Star, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PremiumCard } from "@/components/PremiumCard";

const MOCK_LIBRARY = [
  { id: "sop-1", title: "The Perfect Sales Script Template", pillar: "Sales & Conversion", color: "#1D9E75", type: "SOP",       time: "15 min read", popular: true },
  { id: "sop-2", title: "Objection Handling Matrix",         pillar: "Sales & Conversion", color: "#1D9E75", type: "Framework",  time: "10 min read", popular: false },
  { id: "sop-3", title: "LinkedIn Outbound System",          pillar: "Customer Acquisition",color:"#378ADD", type: "Learning",   time: "4 weeks",     popular: true },
  { id: "sop-4", title: "Offer Clarity Audit",               pillar: "Market & Offer",      color: "#6D4AE6", type: "Framework", time: "5 min",       popular: false },
];

const TYPE_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  SOP:       { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  Framework: { text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  Learning:  { text: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  Playbook:  { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
};

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.07 } }),
};

export default function LibraryHub({ category = "All" }: { category?: "Learnings" | "SOPs" | "Frameworks" | "Playbooks" | "All" }) {
  const [searchTerm, setSearchTerm] = useState("");

  const categoryToTypeMap: Record<string, string[]> = {
    Learnings:  ["Learning"],
    SOPs:       ["SOP"],
    Frameworks: ["Framework"],
    Playbooks:  ["Playbook", "SOP"],
    All:        ["SOP", "Framework", "Learning", "Playbook"],
  };

  const allowedTypes = categoryToTypeMap[category] ?? categoryToTypeMap.All;
  const filteredItems = MOCK_LIBRARY.filter(
    item => allowedTypes.includes(item.type) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.pillar.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const popular = filteredItems.filter(i => i.popular);
  const rest = filteredItems.filter(i => !i.popular);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Knowledge Base"
          title={category === "All" ? "Growth Library" : category}
          description="Your repository of playbooks, templates, and frameworks."
        />
        <Link to="/library/saved" className="flex-shrink-0 self-start md:self-end">
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-white hover:border-white/[0.14] transition-all">
            <Star className="h-3.5 w-3.5" /> Saved Items
          </button>
        </Link>
      </div>

      {/* Search bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <PremiumCard glowColor="rgba(255,255,255,0.04)" className="flex gap-3 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
          <input
            placeholder={`Search ${category === "All" ? "resources" : category.toLowerCase()}...`}
            className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] transition-all font-display"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-slate-500 hover:text-white transition-colors flex-shrink-0">
          <Filter className="h-3.5 w-3.5" /> All Pillars
        </button>
      </PremiumCard>
      </motion.div>

      {/* Recommended */}
      {popular.length > 0 && (
        <div>
          <SectionLabel className="mb-5">
            <Star className="h-3 w-3 inline mr-1.5 text-amber-500/60" />
            Recommended {category === "All" ? "For You" : category}
          </SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((item, i) => {
              const badge = TYPE_BADGE[item.type] ?? TYPE_BADGE.SOP;
              return (
                <motion.div key={item.id} custom={i} variants={cardVars} initial="hidden" animate="show">
                  <PremiumCard glowColor={`${item.color}1A`} className="group relative">
                    <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${item.color}80, transparent)` }} />
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${badge.text} ${badge.bg} ${badge.border}`}>{item.type}</span>
                        <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                          {item.type === "Learning" ? <PlayCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />} {item.time}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{item.title}</p>
                        <p className="text-[10px] font-mono text-slate-600 mt-1">{item.pillar}</p>
                      </div>
                      <Link to={`/library/${item.id}`}>
                        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] text-xs font-mono text-slate-500 hover:text-white transition-all">
                          <span>Open</span><ArrowRight className="h-3 w-3" />
                        </button>
                      </Link>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* All resources */}
      <div>
        <SectionLabel className="mb-5">All {category === "All" ? "Resources" : category} — {filteredItems.length} items</SectionLabel>
        {filteredItems.length === 0 ? (
          <EmptyState
            icons={[BookOpen, Search, Star]}
            title="No resources found"
            description={`No ${category.toLowerCase()} matching your search criteria.`}
            action={{ label: "Clear search", onClick: () => setSearchTerm("") }}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, i) => {
              const badge = TYPE_BADGE[item.type] ?? TYPE_BADGE.SOP;
              return (
                <motion.div key={item.id} custom={i + popular.length} variants={cardVars} initial="hidden" animate="show">
                  <PremiumCard glowColor={`${item.color}1A`} className="group flex flex-col">
                    <div className="p-5 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${badge.text} ${badge.bg} ${badge.border}`}>{item.type}</span>
                        <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{item.title}</p>
                        <p className="text-[10px] font-mono text-slate-600 mt-1">{item.pillar}</p>
                      </div>
                      <Link to={`/library/${item.id}`}>
                        <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] text-xs font-mono text-slate-400 hover:text-white transition-all">
                          <span>View Resource</span><ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
