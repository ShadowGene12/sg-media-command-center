import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_SAVED = [
  { id: 'sop-1', title: 'The Perfect Sales Script Template', pillar: 'Sales & Conversion', type: 'SOP', time: '15 min read', progress: 60 },
  { id: 'sop-3', title: 'LinkedIn Outbound System', pillar: 'Customer Acquisition', type: 'Pathway', time: '4 weeks', progress: 0 },
];

export default function LibrarySaved() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <Bookmark className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">Saved Items</h1>
          <p className="text-slate-400 text-lg">Your bookmarked SOPs, frameworks, and tools.</p>
        </div>
      </div>

      {MOCK_SAVED.length === 0 ? (
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nothing saved yet</h3>
          <p className="text-slate-400 mb-6">Explore the library to find and save resources you want to implement.</p>
          <Link to="/library">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Browse Library
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SAVED.map((item) => (
            <Card key={item.id} className="bg-slate-900/50 border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
              {item.progress > 0 && (
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                  <div className="h-full bg-emerald-500" style={{ width: `${item.progress}%` }} />
                </div>
              )}
              <CardHeader className="pb-3 pt-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {item.type}
                  </span>
                  <div className="flex items-center text-xs text-slate-400">
                    <Clock className="w-3 h-3 mr-1" /> {item.time}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                <CardDescription>{item.pillar}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/library/${item.id}`}>
                  <Button variant="ghost" className="w-full text-slate-400 group-hover:text-white justify-between h-10 px-0 bg-white/5 px-4 rounded-md">
                    <span>{item.progress > 0 ? 'Continue' : 'View Resource'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
