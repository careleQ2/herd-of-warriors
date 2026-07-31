import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Search, Check, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";

function VikingHelmet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
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

type Fighter = {
  id: string;
  nombre: string;
  apodo: string | null;
  disciplinas: string[];
  organizacion: string | null;
  foto_url: string | null;
  record_victorias: number;
  record_derrotas: number;
  record_empates: number;
  ultima_pelea_rival: string | null;
  ultima_pelea_resultado: string | null;
};

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Feed — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <Feed />
    </AuthGate>
  ),
});

function Feed() {
  const { user } = useSession();
  const { t } = useLanguage();
  const [fighters, setFighters] = useState<Fighter[] | null>(null);
  const [query, setQuery] = useState("");
  const [busyFollowId, setBusyFollowId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: follows } = await supabase
        .from("fighter_follows")
        .select("fighter_id")
        .eq("user_id", user.id);
      const ids = (follows ?? []).map((f) => f.fighter_id);
      if (ids.length === 0) {
        setFighters([]);
        return;
      }
      const { data } = await supabase
        .from("fighters")
        .select(
          "id,nombre,apodo,disciplinas,organizacion,foto_url,record_victorias,record_derrotas,record_empates,ultima_pelea_rival,ultima_pelea_resultado"
        )
        .in("id", ids)
        .order("nombre", { ascending: true });
      setFighters((data as Fighter[] | null) ?? []);
    })();
  }, [user]);

  const unfollow = async (fighterId: string) => {
    if (!user || busyFollowId) return;
    setBusyFollowId(fighterId);
    const { error } = await supabase
      .from("fighter_follows")
      .delete()
      .eq("user_id", user.id)
      .eq("fighter_id", fighterId);
    if (!error) {
      setFighters((prev) => (prev ?? []).filter((f) => f.id !== fighterId));
    }
    setBusyFollowId(null);
  };

  const needle = query.trim().toLowerCase();
  const visible = (fighters ?? []).filter((f) =>
    !needle
      ? true
      : f.nombre.toLowerCase().includes(needle) ||
        (f.apodo ?? "").toLowerCase().includes(needle)
  );

  return (
    <AppShell title={t("feed.title")}>
      {fighters === null ? (
        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </li>
          ))}
        </ul>
      ) : fighters.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10 text-center">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border"
            style={{
              borderColor: "var(--color-blood)",
              background: "color-mix(in oklab, var(--color-blood) 10%, transparent)",
            }}
          >
            <Users className="h-7 w-7" style={{ color: "var(--color-blood)" }} />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            {t("feed.empty")}
          </p>
          <Link
            to="/peleadores"
            className="text-display mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest"
            style={{ background: "var(--color-blood)", color: "var(--color-foreground)" }}
          >
            <Search className="h-4 w-4" /> {t("feed.explore")}
          </Link>
        </div>
      ) : (
        <>
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("feed.search")}
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-blood)]"
            />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {visible.length} {t("feed.following")}
            </p>
            <Link
              to="/peleadores"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-blood)" }}
            >
              <Plus className="h-3.5 w-3.5" /> {t("feed.add")}
            </Link>
          </div>
          {visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{t("common.noResults")}</p>
          ) : (
            <ul className="space-y-4">
              {visible.map((fighter) => (
                <FighterFeedCard
                  key={fighter.id}
                  fighter={fighter}
                  busy={busyFollowId === fighter.id}
                  onUnfollow={unfollow}
                  t={t}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </AppShell>
  );
}

function FighterFeedCard({
  fighter,
  busy,
  onUnfollow,
  t,
}: {
  fighter: Fighter;
  busy: boolean;
  onUnfollow: (id: string) => void;
  t: (key: import("@/lib/i18n").TranslationKey) => string;
}) {
  return (
    <li className="overflow-hidden rounded-xl border border-border bg-surface">
      <Link to="/peleadores/$id" params={{ id: fighter.id }} className="block">
        <div className="relative h-48 w-full bg-background">
          {fighter.foto_url && (
            <img src={fighter.foto_url} alt={fighter.nombre} className="h-full w-full object-cover" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 55%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {fighter.disciplinas.join(" · ")}
              {fighter.organizacion ? ` · ${fighter.organizacion}` : ""}
            </p>
            <p className="text-display text-lg font-bold uppercase leading-tight">
              {fighter.nombre}
            </p>
          </div>
          <span
            className="text-display absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-bold"
            style={{ background: "var(--color-blood)", color: "var(--color-foreground)" }}
          >
            {fighter.record_victorias}-{fighter.record_derrotas}-{fighter.record_empates}
          </span>
        </div>
        {fighter.ultima_pelea_rival && (
          <div className="border-t border-border px-3 py-2 text-xs">
            <span className="text-muted-foreground">{t("feed.last")}</span>
            <span className="font-semibold">{fighter.ultima_pelea_rival}</span>
            {fighter.ultima_pelea_resultado && (
              <span className="text-muted-foreground"> · {fighter.ultima_pelea_resultado}</span>
            )}
          </div>
        )}
      </Link>
      <div className="grid grid-cols-3 gap-2 border-t border-border p-2">
        <button
          type="button"
          onClick={() => onUnfollow(fighter.id)}
          disabled={busy}
          className="text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md border py-2.5 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Check className="h-3.5 w-3.5" style={{ color: "var(--color-blood)" }} /> {t("feed.followingBtn")}
        </button>
        <Link
          to="/peleadores/$id"
          params={{ id: fighter.id }}
          search={{ tab: "bio" as const }}
          className="text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-border py-2.5 text-[10px] font-bold uppercase tracking-widest"
        >
          <Shield className="h-3.5 w-3.5" style={{ color: "var(--color-blood)" }} /> {t("feed.bio")}
        </Link>
        <Link
          to="/peleadores/$id"
          params={{ id: fighter.id }}
          search={{ tab: "trayectoria" as const }}
          className="text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md py-2.5 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "var(--color-blood)", color: "var(--color-foreground)" }}
        >
          <VikingHelmet className="h-3.5 w-3.5" /> {t("feed.trajectoryShort")}
        </Link>
      </div>
    </li>
  );
}
