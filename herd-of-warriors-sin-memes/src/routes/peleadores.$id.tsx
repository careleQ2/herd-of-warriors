import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Trophy } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { BottomNav } from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { getFighterImageUrl } from "@/lib/fighter-images";

function VikingAxe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 22 L17 5" stroke="#8b5a2b" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 22 L17 5" stroke="#5a3a1f" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" strokeDasharray="1 2" />
      <circle cx="4" cy="22" r="1.4" fill="#3d2817" stroke="#1a0f08" strokeWidth="0.4" />
      <path
        d="M17 2.5
           L21.5 5
           C 22.5 6, 22.8 7.5, 22 8.5
           L 19.5 11
           C 18.2 12.3, 16 12.5, 14.5 11.2
           L 12.8 9.8
           C 12 9.2, 11.8 8, 12.3 7
           L 14.5 3.5
           C 15 2.6, 16 2.2, 17 2.5 Z"
        fill="#c8c8d0"
        stroke="#0A0A0A"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M21 5.2 C 21.8 6.2, 22 7.4, 21.3 8.3 L 19 10.6"
        stroke="#ffffff"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 4.5 C 13.4 5.8, 13.3 7.2, 14 8.2"
        stroke="#6a6a72"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path d="M14.8 7.3 L16.6 5.5" stroke="#2a1810" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

