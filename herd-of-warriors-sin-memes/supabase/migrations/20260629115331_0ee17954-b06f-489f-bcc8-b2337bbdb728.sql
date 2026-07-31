UPDATE public.fighters
SET record_victorias = 160,
    record_derrotas = 8,
    record_empates = 0,
    record_nc = 0,
    metodo_victorias_ko = 0,
    metodo_victorias_sub = 0,
    metodo_victorias_decision = 0,
    fecha_actualizacion = now()
WHERE nombre ILIKE '%Riner%';