import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Star, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";

type Org = { id: string; nombre: string; abreviatura: string | null };
type Event = {
  id: string;
  nombre: string;
  fecha: string;
  ubicacion: string | null;
  combate_principal: string | null;
  donde_verlo: string | null;
  organization_id: string | null;
  organizations: Org | null;
};

export const Route = createFileRoute("/eventos/")({
  head: () => ({ meta: [{ title: "Eventos — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <Eventos />
    </AuthGate>
  ),
});

function Eventos() {
  const { t, lang } = useLanguage();
  const locale = lang === "en" ? "en-US" : "es-ES";
  const session = useSession();
  const userId = session?.user?.id;
  const [events, setEvents] = useState<Event[]>([]);
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [evRes, orgRes] = await Promise.all([
        supabase
          .from("events")
          .select("*, organizations(id,nombre,abreviatura)")
          .order("fecha", { ascending: true }),
        supabase.from("organizations").select("id,nombre,abreviatura").order("nombre"),
      ]);
      setEvents((evRes.data as Event[]) ?? []);
      setOrgs((orgRes.data as Org[]) ?? []);
      if (userId) {
        const { data } = await supabase
          .from("organization_follows")
          .select("organization_id")
          .eq("user_id", userId);
        setFollowed(new Set((data ?? []).map((r: { organization_id: string }) => r.organization_id)));
      }
      setLoading(false);
    })();
  }, [userId]);

  async function toggleFollow(orgId: string) {
    if (!userId) return;
    const next = new Set(followed);
    if (next.has(orgId)) {
      next.delete(orgId);
      setFollowed(next);
      await supabase.from("organization_follows").delete().eq("user_id", userId).eq("organization_id", orgId);
    } else {
      next.add(orgId);
      setFollowed(next);
      await supabase.from("organization_follows").insert({ user_id: userId, organization_id: orgId });
    }
  }

  const visibleEvents = followed.size > 0
    ? events.filter((e) => e.organization_id && followed.has(e.organization_id))
    : events;

  const grouped = visibleEvents.reduce<Record<string, Event[]>>((acc, e) => {
    const d = new Date(e.fecha);
    const key = d.toLocaleDateString(locale, { month: "long", year: "numeric" }).toUpperCase();
    (acc[key] ||= []).push(e);
    return acc;
  }, {});

  return (
    <AppShell title={t("events.title")}>
      <section className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("events.orgs")}
          </h2>
          {followed.size > 0 && (
            <button
              onClick={async () => {
                if (!userId) return;
                await supabase.from("organization_follows").delete().eq("user_id", userId);
                setFollowed(new Set());
              }}
              className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground underline"
            >
              {t("events.viewAll")}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {orgs.map((o) => {
            const active = followed.has(o.id);
            return (
              <button
                key={o.id}
                onClick={() => toggleFollow(o.id)}
                className="rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition"
                style={{
                  borderColor: active ? "var(--color-blood)" : "var(--color-border)",
                  background: active ? "var(--color-blood)" : "transparent",
                  color: active ? "#fff" : "var(--color-foreground)",
                }}
              >
                {active && <Star className="mr-1 inline h-3 w-3 fill-current" />}
                {o.abreviatura || o.nombre}
              </button>
            );
          })}
        </div>
      </section>

      {loading ? (
        <ul className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex">
                <Skeleton className="h-20 w-16 rounded-none" />
                <div className="flex-1 space-y-2 p-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        Object.entries(grouped).map(([month, list]) => (
          <section key={month} className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {month}
            </h2>
            <ul className="space-y-3">
              {list.map((e) => {
                const isFollowed = e.organization_id ? followed.has(e.organization_id) : false;
                const d = new Date(e.fecha);
                return (
                  <li key={e.id}>
                    <Link
                      to="/eventos/$id"
                      params={{ id: e.id }}
                      className="block overflow-hidden rounded-xl border bg-surface transition active:scale-[0.99]"
                      style={{
                        borderColor: isFollowed ? "var(--color-blood)" : "var(--color-border)",
                        boxShadow: isFollowed ? "0 0 0 1px var(--color-blood) inset" : undefined,
                      }}
                    >
                      <div className="flex">
                        <div
                          className="flex w-16 flex-col items-center justify-center py-3 text-center"
                          style={{ background: isFollowed ? "var(--color-blood)" : "var(--color-muted)" }}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: isFollowed ? "#fff" : "var(--color-muted-foreground)" }}>
                            {d.toLocaleDateString(locale, { month: "short" })}
                          </span>
                          <span className="text-2xl font-black leading-none" style={{ color: isFollowed ? "#fff" : "var(--color-foreground)" }}>
                            {d.getDate()}
                          </span>
                        </div>
                        <div className="flex-1 p-3">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                              {e.organizations?.abreviatura || "—"}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <h3 className="font-display text-base font-bold leading-tight">{e.nombre}</h3>
                          {e.combate_principal && (
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{e.combate_principal}</p>
                          )}
                          {e.ubicacion && (
                            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="h-3 w-3" /> {e.ubicacion}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </AppShell>
  );
}
