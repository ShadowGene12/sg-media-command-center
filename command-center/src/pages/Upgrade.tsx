import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Upgrade = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">You found your bottleneck. Now fix it.</h1>
        <p className="text-xl text-muted-foreground">Two paths forward. Pick the one that matches how you work.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Tier */}
        <div className="border border-border bg-card rounded-xl p-8 flex flex-col">
          <div className="mb-4">
            <span className="bg-secondary text-secondary-foreground text-xs font-mono px-2 py-1 rounded uppercase tracking-wider">Current</span>
          </div>
          <h3 className="text-2xl font-display font-semibold mb-2">Free</h3>
          <p className="text-muted-foreground mb-6">Basic diagnostic visibility.</p>
          <div className="text-3xl font-mono mb-8">₹0</div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Basic bottleneck diagnostic</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Single pillar insight</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Email report delivery</span>
            </li>
          </ul>
          
          <Button variant="outline" className="w-full" disabled>Current Plan</Button>
        </div>

        {/* DIY Tier */}
        <div className="border-2 border-primary bg-card rounded-xl p-8 flex flex-col relative shadow-[0_0_30px_-5px_rgba(109,74,230,0.3)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-primary text-primary-foreground text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
          </div>
          <div className="mb-4 mt-2">
            <h3 className="text-2xl font-display font-semibold mb-2">Do It Yourself</h3>
            <p className="text-muted-foreground mb-6">The complete growth operating system.</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-mono font-bold text-primary">₹10,000</span>
            </div>
            <div className="text-sm text-muted-foreground mb-8 font-mono">/ 3 months access</div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">Full diagnostic suite</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">All pillar deep-dives & learning</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">Full tools library (Calculators, Audits)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">Self-managed action plan system</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">Monthly review framework</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">Complete template library</span>
            </li>
          </ul>
          
          <Button className="w-full text-md h-12">Unlock Command Center →</Button>
        </div>

        {/* DFY Tier */}
        <div className="border border-border bg-card rounded-xl p-8 flex flex-col">
          <div className="mb-4 mt-6">
            <h3 className="text-2xl font-display font-semibold mb-2">Done For You</h3>
            <p className="text-muted-foreground mb-6">We actively manage your growth.</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-mono">₹15,000</span>
            </div>
            <div className="text-sm text-muted-foreground mb-8 font-mono">/ month engagement</div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-foreground shrink-0" />
              <span className="text-sm font-medium">Everything in DIY, plus:</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">SG Media team executes for you</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Weekly review calls</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Managed action plan</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm">Custom strategic reports</span>
            </li>
          </ul>
          
          <Button variant="outline" className="w-full h-12 hover:bg-foreground hover:text-background">Book Discovery Call</Button>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
