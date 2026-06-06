import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpgradeModal } from '@/components/UpgradeModal';
import { AnimatedAIChat } from '@/components/ui/animated-ai-chat';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useCommandStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  content: "I'm your SG Media AI Advisor. I have access to your bottleneck diagnosis, your SOP library, and your sprint metrics. What do you want to work on today?",
};

const SUGGESTIONS = [
  "What is my primary bottleneck and why?",
  "Which SOP should I start with?",
  "How do I fix my Sales & Conversion score?",
  "Help me build a 5-touch follow-up sequence.",
];

// Build a context-aware system prompt using the user's diagnostic data
function buildSystemPrompt(diagnostic: Record<string, unknown> | null, trialDay: number): string {
  const basePrompt = `You are the SG Media AI Advisor — a direct, operator-level growth consultant. You diagnose business bottlenecks and prescribe specific, actionable fixes. You never give generic advice. Every response references the user's actual data.

Your communication style:
- Direct and specific. No fluff.
- Operator-to-operator tone. Never guru-speak.
- One clear recommendation per response, then the reasoning.
- When suggesting a fix, reference the specific SOP by name if relevant.

The five growth pillars you work within:
1. Market & Offer Clarity
2. Customer Acquisition
3. Sales & Conversion
4. Profit Optimization
5. Financial & Performance Control`;

  if (!diagnostic) return basePrompt;

  const scores = diagnostic.pillar_scores as Record<string, number> ?? {};
  const primary = diagnostic.primary_pillar as string ?? 'sales';
  const overall = diagnostic.overall_score as number ?? 0;

  return `${basePrompt}

User's diagnostic data (Day ${trialDay} of trial):
- Overall Growth Score: ${overall}/25
- Primary Bottleneck: ${primary.replace(/_/g, ' & ')}
- Pillar Scores: ${Object.entries(scores).map(([k, v]) => `${k}: ${v}/5`).join(', ')}

Always reference this data when giving recommendations. Don't ask for information already in the diagnostic.`;
}

export default function AIAdvisorHub() {
  const { user } = useAuth();
  const { tier, trialDay } = useCommandStore();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [credits, setCredits] = useState(tier === 'operator' || tier === 'studio' || tier === 'dfy' ? 999 : 5);
  const sessionId = useRef(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load latest diagnostic for context
  const { data: diagnostic } = useQuery({
    queryKey: ['latest-diagnostic', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from('diagnostics').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle();
      return data;
    },
    enabled: !!user,
    staleTime: 60_000,
  });

  // Load session messages from DB on mount
  useEffect(() => {
    if (!user) return;
    supabase
      .from('advisor_messages')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_id', sessionId.current)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setMessages([GREETING, ...data.map(m => ({ id: m.id, role: m.role as 'user' | 'assistant', content: m.content }))]);
        }
      });
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user) return;
    await supabase.from('advisor_messages').insert({
      user_id: user.id,
      role,
      content,
      session_id: sessionId.current,
    });
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    if (credits <= 0) { setShowUpgrade(true); return; }
    if (trialDay > 7 && tier === 'free') { setShowUpgrade(true); return; }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setCredits(prev => Math.max(0, prev - 1));

    // Save user message
    await saveMessage('user', text);

    // Generate contextual response (placeholder until Claude API is wired)
    const systemPrompt = buildSystemPrompt(diagnostic, trialDay);
    const contextualResponses: Record<string, string> = {
      default: diagnostic
        ? `Based on your diagnostic, your primary bottleneck is ${(diagnostic.primary_pillar as string)?.replace(/_/g, ' & ') ?? 'Sales & Conversion'} with a score of ${(diagnostic.pillar_scores as Record<string, number>)?.[diagnostic.primary_pillar as string] ?? '1.8'}/5. The most impactful next step is implementing a documented sales process. Start with the "Perfect Sales Script Template" SOP in your library.`
        : "I don't have your diagnostic data yet. Take the Bottleneck Detector first — it takes 4 minutes and I'll have your full 5-pillar context to work with.",
      bottleneck: `Your primary bottleneck is ${(diagnostic?.primary_pillar as string)?.replace(/_/g, ' & ') ?? 'Sales & Conversion'} — scoring ${(diagnostic?.pillar_scores as Record<string, number>)?.[diagnostic?.primary_pillar as string ?? 'sales'] ?? '1.8'}/5. The root cause is likely a documentation gap — your process exists in someone's head but not on paper. Fix: document your current best sales conversation as a 5-step process this week.`,
      sop: "The SOP most relevant to your bottleneck is the 'Perfect Sales Script Template'. Open it in your library — it gives you the 5-step framework, objection scripts, and a close statement for your specific offer type.",
      follow: "A 5-touch follow-up sequence: Day 0 (same day) — confirmation email. Day 3 — value delivery, no ask. Day 7 — direct check-in. Day 14 — different channel (LinkedIn). Day 21 — the breakup email. The breakup gets a 40% response rate because people respond to finality.",
    };

    const lowerText = text.toLowerCase();
    let response = contextualResponses.default;
    if (lowerText.includes('bottleneck') || lowerText.includes('score') || lowerText.includes('primary')) response = contextualResponses.bottleneck;
    else if (lowerText.includes('sop') || lowerText.includes('library') || lowerText.includes('template')) response = contextualResponses.sop;
    else if (lowerText.includes('follow') || lowerText.includes('sequence') || lowerText.includes('email')) response = contextualResponses.follow;

    setTimeout(async () => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      await saveMessage('assistant', response);
    }, 1400);
  };

  const creditLabel = tier === 'operator' || tier === 'studio' || tier === 'dfy'
    ? 'Unlimited queries'
    : `${credits} credits remaining`;

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        featureName="unlimited AI Advisor queries"
        requiredTier="operator"
      />

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-light text-white tracking-tight flex items-center gap-3">
            <Bot className="w-8 h-8 text-violet-400" /> AI Advisor
          </h1>
          <p className="text-slate-400 text-lg mt-2 font-light">
            {diagnostic
              ? `Knows your ${(diagnostic.primary_pillar as string)?.replace(/_/g, ' & ')} bottleneck. Ask anything specific.`
              : "Your 24/7 strategic consultant trained on your specific bottlenecks."}
          </p>
        </div>

        {/* Credit meter */}
        <div className="flex flex-col items-end gap-1 mb-1">
          <span className="text-xs font-mono text-slate-500">{creditLabel}</span>
          {tier !== 'operator' && tier !== 'studio' && tier !== 'dfy' && (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={cn(
                    "w-5 h-1.5 rounded-full transition-all duration-500",
                    i <= credits ? "bg-violet-500 shadow-[0_0_6px_rgba(109,74,230,0.5)]" : "bg-white/10"
                  )}
                />
              ))}
            </div>
          )}
          {(tier === 'operator' || tier === 'studio' || tier === 'dfy') && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400">Operator</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/[0.05] bg-black/20 shadow-2xl backdrop-blur-md"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <AnimatedAIChat
          messages={messages}
          onSendMessage={handleSend}
          isTyping={isTyping}
          credits={credits}
          suggestions={SUGGESTIONS}
        />
      </div>
    </div>
  );
}
