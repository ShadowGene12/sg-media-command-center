import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Stethoscope, BarChart3, Target } from "lucide-react";

const DetectorEntry = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F8F9FA] relative overflow-hidden flex flex-col font-sans">
      {/* Subtle radial violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header/Logo */}
      <header className="p-6 md:px-12 flex justify-between items-center relative z-10 border-b border-white/5">
        <div className="flex items-center gap-2 text-xl font-display font-bold tracking-tight">
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
            <span className="font-sans font-black tracking-tighter">SG</span>
          </div>
          <span className="text-white tracking-widest text-sm uppercase mt-0.5">Media</span>
        </div>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-white transition-colors">
          Login
        </Link>
      </header>

      <main className="flex-1 flex flex-col relative z-10 px-4 py-16 md:py-24">
        {/* Section 1: Hero */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Find the bottleneck silently killing your growth.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            An 8-minute diagnostic across the five pillars of growth infrastructure. Results delivered to your inbox.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link to="/detector/flow">
              <Button size="lg" className="h-14 px-8 text-lg font-medium shadow-[0_0_20px_-5px_rgba(109,74,230,0.5)] hover:shadow-[0_0_30px_-5px_rgba(109,74,230,0.6)] transition-all">
                Start the diagnostic →
              </Button>
            </Link>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono mt-2 opacity-70">
              2,847 businesses diagnosed
            </span>
          </div>
        </div>

        {/* Section 2: What you'll discover */}
        <div className="max-w-5xl mx-auto w-full mb-32">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Your weakest pillar</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Identified with a 0-5 score across all five growth infrastructure pillars. See exactly where you're bleeding revenue.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Three-layer breakdown</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't just point out the surface symptom. We map it down to the system failure and the root foundation issue.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Primary action priority</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Walk away with the single highest-leverage fix for your current stage. No fluff, just the next right step.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Five pillars preview */}
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">
            The Five Pillars of Growth Infrastructure
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#6D4AE6] mb-2 shadow-[0_0_10px_rgba(109,74,230,0.5)]"></div>
              <span className="text-sm font-medium">Market & Offer</span>
              <span className="text-xs text-muted-foreground mt-1">Clarity</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50 mt-1"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#378ADD] mb-2 shadow-[0_0_10px_rgba(55,138,221,0.5)]"></div>
              <span className="text-sm font-medium">Customer</span>
              <span className="text-xs text-muted-foreground mt-1">Acquisition</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50 mt-1"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#1D9E75] mb-2 shadow-[0_0_10px_rgba(29,158,117,0.5)]"></div>
              <span className="text-sm font-medium">Sales &</span>
              <span className="text-xs text-muted-foreground mt-1">Conversion</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50 mt-1"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B] mb-2 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              <span className="text-sm font-medium">Profit</span>
              <span className="text-xs text-muted-foreground mt-1">Optimization</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border/50 mt-1"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#D85A30] mb-2 shadow-[0_0_10px_rgba(216,90,48,0.5)]"></div>
              <span className="text-sm font-medium">Financial</span>
              <span className="text-xs text-muted-foreground mt-1">Control</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer / Secondary CTA */}
      <footer className="border-t border-white/5 bg-black/50 backdrop-blur-md py-8 relative z-10 text-center">
        <Link to="/detector/flow">
          <Button size="lg" className="mb-3 shadow-lg hover:shadow-primary/20 transition-all">
            Start the diagnostic →
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground font-mono">
          8 minutes · 12 questions · Free forever
        </p>
      </footer>
    </div>
  );
};

export default DetectorEntry;
