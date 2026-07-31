import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Phone, Globe, MapPin, Locate } from "lucide-react";

export const Route = createFileRoute("/gimnasios")({
  head: () => ({ meta: [{ title: "Gimnasios — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <GimnasiosView />
    </AuthGate>
  ),
});

type Gym = {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  disciplinas: string[];
  descripcion: string | null;
  precio_mensual: number | null;
  fotos: string[];
  telefono: string | null;
  web: string | null;
  horarios: string | null;
};

const DISCIPLINE_COLORS: Record<string, string> = {
  MMA: "#CC0000",
  Boxeo: "#F5F5F5",
  BJJ: "#3B82F6",
  "Muay Thai": "#F59E0B",
  Kickboxing: "#8B5CF6",
  Grappling: "#10B981",
};

function colorFor(disciplines: string[], activeFilter?: string) {
  if (activeFilter && activeFilter !== "all" && disciplines.includes(activeFilter)) {
    return DISCIPLINE_COLORS[activeFilter] ?? "#CC0000";
  }
  for (const d of disciplines) {
    if (DISCIPLINE_COLORS[d]) return DISCIPLINE_COLORS[d];
  }
  return "#CC0000";
}

const MADRID: [number, number] = [40.4168, -3.7038];

function GimnasiosView() {
  const { t } = useLanguage();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [discipline, setDiscipline] = useState<string>("all");
  const [selected, setSelected] = useState<Gym | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersLayer = useRef<any>(null);
  const userMarker = useRef<any>(null);

  useEffect(() => {
    supabase
      .from("gyms")
      .select("*")
      .then(({ data }) => {
        setGyms((data ?? []) as Gym[]);
        setLoading(false);
      });
  }, []);

  const disciplines = useMemo(() => {
    const set = new Set<string>();
    gyms.forEach((g) => g.disciplinas.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, [gyms]);

  const filtered = useMemo(
    () => (discipline === "all" ? gyms : gyms.filter((g) => g.disciplinas.includes(discipline))),
    [gyms, discipline],
  );

  // init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapRef.current) return;
      const map = L.map(mapRef.current, {
        center: MADRID,
        zoom: 12,
        zoomControl: true,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap © CARTO",
        maxZoom: 20,
        detectRetina: true,
        className: "how-tiles-base",
      }).addTo(map);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
        maxZoom: 20,
        detectRetina: true,
        pane: "overlayPane",
        className: "how-tiles-labels",
      }).addTo(map);
      mapInstance.current = map;
      markersLayer.current = L.layerGroup().addTo(map);
      // trigger resize after mount
      setTimeout(() => map.invalidateSize(), 100);
    })();
    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // render markers on filter/gym change
  useEffect(() => {
    if (!mapInstance.current || !markersLayer.current) return;
    (async () => {
      const L = (await import("leaflet")).default;
      markersLayer.current.clearLayers();
      filtered.forEach((g) => {
        const color = colorFor(g.disciplinas, discipline);
        const icon = L.divIcon({
          className: "how-pin",
          html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:2px solid #0A0A0A;box-shadow:0 0 0 2px ${color}55;"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        const marker = L.marker([g.latitud, g.longitud], { icon }).addTo(markersLayer.current);
        marker.on("click", () => setSelected(g));
      });
    })();
  }, [filtered, discipline]);

  const locateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const p: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setUserPos(p);
      const L = (await import("leaflet")).default;
      if (mapInstance.current) {
        mapInstance.current.setView(p, 13);
        if (userMarker.current) userMarker.current.remove();
        userMarker.current = L.circleMarker(p, {
          radius: 8,
          color: "#fff",
          weight: 2,
          fillColor: "#CC0000",
          fillOpacity: 1,
        }).addTo(mapInstance.current);
      }
    });
  };

  return (
    <AppShell title={t("gyms.title")}>
      {/* Filter */}
      <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={locateMe}
          className="shrink-0 inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground"
          aria-label={t("gyms.locate")}
        >
          <Locate className="h-3.5 w-3.5" />
        </button>
        <Chip active={discipline === "all"} onClick={() => setDiscipline("all")} label={t("gyms.all")} />
        {disciplines.map((d) => (
          <Chip
            key={d}
            active={discipline === d}
            onClick={() => setDiscipline(d)}
            label={d}
            color={DISCIPLINE_COLORS[d]}
          />
        ))}
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full rounded-lg border border-border overflow-hidden"
        style={{ height: "60vh", background: "#0A0A0A" }}
      />

      {loading && (
        <p className="mt-3 text-xs text-muted-foreground">{t("gyms.loading")}</p>
      )}
      {!loading && filtered.length === 0 && (
        <p className="mt-3 text-xs text-muted-foreground">{t("gyms.empty")}</p>
      )}

      {/* List summary */}
      <ul className="mt-3 space-y-2">
        {filtered.map((g) => (
          <li key={g.id}>
            <button
              onClick={() => setSelected(g)}
              className="w-full rounded-md border border-border bg-surface p-3 text-left"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{g.nombre}</span>
                {g.precio_mensual != null && (
                  <span className="text-xs text-muted-foreground">
                    {g.precio_mensual}€{t("gyms.perMonth")}
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {g.disciplinas.map((d) => (
                  <span
                    key={d}
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      background: `${DISCIPLINE_COLORS[d] ?? "#CC0000"}22`,
                      color: DISCIPLINE_COLORS[d] ?? "#CC0000",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <GymSheet gym={selected} onClose={() => setSelected(null)} />
      {userPos && null}
    </AppShell>
  );
}

function Chip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold"
      style={{
        borderColor: active ? "var(--color-blood)" : "var(--color-border)",
        background: active ? "var(--color-blood)" : "var(--color-surface)",
        color: active ? "#fff" : "var(--color-foreground)",
      }}
    >
      {color && (
        <span
          className="mr-1 inline-block h-2 w-2 rounded-full align-middle"
          style={{ background: color }}
        />
      )}
      {label}
    </button>
  );
}

function GymSheet({ gym, onClose }: { gym: Gym | null; onClose: () => void }) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  useEffect(() => setIdx(0), [gym?.id]);
  if (!gym) return null;
  const photos = gym.fotos && gym.fotos.length > 0 ? gym.fotos : [];
  return (
    <Drawer open={!!gym} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-display text-xl">{gym.nombre}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          {photos.length > 0 && (
            <div className="relative mb-3 overflow-hidden rounded-md border border-border bg-surface">
              <img
                src={photos[idx]}
                alt={gym.nombre}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              {photos.length > 1 && (
                <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className="h-1.5 w-4 rounded-full"
                      style={{ background: i === idx ? "#CC0000" : "#ffffff55" }}
                      aria-label={`Foto ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <p className="flex items-start gap-1 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {gym.direccion}
          </p>
          {gym.descripcion && (
            <p className="mt-3 text-sm text-foreground">{gym.descripcion}</p>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            {gym.precio_mensual != null && (
              <div>
                <div className="text-muted-foreground uppercase tracking-wide">
                  {t("gyms.price")}
                </div>
                <div className="text-sm font-semibold">
                  {gym.precio_mensual}€{t("gyms.perMonth")}
                </div>
              </div>
            )}
            {gym.horarios && (
              <div>
                <div className="text-muted-foreground uppercase tracking-wide">
                  {t("gyms.schedule")}
                </div>
                <div className="text-sm">{gym.horarios}</div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              {t("gyms.disciplines")}
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {gym.disciplinas.map((d) => (
                <span
                  key={d}
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    background: `${DISCIPLINE_COLORS[d] ?? "#CC0000"}22`,
                    color: DISCIPLINE_COLORS[d] ?? "#CC0000",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {gym.telefono && (
              <a
                href={`tel:${gym.telefono}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                {t("gyms.contact")} · {gym.telefono}
              </a>
            )}
            {gym.web && (
              <a
                href={gym.web}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold"
              >
                <Globe className="h-4 w-4" />
                {t("gyms.website")}
              </a>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
