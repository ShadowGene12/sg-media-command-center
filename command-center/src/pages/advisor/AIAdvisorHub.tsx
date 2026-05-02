import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, User, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpgradeModal } from '@/components/UpgradeModal';

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
          <h1 className="text-4xl font-display font-bold flex items-center gap-3">
            <Bot className="w-8 h-8 text-indigo-500" /> AI Advisor
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

      <Card className="flex-1 flex flex-col bg-slate-900 border-white/10 overflow-hidden shadow-2xl relative h-[600px]">
        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                msg.role === 'user' 
                  ? "bg-slate-800 border border-white/10 text-white" 
                  : "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                msg.role === 'user'
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/5 rounded-tl-sm flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950/50 border-t border-white/5 backdrop-blur-md">
          {messages.length === 1 && credits > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTIONS.map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(suggestion)}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-300 hover:border-indigo-500/30 transition-colors"
                >
                  <Zap className="w-3 h-3" /> {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative flex items-end gap-2">
            <Textarea 
              placeholder={credits > 0 ? "Ask your advisor anything..." : "You've used all your free credits. Upgrade to continue."}
              className="min-h-[60px] max-h-[200px] resize-none bg-slate-900 border-white/10 text-white pb-12 rounded-xl focus-visible:ring-indigo-500/50 disabled:opacity-50"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={credits <= 0}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              size="icon" 
              className={cn(
                "absolute bottom-3 right-3 h-10 w-10 text-white rounded-lg transition-all shadow-lg",
                credits > 0 
                  ? "bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                  : "bg-slate-700 hover:bg-slate-600 cursor-not-allowed opacity-50"
              )}
              onClick={() => handleSend()}
              disabled={(!input.trim() && credits > 0) || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-3 font-medium">
            AI Advisor can make mistakes. Always review generated scripts and strategy before implementation.
          </p>
        </div>
      </Card>
    </div>
  );
}
