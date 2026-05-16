import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Bookmark, Loader2, MessageSquare, BookOpen } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type SOP } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { PremiumCard } from '@/components/PremiumCard';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function LibrarySOPDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);

  // Load SOP from DB
  const { data: sop, isLoading, error } = useQuery<SOP | null>({
    queryKey: ['sop', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('sops').select('*').eq('slug', slug!).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });

  // Mark as read when loaded
  useQuery({
    queryKey: ['sop-read', slug, user?.id],
    queryFn: async () => {
      if (!user || !slug) return null;
      await supabase.from('sop_interactions').upsert({
        user_id: user.id,
        sop_slug: slug,
        status: 'read',
        updated_at: new Date().toISOString(),
      });
      return true;
    },
    enabled: !!user && !!slug && !!sop,
    staleTime: Infinity,
  });

  // Save/unsave toggle
  const saveToggle = useMutation({
    mutationFn: async () => {
      if (!user || !slug) return;
      if (isSaved) {
        await supabase.from('sop_interactions').delete().eq('user_id', user.id).eq('sop_slug', slug);
      } else {
        await supabase.from('sop_interactions').upsert({
          user_id: user.id,
          sop_slug: slug,
          status: 'saved',
          updated_at: new Date().toISOString(),
        });
      }
      setIsSaved(s => !s);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (!sop || error) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
        <h2 className="text-xl font-display font-light text-white">Resource not found</h2>
        <p className="text-slate-500 text-sm">This resource may not exist or hasn't been published yet.</p>
        <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-violet-400">
          ← Go back
        </Button>
      </div>
    );
  }

  const categoryColor: Record<string, string> = {
    SOPs: "#1D9E75",
    Frameworks: "#6D4AE6",
    Learnings: "#378ADD",
    Playbooks: "#F59E0B",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto space-y-8 pb-16"
    >
      {/* Back */}
      <Link to="/library/sops" className="inline-flex items-center text-sm text-slate-500 hover:text-white transition-colors font-mono gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Link>

      {/* Header */}
      <div className="space-y-4 border-b border-white/[0.06] pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color: categoryColor[sop.category] ?? sop.pillar_color,
              backgroundColor: (categoryColor[sop.category] ?? sop.pillar_color) + "15",
              borderColor: (categoryColor[sop.category] ?? sop.pillar_color) + "30",
            }}
          >
            {sop.category.replace(/s$/, "")}
          </span>
          <span className="text-[10px] font-mono text-slate-600">{sop.pillar}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-light text-white tracking-tight leading-tight">
          {sop.title}
        </h1>

        {sop.summary && (
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">{sop.summary}</p>
        )}

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
            <Clock className="w-4 h-4" /> {sop.read_time_mins} min read
          </div>
          <button
            onClick={() => saveToggle.mutate()}
            disabled={!user}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-mono disabled:opacity-40"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-violet-400 text-violet-400" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
          <Link to="/advisor" className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors font-mono">
            <MessageSquare className="w-4 h-4" /> Ask AI Advisor
          </Link>
        </div>
      </div>

      {/* Content — render markdown */}
      <PremiumCard glowColor={`${sop.pillar_color}10`} className="p-8 md:p-10">
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
          prose-h1:text-2xl prose-h1:mb-6
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-white/90
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-white/80 prose-h3:font-medium
          prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-p:my-3
          prose-strong:text-white/90 prose-strong:font-semibold
          prose-em:text-slate-300
          prose-blockquote:border-l-2 prose-blockquote:border-violet-500/40 prose-blockquote:pl-4 prose-blockquote:text-slate-400 prose-blockquote:italic prose-blockquote:not-italic
          prose-code:text-violet-400 prose-code:bg-violet-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-li:text-slate-400 prose-li:font-light prose-li:marker:text-violet-500
          prose-ul:my-4 prose-ol:my-4
          prose-table:text-xs prose-th:text-white/70 prose-th:font-mono prose-th:text-[10px] prose-th:uppercase prose-th:tracking-wider
          prose-td:text-slate-400 prose-td:border-white/[0.06]
          prose-hr:border-white/[0.08]
        ">
          <ReactMarkdown>{sop.content}</ReactMarkdown>
        </div>
      </PremiumCard>

      {/* Next steps */}
      <div className="grid md:grid-cols-2 gap-4">
        <PremiumCard glowColor="rgba(109,74,230,0.08)" className="p-5">
          <h3 className="text-sm font-display font-medium text-white mb-2">Ask AI Advisor about this SOP</h3>
          <p className="text-xs text-slate-500 mb-4 font-light">Get context-specific advice based on your diagnosis and this framework.</p>
          <Link to="/advisor">
            <Button size="sm" variant="ghost" className="h-8 text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border border-violet-500/20 rounded-lg px-3">
              Open AI Advisor →
            </Button>
          </Link>
        </PremiumCard>
        <PremiumCard glowColor="rgba(29,158,117,0.08)" className="p-5">
          <h3 className="text-sm font-display font-medium text-white mb-2">Add to your action plan</h3>
          <p className="text-xs text-slate-500 mb-4 font-light">Create an action item from this SOP and track implementation.</p>
          <Link to="/actions">
            <Button size="sm" variant="ghost" className="h-8 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3">
              View action plan →
            </Button>
          </Link>
        </PremiumCard>
      </div>
    </motion.div>
  );
}
