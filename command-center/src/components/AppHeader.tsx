import { useState } from "react";
import { Bell, Menu, ChevronRight, Clock, Zap, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCommandStore } from "@/lib/store";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const ROUTE_MAP: Record<string, { label: string; parent?: string; parentHref?: string }> = {
  "/dashboard":               { label: "Home Dashboard" },
  "/advisor":                 { label: "AI Advisor",         parent: "Execution" },
  "/diagnostics":             { label: "Diagnostics",        parent: "Command Center" },
  "/pillars":                 { label: "Pillars",            parent: "Command Center" },
  "/detector/history":        { label: "Diagnostic History", parent: "Command Center" },
  "/library/learnings":       { label: "Learnings",          parent: "Knowledge" },
  "/library/sops":            { label: "SOPs",               parent: "Knowledge" },
  "/library/playbooks":       { label: "Playbooks",          parent: "Knowledge" },
  "/library/frameworks":      { label: "Frameworks",         parent: "Knowledge" },
  "/library/saved":           { label: "Saved",              parent: "Knowledge" },
  "/sprints":                 { label: "Sprints",            parent: "Strategy" },
  "/pathways":                { label: "Pathways",           parent: "Strategy" },
  "/reviews":                 { label: "Reviews",            parent: "Strategy" },
  "/workspace":               { label: "Workspace",          parent: "Execution" },
  "/actions":                 { label: "Action Plan",        parent: "Execution" },
  "/templates":               { label: "Templates",          parent: "Execution" },
  "/tools":                   { label: "Tools",              parent: "Execution" },
  "/client":                  { label: "Overview",           parent: "Client Portal" },
  "/client/kpis":             { label: "KPIs",               parent: "Client Portal" },
  "/client/timeline":         { label: "Timeline",           parent: "Client Portal" },
  "/client/action-plan":      { label: "Action Plan",        parent: "Client Portal" },
  "/client/reports":          { label: "Reports",            parent: "Client Portal" },
  "/client/documents":        { label: "Documents",          parent: "Client Portal" },
  "/client/recommendations":  { label: "Recommendations",    parent: "Client Portal" },
  "/settings/account":        { label: "Account",            parent: "Settings" },
  "/settings/billing":        { label: "Billing",            parent: "Settings" },
  "/settings/organization":   { label: "Organization",       parent: "Settings" },
  "/upgrade":                 { label: "Upgrade" },
};

const NOTIFICATIONS = [
  { id: 1, title: "Weekly review ready",         body: "Your Week 10 review has been prepared and is ready to view.",                    time: "2h ago",  color: "#6D4AE6", unread: true  },
  { id: 2, title: "New recommendation added",     body: "SG Media added a new recommendation to your Acquisition pillar.",               time: "1d ago",  color: "#378ADD", unread: true  },
  { id: 3, title: "Sprint milestone completed",   body: "Q3 Outbound Engine hit its first milestone checkpoint.",                        time: "2d ago",  color: "#10B981", unread: false },
  { id: 4, title: "Diagnostic score improved",    body: "Your overall score moved from 12.1 to 14.2 since last run.",                    time: "3d ago",  color: "#F59E0B", unread: false },
];

