import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, PlayCircle, Star, ArrowRight, Filter, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PremiumCard } from "@/components/PremiumCard";
import { supabase, type SOP } from "@/lib/supabase";

const TYPE_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  SOPs:       { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  Frameworks: { text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  Learnings:  { text: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  Playbooks:  { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
};

const cardVars = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18, delay: i * 0.07 },
  }),
};

export default function LibraryHub({
  category = "All",
}: {
  category?: "Learnings" | "SOPs" | "Frameworks" | "Playbooks" | "All";
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sops = [], isLoading } = useQuery<SOP[]>({
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

  const filtered = sops.filter(
    s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pillar.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const popular = filtered.filter(s => s.is_popular);
  const rest    = filtered.filter(s => !s.is_popular);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Knowledge Base"
          title={category === "All" ? "Growth Library" : category}
          description="Playbooks, templates, and frameworks mapped to your bottleneck."
        />
        <Link to="/library/saved" className="flex-shrink-0 self-start md:self-end">
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-white hover:border-white/[0.14] transition-all">
            <Star className="h-3.5 w-3.5" /> Saved
          </button>
        </Link>
      </div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <PremiumCard glowColor="rgba(255,255,255,0.04)" className="flex gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              placeholder={`Search ${category === "All" ? "resources" : category.toLowerCase()}...`}
              className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-slate-500 hover:text-white transition-colors flex-shrink-0">
            <Filter className="h-3.5 w-3.5" /> All Pillars
          </button>
        </PremiumCard>
      </motion.div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Recommended */}
          {popular.length > 0 && (
            <div>
              <SectionLabel className="mb-5">
                <Star className="h-3 w-3 inline mr-1.5 text-amber-500/60" />
                Recommended For You
              </SectionLabel>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popular.map((item, i) => {
                  const badge = TYPE_BADGE[item.category] ?? TYPE_BADGE.SOPs;
                  return (
                    <motion.div key={item.id} custom={i} variants={cardVars} initial="hidden" animate="show">
                      <PremiumCard glowColor={`${item.pillar_color}1A`} className="group relative h-full">
                        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${item.pillar_color}80, transparent)` }} />
                        <div className="p-5 flex flex-col gap-3 h-full">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${badge.text} ${badge.bg} ${badge.border}`}>
                              {item.category.replace(/s$/, "")}
                            </span>
                            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {item.read_time_mins} min
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{item.title}</p>
                            {item.summary && (
                              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{item.summary}</p>
                            )}
                            <p className="text-[10px] font-mono text-slate-600 mt-1.5">{item.pillar}</p>
                          </div>
                          <Link to={`/library/${item.slug}`}>
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
            <SectionLabel className="mb-5">
              All {category === "All" ? "Resources" : category} — {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </SectionLabel>
            {filtered.length === 0 ? (
              <EmptyState
                icons={[BookOpen, Search, Star]}
                title="No resources found"
                description={searchTerm ? "Try a different search term." : `No ${category.toLowerCase()} available yet.`}
                action={searchTerm ? { label: "Clear search", onClick: () => setSearchTerm("") } : undefined}
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item, i) => {
                  const badge = TYPE_BADGE[item.category] ?? TYPE_BADGE.SOPs;
                  return (
                    <motion.div key={item.id} custom={i + popular.length} variants={cardVars} initial="hidden" animate="show">
                      <PremiumCard glowColor={`${item.pillar_color}1A`} className="group flex flex-col h-full">
                        <div className="p-5 flex flex-col gap-4 flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${badge.text} ${badge.bg} ${badge.border}`}>
                              {item.category.replace(/s$/, "")}
                            </span>
                            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {item.read_time_mins} min
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-200 transition-colors">{item.title}</p>
                            {item.summary && (
                              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{item.summary}</p>
                            )}
                            <p className="text-[10px] font-mono text-slate-600 mt-1.5">{item.pillar}</p>
                          </div>
                          <Link to={`/library/${item.slug}`}>
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
        </>
      )}
    </div>
  );
}
