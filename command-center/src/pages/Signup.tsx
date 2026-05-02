import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Signup = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Create Your Free Account
                </h1>
                <p className="text-lg text-muted-foreground">
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
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <Card className="p-8 shadow-lg">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input id="company" placeholder="Your Company LLC" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Create Account
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
