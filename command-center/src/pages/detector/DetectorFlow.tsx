import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useCommandStore } from "@/lib/store";

// ─── 15 Questions — 3 per pillar, operator-grade language ─────
const QUESTIONS = [
  // ── Market & Offer Clarity ───────────────────────────────────
  {
    id: 1, pillar: "Market & Offer Clarity", color: "#6D4AE6", weight: 3,
    text: "Can you describe your ideal customer in one sentence specific enough that it would exclude the wrong people?",
    type: "scale10" as const,
    scaleLabels: ["Anyone who'll pay", "Precisely defined ICP"],
  },
  {
    id: 2, pillar: "Market & Offer Clarity", color: "#6D4AE6", weight: 2,
    text: "Which best describes your core offer right now?",
    type: "single-select" as const,
    options: [
      "One clear offer — same price, same outcome, same process for everyone",
      "Multiple tiers or packages — clearly defined",
      "Custom proposals — outcome and price vary by client",
      "No clear structure — it depends on the conversation",
    ],
  },
  {
    id: 3, pillar: "Market & Offer Clarity", color: "#6D4AE6", weight: 1,
    text: "Would a stranger reading your website understand what you sell and who it is for within 10 seconds?",
    type: "scale10" as const,
    scaleLabels: ["No — it's vague", "Yes — crystal clear"],
  },
  // ── Customer Acquisition ─────────────────────────────────────
  {
    id: 4, pillar: "Customer Acquisition", color: "#378ADD", weight: 3,
    text: "How predictable is your lead flow month-to-month? Could you forecast next month's leads within 20%?",
    type: "scale10" as const,
    scaleLabels: ["Completely unpredictable", "Highly predictable system"],
  },
  {
    id: 5, pillar: "Customer Acquisition", color: "#378ADD", weight: 2,
    text: "Which acquisition channels are currently producing paying customers? (Select all that apply)",
    type: "multi-select" as const,
    options: [
      "Outbound email or DMs",
      "Paid advertising (Meta, Google, LinkedIn)",
      "Content or SEO (inbound)",
      "Referrals from existing clients",
      "Partnerships or affiliates",
      "Events, conferences, or in-person",
      "None — leads come in without a system",
    ],
  },
  {
    id: 6, pillar: "Customer Acquisition", color: "#378ADD", weight: 1,
    text: "What is the single biggest thing limiting your lead volume right now?",
    type: "short-text" as const,
  },
  // ── Sales & Conversion ───────────────────────────────────────
  {
    id: 7, pillar: "Sales & Conversion", color: "#1D9E75", weight: 3,
    text: "Do you have a documented sales process that anyone on your team could follow and produce consistent results?",
    type: "scale10" as const,
    scaleLabels: ["Everything is improvised", "Fully documented and trained"],
  },
  {
    id: 8, pillar: "Sales & Conversion", color: "#1D9E75", weight: 2,
    text: "Where do most qualified leads go cold in your pipeline?",
    type: "single-select" as const,
    options: [
      "No follow-up system — they fall through the cracks",
      "After the first call or demo — they ghost",
      "After the proposal — price or timing objections",
      "The initial conversation — they do not book at all",
      "Our conversion rate is actually solid — we close most qualified leads",
    ],
  },
  {
    id: 9, pillar: "Sales & Conversion", color: "#1D9E75", weight: 1,
    text: "How confident are you in your ability to handle objections without discounting or losing the deal?",
    type: "scale10" as const,
    scaleLabels: ["I often lose deals to objections", "I handle every objection effectively"],
  },
  // ── Profit Optimization ──────────────────────────────────────
  {
    id: 10, pillar: "Profit Optimization", color: "#F59E0B", weight: 3,
    text: "Do you know your net profit margin, gross margin, and per-client profitability right now — without checking?",
    type: "scale10" as const,
    scaleLabels: ["No visibility", "Know my numbers precisely"],
  },
  {
    id: 11, pillar: "Profit Optimization", color: "#F59E0B", weight: 2,
    text: "Which best describes your current pricing?",
    type: "single-select" as const,
    options: [
      "Value-based — priced relative to the outcome delivered",
      "Cost-plus — priced based on my costs plus a markup",
      "Market rate — I price similarly to competitors",
      "Inconsistent — it varies significantly by client",
      "I do not have a clear pricing model",
    ],
  },
  {
    id: 12, pillar: "Profit Optimization", color: "#F59E0B", weight: 1,
    text: "How systematically do you review and reduce costs or scope creep on active client work?",
    type: "scale10" as const,
    scaleLabels: ["Never review — costs drift", "Monthly review with action"],
  },
  // ── Financial & Performance Control ─────────────────────────
  {
    id: 13, pillar: "Financial & Performance Control", color: "#D85A30", weight: 3,
    text: "How clearly do you track business performance with specific KPIs reviewed on a regular cadence?",
    type: "scale10" as const,
    scaleLabels: ["No tracking — I work on feel", "Weekly KPI review with a dashboard"],
  },
  {
    id: 14, pillar: "Financial & Performance Control", color: "#D85A30", weight: 2,
    text: "How would you describe your current cash flow visibility?",
    type: "single-select" as const,
    options: [
      "I have a live cash flow model and can forecast the next 90 days",
      "I check my bank balance regularly but have no formal model",
      "I only look at cash when something feels off",
      "I have no real visibility — cash flow surprises me regularly",
    ],
  },
  {
    id: 15, pillar: "Financial & Performance Control", color: "#D85A30", weight: 1,
    text: "What is the most pressing financial or performance challenge you are facing right now?",
    type: "short-text" as const,
  },
];

