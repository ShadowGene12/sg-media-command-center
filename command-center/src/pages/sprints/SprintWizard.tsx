import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Target, Settings, Link as LinkIcon, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WIZARD_STEPS = [
  { id: 1, title: 'Select Pillar & Metric', icon: Target },
  { id: 2, title: 'Set Targets', icon: Settings },
  { id: 3, title: 'Link SOP/Pathway', icon: LinkIcon },
  { id: 4, title: 'Check-in Cadence', icon: Calendar },
];

export default function SprintWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(c => c + 1);
    else navigate('/workspace/1');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Link to="/sprints" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Cancel Setup
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Configure New Sprint</h1>
        <p className="text-slate-400">Lock in your focus for the next 4-6 weeks.</p>
      </div>

      <div className="flex justify-between relative mb-12 max-w-lg mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 -translate-y-1/2">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
        </div>
        {WIZARD_STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isComplete = step.id < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                isActive ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' :
                isComplete ? 'bg-slate-800 border-primary text-primary' :
                'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium absolute -bottom-6 whitespace-nowrap ${
                isActive ? 'text-white' : 'text-slate-500'
              }`}>{step.title}</span>
            </div>
          )
        })}
      </div>

      <Card className="bg-slate-900 border-white/10 shadow-2xl">
        <CardContent className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold">What are we optimizing?</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Growth Pillar</label>
                  <select className="w-full h-12 bg-slate-800 border border-white/10 rounded-lg px-4 text-white appearance-none focus:ring-1 focus:ring-primary">
                    <option>Sales & Conversion</option>
                    <option>Customer Acquisition</option>
                    <option>Market & Offer</option>
                    <option>Profit Optimization</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Primary Metric</label>
                  <Input placeholder="e.g. Close Rate (%)" className="h-12 bg-slate-800 border-white/10" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold">Set your baseline and target</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Current Baseline</label>
                  <Input type="number" placeholder="15" className="h-12 bg-slate-800 border-white/10 font-mono text-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Goal Target</label>
                  <Input type="number" placeholder="35" className="h-12 bg-slate-800 border-primary/50 font-mono text-xl text-primary" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold">Link an Execution Resource</h2>
              <p className="text-sm text-slate-400">What SOP or Pathway will you use to drive this metric?</p>
              <div className="space-y-3">
                <button className="w-full p-4 text-left border border-primary/50 bg-primary/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Pathway: Fix Sales Engine</div>
                    <div className="text-xs text-primary">Recommended based on bottleneck</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                </button>
                <button className="w-full p-4 text-left border border-white/10 bg-slate-800/50 rounded-xl flex items-center justify-between opacity-60">
                  <div>
                    <div className="font-semibold text-white">SOP: 5-Touch Follow Up</div>
                    <div className="text-xs text-slate-400">Library resource</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold">Schedule Check-ins</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Duration</label>
                  <select className="w-full h-12 bg-slate-800 border border-white/10 rounded-lg px-4 text-white appearance-none">
                    <option>4 Weeks (Recommended)</option>
                    <option>6 Weeks</option>
                    <option>8 Weeks</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-1 block">Check-in Day</label>
                  <select className="w-full h-12 bg-slate-800 border border-white/10 rounded-lg px-4 text-white appearance-none">
                    <option>Friday Afternoon</option>
                    <option>Monday Morning</option>
                  </select>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mt-4 text-sm text-indigo-300">
                  You will receive a notification and AI Advisor prompt every week to log your numbers.
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-white/10 flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(c => Math.max(1, c - 1))}
              disabled={currentStep === 1}
              className="text-slate-400"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white w-32"
            >
              {currentStep === 4 ? 'Start Sprint' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
