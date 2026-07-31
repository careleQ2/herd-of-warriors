
CREATE TABLE public.saved_news (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  image_url TEXT,
  snippet TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, url)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_news TO authenticated;
GRANT ALL ON public.saved_news TO service_role;
ALTER TABLE public.saved_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own saved_news select" ON public.saved_news FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own saved_news insert" ON public.saved_news FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own saved_news delete" ON public.saved_news FOR DELETE USING (auth.uid() = user_id);
