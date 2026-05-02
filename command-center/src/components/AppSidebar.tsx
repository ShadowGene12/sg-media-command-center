import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Activity, 
  BookOpen, 
  Settings, 
  Target,
  FileText,
  Briefcase,
  ChevronDown,
  Sparkles,
  Compass,
  Wrench,
  Flag,
  Map,
  Star,
  CheckSquare,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

import { PremiumBadge } from "./PremiumBadge";

export const AppSidebar = () => {
  const location = useLocation();

  const navGroups = [
    {
      label: "Command Center",
      items: [
        { icon: LayoutDashboard, label: "Home Dashboard", href: "/", locked: false },
        { icon: Compass, label: "Diagnostic", href: "/detector/history", locked: false },
      ]
    },
    {
      label: "Knowledge",
      items: [
        { icon: BookOpen, label: "Learnings", href: "/library/learnings", locked: false },
        { icon: FileText, label: "SOPs", href: "/library/sops", locked: false },
        { icon: Target, label: "Playbooks", href: "/library/playbooks", locked: false },
        { icon: Briefcase, label: "Frameworks", href: "/library/frameworks", locked: false },
      ]
    },
    {
      label: "Strategy",
      items: [
        { icon: Flag, label: "Sprints", href: "/sprints", locked: false },
        { icon: Map, label: "Pathways", href: "/pathways", locked: false },
        { icon: Star, label: "Reviews", href: "/reviews", locked: false },
      ]
    },
    {
      label: "Execution",
      items: [
        { icon: Briefcase, label: "Workspace", href: "/workspace", locked: false },
        { icon: CheckSquare, label: "Action Plan", href: "/actions", locked: false },
        { icon: Layout, label: "Templates", href: "/templates", locked: false },
        { icon: Wrench, label: "Tools", href: "/tools", locked: false },
        { icon: Sparkles, label: "AI Advisor", href: "/advisor", locked: false },
      ]
    },
    {
      label: "Done For You",
      items: [
        { icon: Target, label: "Client Dashboard", href: "/client", locked: false },
        { icon: FileText, label: "Reports", href: "/client/reports", locked: false },
      ]
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl h-screen sticky top-0 z-20">
      {/* Workspace Switcher */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-primary/20 text-primary p-2 rounded-lg border border-primary/30">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">SG Media Internal</h3>
            <p className="text-xs text-slate-500 truncate">Pro Tier</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6 px-3">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h4 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </h4>
            <nav className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                const isExactMatch = item.href === '/' ? location.pathname === '/' : isActive;
                
                return (
                  <Link
                    key={j}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isExactMatch 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.locked && (
                      <PremiumBadge className="ml-auto px-1.5 py-0.5 text-[8px]">PRO</PremiumBadge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 p-4">
        <Link to="/settings/account" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};
