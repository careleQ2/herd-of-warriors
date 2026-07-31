
CREATE TABLE public.fighters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT,
  discipline TEXT NOT NULL,
  organization TEXT,
  country TEXT,
  photo_url TEXT,
  wins INT NOT NULL DEFAULT 0,
  losses INT NOT NULL DEFAULT 0,
  draws INT NOT NULL DEFAULT 0,
  weight TEXT,
  bio TEXT,
  next_fight TEXT,
  next_fight_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fighters TO anon, authenticated;
GRANT ALL ON public.fighters TO service_role;
ALTER TABLE public.fighters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Fighters are viewable by everyone" ON public.fighters FOR SELECT USING (true);

CREATE TABLE public.fighter_follows (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fighter_id UUID NOT NULL REFERENCES public.fighters(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, fighter_id)
);
GRANT SELECT, INSERT, DELETE ON public.fighter_follows TO authenticated;
GRANT ALL ON public.fighter_follows TO service_role;
ALTER TABLE public.fighter_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own follows" ON public.fighter_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own follows" ON public.fighter_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own follows" ON public.fighter_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX ON public.fighters (discipline);
CREATE INDEX ON public.fighter_follows (fighter_id);
