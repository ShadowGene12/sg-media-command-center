import { useState, useEffect } from "react";
import { SGLogo } from "@/components/SGLogo";
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

// ─── 15 Visceral Scenario Questions ─────────────────────────────
const QUESTIONS = [
  // ── Market & Offer Clarity ───────────────────────────────────
  {
    id: 1,
    pillar: "Market & Offer Clarity",
    color: "#6D4AE6",
    text: "If a prospect gets on a call and has the budget, but exhibits early red flags, how does your team handle the disqualification?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We use a strict Anti-ICP framework. If they hit specific red flags, we politely route them elsewhere, regardless of the revenue." },
      { id: "B", score: 2, text: "We know who we don't want, but if the contract value is high enough, we will usually try to customize the offer and make it work." },
      { id: "C", score: 1, text: "Qualification is almost entirely budget-based. If they can afford our fees, we pitch the features of the product." },
      { id: "D", score: 0, text: "We rarely disqualify anyone. We need the cash flow, so we close the deal and just figure out the fulfillment headaches later." },
    ]
  },
  {
    id: 2,
    pillar: "Market & Offer Clarity",
    color: "#6D4AE6",
    text: "How does your pricing structure and core offer adapt when pitching to a new lead?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "It doesn't. We have one core offer, a set price, and a defined process. The client buys our system." },
      { id: "B", score: 2, text: "We have defined tiers, but we frequently discount or adjust scope on the fly to win the deal." },
      { id: "C", score: 1, text: "Every proposal is custom. We scope the work based on what the client asks for and what we think they can pay." },
      { id: "D", score: 0, text: "We don't have a standardized offer. We pitch whatever service the lead seems most interested in." },
    ]
  },
  {
    id: 3,
    pillar: "Market & Offer Clarity",
    color: "#6D4AE6",
    text: "If a stranger looked at your landing page right now, what would they conclude?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "They would know exactly who we serve, the specific metric we improve, and our mechanism for doing it within 10 seconds." },
      { id: "B", score: 2, text: "They would understand our general industry, but might have to read a few paragraphs to figure out exactly what we deliver." },
      { id: "C", score: 1, text: "They would see a lot of buzzwords (\"innovative,\" \"synergy\") but wouldn't know the precise outcome we drive." },
      { id: "D", score: 0, text: "It's highly ambiguous. We try to appeal to everyone, so the messaging is completely generic." },
    ]
  },
  // ── Customer Acquisition ─────────────────────────────────────
  {
    id: 4,
    pillar: "Customer Acquisition",
    color: "#378ADD",
    text: "If your lead volume needed to double next month, what exact levers would you pull?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We have a predictable acquisition engine. I know exactly how much ad spend or outbound volume to increase to hit that target." },
      { id: "B", score: 2, text: "I have a general idea of what works, but scaling it would rely heavily on testing and hoping performance holds up." },
      { id: "C", score: 1, text: "We rely on word-of-mouth and referrals. I couldn't artificially double it; we would just have to hustle harder." },
      { id: "D", score: 0, text: "Complete guesswork. Our leads come in randomly, and I have no control over the volume." },
    ]
  },
  {
    id: 5,
    pillar: "Customer Acquisition",
    color: "#378ADD",
    text: "A qualified prospect downloads your core asset or joins your list, but doesn't book a call. What is their exact experience over the next 30 days?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "They drop into an automated nurture sequence with high-value assets and retargeting until they are ready." },
      { id: "B", score: 2, text: "We put them on an email newsletter list, but the content isn't highly targeted or frequent." },
      { id: "C", score: 1, text: "Sales might manually follow up once or twice, but then they are forgotten." },
      { id: "D", score: 0, text: "Nothing. If they don't buy immediately, they are dead to us." },
    ]
  },
  {
    id: 6,
    pillar: "Customer Acquisition",
    color: "#378ADD",
    text: "What is the primary source of your highest-paying, lowest-friction clients?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "Our owned, scalable systems (paid ads, outbound sequences, or SEO) that run without founder intervention." },
      { id: "B", score: 2, text: "Organic content or founder-led networking. It works, but it requires constant manual effort to maintain." },
      { id: "C", score: 1, text: "Unpredictable referrals. We get good clients, but we don't know when the next one is coming." },
      { id: "D", score: 0, text: "We don't have a reliable source for high-quality clients. We take whatever we can get." },
    ]
  },
  // ── Sales & Conversion ───────────────────────────────────────
  {
    id: 7,
    pillar: "Sales & Conversion",
    color: "#1D9E75",
    text: "If you hired a new sales rep tomorrow, how long until they could close deals at your current win rate?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "Under 14 days. We have recorded call libraries, objection-handling scripts, and a fully documented sales process." },
      { id: "B", score: 2, text: "A month or two. They would shadow me and learn via osmosis, but the process isn't formally documented." },
      { id: "C", score: 1, text: "Months. Closing relies heavily on my personal founder authority and industry knowledge." },
      { id: "D", score: 0, text: "Impossible. I am the only one who can sell our services because every pitch is made up on the spot." },
    ]
  },
  {
    id: 8,
    pillar: "Sales & Conversion",
    color: "#1D9E75",
    text: "Where do your best, highest-paying deals actually go to die right now?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We lose very few qualified deals. The ones we do lose are due to genuine timing or hard budget constraints." },
      { id: "B", score: 2, text: "In the proposal phase. We send out custom decks and then get hit with \"we need to think about it.\"" },
      { id: "C", score: 1, text: "Post-discovery ghosting. We have great first calls, but they never show up for the close." },
      { id: "D", score: 0, text: "We don't even get them on the calendar. Our show-up rate and initial booking rate is bleeding leads." },
    ]
  },
  {
    id: 9,
    pillar: "Sales & Conversion",
    color: "#1D9E75",
    text: "When a prospect pushes back heavily on price, what is your team's default reflex?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We hold firm, isolate the objection, and reframe the conversation around the cost of inaction. We do not discount." },
      { id: "B", score: 2, text: "We try to defend the value, but will usually cave and offer a 10-20% discount to save the deal." },
      { id: "C", score: 1, text: "We immediately down-sell them to a cheaper package or reduce the scope of work." },
      { id: "D", score: 0, text: "We panic and match whatever price they say they can afford, destroying our margins." },
    ]
  },
  // ── Profit Optimization ──────────────────────────────────────
  {
    id: 10,
    pillar: "Profit Optimization",
    color: "#F59E0B",
    text: "Do you know your exact net profit margin and gross margin per service line right now—without checking?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "Yes, precisely. I know exactly which clients and services are subsidizing the others." },
      { id: "B", score: 2, text: "I know the overall company margin, but I don't track profitability per client or per service line." },
      { id: "C", score: 1, text: "I have a rough estimate based on my bank balance, but my accounting is always a month behind." },
      { id: "D", score: 0, text: "No visibility at all. I just hope there's cash left over at the end of the year." },
    ]
  },
  {
    id: 11,
    pillar: "Profit Optimization",
    color: "#F59E0B",
    text: "When a client demands out-of-scope work, how is it handled operationally?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We point to the SLA. If they want it, we send a change order and charge them for it immediately." },
      { id: "B", score: 2, text: "We'll usually do it for free the first time to \"keep them happy,\" but warn them it's out of scope." },
      { id: "C", score: 1, text: "We just do the work. We're terrified of them churning, so we absorb the cost." },
      { id: "D", score: 0, text: "We don't even have a defined scope of work, so everything feels like an expectation we have to meet." },
    ]
  },
  {
    id: 12,
    pillar: "Profit Optimization",
    color: "#F59E0B",
    text: "If you lost your largest client today, what happens to the business?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "A minor speed bump. No single client accounts for more than 10-15% of our total revenue." },
      { id: "B", score: 2, text: "We would have to tighten our belts and pause hiring, but we wouldn't miss payroll." },
      { id: "C", score: 1, text: "Panic mode. We would immediately have to lay off team members or slash owner comp." },
      { id: "D", score: 0, text: "We would go out of business. They account for 40%+ of our revenue and dictate our operations." },
    ]
  },
  // ── Financial & Performance Control ─────────────────────────
  {
    id: 13,
    pillar: "Financial & Performance Control",
    color: "#D85A30",
    text: "How clearly do you track business performance with specific KPIs?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "We have a live, automated dashboard tracking 5-7 core KPIs. We review them weekly as a leadership team." },
      { id: "B", score: 2, text: "We pull reports manually at the end of the month to see how we did, but it's reactive, not proactive." },
      { id: "C", score: 1, text: "The only KPI we really track is top-line revenue and maybe cash in the bank." },
      { id: "D", score: 0, text: "No tracking at all. We operate entirely on feeling and daily fires." },
    ]
  },
  {
    id: 14,
    pillar: "Financial & Performance Control",
    color: "#D85A30",
    text: "If you stopped working in the business for 30 days, what breaks first?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "Nothing. The team executes the SOPs, sales continue, and fulfillment runs without me." },
      { id: "B", score: 2, text: "Growth would stall. Fulfillment would survive, but new client acquisition relies entirely on me." },
      { id: "C", score: 1, text: "Client relationships would fracture. I am still the main point of contact for our biggest accounts." },
      { id: "D", score: 0, text: "Everything collapses. I am the central bottleneck for approvals, sales, and putting out fires." },
    ]
  },
  {
    id: 15,
    pillar: "Financial & Performance Control",
    color: "#D85A30",
    text: "How would you describe your current cash flow visibility?",
    type: "scenario",
    options: [
      { id: "A", score: 3, text: "I have a rolling 90-day cash flow forecast. I know exactly when cash will be tight months in advance." },
      { id: "B", score: 2, text: "I check my accounts weekly and have a general idea of pending invoices, but no formal model." },
      { id: "C", score: 1, text: "I wait for my bookkeeper to tell me if we had a good month. Cash flow often surprises me." },
      { id: "D", score: 0, text: "I live invoice to invoice. Payroll is constantly a stressful event." },
    ]
  }
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
  PILLAR_ORDER.forEach((pillar) => {
    const pillarQs = QUESTIONS.filter((q) => q.pillar === pillar);
    let totalScore = 0;
    pillarQs.forEach((q) => {
      const ans = answers[q.id];
      if (typeof ans === "number") {
        totalScore += ans;
      }
    });
    // Max score per pillar is 9 (3 questions * 3 max score). Map 0-9 to 0-5.
    scores[PILLAR_SLUGS[pillar]] = parseFloat(((totalScore / 9) * 5).toFixed(1));
  });
  return scores;
}



