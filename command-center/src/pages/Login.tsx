import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useAuth } from "@/lib/auth";

const SGLogo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-violet-600 text-white p-1 rounded-md">
      <span className="font-black tracking-tighter text-sm">SG</span>
    </div>
    <span className="text-white tracking-widest text-xs uppercase font-medium">Media</span>
  </div>
);

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Incorrect email or password. Try again."
        : error.message
      );
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen text-[#F8F9FA] flex flex-col relative overflow-hidden">
      <AnimatedBackground />

      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/[0.04]">
        <Link to="/"><SGLogo /></Link>
        <span className="text-sm text-white/30">
          No account?{" "}
          <Link to="/signup" className="text-violet-400 hover:text-violet-300 transition-colors ml-1 font-medium">
            Sign up free
          </Link>
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-display font-light text-white mb-2 tracking-tight">Welcome back.</h1>
            <p className="text-white/35 font-light">Log in to access your Command Center.</p>
          </div>

          <div
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 space-y-5"
            style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.11)" }}
          >
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                    Password
                  </Label>
                  <span className="text-[10px] font-mono text-violet-400/60">Forgot?</span>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl pr-11 text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-base shadow-[0_0_20px_rgba(109,74,230,0.35)] hover:shadow-[0_0_30px_rgba(109,74,230,0.45)] transition-all disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log in to Command Center"}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-white/15 font-mono">
            <Shield className="w-3 h-3" />
            <span>256-bit encryption · Your data stays yours</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
