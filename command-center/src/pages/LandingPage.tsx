import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  ArrowRight, Menu, X, CheckCircle2, BarChart3,
  Target, Zap, Brain, TrendingUp, Shield,
  LayoutDashboard, Compass, BookOpen, Flag, Sparkles,
  Briefcase, Settings, Activity, FileText, Wrench,
  MessageSquare, Clock, ChevronRight, Layers, Users, Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Scroll-reveal wrapper ─────────────────────────────────────────────────
const Reveal = ({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── Liquid-glass bento card ───────────────────────────────────────────────
const BentoCard = ({
  children, className = "", glowColor = "rgba(109,74,230,0.15)", style = {},
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 22 } }}
      className={cn("relative overflow-hidden rounded-2xl bento-card bento-shine grain-overlay", className)}
      style={{
        background: "rgba(0,0,0,0.50)",
        border: "1px solid rgba(255,255,255,0.065)",
        borderTop: "1px solid rgba(255,255,255,0.11)",
        backdropFilter: "blur(24px)",
        ...style,
      }}
    >
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// ─── Logo ─────────────────────────────────────────────────────────────────
const SGLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="bg-violet-600 text-white px-2 py-1 rounded-lg shadow-[0_0_16px_rgba(109,74,230,0.5)]">
      <span className="font-black tracking-tighter text-sm">SG</span>
    </div>
    <span className="text-white/90 tracking-widest text-xs uppercase font-semibold">Media</span>
  </div>
);

// ─── Animated progress bar ─────────────────────────────────────────────────
const AnimBar = ({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color + "80" }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
};

