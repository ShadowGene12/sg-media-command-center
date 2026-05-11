import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C]">
      <div className="container mx-auto px-4 py-20 w-full">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-[0_0_80px_-20px_rgba(109,74,230,0.5)] border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
              <p className="text-slate-400">
                Log in to access your Command Center
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@company.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-[#6D4AE6] hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#6D4AE6]"
                />
              </div>

              <Button type="submit" className="w-full bg-[#6D4AE6] hover:bg-[#5233B8] text-white" size="lg">
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-400">Don't have an account? </span>
              <Link to="/signup" className="text-[#6D4AE6] hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
