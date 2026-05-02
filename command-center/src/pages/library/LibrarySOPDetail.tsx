import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Download, CheckCircle2, Circle, MessageSquare, Bookmark } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function LibrarySOPDetail() {
  const { slug } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to="/library" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
      </Link>

      <div className="space-y-4 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Sales & Conversion
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
            SOP
          </span>
          <span className="text-xs text-slate-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> 15 min read
          </span>
        </div>
        
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-display font-bold text-white">The Perfect Sales Script Template</h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={`border-white/10 ${isSaved ? 'bg-primary/20 text-primary border-primary/50' : 'hover:bg-white/5'}`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </div>
        <p className="text-lg text-slate-400">Last updated: Oct 12, 2025</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">What this is for</h2>
            <p className="text-slate-300 leading-relaxed">
              This SOP provides a structured framework for conducting discovery calls and closing deals. 
              Instead of relying on your mood or natural charisma, this script ensures every prospect 
              goes through the exact same psychological journey.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Implementation Steps</h2>
            <div className="space-y-3">
              {[
                "Download the script template below.",
                "Fill in your specific offer details in the bracketed sections.",
                "Roleplay the script 3 times with a team member.",
                "Use the script verbatim on your next 5 sales calls.",
                "Record the calls and review where you went off-script."
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                    completedSteps.includes(index) 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100' 
                      : 'bg-slate-900 border-white/5 hover:border-white/20'
                  }`}
                  onClick={() => toggleStep(index)}
                >
                  <div className="mt-0.5 shrink-0">
                    {completedSteps.includes(index) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <span className={completedSteps.includes(index) ? 'line-through opacity-70' : ''}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-white/10">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm text-slate-400 uppercase tracking-wider">Downloads</h3>
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border border-white/5">
                  <Download className="w-4 h-4 mr-3 text-primary" /> Google Doc Template
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-sm text-slate-400 uppercase tracking-wider">Required Tools</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Zoom / Google Meet</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Call Recording Software</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link to="/workspace/wk-new" className="block">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    Implement in Workspace
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">
                  <MessageSquare className="w-4 h-4 mr-2" /> Ask AI about this SOP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
