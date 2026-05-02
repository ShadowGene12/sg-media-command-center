import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SprintCheckIn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metric, setMetric] = useState('22');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/sprints/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to={`/sprints/${id}`} className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sprint Dashboard
      </Link>

      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">Week 3 Check-in</span>
        <h1 className="text-3xl font-display font-bold mb-2">Log Your Progress</h1>
        <p className="text-slate-400">Update your metric and document what's working.</p>
      </div>

      <Card className="bg-slate-900 border-white/10 shadow-2xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Metric Update */}
            <div>
              <h2 className="text-xl font-bold mb-4">1. Where is the metric today?</h2>
              <div className="bg-slate-800/50 border border-white/5 rounded-xl p-6 flex flex-col items-center">
                <label className="text-sm text-slate-400 mb-4 uppercase tracking-widest font-semibold">Close Rate (%)</label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="number" 
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    className="h-20 w-32 text-center text-4xl font-mono font-bold bg-slate-900 border-white/10 text-white focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex justify-between w-full max-w-xs mt-6 text-sm text-slate-500 font-mono">
                  <span>Baseline: 15</span>
                  <span>Target: 35</span>
                </div>
              </div>
            </div>

            {/* Journal Entry */}
            <div>
              <h2 className="text-xl font-bold mb-4">2. What happened this week?</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">What worked well?</label>
                  <Textarea 
                    placeholder="We implemented the new script and saw..." 
                    className="min-h-[100px] bg-slate-800 border-white/10 text-white resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">What roadblocks did you hit?</label>
                  <Textarea 
                    placeholder="The team struggled with..." 
                    className="min-h-[100px] bg-slate-800 border-white/10 text-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Task Completion */}
            <div>
              <h2 className="text-xl font-bold mb-4">3. Pathway Progress</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 bg-slate-800/50 border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-slate-600 text-primary focus:ring-primary bg-slate-900" />
                  <div>
                    <div className="font-semibold text-white">Draft the Sales Script</div>
                    <div className="text-sm text-slate-400">Mark this pathway step as completed</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Button type="submit" size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Send className="w-5 h-5 mr-2" /> Submit Check-in
              </Button>
              <p className="text-center text-xs text-slate-500 mt-4">
                Your AI Advisor will generate insights based on this check-in.
              </p>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
