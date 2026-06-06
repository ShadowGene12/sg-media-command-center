-- ============================================================
-- SG Media Command Center — Full Schema
-- ============================================================



-- ─── PROFILES ────────────────────────────────────────────────
create table public.profiles (
  id              uuid primary key references auth.users on delete cascade,
  email           text not null,
  first_name      text default '',
  last_name       text default '',
  business_name   text default '',
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.handle_new_user();

-- ─── TRIAL & TIER ────────────────────────────────────────────
create type public.user_tier as enum ('free','trial','starter','operator','studio','dfy');

create table public.trial_access (
  user_id                     uuid primary key references public.profiles on delete cascade,
  tier                        public.user_tier not null default 'trial',
  trial_started_at            timestamptz not null default now(),
  trial_expires_at            timestamptz not null default (now() + interval '7 days'),
  lifetime_pricing_active     boolean not null default false,
  lifetime_pricing_expires_at timestamptz,
  upgraded_at                 timestamptz,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);
alter table public.trial_access enable row level security;
create policy "trial_all" on public.trial_access for all using (auth.uid() = user_id);

create or replace function public.handle_new_trial()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.trial_access (user_id) values (new.id);
  return new;
end;
$$;
create trigger on_profile_created_trial
  after insert on public.profiles for each row execute procedure public.handle_new_trial();

-- ─── DIAGNOSTICS ─────────────────────────────────────────────
create table public.diagnostics (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles on delete cascade,
  overall_score   numeric(4,2) not null default 0,
  primary_pillar  text,
  answers         jsonb not null default '{}',
  pillar_scores   jsonb not null default '{}',
  view_id         text not null default ('BD-' || upper(substring(gen_random_uuid()::text, 1, 4))),
  created_at      timestamptz not null default now()
);
create index diagnostics_user_created on public.diagnostics(user_id, created_at desc);
alter table public.diagnostics enable row level security;
create policy "diagnostics_all" on public.diagnostics for all using (auth.uid() = user_id);

-- ─── ACTION ITEMS ─────────────────────────────────────────────
create type public.action_status as enum ('not_started','in_progress','completed','blocked');

create table public.action_items (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles on delete cascade,
  title         text not null,
  pillar        text,
  pillar_color  text,
  status        public.action_status not null default 'not_started',
  due_date      date,
  diagnostic_id uuid references public.diagnostics,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index action_items_user on public.action_items(user_id);
alter table public.action_items enable row level security;
create policy "actions_all" on public.action_items for all using (auth.uid() = user_id);

-- ─── SPRINTS ─────────────────────────────────────────────────
create type public.sprint_status as enum ('active','completed','paused','abandoned');

create table public.sprints (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles on delete cascade,
  title           text not null,
  objective       text,
  pillar          text,
  start_metric    numeric(6,2),
  current_metric  numeric(6,2),
  target_metric   numeric(6,2),
  start_date      date not null default current_date,
  end_date        date,
  status          public.sprint_status not null default 'active',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index sprints_user on public.sprints(user_id);
alter table public.sprints enable row level security;
create policy "sprints_all" on public.sprints for all using (auth.uid() = user_id);

-- ─── AI ADVISOR MESSAGES ─────────────────────────────────────
create table public.advisor_messages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles on delete cascade,
  role        text not null check (role in ('user','assistant')),
  content     text not null,
  session_id  uuid not null default gen_random_uuid(),
  created_at  timestamptz not null default now()
);
create index advisor_user_session on public.advisor_messages(user_id, session_id, created_at);
alter table public.advisor_messages enable row level security;
create policy "advisor_all" on public.advisor_messages for all using (auth.uid() = user_id);

-- ─── SOP INTERACTIONS ────────────────────────────────────────
create table public.sop_interactions (
  user_id   uuid not null references public.profiles on delete cascade,
  sop_slug  text not null,
  status    text not null check (status in ('read','saved','completed')),
  updated_at timestamptz not null default now(),
  primary key (user_id, sop_slug)
);
alter table public.sop_interactions enable row level security;
create policy "sop_interactions_all" on public.sop_interactions for all using (auth.uid() = user_id);

-- ─── GAMIFICATION ────────────────────────────────────────────
create table public.gamification (
  user_id        uuid primary key references public.profiles on delete cascade,
  growth_score   numeric(5,2) not null default 0,
  rank           text not null default 'Diagnosed',
  badges         jsonb not null default '[]',
  milestones     jsonb not null default '[]',
  streak_days    integer not null default 0,
  last_active_at timestamptz,
  updated_at     timestamptz not null default now()
);
alter table public.gamification enable row level security;
create policy "gamification_select" on public.gamification for select using (auth.uid() = user_id);
create policy "gamification_update" on public.gamification for update using (auth.uid() = user_id);

create or replace function public.handle_new_gamification()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.gamification (user_id) values (new.id);
  return new;
end;
$$;
create trigger on_profile_gamification
  after insert on public.profiles for each row execute procedure public.handle_new_gamification();

-- ─── SOPs / CONTENT ──────────────────────────────────────────
create table public.sops (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  pillar          text not null,
  pillar_color    text not null default '#6D4AE6',
  category        text not null check (category in ('SOPs','Playbooks','Frameworks','Learnings')),
  read_time_mins  integer not null default 10,
  content         text not null,
  summary         text,
  is_popular      boolean not null default false,
  tier_required   text not null default 'starter',
  created_at      timestamptz not null default now()
);
alter table public.sops enable row level security;
create policy "sops_read" on public.sops for select to authenticated using (true);

-- ─── SEED: SOPs ──────────────────────────────────────────────
insert into public.sops (slug,title,pillar,pillar_color,category,read_time_mins,is_popular,tier_required,summary,content) values

('perfect-sales-script','The Perfect Sales Script Template','Sales & Conversion','#1D9E75','SOPs',15,true,'starter',
'A documented 5-step sales conversation framework that removes improvisation and stabilises close rates.',
E'# The Perfect Sales Script Template\n\n## Why This Exists\n\nMost operators improvise every sales conversation. Close rate depends on who is selling and their energy that day. A documented process fixes that variance permanently.\n\nThe goal is not a script you read from. It is a framework so internalised that every conversation follows the same logic regardless of who runs it.\n\n## The 5-Step Framework\n\n### Step 1 — Diagnostic Open (2 min)\nNever open with your offer. Open with their situation.\n\n> "Before I tell you anything about what we do, I want to understand your situation first. What made you reach out right now — what is happening in the business that made this feel urgent?"\n\nWhat they say here is your entire sales script. Write it down word for word.\n\n### Step 2 — Consequence Expansion (3 min)\n> "How long has that been the case? And what is it actually costing you — not just in revenue, but time, missed opportunities, stress on your team?"\n\nPeople buy to escape pain. Make the cost of inaction vivid before presenting any solution.\n\n### Step 3 — Fit Presentation (5 min)\nConnect every feature to something they said in Step 1. Never present a generic benefit.\n\n> "Based on what you described, here is exactly what we do and why it maps to your situation..."\n\n### Step 4 — Objection Handling (3 min)\nThe three you will always face:\n\n**Price:** "If we solve [their problem], what is that worth over 12 months? So we are talking about a [X]x return. Does that change how you see the cost?"\n\n**Timing:** "What needs to change for the timing to be right? Because [the problem] is not pausing while we wait."\n\n**Need to think:** "Absolutely. What specific questions do you need answered to feel confident? Let me address those now."\n\n### Step 5 — The Close (2 min)\nNever ask a yes/no question.\n\n> "Based on what we discussed, the next step is [specific action]. Does [day/time] work?"\n\n## Implementation Checklist\n- [ ] Write your Step 1 opening question for your specific offer\n- [ ] Document your 3 most common objections with scripted responses\n- [ ] Record your next 5 sales calls and score each step\n- [ ] Train anyone handling sales on this framework before their next call\n- [ ] Track conversion rate weekly for the first month'),

('follow-up-sequence','5-Touch Follow-Up Sequence','Sales & Conversion','#1D9E75','SOPs',12,true,'starter',
'The exact 5-message cadence that recovers dormant leads without being pushy.',
E'# 5-Touch Follow-Up Sequence\n\n## The Problem\n\n80% of closed deals require 5+ follow-ups. 80% of salespeople give up after one.\n\nMost follow-up fails because it is either too early (desperate) or too late (forgotten). This sequence is timed to maintain presence without pressure.\n\n## The Sequence\n\n### Touch 1 — Same Day (2–4 hours after conversation)\n**Email — Confirmation + Next Step**\n\n> Subject: Good talking with you — one thing I forgot to mention\n>\n> [First name], enjoyed the conversation. One thing worth adding: [specific insight relevant to their situation].\n>\n> As agreed, here is what I need from you to move forward: [specific action].\n>\n> [Your name]\n\n### Touch 2 — Day 3\n**Email — Pure Value (no ask)**\n\nSend something genuinely useful. Do not mention the sale.\n\n> Subject: Thought this was relevant to what you mentioned\n>\n> [First name], came across this and thought of what you said about [their problem].\n>\n> [Link or brief insight]. No action needed — just wanted to share.\n\n### Touch 3 — Day 7\n**Email — Direct Check-In**\n\n> Subject: Still relevant?\n>\n> [First name], is [the problem we discussed] still something you are working to solve this quarter?\n>\n> If timing has changed, no problem — just let me know. If it is still a priority, happy to schedule 20 minutes.\n\n### Touch 4 — Day 14\n**LinkedIn DM or Phone — Pattern Interrupt**\n\nDifferent channel breaks the pattern.\n\n> "[First name] — reached out a different way. If [their problem] is still on your radar, I think we can solve it. If not, totally fine."\n\n### Touch 5 — Day 21\n**Email — The Breakup**\n\n> Subject: Closing your file\n>\n> [First name], I have reached out a few times and have not heard back, so I am going to assume the timing is not right.\n>\n> I will close your file. If [the problem] ever becomes a priority, you know where to find me.\n\nThe breakup email gets a 40% response rate. People respond to finality.\n\n## Implementation Checklist\n- [ ] Pre-write all 5 messages for your specific offer\n- [ ] Schedule Touch 1 immediately after every sales call\n- [ ] Set calendar reminders for Touches 2–5\n- [ ] Track response rate per touch to identify where leads re-engage'),

('offer-clarity-audit','Offer Clarity Audit','Market & Offer Clarity','#6D4AE6','SOPs',20,true,'operator',
'A 12-point audit to assess and strengthen the clarity of your core offer.',
E'# Offer Clarity Audit\n\n## Why Offer Clarity Is Your Primary Constraint\n\nWeak positioning is the hidden cause of most acquisition and sales problems. If your offer is unclear, no amount of traffic or sales skill compensates.\n\nA clear offer answers three questions instantly:\n- Who exactly is this for?\n- What specific outcome does it produce?\n- Why should I believe you?\n\n## The 12-Point Audit\n\nScore each 0 (No), 1 (Partially), 2 (Yes). Maximum score: 24.\n\n### Clarity\n1. Can you describe the offer in one sentence a non-expert would understand? [ ] 0  [ ] 1  [ ] 2\n2. Does it promise a specific, measurable outcome — not a vague benefit? [ ] 0  [ ] 1  [ ] 2\n3. Is there a clear timeframe attached to the outcome? [ ] 0  [ ] 1  [ ] 2\n4. Is the ideal customer defined precisely enough that your offer would repel wrong-fit prospects? [ ] 0  [ ] 1  [ ] 2\n5. Would a stranger reading your homepage understand what you sell in 10 seconds? [ ] 0  [ ] 1  [ ] 2\n6. Can you state in one sentence why your offer differs from the obvious alternatives? [ ] 0  [ ] 1  [ ] 2\n\n### Proof\n7. Can you explain HOW your offer produces the outcome — not just THAT it does? [ ] 0  [ ] 1  [ ] 2\n8. Do you have at least 3 specific case studies or data points proving the outcome? [ ] 0  [ ] 1  [ ] 2\n9. Is there a guarantee or risk reversal that reduces perceived risk? [ ] 0  [ ] 1  [ ] 2\n\n### Commercial\n10. Is the price positioned relative to the value of the outcome, not the cost of delivery? [ ] 0  [ ] 1  [ ] 2\n11. Does your positioning pre-empt the top 3 objections before they are raised? [ ] 0  [ ] 1  [ ] 2\n12. Is there one obvious action for a qualified prospect to take? [ ] 0  [ ] 1  [ ] 2\n\n## Scoring\n- **20–24:** Offer is clear. Optimise distribution.\n- **14–19:** Moderate clarity. Fix the zero-scoring items immediately.\n- **8–13:** Offer needs significant work before scaling acquisition.\n- **0–7:** Reposition before spending on anything else.\n\n## The Most Common Fixes\n\n**Low on Specific Outcome:** Rewrite your offer headline: "We help [audience] achieve [specific measurable outcome] in [timeframe] without [common objection]."\n\n**Low on Mechanism:** Write one paragraph explaining the unique process behind your result. This becomes your core positioning.\n\n**Low on Evidence:** Document 3 client outcomes with specific numbers. Offer the next client a discount in exchange for a detailed documented result.'),

('cash-flow-scanner','Cash Flow Scanner','Financial & Performance Control','#D85A30','SOPs',15,false,'operator',
'A monthly 45-minute process to map your cash flow and identify gaps before they become crises.',
E'# Cash Flow Scanner\n\n## Why Cash Flow Kills Profitable Businesses\n\nYou can be profitable on paper and run out of cash. The gap between profit and cash is timing. This scanner finds the timing gaps.\n\nRun this every month — first Monday, 9 AM.\n\n## The 45-Minute Process\n\n### Step 1 — Cash Snapshot (10 min)\n\nRecord right now:\n- Cash in all business bank accounts\n- Outstanding receivables (owed to you, due in 30 days)\n- Outstanding payables (owed by you, due in 30 days)\n\n**Net Cash Position = Bank Balance + Receivables - Payables**\n\n### Step 2 — 30-Day Forecast (20 min)\n\nFor the next 30 days, map every expected inflow and outflow by week.\n\nInflows: client payments, new sales expected, any other revenue.\nOutflows: rent, payroll, suppliers, subscriptions, tax obligations.\n\n**30-Day Net = Total Inflows - Total Outflows**\n\n### Step 3 — Gap Analysis (10 min)\n\nFor any week where outflows exceed inflows:\n1. Can the outflow be delayed? Ask before you need to.\n2. Can the inflow be accelerated? Invoice early, offer a prepay discount.\n3. Do you have a credit facility to bridge the gap?\n\n### Step 4 — Danger Indicators (5 min)\n\nRed flags:\n- Net Cash Position below 1 month of fixed expenses\n- Any week in the forecast where you go negative\n- Receivables over 45 days old\n- Any single client representing over 40% of revenue\n\n## Implementation Checklist\n- [ ] Set a recurring calendar block: First Monday, 9–10 AM\n- [ ] Create a simple spreadsheet with the forecast tables\n- [ ] Configure your accounting software to show AR aging\n- [ ] Define your minimum cash reserve (3 months expenses recommended)\n- [ ] Set an alert when cash drops below that threshold'),

('acquisition-channel-audit','Acquisition Channel Audit','Customer Acquisition','#378ADD','SOPs',18,false,'operator',
'A systematic process to evaluate each acquisition channel by real CAC and payback period.',
E'# Acquisition Channel Audit\n\n## Purpose\n\nMost businesses run multiple acquisition channels without knowing which are profitable. This audit shows you where to double down and where to stop spending immediately.\n\n## The 4-Step Audit\n\n### Step 1 — Channel Inventory\n\nFor every active acquisition channel, document:\n- Monthly spend (cash + time converted to cost)\n- Leads generated per month\n- Lead-to-customer conversion rate\n- Average revenue per new customer\n\n### Step 2 — Calculate CAC Per Channel\n\nCAC = Monthly Channel Spend / New Customers Acquired from that channel\n\nDo this separately for each channel. Most businesses discover CAC varies 5–10x across channels.\n\n### Step 3 — Calculate Payback Period\n\nPayback Period = CAC / Monthly Revenue per Customer\n\n- Under 6 months = healthy channel\n- 6–12 months = monitor closely\n- Over 12 months = evaluate hard\n\n### Step 4 — The Constraint Question\n\nFor your lowest-CAC channel, ask: why can we not 2x the spend here? What would break?\n\nThat constraint is your next investment.\n\n## The Cut List\n\nPut any channel on a 30-day kill list where:\n- Payback exceeds 18 months, OR\n- You cannot attribute a single customer directly to it\n\nIf it does not produce in 30 days with intensified focus, cut it.\n\n## Common Findings\n\n**Referrals have lowest CAC but no system.** Build an active referral programme — offer existing clients a meaningful incentive for introductions.\n\n**Content has longest lag.** Do not evaluate SEO on 30-day metrics. It compounds over 12 months.\n\n**Paid ads profitable at small scale, break at scale.** Usually a landing page or offer clarity problem, not a media buying problem.\n\n## Implementation Checklist\n- [ ] Complete the channel inventory for all active channels with 3 months of data\n- [ ] Calculate CAC per channel\n- [ ] Rank channels by CAC lowest to highest\n- [ ] Identify the constraint in your best channel\n- [ ] Create a 30-day cut list for underperforming channels');

-- ─── UPDATED_AT TRIGGERS ─────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger t_profiles_updated      before update on public.profiles      for each row execute procedure public.set_updated_at();
create trigger t_trial_updated         before update on public.trial_access   for each row execute procedure public.set_updated_at();
create trigger t_actions_updated       before update on public.action_items   for each row execute procedure public.set_updated_at();
create trigger t_sprints_updated       before update on public.sprints        for each row execute procedure public.set_updated_at();
create trigger t_gamification_updated  before update on public.gamification   for each row execute procedure public.set_updated_at();
