import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  ArrowRight, Menu, X, CheckCircle2, BarChart3,
  Target, Zap, Brain, TrendingUp, Shield,
  LayoutDashboard, Compass, BookOpen, Flag, Sparkles,
  Briefcase, Settings, Activity, FileText, Wrench,
  MessageSquare, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Bento card with mouse-tracking glow (matches PremiumCard behavior) ───────
const BentoCard = ({
  children,
  className,
  glowColor = "rgba(109,74,230,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Mouse-tracking glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

const SGLogo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-violet-600 text-white p-1 rounded-md">
      <span className="font-black tracking-tighter text-sm">SG</span>
    </div>
    <span className="text-white tracking-widest text-xs uppercase font-medium">Media</span>
  </div>
);

// Faithful replica of the actual Command Center dashboard
const CommandCenterMockup = () => (
  <div
    className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden select-none w-full"
    style={{ boxShadow: "0 0 80px rgba(109,74,230,0.15), 0 40px 100px rgba(0,0,0,0.8)" }}
  >
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-[#050505]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="ml-3 flex-1 h-4 bg-white/[0.03] rounded-md flex items-center px-2 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <span className="text-[9px] text-white/15 font-mono">app.sgmedia.com/command-center</span>
      </div>
    </div>

    {/* App shell: sidebar + main */}
    <div className="flex" style={{ height: "460px" }}>
      {/* Sidebar — collapsed 56px, matching real AppSidebar */}
      <div className="w-14 border-r border-white/[0.04] bg-black/60 flex flex-col flex-shrink-0">
        {/* Workspace switcher */}
        <div className="h-[54px] flex items-center justify-center border-b border-white/[0.03] flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center" style={{ boxShadow: "0 0 10px rgba(139,92,246,0.15)" }}>
            <Briefcase className="w-4 h-4 text-violet-400" />
          </div>
        </div>

        {/* Nav icons */}
        <div className="flex-1 py-4 flex flex-col gap-1 items-center px-2 overflow-hidden">
          {/* Active: Home */}
          <div className="w-full h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <LayoutDashboard className="w-[18px] h-[18px] text-violet-400" />
          </div>
          {[Compass, BookOpen, FileText, Flag, Wrench, Sparkles].map((Icon, i) => (
            <div key={i} className="w-full h-9 flex items-center justify-center rounded-xl">
              <Icon className="w-[18px] h-[18px] text-slate-700" />
            </div>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="h-12 border-t border-white/[0.03] flex items-center justify-center flex-shrink-0">
          <Settings className="w-[18px] h-[18px] text-slate-700" />
        </div>
      </div>

      {/* Right: header + content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0C]">
        {/* App header */}
        <div className="h-[54px] border-b border-white/[0.04] flex items-center px-5 gap-3 flex-shrink-0">
          <div className="flex-1 h-6 max-w-[180px] bg-white/[0.04] rounded-lg flex items-center px-2.5 gap-2">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="h-2 w-20 bg-white/[0.07] rounded-sm" />
          </div>
          <div className="ml-auto w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30" />
        </div>

        {/* Dashboard content — matching HomeDashboard exactly */}
        <div className="flex-1 overflow-hidden px-5 py-4 space-y-4">
          {/* Greeting header */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
              <span className="text-[8px] font-mono text-violet-400/80 uppercase tracking-widest">
                System Online • Session Active
              </span>
            </div>
            <div className="h-5 w-52 bg-white/[0.08] rounded-md" />
            <div className="h-2.5 w-80 bg-white/[0.04] rounded-sm" />
          </div>

          {/* Grid: 12 columns */}
          <div className="grid grid-cols-12 gap-3">
            {/* Active Sprint card — 8/12, matching PremiumCard style */}
            <div
              className="col-span-8 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                minHeight: "160px",
              }}
            >
              {/* Ghost Target icon, top-right */}
              <div className="absolute top-2 right-2 opacity-[0.03] pointer-events-none">
                <Target className="w-28 h-28 text-violet-300" />
              </div>

              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  <Activity className="w-2.5 h-2.5" />
                  <span className="text-[8px] font-mono">Active Sprint</span>
                </div>
                <div>
                  <div className="h-4 w-36 bg-white/[0.10] rounded-md mb-1.5" />
                  <div className="h-2 w-56 bg-white/[0.04] rounded-sm mb-1" />
                  <div className="h-2 w-44 bg-white/[0.04] rounded-sm" />
                </div>
              </div>

              <div className="relative z-10 mt-3">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 rounded-full">
                  <span className="text-[8px] font-medium text-black">Enter Workspace</span>
                  <ArrowRight className="w-2.5 h-2.5 text-black/60" />
                </div>
              </div>
            </div>

            {/* Score gauge card — 4/12 */}
            <div
              className="col-span-4 rounded-xl p-3 flex flex-col items-center justify-center"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mb-2">System Score</div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                  <circle
                    cx="32" cy="32" r="24" fill="none" strokeWidth="5" strokeLinecap="round"
                    stroke="url(#gaugeGradLanding)"
                    strokeDasharray={`${(13.8 / 25) * 150.8} 150.8`}
                  />
                  <defs>
                    <linearGradient id="gaugeGradLanding" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6D4AE6" />
                      <stop offset="100%" stopColor="#00D2FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-sm font-light text-white">13.8</span>
                  <span className="text-[6px] text-slate-600">/25</span>
                </div>
              </div>
              {/* Sparkline */}
              <div className="w-full flex items-end gap-0.5 h-4 mt-2 opacity-30 px-2">
                {[4, 5, 3, 6, 7, 5, 8, 9].map((h, i) => (
                  <div key={i} className="flex-1 bg-cyan-400/50 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                ))}
              </div>
            </div>

            {/* Required Actions — full width */}
            <div
              className="col-span-12 rounded-xl p-4"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mb-3">Required Actions</div>
              <div className="space-y-2">
                {[
                  { done: false, label: "Review generated copy for LinkedIn sequence", width: "75%" },
                  { done: false, label: "Approve budget allocation for Q3 Ads", width: "60%" },
                  { done: true, label: "Log weekly KPI check-in", width: "48%" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2.5 py-1 ${item.done ? "opacity-40" : ""}`}>
                    <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${item.done ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-700"}`}>
                      {item.done && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </div>
                    <div
                      className={`h-2 rounded-sm ${item.done ? "bg-slate-700/40" : "bg-white/[0.07]"}`}
                      style={{ width: item.width }}
                    />
                    <span className="text-[7px] font-mono text-slate-700 ml-auto">{i === 0 ? "2h ago" : i === 1 ? "5h ago" : "1d ago"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Scroll animation presets ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerGrid = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, bounce: 0.2, duration: 0.8 } },
};
const viewport = { once: true, margin: "-80px" };

const navItems = [
  { name: "How it works", href: "#how-it-works" },
  { name: "5 Pillars", href: "#pillars" },
  { name: "Inside CC", href: "#command-center" },
  { name: "Pricing", href: "/pricing" },
];

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-[#F8F9FA] overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      {/* Same animated background as the Command Center shell */}
      <AnimatedBackground />

      {/* NAV */}
      <header>
        <nav data-state={menuOpen ? "active" : undefined} className="group fixed z-20 w-full px-4 top-0">
          <div className={cn(
            "mx-auto mt-3 max-w-6xl px-5 transition-all duration-500",
            isScrolled && "bg-black/75 backdrop-blur-xl border border-white/[0.08] rounded-2xl max-w-4xl"
          )}>
            <div className="relative flex flex-wrap items-center justify-between gap-4 py-3 lg:gap-0">
              <div className="flex w-full justify-between lg:w-auto">
                <Link to="/" aria-label="SG Media"><SGLogo /></Link>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close" : "Open"}
                  className="relative z-20 -m-2 block cursor-pointer p-2 lg:hidden"
                >
                  {menuOpen ? <X className="size-5 text-white/70" /> : <Menu className="size-5 text-white/70" />}
                </button>
              </div>

              {/* Center nav (desktop) */}
              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      {item.href.startsWith("#") ? (
                        <button
                          onClick={() => scrollTo(item.href.slice(1))}
                          className="text-white/40 hover:text-white/80 transition-colors text-sm"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link to={item.href} className="text-white/40 hover:text-white/80 transition-colors text-sm">
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right CTAs */}
              <div className={cn(
                "group-data-[state=active]:flex mb-4 hidden w-full flex-wrap items-center justify-end gap-3",
                "rounded-2xl border border-white/[0.08] bg-black/70 p-5 backdrop-blur-xl",
                "lg:m-0 lg:flex lg:w-fit lg:gap-3 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
              )}>
                {/* Mobile nav links */}
                <div className="lg:hidden w-full mb-3">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        {item.href.startsWith("#") ? (
                          <button onClick={() => scrollTo(item.href.slice(1))} className="text-white/50 hover:text-white py-1 text-left">
                            {item.name}
                          </button>
                        ) : (
                          <Link to={item.href} className="text-white/50 hover:text-white block py-1" onClick={() => setMenuOpen(false)}>
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10">
                    Login
                  </Button>
                </Link>
                <Link to="/detector/flow">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(109,74,230,0.4)]">
                    Get access <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative pt-36 pb-4 overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none hidden lg:block">
            <div className="w-[40rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(109,74,230,0.06)_0,rgba(109,74,230,0.01)_50%,transparent_80%)]" />
            <div className="h-[80rem] absolute right-0 top-0 w-64 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,74,230,0.04)_0,transparent_100%)] [translate:-5%_-30%]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <AnimatedGroup
              variants={{
                container: { visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
                item: {
                  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring", bounce: 0.3, duration: 1.5 } },
                },
              }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 mb-8 backdrop-blur-sm">
                <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">Bottleneck Detector → Command Center</span>
                <span className="h-3.5 w-px bg-white/20" />
                <span className="text-xs text-white/30">Free · No card required</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight mb-8 max-w-4xl mx-auto leading-[1.05]">
                Stop guessing your bottleneck.{" "}
                <em className="not-italic text-violet-400 font-light">Diagnose it.</em>
              </h1>

              <p className="text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                15 questions. 4 minutes. You land directly inside Command Center — your full growth diagnostic mapped across 5 pillars, live instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
                <div className="bg-white/[0.05] rounded-[14px] border border-white/[0.08] p-0.5">
                  <Link to="/detector/flow">
                    <Button size="lg" className="h-12 px-7 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-base font-medium shadow-[0_0_25px_rgba(109,74,230,0.4)] hover:shadow-[0_0_35px_rgba(109,74,230,0.5)] transition-all">
                      Get my Command Center access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <button onClick={() => scrollTo("how-it-works")}>
                  <Button size="lg" variant="ghost" className="h-12 rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-base">
                    See how it works
                  </Button>
                </button>
              </div>

              <p className="text-xs text-white/20 font-mono uppercase tracking-widest">
                Free forever · 7-day full trial · No credit card
              </p>
            </AnimatedGroup>
          </div>

          {/* 3D Perspective Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-7xl mt-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
          >
            <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
              <div style={{ transform: "rotateX(18deg)" }}>
                <div style={{ transform: "skewX(0.3rad)" }}>
                  <CommandCenterMockup />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROBLEM FRAMING */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90 max-w-2xl mx-auto">
                Most operators are solving the wrong bottleneck.
              </h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                Not because they're wrong about what hurts — but because the surface symptom isn't the actual constraint.
              </p>
            </motion.div>
            <motion.div
              variants={staggerGrid} initial="hidden" whileInView="visible" viewport={viewport}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Target, color: "#6D4AE6", title: "You're solving symptoms, not systems", desc: "Most operators fix what hurts loudest. The real bottleneck is usually a layer deeper — and fixing symptoms without it wastes budget and energy." },
                { icon: Zap, color: "#378ADD", title: "Generalist advice doesn't fit your context", desc: "Growth tactics only work inside specific pillar contexts. The right tactic in the wrong pillar doesn't just fail — it can make things worse." },
                { icon: Brain, color: "#1D9E75", title: "You need a diagnostic before a strategy", desc: "Strategy is premature without knowing your actual constraint. The Detector finds the bottleneck first. Then Command Center maps the fix path." },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardItem}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: item.color + "15" }}>
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white/85 mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5 PILLARS */}
        <section id="pillars" className="py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Framework</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">Five pillars. One diagnostic.</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                The Detector measures your business across five root-level growth pillars. Each has its own constraint — it finds which one is holding everything back.
              </p>
            </motion.div>
            <motion.div
              variants={staggerGrid} initial="hidden" whileInView="visible" viewport={viewport}
              className="grid md:grid-cols-5 gap-4"
            >
              {[
                { color: "#6D4AE6", name: "Market & Offer Clarity", num: "01", measures: ["Offer positioning", "ICP definition", "Market clarity score"] },
                { color: "#378ADD", name: "Customer Acquisition", num: "02", measures: ["Channel effectiveness", "Lead volume & quality", "CAC efficiency"] },
                { color: "#1D9E75", name: "Sales & Conversion", num: "03", measures: ["Process documentation", "Conversion rate", "Follow-up system"] },
                { color: "#F59E0B", name: "Profit Optimization", num: "04", measures: ["Margin health", "Pricing structure", "Revenue leakage"] },
                { color: "#D85A30", name: "Financial Control", num: "05", measures: ["Cash flow visibility", "KPI tracking", "Forecast accuracy"] },
              ].map((pillar) => (
                <motion.div key={pillar.name} variants={cardItem} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 flex flex-col group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.color, boxShadow: `0 0 10px ${pillar.color}80` }} />
                    <span className="font-mono text-[10px] text-white/20">{pillar.num}</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/80 mb-3 leading-snug">{pillar.name}</h3>
                  <div className="space-y-1.5 mt-auto">
                    {pillar.measures.map((m) => (
                      <div key={m} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: pillar.color }} />
                        <span className="text-xs text-white/25 font-sans">{m}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mb-16">
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Process</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">
                Three steps. Four minutes. Full access.
              </h2>
            </motion.div>
            <div className="relative">
              <div className="absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
              <motion.div
                variants={staggerGrid} initial="hidden" whileInView="visible" viewport={viewport}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  { step: "01", color: "#6D4AE6", title: "Take the Detector", desc: "15 questions across 5 pillars. Designed for operators — no fluff, no theory. 4 minutes, calibrated answers." },
                  { step: "02", color: "#378ADD", title: "Get Command Center access", desc: "You land directly inside your dashboard — no separate results page. Your diagnosis is already rendered live." },
                  { step: "03", color: "#1D9E75", title: "Explore your diagnostic", desc: "Full access to your report, all SOPs, AI Advisor, and every Command Center feature. 7 days free. No card." },
                ].map((s) => (
                  <motion.div key={s.step} variants={cardItem} className="flex flex-col items-center text-center">
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center mb-5 font-mono text-sm font-bold z-10 bg-[#050505]"
                      style={{ borderColor: s.color + "50", color: s.color }}
                    >
                      {s.step}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-white/85 mb-2">{s.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light">{s.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMMAND CENTER FEATURES — BENTO GRID */}
        <section id="command-center" className="py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="text-center mb-14"
            >
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">What's Inside</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">This is software, not a PDF.</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                Command Center is a live diagnostic platform. Your report renders as a dashboard, not a document.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
              variants={staggerGrid} initial="hidden" whileInView="visible" viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min"
            >
              {/* Card 1: Bottleneck Report — col-span-2, tall */}
              <motion.div variants={cardItem} className="md:col-span-2">
                <BentoCard glowColor="rgba(109,74,230,0.18)" className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest">Bottleneck Report</span>
                    <span className="ml-auto px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[9px] text-violet-400 font-mono">Live</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">Your 5-pillar diagnostic — rendered as a dashboard.</h3>
                  <p className="text-sm text-white/40 font-light mb-6">Click any pillar for a 3-layer deep dive: surface symptom → system failure → root cause.</p>
                  <div className="space-y-3">
                    {[
                      { label: "Market & Offer Clarity", score: "2.1", color: "#6D4AE6", pct: 42, tag: "Needs Work" },
                      { label: "Customer Acquisition", score: "3.4", color: "#378ADD", pct: 68, tag: "Moderate" },
                      { label: "Sales & Conversion", score: "1.8", color: "#1D9E75", pct: 36, tag: "Critical ⚠" },
                      { label: "Profit Optimization", score: "3.9", color: "#F59E0B", pct: 78, tag: "Strong" },
                      { label: "Financial Control", score: "2.6", color: "#D85A30", pct: 52, tag: "Moderate" },
                    ].map((p) => (
                      <div key={p.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                            <span className="text-xs text-white/55 font-sans">{p.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white/20">{p.tag}</span>
                            <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.score}</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: p.color + "70" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${p.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>

              {/* Card 2: Growth Score — col-span-1 */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(0,210,255,0.12)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">System Score</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                        <circle cx="56" cy="56" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <motion.circle
                          cx="56" cy="56" r="46" fill="none" strokeWidth="8" strokeLinecap="round"
                          stroke="url(#bentoGauge)"
                          strokeDasharray={`${(13.8 / 25) * 289} 289`}
                          initial={{ strokeDasharray: "0 289" }}
                          whileInView={{ strokeDasharray: `${(13.8 / 25) * 289} 289` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                        />
                        <defs>
                          <linearGradient id="bentoGauge" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6D4AE6" />
                            <stop offset="100%" stopColor="#00D2FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-display font-light text-white tracking-tighter">13.8</span>
                        <span className="text-[9px] font-mono text-white/25">/ 25</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-end gap-0.5 h-8 w-full px-4 opacity-30">
                      {[4, 5, 3, 6, 7, 5, 8, 9].map((h, i) => (
                        <div key={i} className="flex-1 bg-cyan-400/60 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/20 text-center">Trailing 30 days · 5 pillars</p>
                </BentoCard>
              </motion.div>

              {/* Card 3: AI Advisor — col-span-1 */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(55,138,221,0.14)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">AI Advisor</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/85 mb-1">Knows your diagnosis.</h3>
                  <p className="text-xs text-white/35 font-light mb-4 leading-relaxed">Ask specific questions about your actual bottleneck — not generic advice.</p>
                  {/* Chat preview */}
                  <div className="flex-1 space-y-2.5 mt-auto">
                    <div className="flex justify-end">
                      <div className="bg-violet-600/20 border border-violet-500/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                        <p className="text-[10px] text-violet-200 font-sans">Why is my Sales score so low?</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl rounded-tl-sm px-3 py-2 max-w-[90%]">
                        <p className="text-[10px] text-white/55 font-sans leading-relaxed">Your score reflects a follow-up gap — 4 leads have been dormant for 7+ days. Start there.</p>
                      </div>
                    </div>
                    <div className="h-8 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center px-3 gap-2">
                      <MessageSquare className="w-3 h-3 text-white/15" />
                      <span className="text-[10px] text-white/15 font-sans">Ask about your diagnosis...</span>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>

              {/* Card 4: SOP Library — col-span-1 */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(29,158,117,0.12)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">SOP Library</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-display font-bold text-white">50</span>
                    <span className="text-white/30 font-mono text-sm">+ SOPs</span>
                  </div>
                  <p className="text-xs text-white/35 font-light mb-5">Mapped to your pillar scores. Every SOP knows your bottleneck.</p>
                  <div className="space-y-2 mt-auto">
                    {[
                      { label: "Sales & Conversion", color: "#1D9E75", count: 12 },
                      { label: "Customer Acquisition", color: "#378ADD", count: 9 },
                      { label: "Market & Offer", color: "#6D4AE6", count: 11 },
                    ].map((p) => (
                      <div key={p.label} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-[10px] text-white/35 font-sans flex-1">{p.label}</span>
                        <span className="text-[10px] font-mono text-white/25">{p.count}</span>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>

              {/* Card 5: Sprint & 7-Day Access — col-span-1 */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(245,158,11,0.10)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-3.5 h-3.5 text-amber-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Sprint Tracker</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/85 mb-1">Q3 Outbound Engine</h3>
                  <p className="text-xs text-white/35 font-light mb-4">Increase cold reply rate 2% → 5%</p>
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[9px] font-mono text-white/25 mb-1.5">
                      <span>Progress</span>
                      <span>40%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #F59E0B, #D85A30)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-mono">7-day full access active</span>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* TRUST LAYER */}
        <section className="py-16 px-6 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 text-center"
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <Shield className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">The Bottleneck Guarantee</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-white/90 mb-4">Your free tier keeps your report. Forever.</h3>
              <p className="text-white/40 max-w-xl mx-auto leading-relaxed mb-8 font-light">
                After the 7-day trial, your Bottleneck Report and dashboard stay fully accessible — no lock, no paywall, no expiry. The fix path is what's behind the paid tier. The diagnosis is always yours.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {["No credit card required", "Report never expires", "7-day full trial", "Cancel nothing"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-white/40 font-sans">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90 mb-4">
              Find your bottleneck in 4 minutes.
            </h2>
            <p className="text-white/40 text-lg mb-10 font-light">15 questions. Dropped directly into Command Center. Free forever.</p>
            <div className="bg-white/[0.05] rounded-[14px] border border-white/[0.08] p-0.5 inline-block">
              <Link to="/detector/flow">
                <Button size="lg" className="h-14 px-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-lg font-medium font-sans shadow-[0_0_30px_rgba(109,74,230,0.4)] hover:shadow-[0_0_40px_rgba(109,74,230,0.5)] transition-all">
                  Get my Command Center access
                  <ArrowRight className="ml-2.5 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-white/20 font-mono uppercase tracking-widest mt-4">
              Free · No card · 15 questions · 4 minutes
            </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <SGLogo />
          <div className="flex items-center gap-6 text-xs text-white/20">
            <Link to="/pricing" className="hover:text-white/40 transition-colors">Pricing</Link>
            <Link to="/login" className="hover:text-white/40 transition-colors">Login</Link>
            <span>© 2026 SG Media</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
