import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Check, X, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import { getFighterImageUrl } from "@/lib/fighter-images";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  foto_url: string | null;
  record_victorias: number;
  record_derrotas: number;
  record_empates: number;
  biografia: string | null;
  organizaciones_historial: string[];
};

const DISC_FILTERS = ["MMA", "Boxeo", "Muay Thai", "Kickboxing", "BJJ", "Judo"];
const PAGE_SIZE = 20;
const normalizeDiscipline = (value: string) => value.toLowerCase().replace(/[\s-]/g, "");

type DrawerState =
  | { kind: "bio"; fighter: Fighter }
  | { kind: "trayectoria"; fighter: Fighter }
  | null;

export const Route = createFileRoute("/peleadores/")({
  head: () => ({ meta: [{ title: "Fighters — Herd of Warriors" }] }),
  component: FightersPage,
});

export function FightersPage({
  favoritesOnly = false,
  title = "FIGHTERS",
}: {
  favoritesOnly?: boolean;
  title?: string;
} = {}) {
  const { user } = useSession();
  const { t } = useLanguage();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [disc, setDisc] = useState<string>(favoritesOnly ? "favoritos" : "all");
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [org, setOrg] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [justFollowed, setJustFollowed] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    supabase
      .from("fighters")
      .select(
        "id,nombre,apodo,disciplinas,organizacion,pais,foto_url,record_victorias,record_derrotas,record_empates,biografia,organizaciones_historial"
      )
      .order("seguidores_count", { ascending: false })
      .then(({ data }) => {
        if (!alive) return;
        setFighters((data as Fighter[] | null) ?? []);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("fighter_follows")
      .select("fighter_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFollowed(new Set((data ?? []).map((r) => r.fighter_id as string)));
      });
  }, [user]);

  const organizations = useMemo(() => {
    const orgs = new Set<string>();
    fighters.forEach((f) => {
      if (f.organizacion) orgs.add(f.organizacion);
    });
    return Array.from(orgs).sort();
  }, [fighters]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const selectedDisciplineSet = new Set(
      selectedDisciplines.map((discipline) => normalizeDiscipline(discipline))
    );

    return fighters.filter((f) => {
      if (favoritesOnly || disc === "favoritos") {
        if (!followed.has(f.id)) return false;
      }

      if (selectedDisciplines.length > 0) {
        const matchesDiscipline = f.disciplinas.some((discipline) =>
          selectedDisciplineSet.has(normalizeDiscipline(discipline))
        );
        if (!matchesDiscipline) return false;
      }

      if (org !== "all" && f.organizacion !== org) {
        return false;
      }

      if (!needle) return true;
      return (
        f.nombre.toLowerCase().includes(needle) ||
        (f.apodo ?? "").toLowerCase().includes(needle)
      );
    });
  }, [fighters, q, disc, org, followed, favoritesOnly, selectedDisciplines]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [q, disc, org, selectedDisciplines]);

  const shown = filtered.slice(0, visible);

  async function toggleFollow(f: Fighter) {
    if (!user || busy === f.id) return;
    setBusy(f.id);
    const isFollowing = followed.has(f.id);
    const next = new Set(followed);
    if (isFollowing) {
      next.delete(f.id);
      setFollowed(next);
      await supabase
        .from("fighter_follows")
        .delete()
        .eq("user_id", user.id)
        .eq("fighter_id", f.id);
    } else {
      next.add(f.id);
      setFollowed(next);
      setJustFollowed(f.id);
      window.setTimeout(() => {
        setJustFollowed((curr) => (curr === f.id ? null : curr));
      }, 700);
      await supabase
        .from("fighter_follows")
        .insert({ user_id: user.id, fighter_id: f.id });
    }

    setBusy(null);
  }

  return (
    <>
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("fighters.search")}
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-blood)]"
        />
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-left text-sm font-medium text-foreground">
            <span className="truncate">
              Especialidad: {selectedDisciplines.length > 0 ? selectedDisciplines.join(", ") : "TODOS"}
            </span>
            <span className="text-muted-foreground">▾</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[260px]">
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setSelectedDisciplines([]);
              }}
            >
              TODOS
            </DropdownMenuItem>
            {DISC_FILTERS.map((discipline) => (
              <DropdownMenuCheckboxItem
                key={discipline}
                checked={selectedDisciplines.includes(discipline)}
                onCheckedChange={(checked) => {
                  setSelectedDisciplines((current) => {
                    if (checked) {
                      return current.includes(discipline) ? current : [...current, discipline];
                    }
                    return current.filter((item) => item !== discipline);
                  });
                }}
              >
                {discipline}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {organizations.length > 0 && (
          <Select value={org === "all" ? "all" : org} onValueChange={(value) => setOrg(value)}>
            <SelectTrigger className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground">
              <SelectValue placeholder="Organización" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las orgs</SelectItem>
              {organizations.map((organization) => (
                <SelectItem key={organization} value={organization}>
                  {organization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("common.loading")}</p>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("common.noResults")}</p>
      ) : (
        <>
          <ul className="space-y-2">
            {shown.map((f) => {
              const isFollowing = followed.has(f.id);
              const photoUrl = getFighterImageUrl(f.nombre);

              return (
                <li
                  key={f.id}
                  className="rounded-xl border border-border bg-surface p-3 transition-colors hover:border-[var(--color-blood)] cursor-pointer"
                >
                  <Link to="/peleadores/$id" params={{ id: f.id }} className="block">
                    <div className="flex gap-3">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-background">
                        <img src={photoUrl} alt={f.nombre} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-display truncate text-base font-bold uppercase tracking-wide">
                          {f.nombre}
                        </p>
                        {f.apodo && <p className="truncate text-xs text-muted-foreground">"{f.apodo}"</p>}
                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                          {f.disciplinas.join(" · ")}
                          {f.organizacion ? ` · ${f.organizacion}` : ""}
                        </p>
                        <p className="text-display mt-0.5 text-sm font-bold" style={{ color: "var(--color-blood)" }}>
                          {f.record_victorias}-{f.record_derrotas}-{f.record_empates}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleFollow(f);
                      }}
                      disabled={busy === f.id}
                      className="flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-md border px-2 py-1.5 text-xs font-semibold disabled:opacity-50"
                      style={{
                        borderColor: isFollowing ? "#9ca3af" : "var(--color-border)",
                        background: isFollowing ? "linear-gradient(180deg, #2a2a2a, #1a1a1a)" : "transparent",
                        color: isFollowing ? "#e5e7eb" : "var(--color-foreground)",
                      }}
                    >
                      {isFollowing ? (
                        <>
                          <AxeInWood className="h-5 w-5" animate={justFollowed === f.id} />
                          {t("fighters.following")}
                        </>
                      ) : (
                        <>
                          <span style={{ color: "var(--color-blood)", display: "inline-flex" }}>
                            <VikingAxe className="h-4 w-4" />
                          </span>{" "}
                          {t("fighters.follow")}
                        </>
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {visible < filtered.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="mt-4 w-full rounded-lg border border-border bg-surface py-2.5 text-sm font-semibold"
            >
              {t("fighters.loadMore")} ({filtered.length - visible})
            </button>
          )}
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {t("fighters.showing")} {shown.length} {t("fighters.of")} {filtered.length}
          </p>
        </>
      )}

      <FighterDrawer state={drawer} onClose={() => setDrawer(null)} t={t} />
    </>
  );
}

function FighterDrawer({
  state,
  onClose,
  t,
}: {
  state: DrawerState;
  onClose: () => void;
  t: (key: import("@/lib/i18n").TranslationKey) => string;
}) {
  const open = state !== null;
  return (
    <Drawer
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DrawerContent className="h-[70vh] border-border bg-surface">
        {state && (
          <div className="relative flex h-full flex-col overflow-y-auto px-4 pb-6 pt-2">
            <DrawerClose asChild>
              <button type="button" aria-label={t("common.close")} className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background p-1.5">
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-background">
                <img src={getFighterImageUrl(state.fighter.nombre)} alt={state.fighter.nombre} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <h2 className="text-display truncate text-lg font-bold uppercase tracking-wide">
                  {state.fighter.nombre}
                </h2>
                {state.fighter.apodo && <p className="truncate text-xs text-muted-foreground">"{state.fighter.apodo}"</p>}
                <p className="text-display mt-0.5 text-xs font-bold uppercase" style={{ color: "var(--color-blood)" }}>
                  {state.kind === "bio" ? t("fighters.biography") : t("fighters.trajectory")}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {state.kind === "bio" ? (
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {state.fighter.biografia || t("fighters.noBio")}
                </p>
              ) : (
                <ul className="space-y-2">
                  {state.fighter.organizaciones_historial.length === 0 ? (
                    <li className="text-sm text-muted-foreground">{t("fighters.noTrajectory")}</li>
                  ) : (
                    state.fighter.organizaciones_historial.map((org, i) => (
                      <li key={`${org}-${i}`} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
                        <Shield className="h-4 w-4 shrink-0" style={{ color: "var(--color-blood)" }} />
                        <span className="text-sm font-semibold">{org}</span>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
