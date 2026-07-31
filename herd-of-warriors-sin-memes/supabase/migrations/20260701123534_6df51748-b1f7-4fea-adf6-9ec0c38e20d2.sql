CREATE TABLE public.news_translations (
  url TEXT NOT NULL,
  lang TEXT NOT NULL,
  title TEXT NOT NULL,
  snippet TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (url, lang)
);
GRANT SELECT ON public.news_translations TO anon, authenticated;
GRANT ALL ON public.news_translations TO service_role;
ALTER TABLE public.news_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read translations" ON public.news_translations FOR SELECT USING (true);