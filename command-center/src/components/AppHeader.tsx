import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  return (
    <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-display font-semibold hidden sm:block">Command Center</h1>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end max-w-md ml-auto">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search diagnostics, tools..."
            className="w-full bg-secondary pl-9 border-none focus-visible:ring-1"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border border-border bg-secondary/50 px-3 py-1 rounded-full text-xs font-mono">
            <span className="text-muted-foreground">Free</span>
            <span className="text-primary cursor-pointer hover:underline">Upgrade</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
};
