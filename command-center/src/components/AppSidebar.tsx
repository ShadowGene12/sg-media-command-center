import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useCommandStore } from "@/lib/store";
import {
  LayoutDashboard, BookOpen, Settings, Target, FileText,
  Briefcase, Sparkles, Compass, Wrench, Flag, Map,
  Star, CheckSquare, Layout, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Command Center",
    items: [
      { icon: LayoutDashboard, label: "Dashboard",   href: "/dashboard" },
      { icon: Compass,         label: "Diagnostic",  href: "/detector/history" },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { icon: BookOpen,   label: "Learnings",   href: "/library/learnings" },
      { icon: FileText,   label: "SOPs",        href: "/library/sops" },
      { icon: Target,     label: "Playbooks",   href: "/library/playbooks" },
      { icon: Briefcase,  label: "Frameworks",  href: "/library/frameworks" },
    ],
  },
  {
    label: "Strategy",
    items: [
      { icon: Flag,  label: "Sprints",   href: "/sprints" },
      { icon: Map,   label: "Pathways",  href: "/pathways" },
      { icon: Star,  label: "Reviews",   href: "/reviews" },
    ],
  },
  {
    label: "Execution",
    items: [
      { icon: Briefcase,    label: "Workspace",   href: "/workspace" },
      { icon: CheckSquare,  label: "Action Plan", href: "/actions" },
      { icon: Layout,       label: "Templates",   href: "/templates" },
      { icon: Wrench,       label: "Tools",       href: "/tools" },
      { icon: Sparkles,     label: "AI Advisor",  href: "/advisor" },
    ],
  },
  {
    label: "Done For You",
    items: [
      { icon: Target,   label: "Client Dashboard", href: "/client" },
      { icon: FileText, label: "Reports",          href: "/client/reports" },
    ],
  },
];

export const AppSidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { profile } = useAuth();
  const { tier } = useCommandStore();

  const displayName = profile?.business_name ||
    (profile ? `${profile.first_name} ${profile.last_name}`.trim() : "Command Center") ||
    "Command Center";
  const tierLabel = tier === "dfy" ? "Done For You" : tier === "trial" ? "Trial" : tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <motion.aside
      initial={{ width: "72px" }}
      animate={{ width: isExpanded ? "256px" : "72px" }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="hidden md:flex flex-col h-full flex-shrink-0 z-50 overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.55)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(32px) saturate(150%)",
        WebkitBackdropFilter: "blur(32px) saturate(150%)",
      }}
    >
      {/* Top subtle gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(109,74,230,0.05) 0%, transparent 100%)" }} />

      {/* Workspace switcher */}
      <div className="h-[68px] flex items-center px-5 border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors flex-shrink-0 relative z-10">
        <div className="flex items-center gap-3.5 w-full min-w-0">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(109,74,230,0.12)",
              border: "1px solid rgba(109,74,230,0.25)",
              boxShadow: "0 0 16px rgba(139,92,246,0.15)",
            }}
          >
            <Briefcase className="w-4.5 h-4.5 text-violet-400" />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="flex-1 min-w-0"
              >
                <h3 className="text-sm font-display font-medium text-white truncate leading-tight">{displayName}</h3>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{tierLabel}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-shrink-0"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 hide-scrollbar relative z-10">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-6 px-3">
            <AnimatePresence>
              {isExpanded ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-2.5 mb-2 text-[9px] font-mono font-semibold uppercase tracking-[0.12em] text-slate-600 whitespace-nowrap"
                >
                  {group.label}
                </motion.p>
              ) : (
                <div className="h-5 mb-2" />
              )}
            </AnimatePresence>

            <nav className="space-y-0.5">
              {group.items.map((item, ii) => {
                const isActive = location.pathname === item.href ||
                  (item.href !== "/dashboard" && location.pathname.startsWith(item.href + "/"));

                return (
                  <Link
                    key={ii}
                    to={item.href}
                    className={cn(
                      "relative flex items-center w-full rounded-xl transition-all duration-200",
                      isActive
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-200"
                    )}
                    style={{
                      padding: isExpanded ? "0.5rem 0.625rem" : "0.5rem",
                      justifyContent: isExpanded ? "flex-start" : "center",
                    }}
                  >
                    {/* Active pill bg */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-pill"
                        className="absolute inset-0 rounded-xl z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        style={{
                          background: "rgba(109,74,230,0.12)",
                          border: "1px solid rgba(109,74,230,0.22)",
                        }}
                      />
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "relative z-10 flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-lg transition-colors duration-200",
                      isActive ? "" : "group-hover:bg-white/[0.03]"
                    )}>
                      <item.icon className={cn(
                        "h-[18px] w-[18px] transition-colors duration-200",
                        isActive ? "text-violet-400" : "text-slate-600 group-hover:text-violet-300"
                      )} />
                    </div>

                    {/* Label */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.16 }}
                          className="relative z-10 ml-2 text-sm font-medium whitespace-nowrap truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active indicator dot (collapsed) */}
                    {isActive && !isExpanded && (
                      <div className="absolute right-1 top-1 w-1 h-1 rounded-full bg-violet-400" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="border-t border-white/[0.04] p-3 flex-shrink-0 relative z-10">
        <Link
          to="/settings/account"
          className="relative flex items-center w-full rounded-xl text-slate-500 hover:text-slate-200 transition-all duration-200 group"
          style={{
            padding: isExpanded ? "0.5rem 0.625rem" : "0.5rem",
            justifyContent: isExpanded ? "flex-start" : "center",
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
            <Settings className="h-[18px] w-[18px] group-hover:rotate-90 transition-transform duration-500 group-hover:text-violet-300" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.16 }}
                className="ml-2 text-sm font-medium whitespace-nowrap"
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
