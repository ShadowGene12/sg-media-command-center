import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
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
  Layout,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumBadge } from "./PremiumBadge";

export const AppSidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

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
    <motion.aside
      initial={{ width: "80px" }}
      animate={{ width: isExpanded ? "260px" : "80px" }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="hidden md:flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl h-screen sticky top-0 z-50 overflow-hidden"
    >
      {/* Workspace Switcher */}
      <div className="h-20 flex items-center px-6 border-b border-white/[0.02] hover:bg-white/[0.02] cursor-pointer transition-colors whitespace-nowrap">
        <div className="flex items-center gap-4 w-full">
          <div className="bg-violet-500/10 text-violet-400 p-2.5 rounded-xl border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <h3 className="text-sm font-display font-medium text-white truncate">SG Media Internal</h3>
                <p className="text-[11px] font-mono text-slate-500 truncate tracking-wide">PRO TIER</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 hide-scrollbar">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-8 px-4">
            <AnimatePresence>
              {isExpanded ? (
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 mb-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap"
                >
                  {group.label}
                </motion.h4>
              ) : (
                <div className="h-6 mb-3" /> // Placeholder to maintain vertical spacing
              )}
            </AnimatePresence>

            <nav className="space-y-1.5 flex flex-col items-center">
              {group.items.map((item, j) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                const isExactMatch = item.href === '/' ? location.pathname === '/' : isActive;
                
                return (
                  <Link
                    key={j}
                    to={item.href}
                    className={cn(
                      "flex items-center w-full px-2 py-2.5 rounded-xl text-sm transition-all duration-300 relative group",
                      isExactMatch 
                        ? "text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {isExactMatch && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-violet-500/10 border border-violet-500/20 rounded-xl z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 flex-shrink-0">
                      <item.icon className={cn("h-5 w-5 transition-colors duration-300", isExactMatch ? "text-violet-400" : "text-slate-500 group-hover:text-violet-300")} />
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center flex-1 min-w-0 ml-2 relative z-10 whitespace-nowrap"
                        >
                          <span className="font-medium truncate">{item.label}</span>
                          {item.locked && (
                            <PremiumBadge className="ml-auto px-1.5 py-0.5 text-[8px]">PRO</PremiumBadge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.02] p-4 flex justify-center">
        <Link
          to="/settings/account"
          className="flex items-center w-full px-2 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all duration-300 group relative"
        >
          <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
            <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500 text-slate-500 group-hover:text-violet-300" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium ml-2 whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.aside>
  );
};