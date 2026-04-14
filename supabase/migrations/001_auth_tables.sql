-- Migration: 001_auth_tables.sql
-- Creates the profiles table that extends Supabase Auth (auth.users).
-- Run this in the Supabase SQL editor or via the Supabase CLI:
--   supabase db push

-- ── Profiles ────────────────────────────────────────────────────────────────
-- One row per authenticated user. The id is a foreign key to auth.users so
-- deleting the auth record cascades and removes the profile automatically.

create table if not exists public.profiles (
  id           uuid        primary key references auth.users(id) on delete cascade,
  display_name text        not null,
  username     text        unique,
  avatar_url   text,
  bio          text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;

-- Anyone can read any profile (public leaderboards, challenge pages, etc.)
create policy "profiles_select_all"
  on public.profiles
  for select
  using (true);

-- Users can only insert their own row
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Users can only update their own row
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id);

-- ── Auto-create profile on signup ───────────────────────────────────────────
-- When Supabase Auth creates a new user this trigger inserts the matching
-- profile row, picking up display_name from the signup metadata if provided.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Keep updated_at current ─────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
