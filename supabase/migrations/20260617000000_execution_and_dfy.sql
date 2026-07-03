-- Migration: Execution Layer & DFY Tables

-- 1. Add fields to sprints
ALTER TABLE public.sprints 
ADD COLUMN IF NOT EXISTS metric_name TEXT DEFAULT 'Primary Metric',
ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#6D4AE6';

-- 2. Workspaces
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pillar TEXT,
  content TEXT,
  template_type TEXT,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own workspaces" ON public.workspaces FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own workspaces" ON public.workspaces FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own workspaces" ON public.workspaces FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own workspaces" ON public.workspaces FOR DELETE USING (auth.uid() = user_id);

-- 3. Team Roles (for Team path / DFY management)
CREATE TABLE IF NOT EXISTS public.team_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'account_manager', 'strategist', 'client')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.team_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view all team roles" ON public.team_roles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 4. Reports
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id);
-- Admins can insert/update reports for clients
CREATE POLICY "Admins can manage reports" ON public.reports FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 5. KPI Data
CREATE TABLE IF NOT EXISTS public.kpi_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  target NUMERIC,
  trend TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.kpi_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own kpi data" ON public.kpi_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage kpi data" ON public.kpi_data FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
