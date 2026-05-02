import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, CheckSquare, BarChart3, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TierLockedCard } from '@/components/TierLockedCard';

const ACTIVE_SPRINT = {
  id: 'spr-1',
  title: 'Increase Sales Close Rate',
  pillar: 'Sales & Conversion',
  metric: 'Close Rate (%)',
  baseline: 15,
  current: 22,
  target: 35,
  daysRemaining: 12,
  lastCheckin: '2 days ago',
  status: 'on-track'
};

const PAST_SPRINTS: any[] = [];

export default function SprintsHub() {
  const progressPercent = Math.min(100, Math.max(0, ((ACTIVE_SPRINT.current - ACTIVE_SPRINT.baseline) / (ACTIVE_SPRINT.target - ACTIVE_SPRINT.baseline)) * 100));

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 relative">
      <div className="absolute inset-0 bg-skeletal-grid opacity-20 pointer-events-none -z-10" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Sprint Tracker</h1>
          <p className="text-slate-400 text-lg">Focus on moving one critical metric at a time.</p>
        </div>
        <Link to="/sprints/new">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] active:scale-95 transition-all duration-200 h-12 px-6">
            <Plus className="w-5 h-5 mr-2" /> Start New Sprint
          </Button>
        </Link>
      </div>

      <TierLockedCard
        isLocked={false}
        title="Unlock the Sprint Tracker"
        description="Execute 4-6 week highly focused sprints with metric tracking and AI-driven weekly insights."
        tierRequired="Pro"
      >
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" /> Active Sprint
        </h2>
        <Card className="bg-slate-900 border-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
            <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="md:flex">
            <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 mb-4 inline-block">
                {ACTIVE_SPRINT.pillar}
              </span>
              <h3 className="text-2xl font-bold mb-2">{ACTIVE_SPRINT.title}</h3>
              <p className="text-slate-400 mb-6 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" /> {ACTIVE_SPRINT.daysRemaining} days remaining • Last check-in {ACTIVE_SPRINT.lastCheckin}
              </p>
              
              <div className="flex gap-4">
                <Link to={`/sprints/${ACTIVE_SPRINT.id}`}>
                  <Button className="bg-white/10 hover:bg-white/20 text-white">
                    View Dashboard
                  </Button>
                </Link>
                <Link to={`/sprints/${ACTIVE_SPRINT.id}/checkin`}>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <CheckSquare className="w-4 h-4 mr-2" /> Log Check-in
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> {ACTIVE_SPRINT.metric}
              </h4>
              
              <div className="flex items-end justify-between mb-2">
                <div className="text-center">
                  <div className="text-3xl font-mono text-slate-500">{ACTIVE_SPRINT.baseline}</div>
                  <div className="text-xs text-slate-400 uppercase mt-1">Baseline</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-mono font-bold text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">{ACTIVE_SPRINT.current}</div>
                  <div className="text-xs text-primary uppercase font-bold mt-1">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-mono text-slate-500">{ACTIVE_SPRINT.target}</div>
                  <div className="text-xs text-slate-400 uppercase mt-1">Target</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold mb-4">Sprint History</h2>
        <div className="space-y-4">
          {PAST_SPRINTS.length > 0 ? (
            PAST_SPRINTS.map(sprint => (
              <Card key={sprint.id} className="bg-slate-900/50 border-white/5 hover:border-white/10 transition-colors">
                <div className="p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{sprint.title}</h3>
                    <p className="text-sm text-slate-400">{sprint.pillar}</p>
                  </div>
                  <div className="flex gap-8 items-center w-full md:w-auto justify-between md:justify-end">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase">{sprint.metric}</div>
                      <div className="font-mono text-lg">{sprint.baseline} → {sprint.final}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${sprint.result === 'Success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {sprint.result}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-black/20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <Target className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white/70">No Past Sprints</h3>
              <p className="text-slate-500 max-w-sm mb-6">You haven't completed any sprints yet. Finish your active sprint to start building your track record.</p>
            </div>
          )}
        </div>
      </div>
      </TierLockedCard>
    </div>
  );
}
