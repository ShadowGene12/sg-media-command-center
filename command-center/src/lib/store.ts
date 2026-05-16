import { create } from 'zustand';

// ─── Trial helpers (localStorage, no extra deps) ─────────────────────────────
const LS_KEY = 'sg_trial_start';

const getTrialStart = (): string | null => {
  try { return localStorage.getItem(LS_KEY); } catch { return null; }
};
const saveTrialStart = (date: string): void => {
  try { localStorage.setItem(LS_KEY, date); } catch {}
};
const computeTrialDay = (startDate: string | null): number => {
  if (!startDate) return 0;
  const diffMs = Date.now() - new Date(startDate).getTime();
  return Math.max(1, Math.floor(diffMs / 86400000) + 1);
};

// ─── Types ────────────────────────────────────────────────────────────────────
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

export interface DailyInsight {
  day: number;
  content: string;
  action: string;
  pillar: string;
  color: string;
}

export type UserTier = 'trial' | 'free' | 'operator' | 'studio' | 'dfy';

// ─── Daily insights (7 days, Sales & Conversion primary bottleneck) ───────────
const DAILY_INSIGHTS: Record<number, DailyInsight> = {
  1: {
    day: 1,
    content: "80% of Sales bottleneck operators have a follow-up gap, not a lead gap. Your system is likely leaking at the follow-up stage — not at the top of the funnel.",
    action: "Count leads dormant 7+ days in your pipeline",
    pillar: "Sales & Conversion",
    color: "#1D9E75",
  },
  2: {
    day: 2,
    content: "A documented sales process reduces close-rate variance by ~40%. If your process lives in someone's head, you have a single point of failure that scales badly.",
    action: "Draft your minimum 5-step sales process today",
    pillar: "Sales & Conversion",
    color: "#1D9E75",
  },
  3: {
    day: 3,
    content: "Your full bottleneck chain is now mapped. Most operators find their real constraint isn't the obvious bottleneck — it's one layer deeper in the system.",
    action: "Review your full 5-pillar deep diagnostic",
    pillar: "Bottleneck Chain",
    color: "#6D4AE6",
  },
  4: {
    day: 4,
    content: "Acquisition and Sales bottlenecks are causally linked. Fixing acquisition spend while Sales is broken just fills a leaking bucket faster — and costs more.",
    action: "Map your lead-to-close conversion rate this week",
    pillar: "Customer Acquisition",
    color: "#378ADD",
  },
  5: {
    day: 5,
    content: "48 hours left on your trial. The features that drive the most value tend to be the ones operators open once and don't return to — check what you've left unread.",
    action: "Open the SOP most relevant to your bottleneck",
    pillar: "System",
    color: "#F59E0B",
  },
  6: {
    day: 6,
    content: "Your 30-Day Operator Roadmap is now live. This is the fix path — not just the diagnosis. Operator tier users execute against this roadmap every sprint cycle.",
    action: "Review your 30-day roadmap before tomorrow's lockdown",
    pillar: "Growth Infrastructure",
    color: "#6D4AE6",
  },
  7: {
    day: 7,
    content: "Trial ends tonight. Your Bottleneck Report and dashboard stay accessible forever on the free tier. The fix path — SOPs, Roadmap, AI Advisor — locks at midnight.",
    action: "Decide which features you want to keep active",
    pillar: "System",
    color: "#F59E0B",
  },
};

// ─── Seeded data ──────────────────────────────────────────────────────────────
const INITIAL_PILLARS: PillarScore[] = [
  { name: "Market & Offer Clarity",          slug: "market-offer", color: "#6D4AE6", score: 2.1, trend: "+0.3", modules: 8, completed: 2 },
  { name: "Customer Acquisition",            slug: "acquisition",  color: "#378ADD", score: 3.4, trend: "+0.5", modules: 7, completed: 1 },
  { name: "Sales & Conversion",              slug: "sales",        color: "#1D9E75", score: 1.8, trend: "-0.2", modules: 6, completed: 0 },
  { name: "Profit Optimization",             slug: "profit",       color: "#F59E0B", score: 3.9, trend: "+0.8", modules: 5, completed: 3 },
  { name: "Financial & Performance Control", slug: "finance",      color: "#D85A30", score: 2.6, trend: "+0.1", modules: 6, completed: 1 },
];