const PILLAR_ORDER = [
  "Market & Offer Clarity",
  "Customer Acquisition",
  "Sales & Conversion",
  "Profit Optimization",
  "Financial & Performance Control",
];

const PILLAR_SLUGS: Record<string, string> = {
  "Market & Offer Clarity": "market_offer",
  "Customer Acquisition": "acquisition",
  "Sales & Conversion": "sales",
  "Profit Optimization": "profit",
  "Financial & Performance Control": "finance",
};

// Compute pillar scores (0–5) from answers
function computePillarScores(answers: Record<number, unknown>) {
  const scores: Record<string, number> = {};
  PILLAR_ORDER.forEach(pillar => {
    const pillarQs = QUESTIONS.filter(q => q.pillar === pillar);
    let weighted = 0;
    let totalWeight = 0;
    pillarQs.forEach(q => {
      const ans = answers[q.id];
      let raw = 0;
      if (q.type === "scale10" && typeof ans === "number") {
        raw = (ans / 10) * 5; // convert 1–10 to 0–5
      } else if (q.type === "single-select" && typeof ans === "string") {
        const idx = (q.options ?? []).indexOf(ans);
        const len = (q.options ?? []).length;
        raw = idx >= 0 ? ((len - 1 - idx) / (len - 1)) * 5 : 2.5;
      } else if (q.type === "multi-select" && Array.isArray(ans)) {
        const lastOption = (q.options ?? [])[(q.options?.length ?? 1) - 1];
        raw = ans.includes(lastOption) ? 1 : Math.min(5, ans.length * 1.5);
      } else if (q.type === "short-text") {
        raw = 2.5; // neutral — assessed qualitatively in future
      }
      weighted += raw * q.weight;
      totalWeight += q.weight;
    });
    scores[PILLAR_SLUGS[pillar]] = totalWeight > 0
      ? parseFloat((weighted / totalWeight).toFixed(1))
      : 2.5;
  });
  return scores;
}

const SGLogo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-violet-600 text-white p-1 rounded-md">
      <span className="font-black tracking-tighter text-sm">SG</span>
    </div>
    <span className="text-white tracking-widest text-xs uppercase font-medium">Media</span>
  </div>
);