// ─── Trial countdown widget ────────────────────────────────────────────────────
const TrialWidget = ({ trialDay, tier }: { trialDay: number; tier: string }) => {
  const daysLeft = 8 - trialDay;
  const isExpiring = trialDay >= 6;
  const isLastDay  = trialDay === 7;
  const postTrial  = trialDay > 7;
  const lifetimeActive = trialDay > 7 && trialDay <= 14;

  if (tier === 'operator' || tier === 'studio' || tier === 'dfy') {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
        <Zap className="w-3 h-3 text-violet-400" />
        <span className="text-[10px] font-mono text-violet-400 font-semibold uppercase tracking-wide">
          {tier === 'dfy' ? 'Done For You' : tier.charAt(0).toUpperCase() + tier.slice(1)}
        </span>
      </div>
    );
  }

  if (trialDay === 0) {
    return (
      <Link to="/upgrade" className="hidden sm:block">
        <div className="animated-laser-border rounded-full p-px">
          <div className="relative z-10 bg-[#050505] rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-mono">
            <span className="text-slate-500">Free</span>
            <span className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Upgrade</span>
          </div>
        </div>
      </Link>
    );
  }

  if (lifetimeActive) {
    const pricingDaysLeft = 15 - trialDay;
    return (
      <Link to="/upgrade" className="hidden sm:block">
        <div className="animated-laser-border rounded-full p-px">
          <div className="relative z-10 bg-[#050505] rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-semibold">Lifetime pricing</span>
            <span className="text-slate-600">— {pricingDaysLeft}d left</span>
          </div>
        </div>
      </Link>
    );
  }

  if (postTrial) {
    return (
      <Link to="/upgrade" className="hidden sm:block">
        <div className="animated-laser-border rounded-full p-px">
          <div className="relative z-10 bg-[#050505] rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-mono">
            <span className="text-slate-500">Free</span>
            <span className="text-violet-400 font-semibold">Upgrade to Operator</span>
          </div>
        </div>
      </Link>
    );
  }

  // Active trial (days 1–7)
  return (
    <div className="hidden sm:flex items-center gap-2">
      <div className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors",
        isLastDay
          ? "bg-amber-500/10 border-amber-500/30"
          : isExpiring
          ? "bg-amber-500/[0.07] border-amber-500/20"
          : "bg-white/[0.04] border-white/[0.07]"
      )}>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          isLastDay ? "bg-amber-400 animate-pulse" : isExpiring ? "bg-amber-400/70" : "bg-emerald-400"
        )} />
        <Clock className={cn("w-2.5 h-2.5", isExpiring ? "text-amber-400" : "text-slate-500")} />
        <span className={cn(
          "text-[10px] font-mono",
          isLastDay ? "text-amber-400 font-semibold" : isExpiring ? "text-amber-400/80" : "text-slate-400"
        )}>
          {isLastDay ? "Trial ends today" : `Day ${trialDay} of 7`}
        </span>
      </div>
      <Link to="/upgrade">
        <div className="animated-laser-border rounded-full p-px">
          <div className="relative z-10 bg-[#050505] rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-mono">
            <span className={cn(
              "font-semibold transition-colors",
              isExpiring ? "text-amber-400 hover:text-amber-300" : "text-violet-400 hover:text-violet-300"
            )}>
              {isExpiring ? "Upgrade now" : "Upgrade"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// ─── Main header ──────────────────────────────────────────────────────────────
export const AppHeader = () => {
  const { setCommandPaletteOpen, trialDay, tier } = useCommandStore();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/landing");
  };

  const route = ROUTE_MAP[location.pathname];
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <>
      <header className="h-16 border-b border-white/[0.04] bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
        {/* Left: mobile menu + breadcrumb */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white hover:bg-white/[0.04]">
            <Menu className="h-5 w-5" />
          </Button>

          <nav className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
            <span className="text-slate-500">Command Center</span>
            {route?.parent && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-700" />
                <span className="text-slate-500">{route.parent}</span>
              </>
            )}
            {route?.label && route.label !== "Home Dashboard" && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-700" />
                <span className="text-white/70">{route.label}</span>
              </>
            )}
            {!route && <><ChevronRight className="h-3 w-3 text-slate-700" /><span className="text-white/70">...</span></>}
          </nav>
        </div>

        {/* Right: search + trial widget + bell */}
        <div className="flex items-center gap-3">
          {/* ⌘K trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-3 h-9 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.10] transition-all duration-200 group"
          >
            <span className="text-sm">Search...</span>
            <div className="flex items-center gap-1 ml-2">
              <kbd className="inline-flex h-5 items-center px-1.5 rounded border border-white/[0.12] bg-white/[0.05] font-mono text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">⌘</kbd>
              <kbd className="inline-flex h-5 items-center px-1.5 rounded border border-white/[0.12] bg-white/[0.05] font-mono text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">K</kbd>
            </div>
          </button>

          {/* Trial countdown / tier badge */}
          <TrialWidget trialDay={trialDay} tier={tier} />

          {/* Notification bell */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(109,74,230,0.8)]" />
            )}
          </button>

          {/* User avatar + dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 hover:bg-violet-500/30 transition-all text-xs font-mono font-bold">
                {profile?.first_name?.[0]?.toUpperCase() ?? <User className="w-4 h-4" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#0A0A0C] border-white/[0.08] text-white">
              <div className="px-3 py-2 border-b border-white/[0.05]">
                <p className="text-xs font-medium text-white truncate">
                  {profile ? `${profile.first_name} ${profile.last_name}`.trim() || profile.email : 'Account'}
                </p>
                <p className="text-[10px] text-white/30 font-mono truncate">{profile?.email}</p>
              </div>
              <DropdownMenuItem asChild className="hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer">
                <Link to="/settings/account" className="flex items-center gap-2 text-xs text-white/60">
                  <User className="w-3.5 h-3.5" /> Account settings
                </Link>
              </DropdownMenuItem>
              {profile && (profile as any).is_admin && (
                <DropdownMenuItem asChild className="hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer">
                  <Link to="/admin" className="flex items-center gap-2 text-xs text-violet-400">
                    <Shield className="w-3.5 h-3.5" /> Admin panel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-white/[0.05]" />
              <DropdownMenuItem onClick={handleSignOut} className="hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer flex items-center gap-2 text-xs text-red-400/80 hover:text-red-400">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notification Panel */}
      <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
        <SheetContent side="right" className="w-80 bg-[#050505] border-white/[0.06] p-0 flex flex-col">
          <SheetHeader className="px-5 py-4 border-b border-white/[0.04]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-sm font-mono text-white uppercase tracking-widest">Notifications</SheetTitle>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                  {unreadCount} new
                </span>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.03]">
            {NOTIFICATIONS.map(n => (
              <div
                key={n.id}
                className={cn(
                  "px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer",
                  n.unread && "bg-white/[0.01]"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: n.color, boxShadow: n.unread ? `0 0 6px ${n.color}80` : "none", opacity: n.unread ? 1 : 0.3 }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm leading-snug", n.unread ? "text-white" : "text-slate-400")}>{n.title}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.body}</p>
                    <p className="text-[10px] font-mono text-slate-700 mt-1.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-white/[0.04]">
            <button className="text-[10px] font-mono text-slate-600 hover:text-violet-400 transition-colors w-full text-center">
              Mark all as read
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
