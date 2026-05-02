import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  // Market & Offer Clarity
  { id: 1, pillar: "Market & Offer Clarity", color: "#6D4AE6", text: "How clearly defined is your target market?", type: "scale10" },
  { id: 2, pillar: "Market & Offer Clarity", color: "#6D4AE6", text: "Which of the following describes your current offer structure?", type: "single-select", options: ["Single core offer", "Multiple tiered offers", "Custom proposals for everyone", "Unsure"] },
  // Customer Acquisition
  { id: 3, pillar: "Customer Acquisition", color: "#378ADD", text: "Which acquisition channels are currently active? (Select all that apply)", type: "multi-select", options: ["Outbound Email", "Paid Ads", "Content / SEO", "Referrals", "Partnerships"] },
  { id: 4, pillar: "Customer Acquisition", color: "#378ADD", text: "What is your primary bottleneck in acquisition right now?", type: "short-text" },
  // Sales & Conversion
  { id: 5, pillar: "Sales & Conversion", color: "#1D9E75", text: "Do you follow a documented, structured sales process for every prospect?", type: "scale10" },
];

const DetectorFlow = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Email capture state
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const question = QUESTIONS[currentIndex];
  const progress = ((currentIndex) / QUESTIONS.length) * 100;

  // Mock autosave
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setSaveStatus('saving');
      const timer = setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [answers]);

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(curr => curr + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(curr => curr - 1);
    }
  };

  const handleAnswer = (value: any) => {
    if (question.type === 'multi-select') {
      const currentVals = answers[question.id] || [];
      const newVals = currentVals.includes(value) 
        ? currentVals.filter((v: string) => v !== value)
        : [...currentVals, value];
      setAnswers({ ...answers, [question.id]: newVals });
    } else {
      setAnswers({ ...answers, [question.id]: value });
      if (question.type !== 'short-text') {
        setTimeout(() => handleNext(), 400); // Auto-advance for single select / scale
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    navigate("/detector/analyzing");
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl bg-card border border-border p-8 md:p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-display font-bold mb-3 text-center">Your diagnostic is ready.</h2>
          <p className="text-muted-foreground text-center mb-8 text-lg">
            Enter your email to generate your report. We'll send a copy to your inbox and create your Command Center access.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                required 
                className="h-14 text-lg bg-secondary/50 border-white/10"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input 
                type="text" 
                placeholder="Your business name (optional)" 
                className="h-14 text-lg bg-secondary/50 border-white/10"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full h-14 text-lg mt-4 bg-primary hover:bg-primary/90 text-white">
              Generate my diagnostic →
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              We never spam or share your data. One email with your results, plus occasional insights.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center p-4 md:p-8">
      {/* Top Bar: Progress & Autosave */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-end mb-4">
          <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            Question {currentIndex + 1} of {QUESTIONS.length}
          </span>
          <div className="flex items-center text-xs text-slate-500 font-mono">
            {saveStatus === 'saving' && <><Save className="w-3 h-3 mr-1 animate-pulse" /> Saving...</>}
            {saveStatus === 'saved' && <><CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Saved</>}
          </div>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 w-full max-w-2xl flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Pillar Context */}
            <div 
              className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/5"
              style={{ backgroundColor: `${question.color}15`, color: question.color }}
            >
              {question.pillar}
            </div>

            {/* Question Text */}
            <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight mb-12 text-white">
              {question.text}
            </h2>

            {/* Answers */}
            <div className="mt-auto mb-12">
              {question.type === 'scale10' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-xs text-slate-500 uppercase tracking-wider mb-2 px-2">
                    <span>1 - Poor</span>
                    <span>10 - Perfect</span>
                  </div>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {[1,2,3,4,5,6,7,8,9,10].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAnswer(val)}
                        className={cn(
                          "h-14 md:h-16 rounded-lg border border-white/10 bg-slate-900/50 text-white font-mono text-lg transition-all hover:border-primary/50 hover:bg-primary/10",
                          answers[question.id] === val && "border-primary bg-primary/20 text-primary font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {question.type === 'single-select' && (
                <div className="space-y-3">
                  {question.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className={cn(
                        "w-full p-5 rounded-xl border border-white/10 bg-slate-900/50 text-left text-white text-lg transition-all hover:border-primary/50 hover:bg-primary/10",
                        answers[question.id] === opt && "border-primary bg-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'multi-select' && (
                <div className="space-y-3">
                  {question.options?.map((opt) => {
                    const isSelected = (answers[question.id] || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className={cn(
                          "w-full p-5 rounded-xl border border-white/10 bg-slate-900/50 text-left text-white text-lg transition-all hover:border-primary/50 flex justify-between items-center",
                          isSelected && "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        )}
                      >
                        {opt}
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === 'short-text' && (
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Type your answer here..."
                    className="min-h-[150px] text-lg p-5 bg-slate-900/50 border-white/10 text-white resize-none focus-visible:ring-primary/50"
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                  />
                  <Button onClick={handleNext} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    Save & Continue
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
          <Button 
            variant="ghost" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-slate-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleNext}
            className="text-slate-400 hover:text-white hover:bg-white/5"
          >
            Skip <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetectorFlow;
