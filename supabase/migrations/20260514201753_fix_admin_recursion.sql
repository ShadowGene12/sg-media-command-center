-- Fix infinite recursion in admin policies by using a security definer function

-- Create a bypass function that reads profiles without triggering RLS
create or replace function public.is_current_user_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid() limit 1),
    false
  );
$$;

-- Drop all admin policies that cause recursion
drop policy if exists "admin_read_all_profiles" on public.profiles;
drop policy if exists "admin_read_all_diagnostics" on public.diagnostics;
drop policy if exists "admin_read_all_trials" on public.trial_access;
drop policy if exists "admin_manage_sops" on public.sops;
drop policy if exists "admin_read_all_actions" on public.action_items;
drop policy if exists "admin_read_all_gamification" on public.gamification;

-- Recreate using the security definer function (no recursion)
create policy "admin_read_all_profiles" on public.profiles
  for select using (public.is_current_user_admin());

create policy "admin_read_all_diagnostics" on public.diagnostics
  for select using (public.is_current_user_admin());

create policy "admin_read_all_trials" on public.trial_access
  for select using (public.is_current_user_admin());

create policy "admin_manage_sops" on public.sops
  for all using (public.is_current_user_admin());

create policy "admin_read_all_actions" on public.action_items
  for select using (public.is_current_user_admin());

create policy "admin_read_all_gamification" on public.gamification
  for select using (public.is_current_user_admin());
