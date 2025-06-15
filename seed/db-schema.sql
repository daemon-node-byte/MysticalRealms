begin;

-- Enable Row-Level Security
alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table tarot_readings enable row level security;
alter table tarot_spreads enable row level security;
alter table astrology_charts enable row level security;
alter table calendar_entries enable row level security;
alter table blog_posts enable row level security;
alter table blog_comments enable row level security;

-- USERS (Supabase Auth handles core auth, this links profile data)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  bio text,
  avatar_url text,
  status text,
  badges jsonb default '[]',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- JOURNAL ENTRIES
create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text,
  content text,
  is_public boolean default false,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TAROT READINGS (live or imported)
create table tarot_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text,
  deck_type text, -- e.g. "Rider-Waite", "Thoth"
  include_reversals boolean default true,
  arcana_type text, -- "full", "major", "minor"
  spread_id uuid references tarot_spreads(id),
  card_data jsonb, -- stores cards drawn + positions
  ai_interpretation text,
  source text, -- "live", "imported"
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TAROT SPREADS
create table tarot_spreads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text,
  description text,
  is_public boolean default false,
  layout jsonb, -- stores card positions and labels
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ASTROLOGY CHARTS (birth, transit, synastry)
create table astrology_charts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text, -- "birth", "transit", "synastry"
  name text,
  date_of_birth date,
  time_of_birth time,
  location text,
  data jsonb, -- raw chart data (from Python API)
  pdf_url text,
  svg_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- CALENDAR: FRIEND & FAMILY BIRTHDAYS / NOTES
create table calendar_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text,
  relationship text,
  birthdate date,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- BLOG POSTS
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete set null,
  title text,
  slug text unique,
  content markdown,
  cover_image_url text,
  tags text[],
  category text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- BLOG COMMENTS
create table blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references blog_posts(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TAROT CARD QUIZ RESULTS
create table tarot_quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  score int,
  quiz_type text,
  answers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ASTROLOGY DICE ROLLS
create table dice_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  sign_roll text,
  house_roll text,
  planet_roll text,
  ai_interpretation text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TAROT_CARDS (if not already a table, create it)
create table tarot_cards (
  id serial primary key,
  name text,
  suit text, -- "Major", "Wands", "Cups", "Swords", "Pentacles"
  number text,
  keywords text[],
  upright_meaning text,
  reversed_meaning text,
  image_url text
);

create table zodiac_signs (
  id serial primary key,
  name text,
  element text,
  modality text,
  ruling_planet text,
  start_date date,
  end_date date,
  symbol text
);

create table planets (
  id serial primary key,
  name text,
  symbol text,
  archetype text,
  associated_sign text
);

create table houses (
  id serial primary key,
  number int,
  theme text,
  keywords text[]
);
end;

begin;
-- Only allow users to see their own data
create policy "Users can view their own data"
  on journal_entries for select using (user_id = auth.uid());

-- Only allow inserts from authenticated users
create policy "Users can insert their own data"
  on journal_entries for insert with check (user_id = auth.uid());

end;