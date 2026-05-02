import { useEffect } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useCommandStore } from "@/lib/store";
import { LayoutDashboard, Target, PenTool, Calculator, FileText, X } from "lucide-react";

export function CommandPalette() {
  const navigate = useNavigate();
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useCommandStore();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = (command: () => void) => {
    setCommandPaletteOpen(false);
    command();
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={() => setCommandPaletteOpen(false)} />
      
      <Command 
        className="relative w-full max-w-2xl mx-4 bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_100px_-20px_rgba(109,74,230,0.6)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <Command.Input 
            className="w-full bg-transparent p-5 text-white placeholder:text-white/30 focus:outline-none text-2xl font-display" 
            placeholder="Search Command Center..." 
            autoFocus
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
          <Command.Empty className="p-4 text-sm text-center text-white/50">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-mono text-white/40 px-2 py-2">
            <Command.Item 
              onSelect={() => runCommand(() => navigate("/"))}
              className="group flex items-center justify-between px-3 py-3 mt-1 text-sm text-white/80 rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5 text-[#6D4AE6]" />
                <span className="font-medium text-[15px]">Home Dashboard</span>
              </div>
              <kbd className="hidden group-aria-selected:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                ↵
              </kbd>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate("/action-plan"))}
              className="group flex items-center justify-between px-3 py-3 mt-1 text-sm text-white/80 rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-[#10B981]" />
                <span className="font-medium text-[15px]">Action Plan</span>
              </div>
              <kbd className="hidden group-aria-selected:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                ↵
              </kbd>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate("/tools"))}
              className="group flex items-center justify-between px-3 py-3 mt-1 text-sm text-white/80 rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <PenTool className="h-5 w-5 text-[#F59E0B]" />
                <span className="font-medium text-[15px]">Tools Library</span>
              </div>
              <kbd className="hidden group-aria-selected:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                ↵
              </kbd>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Tools" className="text-xs font-mono text-white/40 px-2 py-2 mt-2 border-t border-white/5">
            <Command.Item 
              onSelect={() => runCommand(() => navigate("/tools/profit-calculator"))}
              className="group flex items-center justify-between px-3 py-3 mt-1 text-sm text-white/80 rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-[#D85A30]" />
                <span className="font-medium text-[15px]">Profit Calculator</span>
              </div>
              <kbd className="hidden group-aria-selected:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                ↵
              </kbd>
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading="Account" className="text-xs font-mono text-white/40 px-2 py-2 mt-2 border-t border-white/5">
            <Command.Item 
              onSelect={() => runCommand(() => navigate("/detector/results/1"))}
              className="group flex items-center justify-between px-3 py-3 mt-1 text-sm text-white/80 rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#378ADD]" />
                <span className="font-medium text-[15px]">View Diagnostic Results</span>
              </div>
              <kbd className="hidden group-aria-selected:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                ↵
              </kbd>
            </Command.Item>
          </Command.Group>

        </Command.List>
      </Command>
    </div>
  );
}
