CREATE TABLE public.gyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  latitud DOUBLE PRECISION NOT NULL,
  longitud DOUBLE PRECISION NOT NULL,
  disciplinas TEXT[] NOT NULL DEFAULT '{}',
  descripcion TEXT,
  precio_mensual NUMERIC,
  fotos TEXT[] NOT NULL DEFAULT '{}',
  telefono TEXT,
  web TEXT,
  horarios TEXT,
  ciudad TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gyms TO anon, authenticated;
GRANT ALL ON public.gyms TO service_role;

ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gyms" ON public.gyms FOR SELECT USING (true);
CREATE POLICY "Admins manage gyms" ON public.gyms FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER gyms_updated_at BEFORE UPDATE ON public.gyms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
