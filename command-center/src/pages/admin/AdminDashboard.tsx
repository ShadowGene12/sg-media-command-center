import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Users, FileText, Activity, TrendingUp, Loader2, BarChart3 } from "lucide-react";
import { PremiumCard } from "@/components/PremiumCard";

const cardVars = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 18, delay: i * 0.08 } }),
};

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [users, diags, sops, actions] = await Promise.all([
        supabase.from("profiles").select("id, created_at, business_name, first_name, last_name", { count: "exact" }),
        supabase.from("diagnostics").select("id, overall_score, created_at, primary_pillar", { count: "exact" }),
        supabase.from("sops").select("id, title, category", { count: "exact" }),
        supabase.from("action_items").select("id, status", { count: "exact" }),
      ]);
      return {
        userCount: users.count ?? 0,
        diagCount: diags.count ?? 0,
        sopCount: sops.count ?? 0,
        actionCount: actions.count ?? 0,
        recentUsers: (users.data ?? []).slice(-5).reverse(),
        recentDiags: (diags.data ?? []).slice(-5).reverse(),
        avgScore: diags.data?.length
          ? (diags.data.reduce((s, d) => s + Number(d.overall_score), 0) / diags.data.length).toFixed(1)
          : "—",
        completedActions: actions.data?.filter(a => a.status === "completed").length ?? 0,
      };
    },
    staleTime: 30_000,
  });

  const CARDS = [
    { label: "Total Users", value: stats?.userCount ?? 0, icon: Users, color: "#6D4AE6" },
    { label: "Diagnostics Run", value: stats?.diagCount ?? 0, icon: Activity, color: "#378ADD" },
    { label: "Avg Growth Score", value: stats ? `${stats.avgScore}/25` : "—", icon: BarChart3, color: "#1D9E75" },
    { label: "SOPs Published", value: stats?.sopCount ?? 0, icon: FileText, color: "#F59E0B" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-2">Admin</p>
        <h1 className="text-4xl font-display font-light text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1 font-light">SG Media Command Center — admin overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CARDS.map((card, i) => (
          <motion.div key={card.label} custom={i} variants={cardVars} initial="hidden" animate="show">
            <PremiumCard glowColor={`${card.color}15`} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.color + "15" }}>
                  <card.icon className="w-4 h-4" style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-2xl font-display font-light text-white mb-1">{card.value}</div>
              <div className="text-xs font-mono text-slate-600 uppercase tracking-widest">{card.label}</div>
            </PremiumCard>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent users */}
        <PremiumCard glowColor="rgba(109,74,230,0.08)" className="p-6">
          <h2 className="text-sm font-display font-medium text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" /> Recent Users
          </h2>
          {stats?.recentUsers.length === 0 ? (
            <p className="text-slate-600 text-xs font-mono">No users yet.</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80 font-light">
                      {u.first_name || u.last_name ? `${u.first_name} ${u.last_name}`.trim() : "—"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-600">{u.business_name || "No business name"}</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-700">
                    {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </PremiumCard>

        {/* Recent diagnostics */}
        <PremiumCard glowColor="rgba(55,138,221,0.08)" className="p-6">
          <h2 className="text-sm font-display font-medium text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Recent Diagnostics
          </h2>
          {stats?.recentDiags.length === 0 ? (
            <p className="text-slate-600 text-xs font-mono">No diagnostics yet.</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentDiags.map((d: any) => (
                <div key={d.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80 font-mono">{Number(d.overall_score).toFixed(1)}/25</div>
                    <div className="text-[10px] font-mono text-slate-600">
                      {d.primary_pillar?.replace(/_/g, " ") ?? "—"}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-700">
                    {new Date(d.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </PremiumCard>
      </div>
    </div>
  );
}
