import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Compass, BookOpen, Sparkles, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: LayoutDashboard, label: "Home",    href: "/dashboard" },
  { icon: Compass,         label: "Diagnose", href: "/pillars"   },
  { icon: BookOpen,        label: "Library",  href: "/library/sops" },
  { icon: Sparkles,        label: "Advisor",  href: "/advisor"   },
  { icon: CheckSquare,     label: "Actions",  href: "/actions"   },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(5,5,5,0.85)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.href || location.pathname.startsWith(tab.href.split("/").slice(0, 2).join("/") + "/");
          return (
            <Link
              key={tab.href}
              to={tab.href}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 relative min-w-[60px]"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl bg-violet-500/10 border border-violet-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <tab.icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors duration-200",
                  isActive ? "text-violet-400" : "text-slate-600"
                )}
              />
              <span
                className={cn(
                  "text-[9px] font-mono uppercase tracking-wide relative z-10 transition-colors duration-200",
                  isActive ? "text-violet-400" : "text-slate-700"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