const DetectorFlow = () => {
  const navigate = useNavigate();
  const { startTrial } = useCommandStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const question = QUESTIONS[currentIndex];
  const progress = (currentIndex / QUESTIONS.length) * 100;
  const currentPillarIdx = PILLAR_ORDER.indexOf(question.pillar);
  const pillarQs = QUESTIONS.filter(q => q.pillar === question.pillar);
  const qInPillar = pillarQs.findIndex(q => q.id === question.id) + 1;

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) setCurrentIndex(c => c + 1);
    else setIsFinished(true);
  };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(c => c - 1); };

  // Keyboard shortcuts — 1-9 for scale answers, Enter to advance
  useEffect(() => {
    if (isFinished) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (question.type === "scale10") {
        const n = parseInt(e.key);
        if (n >= 1 && n <= 9) handleAnswer(n);
        if (e.key === "0") handleAnswer(10);
      }
      if (e.key === "ArrowRight" && answers[question.id] !== undefined) handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, answers, isFinished, currentIndex]); // eslint-disable-line

  const handleAnswer = (value: unknown) => {
    if (question.type === "multi-select") {
      const cur = (answers[question.id] as string[]) || [];
      const next = cur.includes(value as string)
        ? cur.filter(v => v !== value)
        : [...cur, value as string];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      setAnswers({ ...answers, [question.id]: value });
      if (question.type !== "short-text") setTimeout(handleNext, 380);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    // Compute scores
    const pillarScores = computePillarScores(answers);
    const overall = parseFloat(
      (Object.values(pillarScores).reduce((a, b) => a + b, 0)).toFixed(1)
    );
    const primaryPillar = Object.entries(pillarScores)
      .sort(([, a], [, b]) => a - b)[0][0];

    try {
      // Always persist to localStorage so auth.tsx can flush it after login/signup
      localStorage.setItem('pending_diagnostic', JSON.stringify({
        overall_score: overall,
        primary_pillar: primaryPillar,
        answers,
        pillar_scores: pillarScores,
      }));

      // Also try to save immediately if user is already authed
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('diagnostics').insert({
          user_id: user.id,
          overall_score: overall,
          primary_pillar: primaryPillar,
          answers,
          pillar_scores: pillarScores,
        });
        localStorage.removeItem('pending_diagnostic'); // saved to DB — clear
        // Generate initial action items based on primary bottleneck
        const PILLAR_ACTIONS: Record<string, Array<{ title: string; pillar: string; pillar_color: string }>> = {
          sales: [
            { title: "Document your current sales process step-by-step", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
            { title: "Identify and script your 3 most common objections", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
            { title: "Set up a 5-touch follow-up sequence for all qualified leads", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
          ],
          market_offer: [
            { title: "Run the Offer Clarity Audit (12-point check)", pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6" },
            { title: "Rewrite your offer headline with a specific measurable outcome", pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6" },
          ],
          acquisition: [
            { title: "Audit your acquisition channels by real CAC", pillar: "Customer Acquisition", pillar_color: "#378ADD" },
            { title: "Map your lead-to-close conversion rate by channel", pillar: "Customer Acquisition", pillar_color: "#378ADD" },
          ],
          profit: [
            { title: "Calculate gross margin and net margin for each service line", pillar: "Profit Optimization", pillar_color: "#F59E0B" },
            { title: "Identify your 3 highest-margin clients and understand why", pillar: "Profit Optimization", pillar_color: "#F59E0B" },
          ],
          finance: [
            { title: "Set up a monthly cash flow forecast (90-day rolling)", pillar: "Financial & Performance Control", pillar_color: "#D85A30" },
            { title: "Define your 5 core KPIs and review cadence", pillar: "Financial & Performance Control", pillar_color: "#D85A30" },
          ],
        };

        const actions = PILLAR_ACTIONS[primaryPillar] || [];
        if (actions.length > 0) {
          await supabase.from('action_items').insert(
            actions.map(a => ({ ...a, user_id: user.id, status: 'not_started' }))
          );
        }
      }
    } catch {
      // Non-fatal — continue flow even if DB save fails
    }

    // Store email in localStorage as fallback
    localStorage.setItem('sg_user_email', email);
    localStorage.setItem('sg_business_name', businessName);
    localStorage.setItem('sg_trial_start', new Date().toISOString());
    startTrial();

    setSubmitting(false);
    navigate("/detector/analyzing");
  };

  // Email gate screen
  if (isFinished) {
    return (
      <div className="min-h-screen text-[#F8F9FA] relative overflow-hidden flex flex-col items-center justify-center p-4">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] mb-6">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-mono">15 / 15 complete</span>
            </div>
            <h2 className="text-3xl font-display font-light text-white mb-3 tracking-tight">
              Your diagnostic is ready.
            </h2>
            <p className="text-white/40 font-light leading-relaxed">
              Enter your email and we will create your Command Center access and map your full bottleneck report instantly.
            </p>
          </div>

          <div
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-8"
            style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.11)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Work Email</label>
                <Input
                  type="email" placeholder="you@company.com" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                  Business Name <span className="text-white/20">(optional)</span>
                </label>
                <Input
                  type="text" placeholder="Your Company"
                  value={businessName} onChange={e => setBusinessName(e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                />
              </div>
              <div className="pt-1">
                <Button type="submit" size="lg" disabled={submitting}
                  className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_0_20px_rgba(109,74,230,0.35)] hover:shadow-[0_0_30px_rgba(109,74,230,0.45)] transition-all disabled:opacity-60">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate my diagnostic →"}
                </Button>
              </div>
              <p className="text-[10px] text-center text-white/20 font-mono">
                One email with your results. We never spam.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Question flow
  return (
    <div className="min-h-screen text-[#F8F9FA] relative overflow-hidden flex flex-col">
      <AnimatedBackground />

      {/* Nav */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/[0.04] flex-shrink-0">
        <Link to="/landing"><SGLogo /></Link>
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">Bottleneck Detector</span>
        <Link to="/login" className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono">Log in</Link>
      </header>

      {/* Progress */}
      <div className="relative z-10 px-6 pt-6 flex-shrink-0">
        <div className="max-w-2xl mx-auto">
          {/* Pillar pill indicators */}
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto hide-scrollbar">
            {PILLAR_ORDER.map((pillar, i) => {
              const isActive = pillar === question.pillar;
              const isPast = currentPillarIdx > i;
              return (
                <div key={pillar} className="flex items-center gap-1 flex-shrink-0">
                  <div className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    isActive ? "w-8" : "w-3",
                    isPast ? "bg-violet-500" : isActive ? "bg-violet-400" : "bg-white/[0.08]"
                  )} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
              Q{currentIndex + 1} of {QUESTIONS.length}
            </span>
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              {question.pillar} · {qInPillar} of {pillarQs.length}
            </span>
          </div>

          <div className="h-px w-full bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6D4AE6, #00D2FF)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6 py-8 relative z-10">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -32, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-col flex-1"
            >
              {/* Pillar badge */}
              <div
                className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-6 border"
                style={{ backgroundColor: `${question.color}12`, color: question.color, borderColor: `${question.color}25` }}
              >
                {question.pillar}
              </div>

              {/* Question text */}
              <h2 className="text-2xl md:text-3xl font-display font-light leading-tight mb-10 text-white tracking-tight">
                {question.text}
              </h2>

              {/* Answers */}
              <div className="mb-8">
                {question.type === "scale10" && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] text-white/25 uppercase tracking-widest font-mono px-1 mb-2">
                      <span>{question.scaleLabels?.[0] ?? "Poor"}</span>
                      <span className="text-white/15">Press 1-9 or 0 for 10</span>
                      <span>{question.scaleLabels?.[1] ?? "Excellent"}</span>
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {[1,2,3,4,5,6,7,8,9,10].map(val => {
                        const selected = answers[question.id] === val;
                        return (
                          <motion.button
                            key={val}
                            onClick={() => handleAnswer(val)}
                            whileHover={{ scale: 1.06, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={cn(
                              "h-14 md:h-16 rounded-xl border font-mono text-lg font-medium transition-all duration-200",
                              selected
                                ? "border-violet-500/60 bg-violet-500/20 text-violet-300 shadow-[0_0_20px_rgba(109,74,230,0.35)]"
                                : "border-white/[0.07] bg-black/40 backdrop-blur-sm text-white/60 hover:border-violet-500/30 hover:bg-violet-500/[0.07] hover:text-white hover:shadow-[0_0_16px_rgba(109,74,230,0.15)]"
                            )}
                          >
                            {val}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {question.type === "single-select" && (
                  <div className="space-y-2.5">
                    {question.options?.map(opt => {
                      const selected = answers[question.id] === opt;
                      return (
                        <motion.button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={cn(
                            "w-full p-5 rounded-2xl border text-left font-light leading-snug transition-all duration-200",
                            selected
                              ? "border-violet-500/50 bg-violet-500/[0.12] text-white shadow-[0_0_24px_rgba(109,74,230,0.2)]"
                              : "border-white/[0.07] bg-black/40 backdrop-blur-sm text-white/70 hover:border-violet-500/30 hover:bg-violet-500/[0.06] hover:text-white hover:shadow-[0_0_18px_rgba(109,74,230,0.12)]"
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm">{opt}</span>
                            {selected && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                                <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {question.type === "multi-select" && (
                  <div className="space-y-2.5">
                    <p className="text-xs text-white/25 font-mono mb-3">Select all that apply</p>
                    {question.options?.map(opt => {
                      const selected = ((answers[question.id] as string[]) || []).includes(opt);
                      return (
                        <motion.button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          whileTap={{ scale: 0.99 }}
                          className={cn(
                            "w-full p-5 rounded-2xl border text-left font-light text-sm transition-all duration-200 flex items-center justify-between gap-3",
                            selected
                              ? "border-emerald-500/40 bg-emerald-500/[0.08] text-white shadow-[0_0_20px_rgba(16,185,129,0.12)]"
                              : "border-white/[0.07] bg-black/40 backdrop-blur-sm text-white/70 hover:border-white/[0.14] hover:bg-white/[0.03] hover:text-white"
                          )}
                        >
                          <span>{opt}</span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200",
                            selected ? "border-emerald-500/60 bg-emerald-500/20" : "border-white/[0.15]"
                          )}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                        </motion.button>
                      );
                    })}
                    <div className="pt-2">
                      <Button onClick={handleNext}
                        className="h-11 px-6 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium shadow-[0_0_16px_rgba(109,74,230,0.3)]">
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {question.type === "short-text" && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your answer here..."
                      className="min-h-[140px] text-base p-5 bg-black/40 backdrop-blur-sm border-white/[0.08] text-white placeholder:text-white/20 resize-none rounded-2xl focus-visible:ring-0 focus-visible:border-violet-500/50 transition-colors font-light"
                      value={(answers[question.id] as string) || ""}
                      onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })}
                    />
                    <Button onClick={handleNext}
                      className="h-12 px-8 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium shadow-[0_0_18px_rgba(109,74,230,0.3)] hover:shadow-[0_0_26px_rgba(109,74,230,0.4)] transition-all">
                      Save & Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav */}
          <div className="flex justify-between items-center pt-4 border-t border-white/[0.05] mt-auto">
            <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}
              className="text-white/30 hover:text-white hover:bg-white/[0.04] disabled:opacity-20 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="hidden md:flex items-center gap-3 text-[9px] font-mono text-white/15">
              <span>← → navigate</span>
              <span>·</span>
              <span>1-9 select</span>
            </div>
            <Button variant="ghost" onClick={handleNext}
              className="text-white/30 hover:text-white hover:bg-white/[0.04] rounded-xl">
              Skip <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectorFlow;
