
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL UNIQUE,
  abreviatura TEXT,
  descripcion TEXT,
  logo_url TEXT,
  pais TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.organizations TO anon, authenticated;
GRANT ALL ON public.organizations TO service_role;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orgs readable by all" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "admins manage orgs" ON public.organizations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  fecha TIMESTAMPTZ NOT NULL,
  ubicacion TEXT,
  combate_principal TEXT,
  donde_verlo TEXT,
  cartelera JSONB NOT NULL DEFAULT '[]'::jsonb,
  poster_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT ALL ON public.events TO service_role;
CREATE INDEX events_fecha_idx ON public.events(fecha);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events readable by all" ON public.events FOR SELECT USING (true);
CREATE POLICY "admins manage events" ON public.events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.organization_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id)
);
GRANT SELECT, INSERT, DELETE ON public.organization_follows TO authenticated;
GRANT ALL ON public.organization_follows TO service_role;
ALTER TABLE public.organization_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own follows" ON public.organization_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own follows" ON public.organization_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users delete own follows" ON public.organization_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);
