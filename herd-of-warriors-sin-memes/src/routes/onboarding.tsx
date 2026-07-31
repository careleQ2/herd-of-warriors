import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { WolfIcon } from "@/components/WolfIcon";
import { DISCIPLINES, type DisciplineId } from "@/lib/preferences";
import { AuthGate } from "@/components/AuthGate";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";

type Org = {
  id: string;
  nombre: string;
  abreviatura: string | null;
  disciplinas: string[];
};

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Elige tu estilo — Herd of Warriors" },
      { name: "description", content: "Selecciona tus disciplinas y organizaciones favoritas." },
    ],
  }),
  component: () => (
    <AuthGate>
      <Onboarding />
    </AuthGate>
  ),
});

function Onboarding() {
  const navigate = useNavigate();
  const { user } = useSession();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Set<DisciplineId>>(new Set());
  const [orgIds, setOrgIds] = useState<Set<string>>(new Set());
  const [allOrgs, setAllOrgs] = useState<Org[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("disciplines,organizations")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (Array.isArray(data?.disciplines) && data!.disciplines.length > 0) {
          setSelected(new Set(data!.disciplines as DisciplineId[]));
        }
        if (Array.isArray(data?.organizations)) {
          setOrgIds(new Set(data!.organizations as string[]));
        }
      });
  }, [user]);

  useEffect(() => {
    supabase
      .from("organizations")
      .select("id,nombre,abreviatura,disciplinas")
      .order("nombre")
      .then(({ data }) => setAllOrgs((data ?? []) as Org[]));
  }, []);

  const availableOrgs = useMemo(
    () => allOrgs.filter((o) => o.disciplinas.some((d) => selected.has(d as DisciplineId))),
    [allOrgs, selected],
  );

  const toggle = (id: DisciplineId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleOrg = (id: string) => {
    setOrgIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canContinue = selected.size >= 1;

  const goStep2 = () => {
    if (!canContinue) return;
    // prune orgs
    const valid = new Set(availableOrgs.map((o) => o.id));
    setOrgIds((prev) => new Set(Array.from(prev).filter((id) => valid.has(id))));
    setStep(2);
  };

  const finish = async () => {
    if (!user || saving) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          disciplines: Array.from(selected),
          organizations: Array.from(orgIds),
        },
        { onConflict: "id" },
      );
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/feed" });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto w-full max-w-md flex-1 px-5 pt-10 pb-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WolfIcon className="h-5 w-5" style={{ color: "var(--color-blood)" }} />
              <span className="text-display text-xs font-bold tracking-[0.25em]">HERD OF WARRIORS</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {t("onboarding.step")} {step} {t("onboarding.of")} 2
            </span>
          </div>
        </div>

        {step === 1 ? (
          <>
            <div className="mb-6">
              <h1 className="text-display text-4xl font-bold leading-[1.05]">
                {t("onboarding.disciplines.title")}{" "}
                <span style={{ color: "var(--color-blood)" }}>{t("onboarding.disciplines.title.accent")}</span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">{t("onboarding.disciplines.sub")}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {DISCIPLINES.map((d) => {
                const active = selected.has(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggle(d.id)}
                    className="relative flex h-20 items-center justify-center rounded-lg border px-3 text-display text-sm font-bold transition-all active:scale-[0.98]"
                    style={{
                      borderColor: active ? "var(--color-blood)" : "var(--color-border)",
                      background: active
                        ? "color-mix(in oklab, var(--color-blood) 15%, transparent)"
                        : "var(--color-surface)",
                      color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                      boxShadow: active ? "var(--shadow-blood)" : "none",
                    }}
                  >
                    {active && (
                      <span
                        className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full"
                        style={{ background: "var(--color-blood)" }}
                      >
                        <Check className="h-3 w-3" style={{ color: "var(--color-blood-foreground)" }} />
                      </span>
                    )}
                    {d.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                type="button"
                disabled={!canContinue}
                onClick={goStep2}
                className="w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider transition-all disabled:opacity-40"
                style={{
                  background: canContinue ? "var(--gradient-blood)" : "var(--color-surface-elevated)",
                  color: "var(--color-blood-foreground)",
                  boxShadow: canContinue ? "var(--shadow-blood)" : "none",
                }}
              >
                {t("onboarding.continue")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-display text-4xl font-bold leading-[1.05]">
                {t("onboarding.orgs.title")}{" "}
                <span style={{ color: "var(--color-blood)" }}>{t("onboarding.orgs.title.accent")}</span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">{t("onboarding.orgs.sub")}</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {availableOrgs.length === 0 ? (
                <p className="rounded-md border border-border bg-surface px-3 py-4 text-xs text-muted-foreground">
                  {t("settings.orgs.empty")}
                </p>
              ) : (
                <ul className="divide-y divide-border rounded-md border border-border bg-surface">
                  {availableOrgs.map((o) => {
                    const active = orgIds.has(o.id);
                    return (
                      <li key={o.id}>
                        <button
                          type="button"
                          onClick={() => toggleOrg(o.id)}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">{o.nombre}</div>
                            <div className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                              {o.disciplinas.join(" · ")}
                            </div>
                          </div>
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                            style={{
                              borderColor: active ? "var(--color-blood)" : "var(--color-border)",
                              background: active ? "var(--color-blood)" : "transparent",
                            }}
                          >
                            {active && (
                              <Check className="h-3 w-3" style={{ color: "var(--color-blood-foreground)" }} />
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="mt-6 space-y-2">
              {error && (
                <p className="text-center text-xs" style={{ color: "var(--color-blood)" }}>
                  {error}
                </p>
              )}
              <button
                type="button"
                disabled={saving}
                onClick={finish}
                className="w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider transition-all disabled:opacity-40"
                style={{
                  background: "var(--gradient-blood)",
                  color: "var(--color-blood-foreground)",
                  boxShadow: "var(--shadow-blood)",
                }}
              >
                {saving ? t("settings.saving") : t("onboarding.enter")}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 text-xs text-muted-foreground hover:text-foreground"
              >
                ← {t("onboarding.step")} 1
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
