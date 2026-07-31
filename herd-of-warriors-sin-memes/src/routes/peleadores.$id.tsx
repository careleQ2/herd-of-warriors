import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Plus, ExternalLink } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { BottomNav } from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

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

type Tab = "bio" | "estilo" | "fisico" | "logros" | "trayectoria";

function VikingHelmet({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M3 13c0-5 4-9 9-9s9 4 9 9v2H3v-2Z" />
      <path d="M3 15h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2Z" />
      <path d="M12 4v11" />
      <path d="M1 11c2 0 3-1 3-3M23 11c-2 0-3-1-3-3" />
    </svg>
  );
}

function Shield({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}

export const Route = createFileRoute("/peleadores/$id")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab } => {
    const t = s.tab;
    return t === "bio" || t === "estilo" || t === "fisico" || t === "logros" || t === "trayectoria"
      ? { tab: t }
      : {};
  },
  component: () => (
    <AuthGate>
      <FighterProfile />
    </AuthGate>
  ),
});

function FighterProfile() {
  const { id } = Route.useParams();
  const { tab: initialTab } = Route.useSearch();
  const { user } = useSession();
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>(initialTab ?? "bio");

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
      setFighter({ ...fighter, seguidores_count: Math.max(0, fighter.seguidores_count - 1) });
    } else {
      await supabase.from("fighter_follows").insert({ user_id: user.id, fighter_id: id });
      setFollowing(true);
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
      <div className="relative h-80 w-full overflow-hidden bg-surface">
        {fighter.foto_url && (
          <img src={fighter.foto_url} alt={fighter.nombre} className="h-full w-full object-cover" />
        )}
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

      <div className="-mt-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {fighter.disciplinas.join(" · ")}
          {fighter.organizacion ? ` · ${fighter.organizacion}` : ""}
        </p>
        <h1 className="text-display mt-1 text-3xl font-bold uppercase leading-tight">
          {fighter.nombre}
        </h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          {fighter.apodo && (
            <span className="italic" style={{ color: "var(--color-blood)" }}>
              "{fighter.apodo}"
            </span>
          )}
          {fighter.pais && <span className="text-muted-foreground">· {fighter.pais}</span>}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-center">
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
            KOs: {fighter.metodo_victorias_ko} · Subs: {fighter.metodo_victorias_sub} · Dec:{" "}
            {fighter.metodo_victorias_decision}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleFollow}
          disabled={busy}
          className="text-display mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-50"
          style={{
            background: following ? "transparent" : "var(--color-blood)",
            border: `1px solid ${following ? "var(--color-border)" : "var(--color-blood)"}`,
            color: following ? "var(--color-foreground)" : "white",
          }}
        >
          {following ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {following ? "Siguiendo" : "Seguir"}
          <span className="ml-2 text-xs text-muted-foreground">· {fighter.seguidores_count}</span>
        </button>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setTab("bio");
              document.getElementById("fighter-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-display flex items-center justify-center gap-2 rounded-lg border py-3 text-xs font-bold uppercase tracking-widest"
            style={{
              borderColor: tab === "bio" ? "var(--color-blood)" : "var(--color-border)",
              background: tab === "bio" ? "color-mix(in oklab, var(--color-blood) 15%, transparent)" : "transparent",
            }}
          >
            <Shield className="h-4 w-4" style={{ color: "var(--color-blood)" }} /> Biografía
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("trayectoria");
              document.getElementById("fighter-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-display flex items-center justify-center gap-2 rounded-lg border py-3 text-xs font-bold uppercase tracking-widest"
            style={{
              borderColor: tab === "trayectoria" ? "var(--color-blood)" : "var(--color-border)",
              background: tab === "trayectoria" ? "color-mix(in oklab, var(--color-blood) 15%, transparent)" : "transparent",
            }}
          >
            <VikingHelmet className="h-4 w-4" style={{ color: "var(--color-blood)" }} /> Trayectoria
          </button>
        </div>


        {(fighter.categoria_peso || fighter.altura_cm || fighter.peso_kg) && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {fighter.categoria_peso && (
              <span className="rounded-full border border-border px-2.5 py-1">
                {fighter.categoria_peso}
              </span>
            )}
            {fighter.altura_cm && (
              <span className="rounded-full border border-border px-2.5 py-1">
                {fighter.altura_cm} cm
              </span>
            )}
            {fighter.peso_kg && (
              <span className="rounded-full border border-border px-2.5 py-1">
                {fighter.peso_kg} kg
              </span>
            )}
          </div>
        )}

        <div id="fighter-content" className="mt-6 -mx-4 flex gap-1 overflow-x-auto border-b border-border px-4">
          {(
            [
              ["bio", "Biografía", false],
              ["trayectoria", "Trayectoria", true],
              ["estilo", "Estilo", false],
              ["fisico", "Físico", false],
              ["logros", "Logros", false],
            ] as const
          ).map(([key, label, helmet]) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="text-display shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-widest"
                style={{
                  color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  borderBottom: `2px solid ${active ? "var(--color-blood)" : "transparent"}`,
                }}
              >
                {helmet && <VikingHelmet className="h-4 w-4" />}
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-sm leading-relaxed">
          {tab === "bio" && (fighter.biografia ? <p>{fighter.biografia}</p> : <Empty />)}
          {tab === "trayectoria" &&
            (fighter.trayectoria && fighter.trayectoria.length > 0 ? (
              <ol className="relative space-y-3 border-l border-border pl-4">
                {fighter.trayectoria.map((t, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full"
                      style={{ background: "var(--color-blood)" }}
                    />
                    <p
                      className="text-display text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--color-blood)" }}
                    >
                      {t.year}
                    </p>
                    <p className="text-sm">{t.evento}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <Empty />
            ))}
          {tab === "estilo" && (fighter.estilo_pelea ?? <Empty />)}
          {tab === "fisico" && (fighter.descripcion_fisica ?? <Empty />)}
          {tab === "logros" &&
            (fighter.logros_principales.length > 0 ? (
              <ul className="space-y-2">
                {fighter.logros_principales.map((l, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "var(--color-blood)" }}>▸</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty />
            ))}
        </div>

        <section className="mt-6">
          <h2 className="text-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Última pelea
          </h2>
          <div className="mt-2 rounded-lg border border-border bg-surface p-4 text-sm">
            {fighter.ultima_pelea_rival ? (
              <>
                <p className="font-semibold">vs. {fighter.ultima_pelea_rival}</p>
                {fighter.ultima_pelea_fecha && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {fighter.ultima_pelea_fecha}
                  </p>
                )}
                {fighter.ultima_pelea_resultado && (
                  <p
                    className="mt-2 text-sm font-bold"
                    style={{
                      color: /victoria|oro/i.test(fighter.ultima_pelea_resultado)
                        ? "#22c55e"
                        : /derrota/i.test(fighter.ultima_pelea_resultado)
                          ? "var(--color-blood)"
                          : "var(--color-foreground)",
                    }}
                  >
                    {fighter.ultima_pelea_resultado}
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">Sin datos.</p>
            )}
          </div>
        </section>

        {fighter.url_perfil_externo && (
          <a
            href={fighter.url_perfil_externo}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            <ExternalLink className="h-4 w-4" /> Ver perfil completo
          </a>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function Empty() {
  return <p className="text-muted-foreground">Sin información disponible.</p>;
}
