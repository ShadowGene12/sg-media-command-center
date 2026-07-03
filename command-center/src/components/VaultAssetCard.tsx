import { motion } from "framer-motion";
import { Download, Copy, Image as ImageIcon, FileText, LayoutDashboard, Brain, Target, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PremiumCard } from "@/components/PremiumCard";
import { PILLARS } from "@/lib/mockData";
import { useState } from "react";

const PIPELINE_STEPS = [
  "Define Job",
  "Extract Logic",
  "Split Layers",
  "Product Feed Sheet",
  "Final Assets",
];

export function VaultAssetCard({ doc, i, onOpenGallery }: { doc: any; i: number; onOpenGallery: () => void }) {
  const [copied, setCopied] = useState(false);
  const pillar = PILLARS.find((p) => p.id === doc.pillar);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.4 }}
    >
      <PremiumCard glowColor={`hsl(var(--pillar-${doc.pillar}) / 0.15)`} className="h-full flex flex-col group">
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div 
                className="h-10 w-10 rounded-xl flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: `hsl(var(--pillar-${doc.pillar}) / 0.1)`,
                  borderColor: `hsl(var(--pillar-${doc.pillar}) / 0.2)`,
                }}
              >
                {doc.type === "PDF" ? <FileText className="h-5 w-5" style={{ color: `hsl(var(--pillar-${doc.pillar}))` }} /> :
                 doc.type === "Gallery" ? <ImageIcon className="h-5 w-5" style={{ color: `hsl(var(--pillar-${doc.pillar}))` }} /> :
                 <LayoutDashboard className="h-5 w-5" style={{ color: `hsl(var(--pillar-${doc.pillar}))` }} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{doc.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider">
                    {doc.type}
                  </Badge>
                  <span className="text-xs text-slate-500 font-mono">{doc.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--pillar-${doc.pillar}))` }} />
              <span className="text-[10px] text-muted-foreground uppercase font-mono">{pillar?.name}</span>
            </div>
          </div>

          {/* Pipeline Tracker */}
          <div className="mt-4 mb-8">
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute left-2 right-2 h-[2px] bg-white/5 top-1/2 -translate-y-1/2 z-0" />
              <div 
                className="absolute left-2 h-[2px] bg-emerald-500/50 top-1/2 -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: `${((doc.pipelineStatus - 1) / (PIPELINE_STEPS.length - 1)) * 100}%` }} 
              />
              
              {PIPELINE_STEPS.map((step, idx) => {
                const isActive = idx + 1 <= doc.pipelineStatus;
                const isCurrent = idx + 1 === doc.pipelineStatus;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center group/step cursor-help">
                    <div 
                      className={`h-3 w-3 rounded-full border-2 transition-colors ${isActive ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-[#0a0a0a] border-white/10'}`} 
                    />
                    {isCurrent && (
                      <span className="absolute -bottom-6 text-[10px] font-mono whitespace-nowrap text-emerald-400 font-semibold">
                        {step}
                      </span>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute -top-8 opacity-0 group-hover/step:opacity-100 transition-opacity pointer-events-none bg-[#111] border border-white/10 text-[10px] px-2 py-1 rounded text-white whitespace-nowrap z-50">
                      {step} {isActive ? "(Complete)" : "(Pending)"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context & Tags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-2">
            
            {/* Strategic Context */}
            {doc.relatedSprintId && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Target className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Strategic Context</span>
                </div>
                <p className="text-xs text-slate-300">
                  Built to accelerate <span className="font-semibold text-white">{doc.sprintName}</span>.
                </p>
              </div>
            )}

            {/* Strategic Tags */}
            {doc.strategicTags?.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Brain className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Strategic Depth</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.strategicTags.map((tag: string) => (
                    <span key={tag} className="text-[10px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Local Context */}
            {doc.localContext?.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 md:col-span-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Globe className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Local Nuance Integration</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.localContext.map((ctx: string) => (
                    <span key={ctx} className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {ctx}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/[0.05] p-4 bg-white/[0.01] flex items-center justify-between rounded-b-2xl">
          {doc.type === "Gallery" && doc.heroImage ? (
            <button 
              onClick={onOpenGallery}
              className="flex items-center gap-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/5"
            >
              <ImageIcon className="h-4 w-4" /> View Premium Gallery
            </button>
          ) : (
            <button className="flex items-center gap-2 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(109,74,230,0.3)] border border-violet-500">
              <Download className="h-4 w-4" /> Download PDF
            </button>
          )}

          {doc.hasAgentReady && (
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-colors border ${copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-[#111] border-white/10 text-slate-300 hover:bg-white/5'}`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Agent-Ready (.md)'}
            </button>
          )}
        </div>
      </PremiumCard>
    </motion.div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
