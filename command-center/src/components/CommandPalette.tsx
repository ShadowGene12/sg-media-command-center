import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useCommandStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, Compass, BookOpen, Target, Calculator, FileText, X,
  Sparkles, Flag, Map, Wrench, Settings, CheckSquare, ArrowRight,
  TrendingUp, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CMD_ITEM = "group flex items-center justify-between px-3 py-2.5 mt-0.5 text-sm rounded-xl cursor-pointer aria-selected:bg-violet-500/10 aria-selected:text-white text-white/70 transition-colors";

const NAV_GROUPS = [
  {
    label: "Command Center",
    items: [
      { label: "Home Dashboard",  href: "/dashboard",       icon: LayoutDashboard, color: "#6D4AE6" },
      { label: "Bottleneck Report", href: "/pillars",        icon: Compass,         color: "#6D4AE6" },
      { label: "Action Plan",     href: "/actions",          icon: CheckSquare,     color: "#1D9E75" },
      { label: "AI Advisor",      href: "/advisor",          icon: Sparkles,        color: "#378ADD" },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { label: "SOPs Library",    href: "/library/sops",        icon: FileText,    color: "#1D9E75" },
      { label: "Frameworks",      href: "/library/frameworks",  icon: BookOpen,    color: "#6D4AE6" },
      { label: "Playbooks",       href: "/library/playbooks",   icon: Map,         color: "#378ADD" },
      { label: "Learnings",       href: "/library/learnings",   icon: BookOpen,    color: "#F59E0B" },
    ],
  },
  {
    label: "Execution",
    items: [
      { label: "Sprints",         href: "/sprints",            icon: Flag,         color: "#F59E0B" },
      { label: "Pathways",        href: "/pathways",           icon: Map,          color: "#378ADD" },
      { label: "Profit Calculator", href: "/tools/profit-calculator", icon: Calculator, color: "#D85A30" },
      { label: "Upgrade",         href: "/upgrade",            icon: TrendingUp,   color: "#6D4AE6" },
      { label: "Settings",        href: "/settings/account",   icon: Settings,     color: "#515B68" },
    ],
  },
];

export function CommandPalette() {
  const navigate = useNavigate();
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useCommandStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Load SOPs for search
  const { data: sops = [] } = useQuery({
    queryKey: ["sops-palette"],
    queryFn: async () => {
      const { data } = await supabase.from("sops").select("slug, title, pillar, category");
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    enabled: isCommandPaletteOpen,
  });

  const run = (href: string) => {
    setCommandPaletteOpen(false);
    setSearch("");
    navigate(href);
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}>
      <div className="fixed inset-0" onClick={() => setCommandPaletteOpen(false)} />

      <Command
        className="relative w-full max-w-xl mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(5,5,7,0.98)",
          border: "1px solid rgba(109,74,230,0.25)",
          borderTop: "1px solid rgba(109,74,230,0.4)",
          boxShadow: "0 0 80px -10px rgba(109,74,230,0.5), 0 40px 80px rgba(0,0,0,0.8)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
          <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            className="w-full bg-transparent py-4 text-white placeholder:text-white/25 focus:outline-none text-[15px] font-light"
            placeholder="Search pages, SOPs, actions..."
            autoFocus
          />
          <button onClick={() => setCommandPaletteOpen(false)} className="p-1.5 text-white/25 hover:text-white/60 transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        <Command.List className="max-h-[380px] overflow-y-auto p-2 hide-scrollbar">
          <Command.Empty className="py-8 text-sm text-center text-white/30 font-mono">
            No results for "{search}"
          </Command.Empty>

          {/* Navigation groups */}
          {NAV_GROUPS.map(group => (
            <Command.Group
              key={group.label}
              heading={group.label}
              className="[&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-white/25 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:mt-2"
            >
              {group.items.map(item => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => run(item.href)}
                  className={CMD_ITEM}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + "15" }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <span className="font-light text-sm">{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 hidden group-aria-selected:block" />
                </Command.Item>
              ))}
            </Command.Group>
          ))}

          {/* SOPs — dynamic from DB */}
          {sops.length > 0 && (
            <Command.Group
              heading="SOPs & Resources"
              className="[&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-white/25 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:mt-2"
            >
              {sops.map((sop: any) => (
                <Command.Item
                  key={sop.slug}
                  value={sop.title}
                  onSelect={() => run(`/library/${sop.slug}`)}
                  className={CMD_ITEM}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-white/30" />
                    </div>
                    <div>
                      <span className="font-light text-sm text-white/70">{sop.title}</span>
                      <div className="text-[9px] font-mono text-white/25">{sop.category} · {sop.pillar}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 hidden group-aria-selected:block" />
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/20">
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">↑↓</kbd>
            <span>navigate</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/20">
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">↵</kbd>
            <span>open</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/20 ml-auto">
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">esc</kbd>
            <span>close</span>
          </div>
        </div>
      </Command>
    </div>
  );
}
