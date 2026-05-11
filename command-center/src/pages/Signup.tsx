import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C]">
      <div className="container mx-auto px-4 py-12 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  Create Your Free Account
                </h1>
                <p className="text-lg text-slate-400">
                  Get instant access to strategic diagnostics and personalized recommendations
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Complete Business Bottleneck Scanner",
                  "Access all Five Pillar Scorecards",
                  "Save and track results over time",
                  "Get tailored recommendations",
                  "Download detailed reports"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-lg text-white/90">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <Card className="p-8 shadow-[0_0_80px_-20px_rgba(109,74,230,0.5)] border-white/5 bg-black/40 backdrop-blur-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input id="company" placeholder="Your Company LLC" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]"
                  />
                  <p className="text-xs text-slate-500">
                    At least 8 characters
                  </p>
                </div>

                <Button type="submit" className="w-full bg-[#6D4AE6] hover:bg-[#5233B8] text-white" size="lg">
                  Create Account
                </Button>

                <p className="text-xs text-center text-slate-500">
                  By signing up, you agree to our{" "}
                  <Link to="/terms" className="text-[#6D4AE6] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#6D4AE6] hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-slate-400">Already have an account? </span>
                <Link to="/login" className="text-[#6D4AE6] hover:underline font-medium">
                  Log in
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
