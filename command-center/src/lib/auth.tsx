import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, type Profile, type TrialAccess } from './supabase';
import { useCommandStore } from './store';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  trialAccess: TrialAccess | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, meta?: { first_name?: string; last_name?: string; business_name?: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Save any pending diagnostic from localStorage → DB ───────
async function flushPendingDiagnostic(userId: string) {
  try {
    const raw = localStorage.getItem('pending_diagnostic');
    if (!raw) return;
    const diag = JSON.parse(raw);
    await supabase.from('diagnostics').insert({
      user_id: userId,
      overall_score: diag.overall_score ?? 0,
      primary_pillar: diag.primary_pillar ?? null,
      answers: diag.answers ?? {},
      pillar_scores: diag.pillar_scores ?? {},
    });
    // Also generate action items if none exist yet
    const { data: existing } = await supabase
      .from('action_items')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      const PILLAR_ACTIONS: Record<string, Array<{ title: string; pillar: string; pillar_color: string }>> = {
        sales: [
          { title: "Document your sales process step-by-step", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
          { title: "Script your 3 most common objections", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
          { title: "Build a 5-touch follow-up sequence", pillar: "Sales & Conversion", pillar_color: "#1D9E75" },
        ],
        market_offer: [
          { title: "Run the Offer Clarity Audit (12-point check)", pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6" },
          { title: "Rewrite your offer headline with a specific measurable outcome", pillar: "Market & Offer Clarity", pillar_color: "#6D4AE6" },
        ],
        acquisition: [
          { title: "Audit your acquisition channels by real CAC", pillar: "Customer Acquisition", pillar_color: "#378ADD" },
          { title: "Map your lead-to-close conversion rate by channel", pillar: "Customer Acquisition", pillar_color: "#378ADD" },
        ],
        profit: [
          { title: "Calculate gross and net margin per service line", pillar: "Profit Optimization", pillar_color: "#F59E0B" },
          { title: "Identify your 3 highest-margin clients and why", pillar: "Profit Optimization", pillar_color: "#F59E0B" },
        ],
        finance: [
          { title: "Set up a 90-day rolling cash flow forecast", pillar: "Financial & Performance Control", pillar_color: "#D85A30" },
          { title: "Define your 5 core KPIs and review cadence", pillar: "Financial & Performance Control", pillar_color: "#D85A30" },
        ],
      };
      const acts = PILLAR_ACTIONS[diag.primary_pillar ?? 'sales'] ?? [];
      if (acts.length) {
        await supabase.from('action_items').insert(acts.map(a => ({ ...a, user_id: userId, status: 'not_started' })));
      }
    }

    localStorage.removeItem('pending_diagnostic');
  } catch {
    // Non-fatal — don't break the auth flow
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trialAccess, setTrialAccess] = useState<TrialAccess | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setTier, syncTrialFromDB } = useCommandStore();

  const loadUserData = async (userId: string) => {
    // Flush any pending diagnostic from a pre-auth detector session
    await flushPendingDiagnostic(userId);

    // Load profile + trial in parallel
    const [profileRes, trialRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('trial_access').select('*').eq('user_id', userId).single(),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data as Profile);
      setIsAdmin(!!(profileRes.data as any).is_admin);
    }

    if (trialRes.data) {
      setTrialAccess(trialRes.data);
      // Sync trial state from DB (not localStorage) so it's accurate on any device
      syncTrialFromDB(trialRes.data);
      setTier(trialRes.data.tier as any);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setProfile(null);
        setTrialAccess(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = async (email: string, password: string, meta?: { first_name?: string; last_name?: string; business_name?: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: meta } });
    // If signup succeeded and we have a session (email confirmation disabled), flush
    // the pending diagnostic immediately so CC has it on first load.
    if (!error && data.user) {
      await loadUserData(data.user.id);
    }
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setTrialAccess(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, trialAccess, isAdmin, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
