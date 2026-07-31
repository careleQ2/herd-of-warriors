
-- Memes / short content module
CREATE TABLE public.memes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  autor TEXT NOT NULL,
  disciplina TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image','video')),
  caption TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.memes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memes TO authenticated;
GRANT ALL ON public.memes TO service_role;
ALTER TABLE public.memes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "memes readable by everyone" ON public.memes FOR SELECT USING (true);
CREATE POLICY "memes insert own" ON public.memes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "memes update own" ON public.memes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "memes delete own" ON public.memes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX memes_created_idx ON public.memes (created_at DESC);
CREATE INDEX memes_disciplina_idx ON public.memes (disciplina);

CREATE TRIGGER memes_updated_at BEFORE UPDATE ON public.memes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Likes
CREATE TABLE public.meme_likes (
  meme_id UUID NOT NULL REFERENCES public.memes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (meme_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.meme_likes TO authenticated;
GRANT ALL ON public.meme_likes TO service_role;
ALTER TABLE public.meme_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "meme_likes readable by everyone auth" ON public.meme_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "meme_likes insert own" ON public.meme_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "meme_likes delete own" ON public.meme_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Bump likes trigger
CREATE OR REPLACE FUNCTION public.bump_meme_likes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.memes SET likes_count = likes_count + 1 WHERE id = NEW.meme_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.memes SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.meme_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END $$;
CREATE TRIGGER meme_likes_bump
AFTER INSERT OR DELETE ON public.meme_likes
FOR EACH ROW EXECUTE FUNCTION public.bump_meme_likes();
