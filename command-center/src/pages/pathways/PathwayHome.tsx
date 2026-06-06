import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Circle, Target, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const MOCK_STEPS = [
  { id: 1, title: 'Document Your Current Process', duration: '1 Week', status: 'completed' },
  { id: 2, title: 'Draft the Sales Script', duration: '1 Week', status: 'active' },
  { id: 3, title: 'Objection Handling & Roleplay', duration: '1 Week', status: 'locked' },
  { id: 4, title: 'Build Follow-up Cadence', duration: '1 Week', status: 'locked' },
];

export default function PathwayHome() {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to="/pathways" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pathways
      </Link>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
            Sales & Conversion
          </span>
          <span className="text-xs font-semibold text-emerald-500">
            25% Complete
          </span>
        </div>
        
        <h1 className="text-4xl font-display font-bold text-white">Fix Your Sales Conversion Engine</h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          Build a repeatable, trainable sales process to close more qualified leads without relying on founder magic.
        </p>

        <div className="flex gap-6 py-6 border-y border-white/10">
          <div className="flex items-center gap-2 text-slate-300">
            <Target className="w-5 h-5 text-primary" />
            <span><strong className="text-white">Goal:</strong> Increase close rate by 20%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-5 h-5 text-primary" />
            <span><strong className="text-white">Duration:</strong> 4 Weeks</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Pathway Sequence</h2>
          <Link to={`/pathways/${slug}/step/2`}>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Resume Step 2
            </Button>
          </Link>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {MOCK_STEPS.map((step, index) => (
            <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon / Node */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0A0A0C] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-slate-950 z-10 ${
                step.status === 'completed' ? 'bg-emerald-500 text-white' :
                step.status === 'active' ? 'bg-primary text-white ring-4 ring-primary/20' :
                'bg-slate-800 text-slate-500'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                 step.status === 'active' ? <span className="font-bold">{step.id}</span> :
                 <Lock className="w-4 h-4" />
                }
              </div>

              {/* Card */}
              <Card className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] transition-all ${
                step.status === 'completed' ? 'bg-slate-900/50 border-emerald-500/30' :
                step.status === 'active' ? 'bg-slate-900 border-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]' :
                'bg-slate-900/30 border-white/5 opacity-70'
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step {step.id}</span>
                    <span className="text-xs font-medium text-slate-400">{step.duration}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-4 ${step.status === 'locked' ? 'text-slate-500' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  
                  {step.status !== 'locked' ? (
                    <Link to={`/pathways/${slug}/step/${step.id}`}>
                      <Button variant={step.status === 'active' ? 'default' : 'outline'} className={step.status === 'active' ? 'w-full bg-primary hover:bg-primary/90' : 'w-full border-white/10'}>
                        {step.status === 'active' ? 'Continue Step' : 'Review Step'}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" disabled className="w-full border-white/5 text-slate-600">
                      Locked
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
