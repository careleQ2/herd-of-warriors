
-- Add disciplinas array to organizations (many-to-many via array of discipline ids)
ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS disciplinas text[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS organizations_disciplinas_gin ON public.organizations USING GIN (disciplinas);

-- Add user prefs to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS organizations uuid[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'es';

-- Ensure anon/authenticated can read organizations (public catalogue)
GRANT SELECT ON public.organizations TO anon, authenticated;
