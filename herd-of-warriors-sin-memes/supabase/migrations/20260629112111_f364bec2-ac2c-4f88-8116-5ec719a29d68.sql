
-- Drop old tables
DROP TABLE IF EXISTS public.fighter_follows CASCADE;
DROP TABLE IF EXISTS public.fighters CASCADE;

-- Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users see own roles" ON public.user_roles;
CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Fighters
CREATE TABLE public.fighters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  apodo text,
  disciplinas text[] NOT NULL DEFAULT '{}',
  organizacion text,
  pais text,
  fecha_nacimiento date,
  altura_cm integer,
  peso_kg numeric(5,2),
  categoria_peso text,
  record_victorias integer NOT NULL DEFAULT 0,
  record_derrotas integer NOT NULL DEFAULT 0,
  record_empates integer NOT NULL DEFAULT 0,
  record_nc integer NOT NULL DEFAULT 0,
  metodo_victorias_ko integer NOT NULL DEFAULT 0,
  metodo_victorias_sub integer NOT NULL DEFAULT 0,
  metodo_victorias_decision integer NOT NULL DEFAULT 0,
  foto_url text,
  biografia text,
  estilo_pelea text,
  descripcion_fisica text,
  logros_principales text[] NOT NULL DEFAULT '{}',
  estado text NOT NULL DEFAULT 'activo',
  ultima_pelea_fecha date,
  ultima_pelea_rival text,
  ultima_pelea_resultado text,
  seguidores_count integer NOT NULL DEFAULT 0,
  fuente_datos text,
  url_perfil_externo text,
  fecha_actualizacion timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fighters TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.fighters TO authenticated;
GRANT ALL ON public.fighters TO service_role;
ALTER TABLE public.fighters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read fighters" ON public.fighters FOR SELECT USING (true);
CREATE POLICY "admin insert fighters" ON public.fighters FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update fighters" ON public.fighters FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete fighters" ON public.fighters FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX fighters_disciplinas_idx ON public.fighters USING GIN (disciplinas);
CREATE INDEX fighters_pais_idx ON public.fighters (pais);
CREATE INDEX fighters_categoria_idx ON public.fighters (categoria_peso);
CREATE INDEX fighters_estado_idx ON public.fighters (estado);
CREATE INDEX fighters_seguidores_idx ON public.fighters (seguidores_count DESC);

-- Follows
CREATE TABLE public.fighter_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fighter_id uuid NOT NULL REFERENCES public.fighters(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, fighter_id)
);
GRANT SELECT, INSERT, DELETE ON public.fighter_follows TO authenticated;
GRANT ALL ON public.fighter_follows TO service_role;
ALTER TABLE public.fighter_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users view own follows" ON public.fighter_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own follows" ON public.fighter_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users delete own follows" ON public.fighter_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.bump_fighter_followers()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.fighters SET seguidores_count = seguidores_count + 1 WHERE id = NEW.fighter_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.fighters SET seguidores_count = GREATEST(seguidores_count - 1, 0) WHERE id = OLD.fighter_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END $$;
CREATE TRIGGER trg_follows_count
AFTER INSERT OR DELETE ON public.fighter_follows
FOR EACH ROW EXECUTE FUNCTION public.bump_fighter_followers();

-- Suggestions
CREATE TABLE public.fighter_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre text NOT NULL,
  disciplina text,
  organizacion text,
  url_perfil text,
  estado text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.fighter_suggestions TO authenticated;
GRANT UPDATE, DELETE ON public.fighter_suggestions TO authenticated;
GRANT ALL ON public.fighter_suggestions TO service_role;
ALTER TABLE public.fighter_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users insert suggestions" ON public.fighter_suggestions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users view own suggestions" ON public.fighter_suggestions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage suggestions" ON public.fighter_suggestions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete suggestions" ON public.fighter_suggestions FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
