import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { AppShell } from "@/components/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import { DISCIPLINES, type DisciplineId } from "@/lib/preferences";

type Fighter = { id: string; nombre: string; apodo: string | null; foto_url: string | null };
type Org = { id: string; nombre: string; abreviatura: string | null };

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Mi perfil — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <Perfil />
    </AuthGate>
  ),
});

function Perfil() {
  const { user } = useSession();
  const { t } = useLanguage();
  const [fighters, setFighters] = useState<Fighter[] | null>(null);
  const [orgs, setOrgs] = useState<Org[] | null>(null);
  const [disciplines, setDisciplines] = useState<DisciplineId[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [ff, of, pf] = await Promise.all([
        supabase.from("fighter_follows").select("fighter_id").eq("user_id", user.id),
        supabase.from("organization_follows").select("organization_id").eq("user_id", user.id),
        supabase.from("profiles").select("disciplines").eq("id", user.id).maybeSingle(),
      ]);
      const fIds = (ff.data ?? []).map((r) => r.fighter_id);
      const oIds = (of.data ?? []).map((r) => r.organization_id);
      setDisciplines((pf.data?.disciplines as DisciplineId[] | null) ?? []);
      if (fIds.length) {
        const { data } = await supabase.from("fighters").select("id,nombre,apodo,foto_url").in("id", fIds);
        setFighters((data as Fighter[]) ?? []);
      } else setFighters([]);
      if (oIds.length) {
        const { data } = await supabase
          .from("organizations")
          .select("id,nombre,abreviatura")
          .in("id", oIds);
        setOrgs((data as Org[]) ?? []);
      } else setOrgs([]);
    })();
  }, [user]);

  const disciplineLabels = disciplines
    .map((id) => DISCIPLINES.find((d) => d.id === id)?.label ?? id)
    .filter(Boolean);

  return (
    <AppShell title={t("profile.title")}>
      <div className="space-y-6">
        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-display text-sm font-bold uppercase tracking-wider">
              {t("profile.disciplines")}
            </h2>
            <Link to="/ajustes" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-blood)" }}>
              {t("profile.edit")}
            </Link>
          </div>
          {disciplineLabels.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t("profile.empty.disciplines")}</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {disciplineLabels.map((l) => (
                <span key={l} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold">
                  {l}
                </span>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-2 text-display text-sm font-bold uppercase tracking-wider">
            {t("profile.fighters")}
          </h2>
          {fighters === null ? (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : fighters.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t("profile.empty.fighters")}</p>
          ) : (
            <ul className="grid grid-cols-3 gap-2">
              {fighters.map((f) => (
                <li key={f.id}>
                  <Link
                    to="/peleadores/$id"
                    params={{ id: f.id }}
                    className="block overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <div className="aspect-square w-full bg-background">
                      {f.foto_url && (
                        <img src={f.foto_url} alt={f.nombre} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="truncate p-1.5 text-[10px] font-semibold uppercase tracking-wide">
                      {f.apodo || f.nombre}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-2 text-display text-sm font-bold uppercase tracking-wider">
            {t("profile.orgs")}
          </h2>
          {orgs === null ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-md" />
              ))}
            </div>
          ) : orgs.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t("profile.empty.orgs")}</p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {orgs.map((o) => (
                <li key={o.id}>
                  <span
                    className="rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
                    style={{ borderColor: "var(--color-blood)", color: "var(--color-foreground)" }}
                  >
                    {o.abreviatura || o.nombre}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
