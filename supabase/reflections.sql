create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  email text check (email is null or char_length(email) <= 254),
  text text not null check (char_length(text) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.reflections enable row level security;
revoke all on table public.reflections from anon, authenticated;
grant all on table public.reflections to service_role;

-- Preserve the exhibition's existing sample entries as approved legacy entries.
-- Their email addresses were never collected, so those values remain null.
insert into public.reflections (id, name, email, text, status, created_at)
values
  ('00000000-0000-4000-8000-000000000001', 'Visitor', null, 'This reminded me of losing my mother. The Reliquary piece — I stood before it for ten minutes.', 'approved', '2026-08-20T12:00:00Z'),
  ('00000000-0000-4000-8000-000000000002', 'Visitor', null, 'I cried during Reliquary. I''ve never seen grief represented this way — tender without being sentimental.', 'approved', '2026-08-23T12:00:00Z'),
  ('00000000-0000-4000-8000-000000000003', 'Visitor', null, 'The Door to Nowhere is exactly how I felt after my divorce. Thank you for making the invisible visible.', 'approved', '2026-08-23T12:00:00Z'),
  ('00000000-0000-4000-8000-000000000004', 'Visitor', null, 'I''ve never been to an exhibition that felt like a conversation. This website carries that same intimacy.', 'approved', '2026-08-24T12:00:00Z'),
  ('00000000-0000-4000-8000-000000000005', 'Visitor', null, 'The Bubble of Home brought me back to my grandmother''s kitchen. The smoke, the amber light — I could smell it.', 'approved', '2026-08-25T12:00:00Z')
on conflict (id) do nothing;
