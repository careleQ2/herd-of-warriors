import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Swords, MapPin, Tv } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";

type Fight = { peleadores: string; categoria?: string; tipo?: string };
type Event = {
  id: string;
  nombre: string;
  fecha: string;
  ubicacion: string | null;
  combate_principal: string | null;
  donde_verlo: string | null;
  cartelera: Fight[];
  organizations: { nombre: string; abreviatura: string | null } | null;
};

export const Route = createFileRoute("/eventos/$id")({
  head: () => ({ meta: [{ title: "Evento — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <EventDetail />
    </AuthGate>
  ),
});

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toICSDate(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

function downloadICS(event: Event) {
  const start = new Date(event.fecha);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Herd of Warriors//ES",
    "BEGIN:VEVENT",
    `UID:${event.id}@herdofwarriors`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${event.nombre}`,
    `LOCATION:${event.ubicacion ?? ""}`,
    `DESCRIPTION:${(event.combate_principal ?? "") + (event.donde_verlo ? " — " + event.donde_verlo : "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.nombre.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function EventDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useLanguage();
  const locale = lang === "en" ? "en-US" : "es-ES";
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("events")
        .select("*, organizations(nombre,abreviatura)")
        .eq("id", id)
        .maybeSingle();
      setEvent(data as Event | null);
      setLoading(false);
    })();
  }, [id]);

  const title = lang === "en" ? "Event" : "Evento";
  if (loading) {
    return (
      <AppShell title={title}>
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </AppShell>
    );
  }
  if (!event) {
    return (
      <AppShell title={title}>
        <p className="text-sm text-muted-foreground">{t("events.notFound")}</p>
      </AppShell>
    );
  }

  const d = new Date(event.fecha);
  return (
    <AppShell title={title}>
      <Link to="/eventos" className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> {t("events.back")}
      </Link>

      <div className="mb-4 rounded-xl border bg-surface p-4">
        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {event.organizations?.abreviatura || event.organizations?.nombre || "—"}
        </span>
        <h1 className="mt-2 font-display text-2xl font-black leading-tight">{event.nombre}</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-blood)" }}>
          {d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} ·{" "}
          {d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
        </p>
        {event.ubicacion && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {event.ubicacion}
          </p>
        )}
        {event.donde_verlo && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Tv className="h-4 w-4" /> {event.donde_verlo}
          </p>
        )}

        <button
          type="button"
          onClick={() => downloadICS(event)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg active:scale-[0.98]"
          style={{ background: "var(--color-blood)", boxShadow: "0 4px 20px rgba(204,0,0,0.4)" }}
        >
          <Swords className="h-5 w-5" strokeWidth={2.5} />
          {t("events.addToCalendar")}
        </button>
      </div>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("events.fullCard")}</h2>
        <ul className="space-y-2">
          {event.cartelera.length === 0 && (
            <p className="text-sm text-muted-foreground">{t("events.cardTBD")}</p>
          )}
          {event.cartelera.map((f, i) => (
            <li key={i} className="rounded-lg border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--color-blood)" }}>
                  {f.tipo || t("events.fight")}
                </span>
                {f.categoria && (
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.categoria}</span>
                )}
              </div>
              <p className="mt-1 font-display font-bold leading-tight">{f.peleadores}</p>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
