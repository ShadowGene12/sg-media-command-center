-- Admin role
alter table public.profiles add column if not exists is_admin boolean not null default false;

update public.profiles set is_admin = true where email = 'shadowgamer1368@gmail.com';

create policy "admin_read_all_profiles" on public.profiles for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "admin_read_all_diagnostics" on public.diagnostics for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "admin_read_all_trials" on public.trial_access for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "admin_manage_sops" on public.sops for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "admin_read_all_actions" on public.action_items for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "admin_read_all_gamification" on public.gamification for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
