import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { PremiumCard } from "@/components/PremiumCard";
import { Loader2, User, Activity, Map, TrendingUp, FileText } from "lucide-react";

export default function AdminUserManage() {
  const { id } = useParams();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-violet-400/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <Link to="/admin/users" className="text-xs font-mono text-slate-500 hover:text-white transition-colors">
        ← Back to Users
      </Link>
      <PageHeader
        label="DFY Management"
        title={profile?.first_name ? `${profile.first_name} ${profile.last_name}` : "Client Overview"}
        description={`Manage execution and deliverables for ${profile?.business_name || "this client"}.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <PremiumCard className="p-6 space-y-4">
          <SectionLabel>Action Items</SectionLabel>
          <p className="text-sm text-slate-400 font-light">Push new action items to the client's Execution Layer.</p>
          <div className="pt-2">
            <button className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-lg text-sm font-medium border border-indigo-500/30 w-full hover:bg-indigo-600/30 transition-all">
              Manage Actions
            </button>
          </div>
        </PremiumCard>

        <PremiumCard className="p-6 space-y-4">
          <SectionLabel>KPIs & Metrics</SectionLabel>
          <p className="text-sm text-slate-400 font-light">Update the KPI snapshot for the executive dashboard.</p>
          <div className="pt-2">
            <button className="px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-500/30 w-full hover:bg-emerald-600/30 transition-all">
              Update KPIs
            </button>
          </div>
        </PremiumCard>

        <PremiumCard className="p-6 space-y-4">
          <SectionLabel>Reports & Deliverables</SectionLabel>
          <p className="text-sm text-slate-400 font-light">Upload audits, financial projections, and weekly reports.</p>
          <div className="pt-2">
            <button className="px-4 py-2 bg-amber-600/20 text-amber-400 rounded-lg text-sm font-medium border border-amber-500/30 w-full hover:bg-amber-600/30 transition-all">
              Manage Reports
            </button>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
