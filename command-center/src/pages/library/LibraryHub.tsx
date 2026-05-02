import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, BookOpen, Clock, PlayCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_LIBRARY = [
  { id: 'sop-1', title: 'The Perfect Sales Script Template', pillar: 'Sales & Conversion', type: 'SOP', time: '15 min read', popular: true },
  { id: 'sop-2', title: 'Objection Handling Matrix', pillar: 'Sales & Conversion', type: 'Framework', time: '10 min read', popular: false },
  { id: 'sop-3', title: 'LinkedIn Outbound System', pillar: 'Customer Acquisition', type: 'Learning', time: '4 weeks', popular: true },
  { id: 'sop-4', title: 'Offer Clarity Audit', pillar: 'Market & Offer', type: 'Framework', time: '5 min', popular: false },
];

export default function LibraryHub({ category = 'All' }: { category?: 'Learnings' | 'SOPs' | 'Frameworks' | 'All' }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Map category to type string
  const categoryToTypeMap: Record<string, string[]> = {
    'Learnings': ['Learning'],
    'SOPs': ['SOP'],
    'Frameworks': ['Framework'],
    'All': ['SOP', 'Framework', 'Learning']
  };

  const allowedTypes = categoryToTypeMap[category] || categoryToTypeMap['All'];

  const filteredItems = MOCK_LIBRARY.filter(item => 
    allowedTypes.includes(item.type) && 
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.pillar.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">
            {category === 'All' ? 'Growth Library' : category}
          </h1>
          <p className="text-slate-400 text-lg">Your repository of playbooks, templates, and frameworks.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/library/saved">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Star className="w-4 h-4 mr-2" /> Saved Items
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input 
            placeholder={`Search ${category.toLowerCase()}...`}
            className="pl-10 h-12 bg-slate-800/50 border-white/10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 shrink-0">
          <Filter className="w-4 h-4 mr-2" /> All Pillars
        </Button>
      </div>

      {/* Pinned / Recommended */}
      {filteredItems.filter(item => item.popular).length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" /> Recommended {category === 'All' ? 'For You' : category}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.filter(item => item.popular).map((item) => (
              <Card key={item.id} className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/10 hover:border-primary/50 transition-all group overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-primary to-purple-500" />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                      {item.type}
                    </span>
                    <div className="flex items-center text-xs text-slate-400">
                      {item.type === 'Learning' ? <PlayCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {item.time}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
                  <CardDescription className="text-xs">{item.pillar}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/library/${item.id}`}>
                    <Button variant="ghost" className="w-full text-slate-300 group-hover:text-white p-0 justify-end h-auto mt-2">
                      Open <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Entries Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">All {category === 'All' ? 'Resources' : category}</h2>
        {filteredItems.length === 0 ? (
          <div className="text-center p-12 bg-slate-900/50 border border-white/5 rounded-xl text-slate-400">
            No {category.toLowerCase()} found matching your criteria.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-slate-900/50 border-white/5 hover:border-white/20 transition-all group">
                <CardHeader className="pb-3">
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
                      <span>View Resource</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