const DetectorFlow = () => {
  const navigate = useNavigate();
  const { startTrial } = useCommandStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [whatsapp, setWhatsapp] = useState("+91 ");
  const [submitting, setSubmitting] = useState(false);

  const question = QUESTIONS[currentIndex];
  const progress = (currentIndex / QUESTIONS.length) * 100;
  const currentPillarIdx = PILLAR_ORDER.indexOf(question.pillar);
  const pillarQs = QUESTIONS.filter((q) => q.pillar === question.pillar);
  const qInPillar = pillarQs.findIndex((q) => q.id === question.id) + 1;

  const handleNext = () => {
    if (currentIndex >= QUESTIONS.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((c) => Math.min(c + 1, QUESTIONS.length - 1));
    }
  };
  const handlePrev = () => {
    setCurrentIndex((c) => Math.max(c - 1, 0));
  };

  // Keyboard shortcuts — A,B,C,D for scenarios, Enter/Right to advance
  useEffect(() => {
    if (isFinished || !question) return;
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      )
        return;
      
      if (question.type === "scenario") {
        const key = e.key.toUpperCase();
        if (["A", "B", "C", "D"].includes(key)) {
          const opt = question.options?.find(o => o.id === key);
          if (opt) handleAnswer(opt.score);
        }
      }
      if (e.key === "ArrowRight" && answers[question.id] !== undefined)
        handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, answers, isFinished, currentIndex]); // eslint-disable-line

  const handleAnswer = (value: unknown) => {
    if (question.type === "multi-select") {
      const cur = (answers[question.id] as string[]) || [];
      const next = cur.includes(value as string)
        ? cur.filter((v) => v !== value)
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
      Object.values(pillarScores)
        .reduce((a, b) => a + b, 0)
        .toFixed(1),
    );
    const primaryPillar = Object.entries(pillarScores).sort(
      ([, a], [, b]) => a - b,
    )[0][0];

    try {
      // Always persist to localStorage so auth.tsx can flush it after login/signup
      localStorage.setItem(
        "pending_diagnostic",
        JSON.stringify({
          overall_score: overall,
          primary_pillar: primaryPillar,
          answers,
          pillar_scores: pillarScores,
        }),
      );

      // Also try to save immediately if user is already authed
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("diagnostics").insert({
          user_id: user.id,
          overall_score: overall,
          primary_pillar: primaryPillar,
          answers,
          pillar_scores: pillarScores,
        });
        localStorage.removeItem("pending_diagnostic"); // saved to DB — clear
        // Generate initial action items based on primary bottleneck
        const PILLAR_ACTIONS: Record<
          string,
          Array<{ title: string; pillar: string; pillar_color: string }>
        > = {
          sales: [
            {
              title: "Document your current sales process step-by-step",
              pillar: "Sales & Conversion",
              pillar_color: "#1D9E75",
            },
            {
              title: "Identify and script your 3 most common objections",
              pillar: "Sales & Conversion",
              pillar_color: "#1D9E75",
            },
            {
              title:
                "Set up a 5-touch follow-up sequence for all qualified leads",
              pillar: "Sales & Conversion",
              pillar_color: "#1D9E75",
            },
          ],
          market_offer: [
            {
              title: "Run the Offer Clarity Audit (12-point check)",
              pillar: "Market & Offer Clarity",
              pillar_color: "#6D4AE6",
            },
            {
              title:
                "Rewrite your offer headline with a specific measurable outcome",
              pillar: "Market & Offer Clarity",
              pillar_color: "#6D4AE6",
            },
          ],
          acquisition: [
            {
              title: "Audit your acquisition channels by real CAC",
              pillar: "Customer Acquisition",
              pillar_color: "#378ADD",
            },
            {
              title: "Map your lead-to-close conversion rate by channel",
              pillar: "Customer Acquisition",
              pillar_color: "#378ADD",
            },
          ],
          profit: [
            {
              title:
                "Calculate gross margin and net margin for each service line",
              pillar: "Profit Optimization",
              pillar_color: "#F59E0B",
            },
            {
              title:
                "Identify your 3 highest-margin clients and understand why",
              pillar: "Profit Optimization",
              pillar_color: "#F59E0B",
            },
          ],
          finance: [
            {
              title: "Set up a monthly cash flow forecast (90-day rolling)",
              pillar: "Financial & Performance Control",
              pillar_color: "#D85A30",
            },
            {
              title: "Define your 5 core KPIs and review cadence",
              pillar: "Financial & Performance Control",
              pillar_color: "#D85A30",
            },
          ],
        };

        const actions = PILLAR_ACTIONS[primaryPillar] || [];
        if (actions.length > 0) {
          await supabase
            .from("action_items")
            .insert(
              actions.map((a) => ({
                ...a,
                user_id: user.id,
                status: "not_started",
              })),
            );
        }
      }
    } catch {
      // Non-fatal — continue flow even if DB save fails
    }

    // Store email in localStorage as fallback
    localStorage.setItem("sg_user_email", email);
    localStorage.setItem("sg_business_name", businessName);
    localStorage.setItem("sg_whatsapp", whatsapp);
    localStorage.setItem("sg_trial_start", new Date().toISOString());
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
              <span className="text-xs text-emerald-400 font-mono">
                15 / 15 complete
              </span>
            </div>
            <h2 className="text-3xl font-display font-light text-white mb-3 tracking-tight">
              Your diagnostic is ready.
            </h2>
            <p className="text-white/40 font-light leading-relaxed">
              Enter your email and we will create your Command Center access and
              map your full bottleneck report instantly.
            </p>
          </div>

          <div
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: "1px solid rgba(255,255,255,0.11)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                  Work Email <span className="text-violet-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                  Business Name{" "}
                  <span className="text-white/20">(optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="Your Company"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-violet-500/60 transition-colors"
                />
              </div>
              <div className="space-y-1.5 pt-2">
                <label className="text-white/60 text-[10px] font-mono uppercase tracking-widest flex items-center justify-between border-b border-white/10 pb-1">
                  <span>WhatsApp Number <span className="text-emerald-400">*</span></span>
                  <span className="text-emerald-400/80 text-[8px] bg-emerald-500/10 px-1.5 py-0.5 rounded tracking-normal">Direct Access</span>
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="h-12 bg-emerald-500/[0.02] border-emerald-500/20 text-white placeholder:text-white/20 rounded-xl text-sm focus-visible:ring-0 focus-visible:border-emerald-500/60 transition-colors"
                />
              </div>
              <div className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_0_20px_rgba(109,74,230,0.35)] hover:shadow-[0_0_30px_rgba(109,74,230,0.45)] transition-all disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Generate my diagnostic →"
                  )}
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
        <Link to="/landing">
          <SGLogo />
        </Link>
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
          Bottleneck Detector
        </span>
        <Link
          to="/login"
          className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono"
        >
          Log in
        </Link>
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
                <div
                  key={pillar}
                  className="flex items-center gap-1 flex-shrink-0"
                >
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      isActive ? "w-8" : "w-3",
                      isPast
                        ? "bg-violet-500"
                        : isActive
                          ? "bg-violet-400"
                          : "bg-white/[0.08]",
                    )}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[10px] text-white/40 tracking-widest">
              [SYS.DIAG // {(currentIndex + 1).toString().padStart(2, '0')}:{QUESTIONS.length}]
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
                style={{
                  backgroundColor: `${question.color}12`,
                  color: question.color,
                  borderColor: `${question.color}25`,
                }}
              >
                {question.pillar}
              </div>

              {/* Question text */}
              <h2 className="text-2xl md:text-3xl font-display font-light leading-tight mb-10 text-white tracking-tight">
                {question.text}
              </h2>

              {/* Answers */}
              <div className="mb-8">
                {question.type === "scenario" && (
                  <div className="flex flex-col gap-3">
                    {question.options?.map((opt) => {
                      const selected = answers[question.id] === opt.score;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => handleAnswer(opt.score)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                          className={cn(
                            "w-full p-6 rounded-xl text-left font-light leading-relaxed transition-all duration-300 relative overflow-hidden group",
                            selected
                              ? "bg-violet-500/[0.08] text-white border border-violet-500/40 shadow-[0_0_30px_rgba(109,74,230,0.15)]"
                              : "bg-[rgba(255,255,255,0.02)] backdrop-blur-md text-white/70 border border-white/[0.05] border-t-white/[0.12] hover:bg-[rgba(255,255,255,0.04)] hover:border-white/[0.1] hover:text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1 text-[15px] md:text-[16px]">
                              {opt.text}
                            </div>
                            <div className="hidden sm:flex flex-row items-center justify-center shrink-0 gap-3">
                              {selected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                >
                                  <CheckCircle2 className="w-5 h-5 text-violet-400" />
                                </motion.div>
                              )}
                              <div
                                className={cn(
                                  "px-2 py-1 rounded text-[10px] font-mono tracking-widest transition-colors",
                                  selected
                                    ? "bg-violet-500/20 text-violet-300"
                                    : "bg-white/[0.05] text-white/30 group-hover:text-white/50"
                                )}
                              >
                                [ {opt.id} ]
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav */}
          <div className="flex justify-between items-center pt-4 border-t border-white/[0.05] mt-auto">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-white/60 hover:text-white hover:bg-white/[0.08] disabled:opacity-20 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-white/60">
              <span>← → navigate</span>
              <span>·</span>
              <span>A-D select</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleNext}
              className="text-white/60 hover:text-white hover:bg-white/[0.08] rounded-xl"
            >
              Skip <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectorFlow;
