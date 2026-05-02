import { create } from 'zustand';

export interface ActionItem {
  id: string;
  title: string;
  pillar: string;
  color: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  due: string;
}

export interface PillarScore {
  name: string;
  slug: string;
  score: number;
  color: string;
  trend: string;
  modules: number;
  completed: number;
}

interface CommandStore {
  // Global Metrics
  overallScore: number;
  
  // DIY Action Plan
  diyActions: ActionItem[];
  toggleDiyAction: (id: string) => void;
  
  // Pillars
  pillars: PillarScore[];

  // Command Palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const INITIAL_PILLARS: PillarScore[] = [
  { name: "Market & Offer Clarity", slug: "market-offer", color: "#6D4AE6", score: 2.1, trend: "+0.3", modules: 8, completed: 2 },
  { name: "Customer Acquisition", slug: "acquisition", color: "#378ADD", score: 3.4, trend: "+0.5", modules: 7, completed: 1 },
  { name: "Sales & Conversion", slug: "sales", color: "#1D9E75", score: 1.8, trend: "-0.2", modules: 6, completed: 0 },
  { name: "Profit Optimization", slug: "profit", color: "#F59E0B", score: 3.9, trend: "+0.8", modules: 5, completed: 3 },
  { name: "Financial Control", slug: "finance", color: "#D85A30", score: 2.6, trend: "+0.1", modules: 6, completed: 1 },
];

const INITIAL_ACTIONS: ActionItem[] = [
  { id: "1", title: "Document your sales process step-by-step", pillar: "Sales", color: "#1D9E75", status: "in_progress", due: "Apr 25" },
  { id: "2", title: "Map current acquisition channels and costs", pillar: "Acquisition", color: "#378ADD", status: "not_started", due: "Apr 28" },
  { id: "3", title: "Run the Offer Clarity Audit tool", pillar: "Market & Offer", color: "#6D4AE6", status: "not_started", due: "Apr 30" },
  { id: "4", title: "Set up weekly KPI dashboard review cadence", pillar: "Financial", color: "#D85A30", status: "blocked", due: "May 1" },
  { id: "5", title: "Review profit margins on top 3 services", pillar: "Profit", color: "#F59E0B", status: "completed", due: "Apr 18" },
  { id: "6", title: "Define ideal customer profile (ICP)", pillar: "Market & Offer", color: "#6D4AE6", status: "completed", due: "Apr 15" },
];

export const useCommandStore = create<CommandStore>((set) => ({
  overallScore: 13.8, // Base score
  pillars: INITIAL_PILLARS,
  diyActions: INITIAL_ACTIONS,
  
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  toggleDiyAction: (id) => set((state) => {
    const updatedActions = state.diyActions.map(action => 
      action.id === id 
        ? { ...action, status: action.status === 'completed' ? 'not_started' : 'completed' as const } 
        : action
    );
    
    // Calculate new score based on completed actions (just a mock logic for interactivity)
    const completedCount = updatedActions.filter(a => a.status === 'completed').length;
    const newScore = 13.8 + (completedCount * 0.2); // Each completed action adds 0.2 to the score
    
    return {
      diyActions: updatedActions,
      overallScore: Number(newScore.toFixed(1))
    };
  }),
}));
