import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_HISTORY = [
  { id: 'run-3', date: 'April 22, 2026', score: 13.8, bottleneck: 'Sales & Conversion', improvement: '+2.1' },
  { id: 'run-2', date: 'March 15, 2026', score: 11.7, bottleneck: 'Market & Offer', improvement: '+1.4' },
  { id: 'run-1', date: 'February 01, 2026', score: 10.3, bottleneck: 'Market & Offer', improvement: null },
];

export default function DetectorHistory() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Diagnostic History</h1>
          <p className="text-slate-400 text-sm">Track your progress and evolving bottlenecks over time.</p>
        </div>
        <Link to="/detector/flow">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <BarChart2 className="w-4 h-4 mr-2" />
            New Diagnostic Run
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Overall Trajectory</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            {/* Placeholder for line chart */}
            <span className="text-slate-500">[ Trend Chart Visualization ]</span>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-white/10 flex flex-col justify-center items-center p-6 text-center">
          <History className="w-12 h-12 text-primary/50 mb-4" />
          <h3 className="text-xl font-bold mb-2">Compare Runs</h3>
          <p className="text-sm text-slate-400 mb-6">Select two past runs to generate a side-by-side scorecard and see exactly what changed.</p>
          <Button variant="outline" className="border-white/20">
            Compare Run 1 vs Run 3
          </Button>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Past Runs</h2>
      <div className="space-y-4">
        {MOCK_HISTORY.map((run, i) => (
          <Card key={run.id} className="bg-slate-900/50 border-white/5 hover:border-white/20 transition-all group">
            <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
              <div className="flex-1 flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <span className="text-xl font-bold text-primary">{run.score}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{run.date}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-400">Primary Bottleneck:</span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                      {run.bottleneck}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {run.improvement && (
                  <div className="text-emerald-400 text-sm font-semibold flex items-center bg-emerald-400/10 px-2 py-1 rounded-md">
                    ↗ {run.improvement}
                  </div>
                )}
                <Link to={`/detector/results/${run.id}`}>
                  <Button variant="ghost" className="text-slate-300 group-hover:text-white">
                    View Results <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
