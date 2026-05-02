import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Target, TrendingUp, Plus, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpgradeModal } from '@/components/UpgradeModal';
import { HoverCard } from '@/components/HoverCard';
import { PremiumBadge } from '@/components/PremiumBadge';
import { motion } from 'framer-motion';

const ACTIVE_WORKSPACES = [
  { 
    id: 'wk-1', 
    title: 'Q3 Outbound Engine', 
    pillar: 'Customer Acquisition', 
    type: 'Sequence Builder',
    lastEdited: '2 hours ago',
    progress: 40
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function WorkspaceHub() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const freeLimit = 1;
  const currentUsage = ACTIVE_WORKSPACES.length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 relative">
      <div className="absolute inset-0 bg-skeletal-grid opacity-20 pointer-events-none -z-10" />
      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        featureName="unlimited workspaces and premium templates"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-indigo-500" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Workspace</span>
          </h1>
          <p className="text-slate-400 text-lg">Your active execution environments. Turn frameworks into reality.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Free Limit</p>
            <p className="text-sm text-slate-300 font-mono">{currentUsage} / {freeLimit} Canvases</p>
          </div>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] active:scale-95 transition-all duration-200"
            onClick={() => currentUsage >= freeLimit ? setShowUpgrade(true) : null}
          >
            <Plus className="w-4 h-4 mr-2" /> New Canvas
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Active Workspaces */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-500" /> Recent Canvases
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ACTIVE_WORKSPACES.map(workspace => (
              <motion.div key={workspace.id} variants={itemVariants}>
                <HoverCard className="group overflow-hidden relative h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div className="h-full bg-indigo-500" style={{ width: `${workspace.progress}%` }} />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                        {workspace.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        Edited {workspace.lastEdited}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-400 transition-colors">{workspace.title}</CardTitle>
                    <CardDescription>{workspace.pillar}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/workspace/${workspace.id}`}>
                      <Button variant="ghost" className="w-full text-slate-400 group-hover:text-white justify-between h-10 px-4 bg-white/5 rounded-md mt-4 relative z-20">
                        <span>Open Canvas</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </HoverCard>
              </motion.div>
            ))}
            
            {/* Upsell Card */}
            <motion.div variants={itemVariants}>
              <HoverCard 
                className="border-dashed border-white/10 hover:border-indigo-500/30 cursor-pointer flex flex-col items-center justify-center text-center p-6 min-h-[200px]"
                onClick={() => setShowUpgrade(true)}
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Unlock Unlimited Workspaces</h3>
                <p className="text-sm text-slate-500 max-w-[200px]">Scale your operations with unlimited custom canvases.</p>
              </HoverCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Templates */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Start from a Template</h2>
            <PremiumBadge>PRO TIER</PremiumBadge>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-3 gap-4"
          >
            {['Lite CRM', 'Cold Email Sequence', 'Offer Positioning Canvas', 'Pricing Model', 'Cash Flow Projector', 'KPI Dashboard'].map((template, i) => (
              <motion.div key={i} variants={itemVariants}>
                <HoverCard 
                  onClick={() => setShowUpgrade(true)}
                  className="p-4 cursor-pointer group flex items-center justify-between"
                >
                  <div className="relative z-20">
                    <h4 className="font-semibold text-slate-300 group-hover:text-white flex items-center gap-2">
                      {template}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Premium Template</p>
                  </div>
                  <Lock className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 relative z-20" />
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
