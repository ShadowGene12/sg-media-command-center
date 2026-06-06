import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
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

const BENEFITS = [
  "Full 5-pillar Bottleneck Report as a live dashboard",
  "50+ SOPs mapped to your specific diagnosis",
  "AI Advisor — ask about your actual bottleneck",
  "Sprint tracking, Pathways & Workspace access",
  "Your report stays free forever — no expiry",
];

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", business: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { error } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      business_name: form.business,
    });
    setLoading(false);
    if (error) {
      setError(error.message.includes("already registered")
        ? "That email already has an account. Log in instead."
        : error.message
      );
    } else {
      // Navigate into Command Center — pending diagnostic gets flushed to DB automatically
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen text-[#F8F9FA] flex flex-col relative overflow-hidden">
      <AnimatedBackground />

      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/[0.04]">
        <Link to="/"><SGLogo /></Link>
        <span className="text-sm text-white/30">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors ml-1 font-medium">
            Log in
          </Link>
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left: benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden md:block space-y-8"
          >
            <div>
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">What you get</p>
              <h1 className="text-3xl lg:text-4xl font-display font-light text-white mb-4 leading-tight tracking-tight">
                7-day full access.<br />No card required.
              </h1>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                Take the Bottleneck Detector and land directly inside Command Center with your full diagnostic live.
              </p>
            </div>
            <div className="space-y-3.5">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/80 flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-sm leading-relaxed font-light">{benefit}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-white/[0.05]" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Free tier never expires</span>
              <div className="h-px flex-1 bg-white/[0.05]" />
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          >
            <div
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-7"
              style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.11)" }}
            >
              <h2 className="text-xl font-display font-semibold text-white mb-6 tracking-tight">Create your account</h2>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">First</Label>
                    <Input id="firstName" placeholder="John" value={form.firstName} onChange={set("firstName")} required
                      className="h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Last</Label>
                    <Input id="lastName" placeholder="Smith" value={form.lastName} onChange={set("lastName")} required
                      className="h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} required
                    className="h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="business" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Business Name</Label>
                  <Input id="business" placeholder="Your Company" value={form.business} onChange={set("business")}
                    className="h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} required
                    className="h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors" />
                  <p className="text-[10px] text-white/20 font-mono">Min 8 characters</p>
                </div>

                <div className="pt-1">
                  <Button type="submit" size="lg" disabled={loading}
                    className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(109,74,230,0.35)] hover:shadow-[0_0_30px_rgba(109,74,230,0.45)] transition-all disabled:opacity-60">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create account → Take the Detector"}
                  </Button>
                </div>

                <p className="text-[10px] text-center text-white/20 font-mono leading-relaxed">
                  By signing up you agree to our{" "}
                  <span className="text-violet-400/60">Terms</span> &{" "}
                  <span className="text-violet-400/60">Privacy Policy</span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
