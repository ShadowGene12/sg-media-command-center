import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Users, Settings, ChevronRight, Shield, LogOut } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/sops", label: "SOP Manager", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  const { isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen text-[#F8F9FA] flex relative overflow-hidden">
      <AnimatedBackground />

      {/* Admin sidebar */}
      <aside className="w-56 border-r border-white/[0.05] bg-black/60 backdrop-blur-xl flex flex-col z-10 flex-shrink-0">
        <div className="h-16 flex items-center px-5 border-b border-white/[0.04] gap-3">
          <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <Shield className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="text-sm font-display font-medium text-white">Admin</div>
            <div className="text-[9px] font-mono text-violet-400/70 uppercase tracking-widest">SG Media</div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(item => {
            const isActive = item.exact
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  isActive
                    ? "bg-violet-500/10 border border-violet-500/20 text-white"
                    : "text-slate-500 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-violet-400" : "text-slate-600")} />
                <span className="font-light">{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-violet-400/50 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.04] p-3 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-white hover:bg-white/[0.03] transition-all font-mono">
            ← Back to Command Center
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-red-400 hover:bg-red-500/[0.05] transition-all font-mono"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto z-10">
        <div className="max-w-6xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