const INITIAL_ACTIONS: ActionItem[] = [
  { id: "1", title: "Document your sales process step-by-step",        pillar: "Sales",           color: "#1D9E75", status: "in_progress", due: "Apr 25" },
  { id: "2", title: "Map current acquisition channels and costs",       pillar: "Acquisition",     color: "#378ADD", status: "not_started", due: "Apr 28" },
  { id: "3", title: "Run the Offer Clarity Audit tool",                 pillar: "Market & Offer",  color: "#6D4AE6", status: "not_started", due: "Apr 30" },
  { id: "4", title: "Set up weekly KPI dashboard review cadence",       pillar: "Financial",       color: "#D85A30", status: "blocked",     due: "May 1"  },
  { id: "5", title: "Review profit margins on top 3 services",          pillar: "Profit",          color: "#F59E0B", status: "completed",   due: "Apr 18" },
  { id: "6", title: "Define ideal customer profile (ICP)",              pillar: "Market & Offer",  color: "#6D4AE6", status: "completed",   due: "Apr 15" },
];

// ─── Store interface ──────────────────────────────────────────────────────────
interface CommandStore {
  // Scores & data
  overallScore: number;
  pillars: PillarScore[];
  diyActions: ActionItem[];
  toggleDiyAction: (id: string) => void;

  // Trial
  trialStartDate: string | null;
  trialDay: number;               // 0 = not started, 1–7 = trial, 8+ = expired
  tier: UserTier;
  dailyInsight: DailyInsight | null;
  startTrial: () => void;
  setTier: (tier: UserTier) => void;
  syncTrialFromDB: (trialAccess: { trial_started_at: string; tier: string }) => void;

  // UI
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────
const initialTrialStart = getTrialStart();
const initialTrialDay   = computeTrialDay(initialTrialStart);
const initialTier: UserTier = initialTrialDay >= 1 && initialTrialDay <= 7
  ? 'trial'
  : initialTrialDay > 7
  ? 'free'
  : 'free';

export const useCommandStore = create<CommandStore>((set) => ({
  overallScore:    13.8,
  pillars:         INITIAL_PILLARS,
  diyActions:      INITIAL_ACTIONS,

  // Trial state — seeded from localStorage
  trialStartDate: initialTrialStart,
  trialDay:       initialTrialDay,
  tier:           initialTier,
  dailyInsight:   DAILY_INSIGHTS[Math.min(initialTrialDay, 7)] ?? null,

  startTrial: () => set((state) => {
    if (state.trialStartDate) return {}; // already started, no-op
    const date = new Date().toISOString();
    saveTrialStart(date);
    return {
      trialStartDate: date,
      trialDay: 1,
      tier: 'trial' as UserTier,
      dailyInsight: DAILY_INSIGHTS[1],
    };
  }),

  setTier: (tier) => set({ tier }),

  // Sync trial state from DB — used on login so any device gets correct trial day
  syncTrialFromDB: ({ trial_started_at, tier }) => set(() => {
    const day = computeTrialDay(trial_started_at);
    saveTrialStart(trial_started_at); // keep localStorage in sync
    return {
      trialStartDate: trial_started_at,
      trialDay: day,
      tier: tier as UserTier,
      dailyInsight: DAILY_INSIGHTS[Math.min(day, 7)] ?? null,
    };
  }),

  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  toggleDiyAction: (id) => set((state) => {
    const updated = state.diyActions.map(a =>
      a.id === id
        ? { ...a, status: (a.status === 'completed' ? 'not_started' : 'completed') as ActionItem['status'] }
        : a
    );
    const completedCount = updated.filter(a => a.status === 'completed').length;
    return {
      diyActions: updated,
      overallScore: Number((13.8 + completedCount * 0.2).toFixed(1)),
    };
  }),
}));
