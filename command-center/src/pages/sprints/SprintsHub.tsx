import { motion } from "framer-motion";
import {
  Plus,
  Target,
  CheckSquare,
  BarChart3,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TierLockedCard } from "@/components/TierLockedCard";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PremiumCard } from "@/components/PremiumCard";

import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export interface Sprint {
  id: string;
  title: string;
  pillar: string;
  color: string;
  metric_name: string;
  baseline_value: number;
  current_value: number;
  target_value: number;
  start_date?: string;
  end_date?: string;
  status: string;
  daysRemaining?: number;
  lastCheckin?: string;
}

export const FALLBACK_SPRINT: Sprint = {
  id: "spr-1",
  title: "Increase Sales Close Rate",
  pillar: "Sales & Conversion",
  color: "#1D9E75",
  metric_name: "Close Rate (%)",
  baseline_value: 15,
  current_value: 22,
  target_value: 35,
  daysRemaining: 12,
  lastCheckin: "2 days ago",
  status: "active",
};

export default function SprintsHub() {
  const { user } = useAuth();

  const { data: dbSprints, isLoading } = useQuery<Sprint[]>({
    queryKey: ["sprints", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("sprints")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Sprints table error (using fallback):", error.message);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  const activeSprint = dbSprints?.find((s) => s.status === 'active') ?? FALLBACK_SPRINT;
  const pastSprints = dbSprints?.filter((s) => s.status !== 'active') ?? [];

  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      ((activeSprint.current_value - activeSprint.baseline_value) /
        (activeSprint.target_value - activeSprint.baseline_value)) *
        100,
    ),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <PageHeader
          label="Focused Execution"
          title="Sprint Tracker"
          description="Move one critical metric at a time with structured 4-6 week sprints."
        />
        <Link to="/sprints/new" className="flex-shrink-0">
          <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(109,74,230,0.2)]">
            <Plus className="w-4 h-4" /> Start New Sprint
          </button>
        </Link>
      </div>

      <TierLockedCard
        isLocked={false}
        title="Unlock the Sprint Tracker"
        description="Execute focused sprints with metric tracking and AI-driven weekly insights."
        tierRequired="Pro"
      >
        {/* Active sprint */}
        <div>
          <SectionLabel className="mb-5">Active Sprint</SectionLabel>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 100,
              damping: 18,
            }}
          >
            <PremiumCard glowColor="rgba(29,158,117,0.10)">
              {/* Progress bar */}
              <div className="h-0.5 bg-white/[0.04] w-full">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: activeSprint.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>

              <div className="md:flex">
                {/* Left: details */}
                <div className="p-7 md:w-1/2 border-b border-white/[0.04] md:border-b-0 md:border-r md:border-white/[0.04]">
                  <span
                    className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border inline-block mb-4"
                    style={{
                      color: activeSprint.color,
                      backgroundColor: `${activeSprint.color}18`,
                      borderColor: `${activeSprint.color}30`,
                    }}
                  >
                    {activeSprint.pillar}
                  </span>
                  <h3 className="text-xl font-display font-light text-white mb-2">
                    {activeSprint.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono flex items-center gap-2 mb-6">
                    <Clock className="w-3 h-3" /> {activeSprint.daysRemaining}{" "}
                    days remaining · Last check-in {activeSprint.lastCheckin}
                  </p>
                  <div className="flex gap-3">
                    <Link to={`/sprints/${activeSprint.id}`}>
                      <button className="flex items-center gap-2 h-9 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white hover:bg-white/[0.10] transition-all">
                        View Dashboard
                      </button>
                    </Link>
                    <Link to={`/sprints/${activeSprint.id}/checkin`}>
                      <button
                        className="flex items-center gap-2 h-9 px-4 rounded-xl border text-sm transition-all"
                        style={{
                          color: activeSprint.color,
                          borderColor: `${activeSprint.color}40`,
                          backgroundColor: `${activeSprint.color}10`,
                        }}
                      >
                        <CheckSquare className="w-3.5 h-3.5" /> Log Check-in
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right: metric */}
                <div className="p-7 md:w-1/2 flex flex-col justify-center">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> {activeSprint.metric_name ?? activeSprint.metric}
                  </p>
                  <div className="flex items-end justify-around">
                    {[
                      {
                        label: "Baseline",
                        value: activeSprint.baseline_value ?? activeSprint.baseline,
                        muted: true,
                      },
                      {
                        label: "Current",
                        value: activeSprint.current_value ?? activeSprint.current,
                        muted: false,
                      },
                      {
                        label: "Target",
                        value: activeSprint.target_value ?? activeSprint.target,
                        muted: true,
                      },
                    ].map(({ label, value, muted }) => (
                      <div key={label} className="text-center">
                        <p
                          className={`font-display font-light tracking-tighter ${muted ? "text-3xl text-slate-500" : "text-5xl text-white"}`}
                          style={
                            !muted ? { color: activeSprint.color } : undefined
                          }
                        >
                          {value}
                        </p>
                        <p
                          className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${muted ? "text-slate-600" : "font-semibold"}`}
                          style={
                            !muted ? { color: activeSprint.color } : undefined
                          }
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        {/* Sprint history */}
        <div className="pt-4">
          <SectionLabel className="mb-5">Sprint History</SectionLabel>
          {pastSprints.length === 0 ? (
            <EmptyState
              icons={[Target, BarChart3, CheckSquare]}
              title="No past sprints yet"
              description="Finish your active sprint to start building your performance track record."
              className="min-h-[220px]"
            />
          ) : (
            <PremiumCard
              glowColor="rgba(255,255,255,0.04)"
              className="p-4 space-y-3"
            >
              {pastSprints.map((sprint: any) => (
                <div
                  key={sprint.id}
                  className="rounded-xl border border-white/[0.06] bg-black/30 p-5 flex flex-col md:flex-row items-center gap-5 justify-between"
                >
                  <div>
                    <h3 className="font-medium text-white">{sprint.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {sprint.pillar}
                    </p>
                  </div>
                  <div className="flex gap-8 items-center">
                    <div className="text-center">
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        {sprint.metric_name}
                      </p>
                      <p className="font-mono text-sm text-white mt-0.5">
                        {sprint.baseline_value} → {sprint.target_value}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold border ${sprint.result === "Success" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20"}`}
                    >
                      {sprint.result}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              ))}
            </PremiumCard>
          )}
        </div>
      </TierLockedCard>
    </div>
  );
}
