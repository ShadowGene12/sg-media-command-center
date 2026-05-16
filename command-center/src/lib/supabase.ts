import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.VITE_SUPABASE_URL  as string;
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ─── Type helpers matching the DB schema ─────────────────────
export type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  business_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type TrialAccess = {
  user_id: string;
  tier: 'free' | 'trial' | 'starter' | 'operator' | 'studio' | 'dfy';
  trial_started_at: string;
  trial_expires_at: string;
  lifetime_pricing_active: boolean;
  lifetime_pricing_expires_at: string | null;
  upgraded_at: string | null;
};

export type Diagnostic = {
  id: string;
  user_id: string;
  overall_score: number;
  primary_pillar: string | null;
  answers: Record<string, unknown>;
  pillar_scores: {
    market_offer?: number;
    acquisition?: number;
    sales?: number;
    profit?: number;
    finance?: number;
  };
  view_id: string;
  created_at: string;
};

export type ActionItem = {
  id: string;
  user_id: string;
  title: string;
  pillar: string | null;
  pillar_color: string | null;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  due_date: string | null;
  diagnostic_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Sprint = {
  id: string;
  user_id: string;
  title: string;
  objective: string | null;
  pillar: string | null;
  start_metric: number | null;
  current_metric: number | null;
  target_metric: number | null;
  start_date: string;
  end_date: string | null;
  status: 'active' | 'completed' | 'paused' | 'abandoned';
  created_at: string;
  updated_at: string;
};

export type SOP = {
  id: string;
  slug: string;
  title: string;
  pillar: string;
  pillar_color: string;
  category: 'SOPs' | 'Playbooks' | 'Frameworks' | 'Learnings';
  read_time_mins: number;
  content: string;
  summary: string | null;
  is_popular: boolean;
  tier_required: string;
  created_at: string;
};

export type Gamification = {
  user_id: string;
  growth_score: number;
  rank: string;
  badges: Array<{ id: string; label: string; earned_at: string }>;
  milestones: Array<{ id: string; label: string; completed_at: string }>;
  streak_days: number;
  last_active_at: string | null;
  updated_at: string;
};