// ─── Dashboard mockup ──────────────────────────────────────────────────────
const CommandCenterMockup = () => (
  <div
    className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden select-none w-full"
    style={{ boxShadow: "0 0 80px rgba(109,74,230,0.15), 0 40px 100px rgba(0,0,0,0.8)" }}
  >
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-[#050505]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="ml-3 flex-1 h-4 bg-white/[0.03] rounded-md flex items-center px-2 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <span className="text-[9px] text-white/15 font-mono">app.sgmedia.com/dashboard</span>
      </div>
    </div>
    <div className="flex" style={{ height: "480px" }}>
      {/* Sidebar */}
      <div className="w-14 border-r border-white/[0.04] bg-black/60 flex flex-col flex-shrink-0">
        <div className="h-[54px] flex items-center justify-center border-b border-white/[0.03]">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-violet-400" />
          </div>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 items-center px-2">
          <div className="w-full h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <LayoutDashboard className="w-[18px] h-[18px] text-violet-400" />
          </div>
          {[Compass, BookOpen, FileText, Flag, Wrench, Sparkles].map((Icon, i) => (
            <div key={i} className="w-full h-9 flex items-center justify-center rounded-xl">
              <Icon className="w-[18px] h-[18px] text-slate-700" />
            </div>
          ))}
        </div>
        <div className="h-12 border-t border-white/[0.03] flex items-center justify-center">
          <Settings className="w-[18px] h-[18px] text-slate-700" />
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0C]">
        <div className="h-[54px] border-b border-white/[0.04] flex items-center px-5 gap-3 flex-shrink-0">
          <div className="flex-1 h-6 max-w-[180px] bg-white/[0.04] rounded-lg flex items-center px-2.5 gap-2">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="h-2 w-20 bg-white/[0.07] rounded-sm" />
          </div>
          <div className="ml-auto w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30" />
        </div>

        <div className="flex-1 overflow-hidden px-5 py-4 space-y-3">
          {/* Greeting */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
              <span className="text-[8px] font-mono text-violet-400/80 uppercase tracking-widest">System Online · Session Active</span>
            </div>
            <div className="h-5 w-52 bg-white/[0.08] rounded-md" />
            <div className="h-2.5 w-80 bg-white/[0.04] rounded-sm" />
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Score", val: "13.8", color: "#6D4AE6" },
              { label: "Actions", val: "3/8", color: "#1D9E75" },
              { label: "SOPs", val: "50+", color: "#378ADD" },
              { label: "Streak", val: "Day 5", color: "#F59E0B" },
            ].map(s => (
              <div key={s.label} className="rounded-lg p-2.5" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-[6px] font-mono text-slate-600 uppercase tracking-widest mb-1">{s.label}</div>
                <div className="text-sm font-display font-light" style={{ color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Main bento */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", minHeight: "140px" }}>
              <div className="absolute top-2 right-2 opacity-[0.03]"><Target className="w-24 h-24 text-violet-300" /></div>
              <div className="space-y-2.5 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <Activity className="w-2.5 h-2.5 text-violet-400" />
                  <span className="text-[7px] font-mono text-violet-300">Primary Bottleneck Identified</span>
                </div>
                <div>
                  <div className="h-4 w-40 bg-white/[0.10] rounded-md mb-1.5" />
                  <div className="h-2 w-60 bg-white/[0.04] rounded-sm mb-1" />
                  <div className="h-2 w-48 bg-white/[0.04] rounded-sm" />
                </div>
              </div>
              <div className="relative z-10 mt-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-full">
                  <span className="text-[7px] font-medium text-black">View Bottleneck Report</span>
                  <ArrowRight className="w-2.5 h-2.5 text-black/60" />
                </div>
              </div>
            </div>

            <div className="col-span-4 rounded-xl p-3 flex flex-col items-center justify-center"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[6px] font-mono text-slate-600 uppercase tracking-widest mb-2">System Score</div>
              <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="22" fill="none" strokeWidth="4" strokeLinecap="round"
                    stroke="url(#gaugeML)" strokeDasharray={`${(13.8/25)*138} 138`} />
                  <defs>
                    <linearGradient id="gaugeML" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6D4AE6" /><stop offset="100%" stopColor="#00D2FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-xs font-light text-white">13.8</span>
                  <span className="text-[5px] text-slate-600">/25</span>
                </div>
              </div>
              <div className="w-full flex items-end gap-0.5 h-3 mt-2 opacity-30 px-1">
                {[4,5,3,6,7,5,8,9].map((h,i) => (
                  <div key={i} className="flex-1 bg-cyan-400/50 rounded-t-sm" style={{ height: `${h*10}%` }} />
                ))}
              </div>
            </div>

            {/* Pillar strip */}
            <div className="col-span-12 rounded-xl p-3"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[6px] font-mono text-slate-600 uppercase tracking-widest mb-2">5-Pillar Overview</div>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { n: "Market",   s: 2.1, c: "#6D4AE6", p: 42 },
                  { n: "Acquis.",  s: 3.4, c: "#378ADD", p: 68 },
                  { n: "Sales",    s: 1.8, c: "#1D9E75", p: 36 },
                  { n: "Profit",   s: 3.9, c: "#F59E0B", p: 78 },
                  { n: "Finance",  s: 2.6, c: "#D85A30", p: 52 },
                ].map(p => (
                  <div key={p.n} className="rounded-lg p-1.5" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="text-[5px] font-mono text-slate-600 mb-0.5">{p.n}</div>
                    <div className="text-[9px] font-light mb-1" style={{ color: p.c }}>{p.s}</div>
                    <div className="h-0.5 bg-white/[0.05] rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${p.p}%`, backgroundColor: p.c + "70" }} />
                    </div>
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

// ─── Nav items ─────────────────────────────────────────────────────────────
const navItems = [
  { name: "How it works", href: "#how-it-works" },
  { name: "5 Pillars", href: "#pillars" },
  { name: "Inside CC", href: "#command-center" },
  { name: "Pricing", href: "/pricing" },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, bounce: 0.2, duration: 0.8 } },
};
const vp = { once: true, margin: "-60px" };

// ─── Main ──────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-[#F8F9FA] overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      <AnimatedBackground />

      {/* ── NAV ── */}
      <header>
        <nav className="fixed z-30 w-full px-4 top-0">
          <div className={cn(
            "mx-auto mt-3 max-w-6xl px-5 transition-all duration-500 rounded-2xl",
            isScrolled
              ? "liquid-glass-dark max-w-4xl"
              : "bg-transparent"
          )}>
            <div className="relative flex flex-wrap items-center justify-between gap-4 py-3.5 lg:gap-0">
              <div className="flex w-full justify-between lg:w-auto">
                <Link to="/" aria-label="SG Media"><SGLogo /></Link>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative z-20 -m-2 block cursor-pointer p-2 lg:hidden"
                >
                  {menuOpen ? <X className="size-5 text-white/70" /> : <Menu className="size-5 text-white/70" />}
                </button>
              </div>

              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8">
                  {navItems.map(item => (
                    <li key={item.name}>
                      {item.href.startsWith("#") ? (
                        <button onClick={() => scrollTo(item.href.slice(1))}
                          className="text-white/40 hover:text-white/80 transition-colors text-sm">
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

              <div className={cn(
                "hidden w-full flex-wrap items-center justify-end gap-3",
                "lg:flex lg:w-fit",
                menuOpen && "!flex flex-col items-start rounded-2xl border border-white/[0.08] bg-black/80 p-5 backdrop-blur-xl mt-2"
              )}>
                {menuOpen && (
                  <ul className="w-full space-y-4 mb-3 lg:hidden">
                    {navItems.map(item => (
                      <li key={item.name}>
                        {item.href.startsWith("#") ? (
                          <button onClick={() => scrollTo(item.href.slice(1))} className="text-white/50 hover:text-white py-1">{item.name}</button>
                        ) : (
                          <Link to={item.href} className="text-white/50 hover:text-white block py-1" onClick={() => setMenuOpen(false)}>{item.name}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <Link to="/login" className={menuOpen ? "w-full" : ""}>
                  <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/5 border border-white/10 w-full lg:w-auto">
                    Login
                  </Button>
                </Link>
                <Link to="/detector/flow" className={menuOpen ? "w-full" : ""}>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_16px_rgba(109,74,230,0.45)] w-full lg:w-auto">
                    Get access <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── HERO ── */}
        <section ref={heroRef} className="relative pt-36 pb-8 overflow-hidden">
          {/* Radial bg decorations */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(109,74,230,0.12)_0%,transparent_70%)]" />
            <div className="absolute right-0 top-1/4 w-64 h-96 bg-[radial-gradient(ellipse_at_100%_50%,rgba(109,74,230,0.06)_0%,transparent_70%)]" />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-5xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 mb-8 backdrop-blur-sm float-badge">
                <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">Bottleneck Detector → Command Center</span>
                <span className="h-3.5 w-px bg-white/20" />
                <span className="text-xs text-white/30">Free · No card required</span>
              </div>
            </motion.div>

            {["Stop guessing", "your bottleneck.", "Diagnose it."].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <span className={`block text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight leading-[1.05] ${
                  i === 2 ? "text-violet-400" : "text-white"
                }`}>
                  {line}
                </span>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-xl text-white/40 max-w-2xl mx-auto mt-7 mb-10 leading-relaxed font-light"
            >
              15 questions. 4 minutes. You land directly inside Command Center — your full growth diagnostic mapped across 5 pillars, live instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
            >
              <div className="liquid-glass rounded-[14px] p-0.5">
                <Link to="/detector/flow">
                  <Button size="lg" className="h-12 px-7 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-base font-medium shadow-[0_0_28px_rgba(109,74,230,0.45)] hover:shadow-[0_0_40px_rgba(109,74,230,0.6)] transition-all">
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="text-xs text-white/20 font-mono uppercase tracking-widest"
            >
              Free forever · 7-day full trial · No credit card
            </motion.p>
          </motion.div>

          {/* Dashboard mockup with 3D perspective */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
            className="mx-auto max-w-7xl mt-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
          >
            <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
              <motion.div
                style={{ rotateX: 18, skewX: "0.3rad" }}
                whileHover={{ rotateX: 14 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                <CommandCenterMockup />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="py-28 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90 max-w-2xl mx-auto">
                Most operators are solving the wrong bottleneck.
              </h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                Not because they're wrong about what hurts — but because the surface symptom isn't the actual constraint.
              </p>
            </Reveal>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
              className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Target, color: "#6D4AE6", title: "You're solving symptoms, not systems", desc: "Most operators fix what hurts loudest. The real bottleneck is usually a layer deeper — and fixing symptoms without it wastes budget and energy." },
                { icon: Zap,    color: "#378ADD", title: "Generalist advice doesn't fit your context", desc: "Growth tactics only work inside specific pillar contexts. The right tactic in the wrong pillar doesn't just fail — it can make things worse." },
                { icon: Brain,  color: "#1D9E75", title: "You need a diagnostic before a strategy", desc: "Strategy is premature without knowing your actual constraint. The Detector finds the bottleneck first. Then Command Center maps the fix path." },
              ].map(item => (
                <motion.div key={item.title} variants={cardItem}>
                  <BentoCard glowColor={item.color + "20"} className="p-7 h-full group">
                    <div className="h-11 w-11 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: item.color + "15", border: `1px solid ${item.color}25` }}>
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-base font-display font-semibold text-white/90 mb-2.5">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
                  </BentoCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 5 PILLARS ── */}
        <section id="pillars" className="py-28 px-6 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Framework</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">Five pillars. One diagnostic.</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                The Detector measures your business across five root-level growth pillars — and finds which one is holding everything back.
              </p>
            </Reveal>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
              className="grid md:grid-cols-5 gap-3">
              {[
                { color: "#6D4AE6", name: "Market & Offer Clarity", num: "01", measures: ["Offer positioning", "ICP definition", "Market clarity score"] },
                { color: "#378ADD", name: "Customer Acquisition",   num: "02", measures: ["Channel effectiveness", "Lead volume & quality", "CAC efficiency"] },
                { color: "#1D9E75", name: "Sales & Conversion",     num: "03", measures: ["Process documentation", "Conversion rate", "Follow-up system"] },
                { color: "#F59E0B", name: "Profit Optimization",    num: "04", measures: ["Margin health", "Pricing structure", "Revenue leakage"] },
                { color: "#D85A30", name: "Financial Control",      num: "05", measures: ["Cash flow visibility", "KPI tracking", "Forecast accuracy"] },
              ].map(pillar => (
                <motion.div key={pillar.name} variants={cardItem}>
                  <BentoCard glowColor={pillar.color + "20"} className="p-5 h-full flex flex-col group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.color, boxShadow: `0 0 12px ${pillar.color}80` }} />
                      <span className="font-mono text-[10px] text-white/20">{pillar.num}</span>
                    </div>
                    <h3 className="text-sm font-display font-semibold text-white/80 mb-3 leading-snug">{pillar.name}</h3>
                    <div className="space-y-2 mt-auto">
                      {pillar.measures.map(m => (
                        <div key={m} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: pillar.color }} />
                          <span className="text-xs text-white/25">{m}</span>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-28 px-6 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal className="mb-16">
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">The Process</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">
                Three steps. Four minutes. Full access.
              </h2>
            </Reveal>
            <div className="relative">
              <div className="absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
                className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "01", color: "#6D4AE6", title: "Take the Detector", desc: "15 questions across 5 pillars. Designed for operators — no fluff, no theory. 4 minutes, calibrated answers." },
                  { step: "02", color: "#378ADD", title: "Get Command Center access", desc: "You land directly inside your dashboard — no separate results page. Your diagnosis is already rendered live." },
                  { step: "03", color: "#1D9E75", title: "Explore your diagnostic", desc: "Full access to your report, all SOPs, AI Advisor, and every Command Center feature. 7 days free. No card." },
                ].map(s => (
                  <motion.div key={s.step} variants={cardItem} className="flex flex-col items-center text-center">
                    <div className="w-11 h-11 rounded-full border-2 flex items-center justify-center mb-5 font-mono text-sm font-bold z-10 liquid-glass-dark"
                      style={{ borderColor: s.color + "50", color: s.color }}>
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

        {/* ── COMMAND CENTER BENTO ── */}
        <section id="command-center" className="py-28 px-6 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-4">What's Inside</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white/90">This is software, not a PDF.</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg font-light">
                Command Center is a live diagnostic platform. Your report renders as a dashboard, not a document.
              </p>
            </Reveal>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Bottleneck Report — 2 cols, tall */}
              <motion.div variants={cardItem} className="md:col-span-2 md:row-span-2">
                <BentoCard glowColor="rgba(109,74,230,0.18)" className="p-7 h-full min-h-[420px] flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest">Bottleneck Report</span>
                    <span className="ml-auto px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-[9px] text-violet-400 font-mono">Live</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-2">Your 5-pillar diagnostic — rendered as a dashboard.</h3>
                  <p className="text-sm text-white/40 font-light mb-7">Click any pillar for a 3-layer deep dive: surface symptom → system failure → root cause.</p>
                  <div className="space-y-4 flex-1">
                    {[
                      { label: "Market & Offer Clarity", score: "2.1", color: "#6D4AE6", pct: 42, tag: "Needs Work" },
                      { label: "Customer Acquisition",   score: "3.4", color: "#378ADD", pct: 68, tag: "Moderate" },
                      { label: "Sales & Conversion",     score: "1.8", color: "#1D9E75", pct: 36, tag: "Critical ⚠" },
                      { label: "Profit Optimization",    score: "3.9", color: "#F59E0B", pct: 78, tag: "Strong" },
                      { label: "Financial Control",      score: "2.6", color: "#D85A30", pct: 52, tag: "Moderate" },
                    ].map(p => (
                      <div key={p.label} className="group/row hover:bg-white/[0.02] rounded-lg p-2 -mx-2 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                            <span className="text-xs text-white/55">{p.label}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] text-white/20">{p.tag}</span>
                            <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.score}</span>
                            <ChevronRight className="w-3 h-3 text-white/10 group-hover/row:text-white/30 transition-colors" />
                          </div>
                        </div>
                        <AnimBar pct={p.pct} color={p.color} delay={0.3} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/[0.05]">
                    <Link to="/detector/flow">
                      <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6 h-10 text-sm shadow-[0_0_20px_rgba(109,74,230,0.35)]">
                        Get your report <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </BentoCard>
              </motion.div>

              {/* System Score */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(0,210,255,0.12)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">System Score</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center py-3">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                        <circle cx="56" cy="56" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <motion.circle cx="56" cy="56" r="46" fill="none" strokeWidth="8" strokeLinecap="round"
                          stroke="url(#bentoGauge)"
                          initial={{ strokeDasharray: "0 289" }}
                          whileInView={{ strokeDasharray: `${(13.8/25)*289} 289` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                        />
                        <defs>
                          <linearGradient id="bentoGauge" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6D4AE6" /><stop offset="100%" stopColor="#00D2FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-display font-light text-white tracking-tighter">13.8</span>
                        <span className="text-[9px] font-mono text-white/25">/ 25</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-end gap-0.5 h-8 w-full px-4 opacity-30">
                      {[4,5,3,6,7,5,8,9].map((h,i) => (
                        <div key={i} className="flex-1 bg-cyan-400/60 rounded-t-sm" style={{ height: `${h*10}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/20 text-center">Trailing 30 days · 5 pillars</p>
                </BentoCard>
              </motion.div>

              {/* AI Advisor */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(55,138,221,0.14)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">AI Advisor</span>
                    <span className="ml-auto text-[9px] font-mono text-emerald-400/70 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" /> Online
                    </span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/85 mb-1">Knows your diagnosis.</h3>
                  <p className="text-xs text-white/35 font-light mb-4 leading-relaxed">Ask about your actual bottleneck — not generic advice.</p>
                  <div className="flex-1 space-y-2.5 mt-auto">
                    <div className="flex justify-end">
                      <div className="bg-violet-600/20 border border-violet-500/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                        <p className="text-[10px] text-violet-200">Why is my Sales score so low?</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl rounded-tl-sm px-3 py-2 max-w-[90%]">
                        <p className="text-[10px] text-white/55 leading-relaxed">Your score reflects a follow-up gap — 4 leads dormant 7+ days. Start there.</p>
                      </div>
                    </div>
                    <div className="h-8 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center px-3 gap-2">
                      <MessageSquare className="w-3 h-3 text-white/15" />
                      <span className="text-[10px] text-white/15">Ask about your diagnosis...</span>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>

              {/* SOP Library */}
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
                  <div className="space-y-2.5 mt-auto">
                    {[
                      { label: "Sales & Conversion",   color: "#1D9E75", count: 12 },
                      { label: "Customer Acquisition", color: "#378ADD", count: 9  },
                      { label: "Market & Offer",       color: "#6D4AE6", count: 11 },
                      { label: "Profit Optimization",  color: "#F59E0B", count: 8  },
                      { label: "Financial Control",    color: "#D85A30", count: 10 },
                    ].map(p => (
                      <div key={p.label} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[10px] text-white/35 flex-1">{p.label}</span>
                        <span className="text-[10px] font-mono text-white/25">{p.count}</span>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>

              {/* Sprint + Pathways */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(245,158,11,0.10)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-3.5 h-3.5 text-amber-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Sprint Tracker</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/85 mb-1">Q3 Outbound Engine</h3>
                  <p className="text-xs text-white/35 font-light mb-4">Cold reply rate: 2% → 5%</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-[9px] font-mono text-white/25 mb-1.5">
                      <span>Progress</span><span>40%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#F59E0B,#D85A30)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-auto pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-mono">7-day full access active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white/15" />
                      <span className="text-[10px] font-mono text-white/20">4 tasks remaining this week</span>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>

              {/* Pathways */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(109,74,230,0.10)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Compass className="w-3.5 h-3.5 text-violet-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Pathways</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white/85 mb-1">30-Day Operator Roadmap</h3>
                  <p className="text-xs text-white/35 font-light mb-5 leading-relaxed">Personalised fix sequence based on your bottleneck chain. Week by week.</p>
                  <div className="space-y-2 mt-auto">
                    {[
                      { week: "Week 1", task: "Audit & document sales process", done: true },
                      { week: "Week 2", task: "Deploy follow-up sequence", done: false },
                      { week: "Week 3", task: "A/B test offer positioning", done: false },
                    ].map(w => (
                      <div key={w.week} className={`flex items-center gap-2.5 ${w.done ? "opacity-40" : ""}`}>
                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${w.done ? "border-emerald-500/50 bg-emerald-500/10" : "border-white/10"}`}>
                          {w.done && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-white/20 block">{w.week}</span>
                          <span className="text-[10px] text-white/45">{w.task}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>

              {/* Templates */}
              <motion.div variants={cardItem}>
                <BentoCard glowColor="rgba(255,255,255,0.06)" className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-3.5 h-3.5 text-slate-400/70" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Templates</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-display font-bold text-white">30</span>
                    <span className="text-white/30 font-mono text-sm">+ templates</span>
                  </div>
                  <p className="text-xs text-white/35 font-light mb-4">Plug-and-play docs for every growth workflow.</p>
                  <div className="space-y-2 mt-auto">
                    {["Cold outreach sequence", "Offer positioning doc", "Weekly KPI tracker", "Sales call script"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <FileText className="w-3 h-3 text-white/15 flex-shrink-0" />
                        <span className="text-[10px] text-white/30">{t}</span>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST LAYER ── */}
        <section className="py-20 px-6 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <BentoCard glowColor="rgba(109,74,230,0.10)" className="p-10 text-center">
                <div className="inline-flex items-center gap-2 mb-5">
                  <Shield className="h-4 w-4 text-violet-400" />
                  <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">The Bottleneck Guarantee</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-white/90 mb-4">Your free tier keeps your report. Forever.</h3>
                <p className="text-white/40 max-w-xl mx-auto leading-relaxed mb-8 font-light">
                  After the 7-day trial, your Bottleneck Report and dashboard stay fully accessible — no lock, no paywall, no expiry. The fix path is what's behind the paid tier. The diagnosis is always yours.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {["No credit card required", "Report never expires", "7-day full trial", "Cancel nothing"].map(t => (
                    <div key={t} className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />
                      {t}
                    </div>
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 px-6 border-t border-white/[0.05]">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mb-5">
                Find your bottleneck<br />in 4 minutes.
              </h2>
              <p className="text-white/40 text-lg mb-10 font-light">15 questions. Dropped directly into Command Center. Free forever.</p>
              <div className="liquid-glass rounded-[14px] p-0.5 inline-block">
                <Link to="/detector/flow">
                  <Button size="lg" className="h-14 px-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-lg font-medium shadow-[0_0_32px_rgba(109,74,230,0.4)] hover:shadow-[0_0_48px_rgba(109,74,230,0.55)] transition-all">
                    Get my Command Center access
                    <ArrowRight className="ml-2.5 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-white/20 font-mono uppercase tracking-widest mt-5">
                Free · No card · 15 questions · 4 minutes
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <SGLogo />
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/20">
            <Link to="/pricing" className="hover:text-white/50 transition-colors">Pricing</Link>
            <Link to="/login" className="hover:text-white/50 transition-colors">Login</Link>
            <Link to="/detector/flow" className="hover:text-white/50 transition-colors">Get Started</Link>
            <span className="text-white/10">·</span>
            <span>© 2026 SG Media</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
