import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Shield, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCommandStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    id: "free",
    label: "Free",
    price: "₹0",
    sub: "forever",
    description: "Your diagnostic stays yours — no expiry.",
    color: "#515B68",
    glowColor: "rgba(81,91,104,0.10)",
    features: [
      "Bottleneck Report (permanent)",
      "5-pillar score dashboard",
      "1 bottleneck scan",
      "Read-only after trial",
    ],
    locked: [],
    cta: "Current plan",
    ctaVariant: "ghost" as const,
    disabled: true,
  },
  {
    id: "starter",
    label: "Starter",
    price: "₹799",
    sub: "/month",
    description: "Get into the fix path. Low-friction entry.",
    color: "#378ADD",
    glowColor: "rgba(55,138,221,0.12)",
    features: [
      "Everything in Free",
      "3 pillar-specific SOPs",
      "Action Plan (5 items)",
      "Dashboard + Report access",
    ],
    locked: ["AI Advisor", "Sprint Tracker", "Full SOP Library"],
    cta: "Unlock Starter",
    ctaVariant: "outline" as const,
    disabled: false,
  },
  {
    id: "operator",
    label: "Operator",
    price: "₹4,900",
    sub: "/month",
    description: "The full platform. Diagnosis + fix path.",
    color: "#6D4AE6",
    glowColor: "rgba(109,74,230,0.18)",
    popular: true,
    features: [
      "Everything in Starter",
      "Full SOP Library (50+)",
      "AI Advisor — unlimited queries",
      "Sprint Tracker + Pathways",
      "30-Day Operator Roadmap",
      "Workspace Canvas",
    ],
    locked: [],
    cta: "Unlock Operator",
    ctaVariant: "default" as const,
    disabled: false,
  },
  {
    id: "dfy",
    label: "Done For You",
    price: "Custom",
    sub: "",
    description: "We execute your fix path for you.",
    color: "#F59E0B",
    glowColor: "rgba(245,158,11,0.10)",
    features: [
      "Everything in Operator",
      "Dedicated account manager",
      "Bi-weekly strategy calls",
      "Custom SOP development",
      "Managed action plan",
      "Priority support",
    ],
    locked: [],
    cta: "Book discovery call",
    ctaVariant: "outline" as const,
    disabled: false,
  },
];

const cardVars = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 18, delay: i * 0.1 },
  }),
};

const Upgrade = () => {
  const { tier, trialDay } = useCommandStore();
  const isExpiring = trialDay >= 5 && trialDay <= 7;
  const trialActive = trialDay >= 1 && trialDay <= 7;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest">Unlock Command Center</p>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">
          You found your bottleneck. Now fix it.
        </h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto font-light">
          The diagnosis is always free. The fix path is what you're choosing now.
        </p>
      </div>

      {/* Trial expiry banner */}
      {isExpiring && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-5 py-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06]"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs text-amber-400">
              {trialDay === 7 ? "Trial ends tonight" : `${8 - trialDay} days left in your trial`}
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-400/60">Lifetime pricing locked in if you upgrade now</span>
        </motion.div>
      )}

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map((t, i) => {
          const isCurrent = tier === t.id || (t.id === "free" && (tier === "free" || tier === "trial"));
          return (
            <motion.div
              key={t.id}
              custom={i}
              variants={cardVars}
              initial="hidden"
              animate="show"
              className="relative flex flex-col"
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-[10px] font-mono text-white shadow-[0_0_16px_rgba(109,74,230,0.5)]">
                    <Star className="w-3 h-3" /> Most popular
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col flex-1 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
                  t.popular && "ring-1 ring-violet-500/40"
                )}
                style={{
                  background: t.popular ? "rgba(109,74,230,0.06)" : "rgba(0,0,0,0.4)",
                  border: `1px solid ${t.color}25`,
                  borderTop: `1px solid ${t.color}40`,
                  backdropFilter: "blur(20px)",
                  boxShadow: t.popular ? `0 0 40px rgba(109,74,230,0.12)` : undefined,
                }}
              >
                {/* Glow */}
                <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${t.glowColor}, transparent)` }} />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Label */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: t.color }}>
                      {t.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-3xl font-display font-light text-white">{t.price}</span>
                    {t.sub && <span className="text-white/30 text-sm font-mono ml-1">{t.sub}</span>}
                  </div>
                  <p className="text-xs text-white/35 font-light mb-6 leading-relaxed">{t.description}</p>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1 mb-6">
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: t.color }} />
                        <span className="text-xs text-white/60 font-light leading-snug">{f}</span>
                      </div>
                    ))}
                    {t.locked.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 opacity-40">
                        <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/30" />
                        <span className="text-xs text-white/30 font-light leading-snug line-through">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {t.id === "dfy" ? (
                    <a href="mailto:shadow@sgmedia.in?subject=Done For You Enquiry" className="block">
                      <Button
                        variant="outline"
                        className="w-full h-11 rounded-xl border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 font-medium text-sm"
                      >
                        {t.cta} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </a>
                  ) : t.disabled ? (
                    <Button
                      disabled
                      variant="ghost"
                      className="w-full h-11 rounded-xl text-white/20 font-medium text-sm cursor-default"
                    >
                      {t.cta}
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        "w-full h-11 rounded-xl font-medium text-sm transition-all",
                        t.popular
                          ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(109,74,230,0.4)] hover:shadow-[0_0_30px_rgba(109,74,230,0.5)]"
                          : "bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.08]"
                      )}
                    >
                      <Zap className="w-3.5 h-3.5 mr-2" style={{ color: t.popular ? undefined : t.color }} />
                      {t.cta}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guarantee */}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {[
          { icon: Shield, text: "Report stays free forever" },
          { icon: CheckCircle2, text: "No credit card for free tier" },
          { icon: Zap, text: "Instant access on upgrade" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm text-white/30">
            <item.icon className="w-4 h-4 text-violet-400/50" />
            {item.text}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-lg font-display font-light text-white text-center mb-6">Common questions</h2>
        {[
          {
            q: "Does the free tier actually keep my report?",
            a: "Yes. Your Bottleneck Report and 5-pillar dashboard are yours permanently. No paywall, no expiry. The fix path — SOPs, AI Advisor, Sprint Tracker — requires Starter or higher.",
          },
          {
            q: "What is the difference between Starter and Operator?",
            a: "Starter gets you 3 SOPs relevant to your primary bottleneck and a basic action plan — enough to start. Operator unlocks the full platform: all 50+ SOPs, AI Advisor, Sprint Tracking, Pathways, and your 30-Day Roadmap.",
          },
          {
            q: "Is Done For You really hands-on?",
            a: "Yes. We actively manage your growth system — bi-weekly calls, custom SOPs written for your specific business, and a managed action plan. Book a discovery call to see if it is the right fit.",
          },
        ].map((item) => (
          <div key={item.q} className="rounded-xl p-5"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-sm font-medium text-white/80 mb-2">{item.q}</p>
            <p className="text-sm text-white/40 font-light leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