function AxeInWood({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g style={animate ? { animation: "wood-shake 600ms ease-out" } : undefined}>
        <rect x="2" y="15" width="20" height="7" rx="1.5" fill="#6b4423" stroke="#3d2817" strokeWidth="0.8" />
        <ellipse cx="4" cy="18.5" rx="1.2" ry="2.2" fill="none" stroke="#3d2817" strokeWidth="0.5" />
        <ellipse cx="4" cy="18.5" rx="0.5" ry="1" fill="none" stroke="#3d2817" strokeWidth="0.5" />
        <ellipse cx="20" cy="18.5" rx="1.2" ry="2.2" fill="none" stroke="#3d2817" strokeWidth="0.5" />
        <ellipse cx="20" cy="18.5" rx="0.5" ry="1" fill="none" stroke="#3d2817" strokeWidth="0.5" />
        <path d="M11 15.5 L11.5 17 L10.8 18 L11.3 19" stroke="#2a1810" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      </g>
      <path d="M10 15.5 L10.5 17 L9.6 18 L10.2 19.2" stroke="#2a1810" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <g style={animate ? { animation: "axe-strike 650ms cubic-bezier(0.22,1,0.36,1)", transformOrigin: "10px 16px" } : undefined}>
        <path d="M10 16 L20 4" stroke="#8b5a2b" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="20" cy="4" r="1.2" fill="#3d2817" stroke="#1a0f08" strokeWidth="0.3" />
        <g transform="rotate(-45 10 16)">
          <path
            d="M10 11
               L14 11
               C 15.2 11, 16 12, 15.8 13
               L 15.2 16.5
               C 15 17.8, 14 18.5, 12.8 18.3
               L 10.5 17.8
               C 9.5 17.6, 8.8 16.8, 8.8 15.8
               L 8.8 12.5
               C 8.8 11.6, 9.3 11, 10 11 Z"
            fill="#c8c8d0"
            stroke="#0A0A0A"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <path d="M10.2 11.5 L 14 11.5" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.9" />
          <path d="M15.5 13 L 15 16.3" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />
          <path d="M9.2 16 L 12.5 17.8" stroke="#6a6a72" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

type Fighter = {
  id: string;
  nombre: string;
  apodo: string | null;
  disciplinas: string[];
  organizacion: string | null;
  pais: string | null;
  altura_cm: number | null;
  peso_kg: number | null;
  categoria_peso: string | null;
  foto_url: string | null;
  record_victorias: number;
  record_derrotas: number;
  record_empates: number;
  record_nc: number;
  metodo_victorias_ko: number;
  metodo_victorias_sub: number;
  metodo_victorias_decision: number;
  biografia: string | null;
  estilo_pelea: string | null;
  descripcion_fisica: string | null;
  logros_principales: string[];
  trayectoria: { year: string; evento: string }[];
  estado: string;
  ultima_pelea_fecha: string | null;
  ultima_pelea_rival: string | null;
  ultima_pelea_resultado: string | null;
  seguidores_count: number;
  url_perfil_externo: string | null;
};

function VikingHornedHelmet({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 11C3 10 1.5 7 2 3c2 .5 4 2 5 5" fill="currentColor" />
      <path d="M18 11c3-1 4.5-4 4-8-2 .5-4 2-5 5" fill="currentColor" />
      <path d="M5 13c0-4 3-7 7-7s7 3 7 7v1H5v-1Z" fill="currentColor" />
      <path d="M4 14h16v2H4z" fill="currentColor" />
      <path d="M12 8v8" stroke="#0A0A0A" strokeWidth="1.2" />
    </svg>
  );
}

export const Route = createFileRoute("/peleadores/$id")({
  component: () => (
    <AuthGate>
      <FighterProfile />
    </AuthGate>
  ),
});

function FighterProfile() {
  const { id } = Route.useParams();
  const { user } = useSession();
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [justFollowed, setJustFollowed] = useState(false);

  useEffect(() => {
    supabase
      .from("fighters")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => setFighter((data as Fighter | null) ?? null));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("fighter_follows")
      .select("fighter_id")
      .eq("user_id", user.id)
      .eq("fighter_id", id)
      .maybeSingle()
      .then(({ data }) => setFollowing(!!data));
  }, [user, id]);

  const toggleFollow = async () => {
    if (!user || busy || !fighter) return;
    setBusy(true);
    if (following) {
      await supabase.from("fighter_follows").delete().eq("user_id", user.id).eq("fighter_id", id);
      setFollowing(false);
      setJustFollowed(false);
      setFighter({ ...fighter, seguidores_count: Math.max(0, fighter.seguidores_count - 1) });
    } else {
      await supabase.from("fighter_follows").insert({ user_id: user.id, fighter_id: id });
      setFollowing(true);
      setJustFollowed(true);
      setTimeout(() => setJustFollowed(false), 700);
      setFighter({ ...fighter, seguidores_count: fighter.seguidores_count + 1 });
    }
    setBusy(false);
  };

  if (!fighter) {
    return (
      <div className="min-h-screen bg-background p-8 text-center text-sm text-muted-foreground">
        Cargando…
      </div>
    );
  }

  const stateBadge =
    fighter.estado === "activo"
      ? { bg: "#0f5132", label: "Activo" }
      : fighter.estado === "retirado"
        ? { bg: "#3a3a3a", label: "Retirado" }
        : { bg: "#a04300", label: "Pendiente verificación" };

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      <div className="relative h-[20rem] w-full overflow-hidden bg-[#0b0b0b]">
        <img
          src={getFighterImageUrl(fighter.nombre)}
          alt={fighter.nombre}
          className="h-full w-full object-contain object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A0A0A 5%, transparent 60%)" }}
        />
        <Link
          to="/peleadores"
          className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur"
          style={{ marginTop: "env(safe-area-inset-top)" }}
          aria-label="Atrás"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
          style={{ background: stateBadge.bg, marginTop: "env(safe-area-inset-top)" }}
        >
          {stateBadge.label}
        </span>
      </div>

      <div className="space-y-4 px-4 pb-4 pt-4">
        <div>
          <h1 className="text-display text-3xl font-bold uppercase leading-tight">
            {fighter.nombre}
          </h1>
          {fighter.apodo && (
            <div className="mt-1 text-sm italic" style={{ color: "var(--color-blood)" }}>
              "{fighter.apodo}"
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <p
            className="text-display text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-blood)" }}
          >
            {fighter.record_victorias}-{fighter.record_derrotas}-{fighter.record_empates}
            {fighter.record_nc > 0 && (
              <span className="text-base text-muted-foreground"> ({fighter.record_nc} NC)</span>
            )}
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
            KOs: {fighter.metodo_victorias_ko} · Subs: {fighter.metodo_victorias_sub} · Dec: {fighter.metodo_victorias_decision}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleFollow}
          disabled={busy}
          className="text-display flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-50"
          style={{
            background: following ? "transparent" : "var(--color-blood)",
            border: `1px solid ${following ? "var(--color-border)" : "var(--color-blood)"}`,
            color: following ? "var(--color-foreground)" : "white",
          }}
        >
          {following ? (
            <AxeInWood className="h-5 w-5" animate={justFollowed} />
          ) : (
            <span style={{ color: "var(--color-blood)", display: "inline-flex" }}>
              <VikingAxe className="h-4 w-4" />
            </span>
          )}
          {following ? "Siguiendo" : "Seguir"}
          <span className="ml-2 text-xs text-muted-foreground">· {fighter.seguidores_count}</span>
        </button>

        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="text-display mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Información general
          </h2>
          <div className="flex flex-wrap gap-2 text-xs text-foreground">
            {fighter.categoria_peso && (
              <span className="rounded-full border border-border px-2.5 py-1">
                División: {fighter.categoria_peso}
              </span>
            )}
            {fighter.altura_cm && (
              <span className="rounded-full border border-border px-2.5 py-1">
                Altura: {fighter.altura_cm} cm
              </span>
            )}
            {fighter.peso_kg && (
              <span className="rounded-full border border-border px-2.5 py-1">
                Peso: {fighter.peso_kg} kg
              </span>
            )}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background/60 p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Disciplina</p>
              <p className="mt-1 font-semibold">{fighter.disciplinas.join(", ") || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-background/60 p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Organización</p>
              <p className="mt-1 font-semibold">{fighter.organizacion || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-background/60 p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">País</p>
              <p className="mt-1 font-semibold">{fighter.pais || "—"}</p>
            </div>
          </div>
        </div>

        <section className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <VikingHornedHelmet className="h-5 w-5" style={{ color: "var(--color-blood)" }} />
            <h2 className="text-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Biografía
            </h2>
          </div>
          <p className="leading-relaxed text-sm text-foreground">
            {fighter.biografia || "Sin biografía disponible para este peleador."}
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5" style={{ color: "var(--color-blood)" }} />
            <h2 className="text-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Trayectoria
            </h2>
          </div>
          {fighter.trayectoria && fighter.trayectoria.length > 0 ? (
            <ol className="relative space-y-3 border-l border-border pl-4">
              {fighter.trayectoria.map((item, index) => (
                <li key={`${item.year}-${index}`} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--color-blood)" }}
                  />
                  <p className="text-display text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-blood)" }}>
                    {item.year}
                  </p>
                  <p className="text-sm">{item.evento}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">Sin trayectoria registrada.</p>
          )}
        </section>

        {fighter.url_perfil_externo && (
          <a
            href={fighter.url_perfil_externo}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            <ExternalLink className="h-4 w-4" /> Ver perfil completo
          </a>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
