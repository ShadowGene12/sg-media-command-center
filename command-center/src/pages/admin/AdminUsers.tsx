import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/PremiumCard";
import { Loader2, User, Activity, TrendingUp, Shield } from "lucide-react";

export default function AdminUsers() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // Load profiles + trial + latest diagnostic per user
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!profiles) return [];

      const { data: trials } = await supabase.from("trial_access").select("*");
      const { data: diags } = await supabase
        .from("diagnostics")
        .select("user_id, overall_score, primary_pillar, created_at")
        .order("created_at", { ascending: false });

      const trialMap = Object.fromEntries((trials ?? []).map(t => [t.user_id, t]));
      // Latest diagnostic per user
      const diagMap: Record<string, any> = {};
      for (const d of diags ?? []) {
        if (!diagMap[d.user_id]) diagMap[d.user_id] = d;
      }

      return profiles.map(p => ({
        ...p,
        trial: trialMap[p.id],
        diagnostic: diagMap[p.id],
      }));
    },
    staleTime: 30_000,
  });

  const TIER_COLORS: Record<string, string> = {
    trial: "#6D4AE6", free: "#515B68", starter: "#378ADD",
    operator: "#1D9E75", studio: "#F59E0B", dfy: "#D85A30",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-2">Admin</p>
        <h1 className="text-4xl font-display font-light text-white tracking-tight">Users</h1>
        <p className="text-slate-500 text-sm mt-1 font-light">{users.length} registered users</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total",    value: users.length,                                            color: "#6D4AE6" },
          { label: "On Trial", value: users.filter((u: any) => u.trial?.tier === "trial").length, color: "#378ADD" },
          { label: "Diagnosed", value: users.filter((u: any) => u.diagnostic).length,            color: "#1D9E75" },
          { label: "Admins",   value: users.filter((u: any) => u.is_admin).length,               color: "#F59E0B" },
        ].map(s => (
          <PremiumCard key={s.label} glowColor={`${s.color}12`} className="p-4 text-center">
            <div className="text-2xl font-display font-light text-white">{s.value}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest mt-1" style={{ color: s.color }}>{s.label}</div>
          </PremiumCard>
        ))}
      </div>

      {/* User table */}
      <PremiumCard glowColor="rgba(109,74,230,0.06)" className="overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.04] text-[9px] font-mono text-slate-600 uppercase tracking-widest">
          <div className="col-span-3">Name / Business</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Tier</div>
          <div className="col-span-2">Score</div>
          <div className="col-span-2">Joined</div>
        </div>

        {users.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-8 h-8 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-light">No users yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {users.map((u: any, i: number) => {
              const tier = u.trial?.tier ?? "free";
              const tierColor = TIER_COLORS[tier] ?? "#515B68";
              return (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors items-center"
                >
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-[10px] font-mono text-violet-400 font-bold flex-shrink-0">
                        {u.first_name?.[0]?.toUpperCase() ?? u.email?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-white/80 font-light truncate">
                          {u.first_name || u.last_name ? `${u.first_name} ${u.last_name}`.trim() : "—"}
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 truncate">{u.business_name || "No business"}</div>
                      </div>
                      {u.is_admin && <Shield className="w-3 h-3 text-violet-400 flex-shrink-0" title="Admin" />}
                    </div>
                  </div>

                  <div className="col-span-3">
                    <span className="text-xs font-mono text-slate-500 truncate block">{u.email}</span>
                  </div>

                  <div className="col-span-2">
                    <span
                      className="text-[10px] font-mono font-semibold px-2 py-1 rounded-full"
                      style={{ color: tierColor, backgroundColor: tierColor + "15" }}
                    >
                      {tier.toUpperCase()}
                    </span>
                  </div>

                  <div className="col-span-2">
                    {u.diagnostic ? (
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-violet-400/60" />
                        <span className="font-mono text-sm text-white/70">
                          {Number(u.diagnostic.overall_score).toFixed(1)}
                        </span>
                        <span className="text-[10px] text-slate-700">/25</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-700">No diagnostic</span>
                    )}
                  </div>

                  <div className="col-span-2">
                    <span className="text-[10px] font-mono text-slate-700">
                      {new Date(u.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </PremiumCard>
    </div>
  );
}
