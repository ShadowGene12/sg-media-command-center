import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Target, ArrowRight, Loader2, Flag, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { PremiumCard } from '@/components/PremiumCard';
import { toast } from 'sonner';

const PILLARS = [
  { label: "Market & Offer Clarity",          value: "market_offer", color: "#6D4AE6" },
  { label: "Customer Acquisition",             value: "acquisition",  color: "#378ADD" },
  { label: "Sales & Conversion",               value: "sales",        color: "#1D9E75" },
  { label: "Profit Optimization",              value: "profit",       color: "#F59E0B" },
  { label: "Financial & Performance Control",  value: "finance",      color: "#D85A30" },
];

const TEMPLATES = [
  { pillar: "sales",        title: "Fix Sales Conversion Engine",    objective: "Increase close rate from current to target by implementing a documented sales process and follow-up cadence.", start: 0, target: 35 },
  { pillar: "acquisition",  title: "Build Predictable Lead Engine",  objective: "Establish a consistent outbound channel producing qualified leads weekly with tracked CAC.", start: 0, target: 20 },
  { pillar: "market_offer", title: "Sharpen Offer Positioning",      objective: "Achieve a clear, specific offer that passes the 10-second stranger test.", start: 0, target: 80 },
  { pillar: "profit",       title: "Improve Margin Per Client",      objective: "Increase net margin by identifying and eliminating top three profit leaks.", start: 0, target: 45 },
  { pillar: "finance",      title: "Build KPI Control Cadence",      objective: "Implement weekly KPI review and 90-day cash flow visibility.", start: 0, target: 90 },
];

export default function SprintWizard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pillar: "",
    title: "",
    objective: "",
    start_metric: "",
    target_metric: "",
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const create = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase.from('sprints').insert({
        user_id: user.id,
        title: form.title,
        objective: form.objective,
        pillar: form.pillar,
        start_metric: form.start_metric ? Number(form.start_metric) : null,
        target_metric: form.target_metric ? Number(form.target_metric) : null,
        start_date: new Date().toISOString().split("T")[0],
        end_date: form.end_date,
        status: 'active',
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['sprints'] });
      toast.success("Sprint created — let's go.");
      navigate('/sprints');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const selectedPillar = PILLARS.find(p => p.value === form.pillar);

  const STEPS = [
    {
      title: "Pick your pillar",
      subtitle: "Which growth pillar does this sprint target?",
      valid: !!form.pillar,
    },
    {
      title: "Name your sprint",
      subtitle: "What is the specific objective?",
      valid: form.title.length > 3 && form.objective.length > 10,
    },
    {
      title: "Set your targets",
      subtitle: "Define what success looks like in numbers.",
      valid: true,
    },
  ];

  const currentStep = STEPS[step];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <Link to="/sprints" className="inline-flex items-center text-sm text-slate-500 hover:text-white transition-colors gap-2 font-mono">
        <ArrowLeft className="w-4 h-4" /> Cancel
      </Link>

      {/* Progress */}
      <div>
        <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-2">New Sprint</p>
        <h1 className="text-3xl font-display font-light text-white tracking-tight mb-6">{currentStep.title}</h1>
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < step ? "bg-violet-500" : i === step ? "bg-violet-400" : "bg-white/[0.07]"
            }`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.25 }}
        >
          {/* Step 0: Pillar selection */}
          {step === 0 && (
            <div className="space-y-3">
              {PILLARS.map(p => (
                <motion.button
                  key={p.value}
                  onClick={() => {
                    set("pillar", p.value);
                    const tmpl = TEMPLATES.find(t => t.pillar === p.value);
                    if (tmpl) {
                      set("title", tmpl.title);
                      set("objective", tmpl.objective);
                    }
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-4 ${
                    form.pillar === p.value
                      ? "border-violet-500/50 bg-violet-500/[0.10]"
                      : "border-white/[0.07] bg-black/40 hover:border-white/[0.14] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}80` }} />
                  <span className="text-sm font-light text-white/80">{p.label}</span>
                  {form.pillar === p.value && (
                    <CheckCircle2 className="w-4 h-4 text-violet-400 ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* Step 1: Title + Objective */}
          {step === 1 && (
            <PremiumCard className="p-6 space-y-5">
              {selectedPillar && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedPillar.color }} />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{selectedPillar.label}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Sprint Title</label>
                <Input
                  value={form.title}
                  onChange={e => set("title", e.target.value)}
                  placeholder="Fix Sales Conversion Engine"
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white rounded-xl focus-visible:ring-0 focus-visible:border-violet-500/60"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Objective (what does success look like?)</label>
                <textarea
                  value={form.objective}
                  onChange={e => set("objective", e.target.value)}
                  rows={3}
                  placeholder="Increase close rate from 15% to 30% by implementing a documented sales process..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm rounded-xl p-3.5 resize-none focus:outline-none focus:border-violet-500/50 font-light placeholder:text-white/20"
                />
              </div>
            </PremiumCard>
          )}

          {/* Step 2: Targets + Date */}
          {step === 2 && (
            <PremiumCard className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Starting metric</label>
                  <Input
                    type="number"
                    value={form.start_metric}
                    onChange={e => set("start_metric", e.target.value)}
                    placeholder="15"
                    className="h-12 bg-white/[0.04] border-white/[0.08] text-white rounded-xl focus-visible:ring-0 focus-visible:border-violet-500/60"
                  />
                  <p className="text-[10px] text-white/20 font-mono">Where you are now</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target metric</label>
                  <Input
                    type="number"
                    value={form.target_metric}
                    onChange={e => set("target_metric", e.target.value)}
                    placeholder="30"
                    className="h-12 bg-white/[0.04] border-white/[0.08] text-white rounded-xl focus-visible:ring-0 focus-visible:border-violet-500/60"
                  />
                  <p className="text-[10px] text-white/20 font-mono">Where you want to be</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Sprint end date</label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={e => set("end_date", e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.08] text-white rounded-xl focus-visible:ring-0 focus-visible:border-violet-500/60"
                />
              </div>

              {/* Preview */}
              <div className="rounded-xl p-4 border border-violet-500/20 bg-violet-500/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">Sprint Preview</span>
                </div>
                <p className="text-sm text-white/70 font-light">{form.title || "Untitled sprint"}</p>
                <p className="text-xs text-white/30 mt-1 font-mono">
                  {selectedPillar?.label} · {form.start_metric || "?"} → {form.target_metric || "?"} · Ends {form.end_date}
                </p>
              </div>
            </PremiumCard>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-slate-500 hover:text-white disabled:opacity-0 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(s => s + 1)}
            disabled={!currentStep.valid}
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-6 h-11 shadow-[0_0_16px_rgba(109,74,230,0.3)] disabled:opacity-40"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => create.mutate()}
            disabled={create.isPending}
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-6 h-11 shadow-[0_0_16px_rgba(109,74,230,0.3)]"
          >
            {create.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Flag className="w-4 h-4 mr-2" />}
            Launch Sprint
          </Button>
        )}
      </div>
    </div>
  );
}
