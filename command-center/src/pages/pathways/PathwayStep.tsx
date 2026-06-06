import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Circle, CheckSquare, MessageSquare, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function PathwayStep() {
  const { slug, stepId } = useParams();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const isStepComplete = completedTasks.length === 3;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to={`/pathways/${slug}`} className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pathway Overview
      </Link>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">Step {stepId} of 4</span>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Draft the Sales Script</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Take your documented process and convert it into a line-by-line script framework that 
            allows for natural conversation while hitting all required psychological checkpoints.
          </p>
        </div>
        
        <div className="shrink-0 bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center min-w-[200px]">
          <span className="text-sm text-slate-400 mb-2">Step Progress</span>
          <div className="text-3xl font-bold text-white mb-2">{completedTasks.length} / 3</div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(completedTasks.length / 3) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-primary" /> Action Items
            </h2>
            <Card className="bg-slate-900 border-white/10">
              <CardContent className="p-0">
                {[
                  "Review the 'Perfect Sales Script' SOP from the library.",
                  "Fill out the Discovery Call Template with your specific qualifying questions.",
                  "Draft your 3-minute pitch framing your offer."
                ].map((task, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-4 p-5 border-b border-white/5 last:border-0 transition-colors cursor-pointer ${
                      completedTasks.includes(index) ? 'bg-emerald-500/5' : 'hover:bg-white/5'
                    }`}
                    onClick={() => toggleTask(index)}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completedTasks.includes(index) ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600" />
                      )}
                    </div>
                    <span className={`text-lg ${completedTasks.includes(index) ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {task}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Embedded Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-slate-900 border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Perfect Sales Script SOP</h4>
                    <p className="text-sm text-slate-400">Open in Library</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Discovery Template</h4>
                    <p className="text-sm text-slate-400">Open in Notion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {isStepComplete && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Step Completed!</h3>
              <p className="text-emerald-200/70 mb-6">You've finished all action items for this step.</p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white">
                Proceed to Step 3 →
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-white/10 sticky top-8">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" /> AI Advisor Prompts
                </h3>
                <p className="text-sm text-slate-400 mb-4">Stuck on this step? Try asking the AI:</p>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-slate-300 transition-colors">
                    "Review my discovery questions to see if they're too interrogational."
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-slate-300 transition-colors">
                    "Give me an example of a good transition from discovery to pitch."
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button variant="outline" className="w-full border-white/10">
                  Log a Sprint Check-in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
