import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type SOP } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCard } from "@/components/PremiumCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  Plus, Edit2, Trash2, Eye, X, Loader2, Save, FileText, Clock, Star,
} from "lucide-react";

const PILLARS = [
  { value: "Market & Offer Clarity", color: "#6D4AE6" },
  { value: "Customer Acquisition",   color: "#378ADD" },
  { value: "Sales & Conversion",     color: "#1D9E75" },
  { value: "Profit Optimization",    color: "#F59E0B" },
  { value: "Financial & Performance Control", color: "#D85A30" },
];
const CATEGORIES = ["SOPs", "Frameworks", "Playbooks", "Learnings"];

const EMPTY: Partial<SOP> = {
  slug: "", title: "", pillar: "Sales & Conversion", pillar_color: "#1D9E75",
  category: "SOPs", read_time_mins: 10, is_popular: false,
  tier_required: "starter", summary: "", content: "# Title\n\n## Overview\n\nWrite SOP content here.",
};

export default function AdminSOPs() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<SOP> | null>(null);
  const [preview, setPreview] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const { data: sops = [], isLoading } = useQuery<SOP[]>({
    queryKey: ["admin-sops"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sops").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30_000,
  });

  const upsert = useMutation({
    mutationFn: async (sop: Partial<SOP>) => {
      if (!sop.slug || !sop.title || !sop.content) throw new Error("Slug, title, and content are required.");
      // Auto-set pillar_color from pillar
      const meta = PILLARS.find(p => p.value === sop.pillar);
      const payload = { ...sop, pillar_color: meta?.color ?? sop.pillar_color };
      if (sop.id) {
        const { error } = await supabase.from("sops").update(payload).eq("id", sop.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("sops").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-sops"] });
      qc.invalidateQueries({ queryKey: ["sops"] });
      setEditing(null);
      toast.success("SOP saved.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteSOP = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("sops").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-sops"] });
      qc.invalidateQueries({ queryKey: ["sops"] });
      setDeleting(null);
      toast.success("SOP deleted.");
    },
    onError: () => toast.error("Failed to delete SOP."),
  });

  const set = (k: keyof SOP, v: unknown) => setEditing(e => e ? { ...e, [k]: v } : e);

  // ── Editor panel ──────────────────────────────────────────────
  if (editing !== null) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-1">Admin · SOP Manager</p>
            <h1 className="text-3xl font-display font-light text-white">{editing.id ? "Edit SOP" : "New SOP"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPreview(p => !p)}
              className="text-slate-400 hover:text-white border border-white/10 gap-2">
              <Eye className="w-3.5 h-3.5" />
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditing(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              disabled={upsert.isPending}
              onClick={() => upsert.mutate(editing)}
              className="bg-violet-600 hover:bg-violet-500 text-white gap-2"
            >
              {upsert.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: metadata */}
          <PremiumCard className="p-6 space-y-4">
            <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest">Metadata</h2>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Slug (URL key)</label>
              <Input value={editing.slug ?? ""} onChange={e => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="sales-script-template"
                className="h-10 bg-white/[0.04] border-white/[0.08] text-white text-sm focus-visible:ring-0 focus-visible:border-violet-500/60" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Title</label>
              <Input value={editing.title ?? ""} onChange={e => set("title", e.target.value)}
                placeholder="The Perfect Sales Script"
                className="h-10 bg-white/[0.04] border-white/[0.08] text-white text-sm focus-visible:ring-0 focus-visible:border-violet-500/60" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Summary</label>
              <textarea value={editing.summary ?? ""} onChange={e => set("summary", e.target.value)}
                placeholder="One-line description shown in library cards..."
                rows={2}
                className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl p-3 resize-none focus:outline-none focus:border-violet-500/50 font-light"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Pillar</label>
                <select value={editing.pillar ?? ""} onChange={e => {
                  const p = PILLARS.find(p => p.value === e.target.value);
                  set("pillar", e.target.value);
                  if (p) set("pillar_color", p.color);
                }}
                  className="w-full h-10 bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 focus:outline-none focus:border-violet-500/50">
                  {PILLARS.map(p => <option key={p.value} value={p.value} className="bg-[#0A0A0C]">{p.value}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
                <select value={editing.category ?? "SOPs"} onChange={e => set("category", e.target.value)}
                  className="w-full h-10 bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 focus:outline-none focus:border-violet-500/50">
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0A0A0C]">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Read Time (min)</label>
                <Input type="number" value={editing.read_time_mins ?? 10} onChange={e => set("read_time_mins", Number(e.target.value))}
                  className="h-10 bg-white/[0.04] border-white/[0.08] text-white text-sm focus-visible:ring-0 focus-visible:border-violet-500/60" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Tier Required</label>
                <select value={editing.tier_required ?? "starter"} onChange={e => set("tier_required", e.target.value)}
                  className="w-full h-10 bg-white/[0.04] border border-white/[0.08] text-white text-sm rounded-xl px-3 focus:outline-none focus:border-violet-500/50">
                  {["free", "starter", "operator", "studio", "dfy"].map(t => (
                    <option key={t} value={t} className="bg-[#0A0A0C]">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set("is_popular", !editing.is_popular)}
                className={`w-10 h-5 rounded-full transition-colors ${editing.is_popular ? "bg-violet-600" : "bg-white/10"} flex items-center px-0.5`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${editing.is_popular ? "translate-x-5" : ""}`} />
              </div>
              <span className="text-sm text-white/60 font-light">Mark as recommended (shows first in library)</span>
            </label>
          </PremiumCard>

          {/* Right: content editor / preview */}
          <PremiumCard className="p-6 flex flex-col">
            <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
              {preview ? "Content Preview" : "Content (Markdown)"}
            </h2>
            {preview ? (
              <div className="flex-1 overflow-y-auto prose prose-invert prose-sm max-w-none
                prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight
                prose-p:text-slate-400 prose-p:font-light prose-li:text-slate-400
                prose-strong:text-white prose-code:text-violet-400 prose-blockquote:border-violet-500/40">
                <ReactMarkdown>{editing.content ?? ""}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={editing.content ?? ""}
                onChange={e => set("content", e.target.value)}
                className="flex-1 w-full bg-white/[0.02] border border-white/[0.06] text-white/80 text-xs rounded-xl p-4 resize-none focus:outline-none focus:border-violet-500/30 font-mono leading-relaxed"
                style={{ minHeight: "420px" }}
                placeholder="Write SOP content in Markdown..."
              />
            )}
          </PremiumCard>
        </div>
      </div>
    );
  }

  // ── SOP list ──────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-2">Admin</p>
          <h1 className="text-4xl font-display font-light text-white tracking-tight">SOP Manager</h1>
          <p className="text-slate-500 text-sm mt-1 font-light">{sops.length} SOPs published</p>
        </div>
        <Button onClick={() => setEditing({ ...EMPTY })} className="bg-violet-600 hover:bg-violet-500 text-white gap-2">
          <Plus className="w-4 h-4" /> New SOP
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {sops.map((sop, i) => (
              <motion.div
                key={sop.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
              >
                <PremiumCard glowColor={`${sop.pillar_color}12`} className="flex items-center gap-4 p-4 group">
                  <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: sop.pillar_color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-white/90 truncate">{sop.title}</span>
                      {sop.is_popular && <Star className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
                      <span>{sop.pillar}</span>
                      <span>·</span>
                      <span>{sop.category}</span>
                      <span>·</span>
                      <Clock className="w-2.5 h-2.5" />
                      <span>{sop.read_time_mins}m</span>
                      <span>·</span>
                      <span className="text-slate-700">/{sop.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(sop)}
                      className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {deleting === sop.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-red-400 font-mono">Confirm?</span>
                        <button onClick={() => deleteSOP.mutate(sop.id)} className="text-[10px] font-mono text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-500/10">Yes</button>
                        <button onClick={() => setDeleting(null)} className="text-[10px] font-mono text-slate-500 px-2 py-1">No</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleting(sop.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-700 flex-shrink-0">
                    {new Date(sop.created_at).toLocaleDateString()}
                  </span>
                </PremiumCard>
              </motion.div>
            ))}
          </AnimatePresence>
          {sops.length === 0 && (
            <PremiumCard className="p-12 text-center">
              <FileText className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 font-light text-sm">No SOPs yet. Create your first one.</p>
            </PremiumCard>
          )}
        </div>
      )}
    </div>
  );
}
