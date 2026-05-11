import { useState } from "react";
import { Bell, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCommandStore } from "@/lib/store";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ROUTE_MAP: Record<string, { label: string; parent?: string; parentHref?: string }> = {
  "/":                        { label: "Home Dashboard" },
  "/advisor":                 { label: "AI Advisor",        parent: "Execution" },
  "/diagnostics":             { label: "Diagnostics",       parent: "Command Center" },
  "/pillars":                 { label: "Pillars",           parent: "Command Center" },
  "/detector/history":        { label: "Diagnostic History",parent: "Command Center" },
  "/library/learnings":       { label: "Learnings",         parent: "Knowledge" },
  "/library/sops":            { label: "SOPs",              parent: "Knowledge" },
  "/library/playbooks":       { label: "Playbooks",         parent: "Knowledge" },
  "/library/frameworks":      { label: "Frameworks",        parent: "Knowledge" },
  "/library/saved":           { label: "Saved",             parent: "Knowledge" },
  "/sprints":                 { label: "Sprints",           parent: "Strategy" },
  "/pathways":                { label: "Pathways",          parent: "Strategy" },
  "/reviews":                 { label: "Reviews",           parent: "Strategy" },
  "/workspace":               { label: "Workspace",         parent: "Execution" },
  "/actions":                 { label: "Action Plan",       parent: "Execution" },
  "/templates":               { label: "Templates",         parent: "Execution" },
  "/tools":                   { label: "Tools",             parent: "Execution" },
  "/client":                  { label: "Overview",          parent: "Client Portal" },
  "/client/kpis":             { label: "KPIs",              parent: "Client Portal" },
  "/client/timeline":         { label: "Timeline",          parent: "Client Portal" },
  "/client/action-plan":      { label: "Action Plan",       parent: "Client Portal" },
  "/client/reports":          { label: "Reports",           parent: "Client Portal" },
  "/client/documents":        { label: "Documents",         parent: "Client Portal" },
  "/client/recommendations":  { label: "Recommendations",   parent: "Client Portal" },
  "/settings/account":        { label: "Account",           parent: "Settings" },
  "/settings/billing":        { label: "Billing",           parent: "Settings" },
  "/settings/organization":   { label: "Organization",      parent: "Settings" },
  "/upgrade":                 { label: "Upgrade" },
};

const NOTIFICATIONS = [
  { id: 1, title: "Weekly review ready", body: "Your Week 10 review has been prepared and is ready to view.", time: "2h ago", color: "#6D4AE6", unread: true },
  { id: 2, title: "New recommendation added", body: "SG Media added a new recommendation to your Acquisition pillar.", time: "1d ago", color: "#378ADD", unread: true },
  { id: 3, title: "Sprint milestone completed", body: "Q3 Outbound Engine hit its first milestone checkpoint.", time: "2d ago", color: "#10B981", unread: false },
  { id: 4, title: "Diagnostic score improved", body: "Your overall score moved from 12.1 to 14.2 since last run.", time: "3d ago", color: "#F59E0B", unread: false },
];

export const AppHeader = () => {
  const { setCommandPaletteOpen } = useCommandStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  const route = ROUTE_MAP[location.pathname];
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <>
      <header className="h-16 border-b border-white/[0.04] bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
        {/* Left: mobile menu + breadcrumb */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumb */}
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

        {/* Right: ⌘K trigger + tier badge + bell */}
        <div className="flex items-center gap-3">
          {/* Command Palette trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-3 h-9 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.10] transition-all duration-200 group"
          >
            <span className="text-sm">Search...</span>
            <div className="flex items-center gap-1 ml-2">
              <kbd className="inline-flex h-5 items-center px-1.5 rounded border border-white/[0.12] bg-white/[0.05] font-mono text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                ⌘
              </kbd>
              <kbd className="inline-flex h-5 items-center px-1.5 rounded border border-white/[0.12] bg-white/[0.05] font-mono text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                K
              </kbd>
            </div>
          </button>

          {/* Tier badge with laser border */}
          <Link to="/upgrade" className="hidden sm:block">
            <div className="animated-laser-border rounded-full p-px">
              <div className="relative z-10 bg-[#050505] rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-slate-500">Free</span>
                <span className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Upgrade</span>
              </div>
            </div>
          </Link>

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
        </div>
      </header>

      {/* Notification Panel */}
      <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
        <SheetContent
          side="right"
          className="w-80 bg-[#050505] border-white/[0.06] p-0 flex flex-col"
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.04]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-sm font-mono text-white uppercase tracking-widest">
                Notifications
              </SheetTitle>
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
                    style={{
                      backgroundColor: n.color,
                      boxShadow: n.unread ? `0 0 6px ${n.color}80` : "none",
                      opacity: n.unread ? 1 : 0.3,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm leading-snug", n.unread ? "text-white" : "text-slate-400")}>
                      {n.title}
                    </p>
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
