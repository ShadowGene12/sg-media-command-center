import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Target, Calendar, CheckSquare, MessageSquare } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const MOCK_CHECKINS = [
  { week: 2, date: 'Oct 15', metric: 22, note: 'Implemented new follow-up script. Seeing early signs of higher response rate, but team needs more roleplay.' },
  { week: 1, date: 'Oct 8', metric: 18, note: 'Rolled out discovery template. Still getting used to it.' },
];

export default function SprintDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to="/sprints" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sprints
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Sales & Conversion
            </span>
            <span className="text-xs text-emerald-500 flex items-center bg-emerald-500/10 px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" /> Active
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Increase Sales Close Rate</h1>
          <p className="text-lg text-slate-400 flex items-center gap-4">
            <span><Target className="w-4 h-4 inline mr-1" /> Linked: Pathway - Sales Engine</span>
            <span><Calendar className="w-4 h-4 inline mr-1" /> Ends: Nov 12</span>
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Link to={`/sprints/${id}/checkin`}>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <CheckSquare className="w-4 h-4 mr-2" /> Log Check-in
            </Button>
          </Link>
          <Button variant="outline" className="border-white/10">End Early</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Big Metric Card */}
          <Card className="bg-slate-900 border-white/10 overflow-hidden relative p-8">
            <div className="flex justify-between items-end">
              <div className="text-center flex-1">
                <div className="text-2xl font-mono text-slate-500">15%</div>
                <div className="text-xs text-slate-400 uppercase mt-2">Baseline</div>
              </div>
              
              <div className="flex-1 px-4 relative">
                {/* Trend line placeholder */}
                <div className="h-0.5 w-full bg-gradient-to-r from-slate-700 via-primary to-slate-700 absolute top-1/2 -translate-y-1/2 opacity-50" />
              </div>

              <div className="text-center flex-1 z-10">
                <div className="text-6xl font-mono font-bold text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] drop-shadow-lg">
                  22<span className="text-3xl text-primary">%</span>
                </div>
                <div className="text-sm text-primary uppercase font-bold mt-2">Current</div>
              </div>

              <div className="flex-1 px-4 relative">
                {/* Trend line placeholder */}
                <div className="h-0.5 w-full bg-slate-700 absolute top-1/2 -translate-y-1/2 opacity-30 border-t border-dashed border-slate-500 bg-transparent" />
              </div>

              <div className="text-center flex-1">
                <div className="text-2xl font-mono text-slate-500">35%</div>
                <div className="text-xs text-slate-400 uppercase mt-2">Target</div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-slate-400">
              Metric: Close Rate (Qualified to Closed-Won)
            </div>
          </Card>

          {/* History */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Check-in History</h2>
            <div className="space-y-4">
              {MOCK_CHECKINS.map((checkin) => (
                <Card key={checkin.week} className="bg-slate-900/50 border-white/5">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm font-semibold text-primary">Week {checkin.week}</span>
                        <span className="text-sm text-slate-500 ml-3">{checkin.date}</span>
                      </div>
                      <div className="text-xl font-mono font-bold">{checkin.metric}%</div>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">"{checkin.note}"</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-start gap-3 text-sm text-slate-400">
                        <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong className="text-primary">AI Insight:</strong> You've improved 4% over baseline. Focus this week on making sure the team isn't rushing the discovery phase just to use the new script.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Sprint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Days Remaining</span>
                <span className="font-semibold text-white">12 Days</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Check-in Cadence</span>
                <span className="font-semibold text-white">Every Friday</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-400">On Track</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-white mb-2">Need a strategy pivot?</h3>
              <p className="text-sm text-indigo-200 mb-4">Discuss your sprint progress and roadblocks with the AI Advisor.</p>
              <Link to="/advisor">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                  Consult AI Advisor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
