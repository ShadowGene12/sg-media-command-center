import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Target, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TierLockedCard } from '@/components/TierLockedCard';

const MOCK_PATHWAYS = [
  { 
    id: 'sales-engine', 
    title: 'Fix Your Sales Conversion Engine', 
    bottleneck: 'Sales & Conversion', 
    duration: '4 Weeks', 
    description: 'Build a repeatable, trainable sales process to close more qualified leads without relying on founder magic.',
    status: 'active',
    progress: 25,
    locked: false
  },
  { 
    id: 'offer-clarity', 
    title: 'The Offer Clarity Protocol', 
    bottleneck: 'Market & Offer', 
    duration: '2 Weeks', 
    description: 'Transform a confusing service into a highly-desirable productized offer that prospects actually understand.',
    status: 'available',
    progress: 0,
    locked: false
  },
  { 
    id: 'profit-leak', 
    title: 'Plug the Profit Leaks', 
    bottleneck: 'Profit Optimization', 
    duration: '3 Weeks', 
    description: 'Audit your expenses, renegotiate vendor contracts, and improve your gross margin by 5-10%.',
    status: 'locked',
    progress: 0,
    locked: true
  },
];

export default function PathwaysHub() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">Pathways</h1>
        <p className="text-slate-400 text-lg">Guided, step-by-step tracks to resolve your core bottlenecks.</p>
      </div>

      <TierLockedCard
        isLocked={true}
        title="Unlock Pathways"
        description="Get step-by-step, actionable pathways tailored to your specific bottlenecks."
        tierRequired="Pro"
      >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-emerald-500" /> Active Pathway
        </h2>
        {MOCK_PATHWAYS.filter(p => p.status === 'active').map(pathway => (
          <Card key={pathway.id} className="bg-gradient-to-br from-slate-900 to-slate-800 border-emerald-500/30 overflow-hidden relative shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div className="h-full bg-emerald-500" style={{ width: `${pathway.progress}%` }} />
            </div>
            <div className="md:flex items-center">
              <div className="p-8 md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {pathway.bottleneck}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center">
                    <Target className="w-3 h-3 mr-1" /> {pathway.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{pathway.title}</h3>
                <p className="text-slate-400 mb-6">{pathway.description}</p>
                <div className="flex items-center gap-4">
                  <Link to={`/pathways/${pathway.id}`}>
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8">
                      Resume Pathway
                    </Button>
                  </Link>
                  <span className="text-sm font-semibold text-emerald-500">{pathway.progress}% Complete</span>
                </div>
              </div>
              <div className="hidden md:flex flex-1 items-center justify-center border-l border-white/5 p-8 relative min-h-[250px]">
                <Target className="w-32 h-32 text-emerald-500/10 absolute" />
                <div className="relative z-10 text-center">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">Current Step</p>
                  <p className="text-lg font-bold text-white">Draft the Sales Script</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-6">Available Pathways</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PATHWAYS.filter(p => p.status !== 'active').map(pathway => (
            <Card key={pathway.id} className="bg-slate-900/50 border-white/5 hover:border-white/20 transition-all group flex flex-col relative overflow-hidden">
              {pathway.locked && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="h-8 w-8 text-slate-400 mb-3" />
                  <Link to="/upgrade">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">Unlock Pro Tier</Button>
                  </Link>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {pathway.bottleneck}
                  </span>
                  {pathway.locked && <Lock className="w-4 h-4 text-slate-500" />}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{pathway.title}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Target className="w-3 h-3 mr-1" /> {pathway.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3">{pathway.description}</p>
                <Link to={`/pathways/${pathway.id}`}>
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </TierLockedCard>
    </div>
  );
}
