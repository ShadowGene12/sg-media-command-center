import { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpgradeModal } from '@/components/UpgradeModal';
import { AnimatedAIChat } from '@/components/ui/animated-ai-chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi there! I'm your SG Media Growth Advisor. I have access to your current sprint metrics, your diagnostic history, and the entire SOP library. How can we accelerate your growth today?"
  }
];

const SUGGESTIONS = [
  "Review my current sprint progress.",
  "What's the best SOP for outbound sales?",
  "Analyze my bottleneck diagnostic.",
  "Help me draft a follow-up email."
];

export default function AIAdvisorHub() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Freemium State
  const [credits, setCredits] = useState(3);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    if (credits <= 0) {
      setShowUpgrade(true);
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setCredits(prev => prev - 1);

    // Mock response delay
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I've analyzed your request. Based on your current Customer Acquisition metrics (1.8/5.0), I highly recommend starting the 'Outbound Sequence Refinement' Sprint. Want me to draft the first email for you?" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        featureName="unlimited AI Advisor prompts"
      />

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-light text-white tracking-tight flex items-center gap-3">
            <Bot className="w-8 h-8 text-violet-400" /> AI Advisor
          </h1>
          <p className="text-slate-400 text-lg mt-2">Your 24/7 strategic consultant trained on your specific bottlenecks.</p>
        </div>
        
        {/* Freemium Credit Meter */}
        <div className="flex flex-col items-end gap-1 mb-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Credits</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={cn(
                  "w-6 h-2 rounded-full transition-all duration-500",
                  i <= credits ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/5 bg-black/20 shadow-2xl backdrop-blur-md">
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
