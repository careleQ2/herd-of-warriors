import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, LogOut, User, Mail, ChevronRight } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { AppShell } from "@/components/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { useSession, signOut } from "@/lib/auth";
import { DISCIPLINES, type DisciplineId } from "@/lib/preferences";
import { useLanguage, type Lang } from "@/lib/i18n";

type Org = {
  id: string;
  nombre: string;
  abreviatura: string | null;
  disciplinas: string[];
};

export const Route = createFileRoute("/ajustes")({
  head: () => ({
    meta: [
      { title: "Ajustes — Herd of Warriors" },
      { name: "description", content: "Gestiona tus disciplinas, organizaciones e idioma." },
    ],
  }),
  component: () => (
    <AuthGate>
      <AjustesPage />
    </AuthGate>
  ),
});

function AjustesPage() {
  const { user } = useSession();
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const [disciplinas, setDisciplinas] = useState<Set<DisciplineId>>(new Set());
  const [orgIds, setOrgIds] = useState<Set<string>>(new Set());
  const [allOrgs, setAllOrgs] = useState<Org[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("organizations")
      .select("id,nombre,abreviatura,disciplinas")
      .order("nombre")
      .then(({ data }) => setAllOrgs((data ?? []) as Org[]));
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("disciplines,organizations,language")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        if (Array.isArray(data.disciplines)) setDisciplinas(new Set(data.disciplines as DisciplineId[]));
        if (Array.isArray(data.organizations)) setOrgIds(new Set(data.organizations as string[]));
      });
  }, [user]);

  // Available orgs = those whose disciplinas intersect with selected disciplines
  const availableOrgs = useMemo(
    () => allOrgs.filter((o) => o.disciplinas.some((d) => disciplinas.has(d as DisciplineId))),
    [allOrgs, disciplinas],
  );

  // Prune orgs that no longer match any selected discipline
  useEffect(() => {
    setOrgIds((prev) => {
      const validIds = new Set(availableOrgs.map((o) => o.id));
      let changed = false;
      const next = new Set<string>();
      prev.forEach((id) => {
        if (validIds.has(id)) next.add(id);
        else changed = true;
      });
      return changed ? next : prev;
    });
  }, [availableOrgs]);

  const toggleDiscipline = (id: DisciplineId) => {
    setDisciplinas((prev) => {
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

  const save = async () => {
    if (!user || saving) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          disciplines: Array.from(disciplinas),
          organizations: Array.from(orgIds),
          language: lang,
        },
        { onConflict: "id" },
      );
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/", replace: true });
  };

  const [suggestion, setSuggestion] = useState("");
  const suggestionMailto = `mailto:sugerencias@herdofwarriors.app?subject=${encodeURIComponent(
    "Sugerencia Herd of Warriors",
  )}&body=${encodeURIComponent(suggestion || "")}`;

  return (
    <AppShell title={t("settings.title")}>
      <div className="space-y-6">
        {/* Profile shortcut */}
        <Link
          to="/perfil"
          className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-3 active:scale-[0.99] transition"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: "color-mix(in oklab, var(--color-blood) 18%, transparent)" }}
            >
              <User className="h-4 w-4" style={{ color: "var(--color-blood)" }} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{t("settings.profile")}</div>
              <div className="truncate text-[11px] text-muted-foreground">{t("settings.profile.hint")}</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>

        {/* Disciplines */}
        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-display text-sm font-bold uppercase tracking-wider">{t("settings.disciplines")}</h2>
            <span className="text-[10px] text-muted-foreground">{disciplinas.size}</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">{t("settings.disciplines.hint")}</p>
          <ul className="flex flex-wrap gap-1.5">
            {DISCIPLINES.map((d) => {
              const active = disciplinas.has(d.id);
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => toggleDiscipline(d.id)}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-[0.97]"
                    style={{
                      borderColor: active ? "var(--color-blood)" : "var(--color-border)",
                      background: active ? "color-mix(in oklab, var(--color-blood) 18%, transparent)" : "var(--color-surface)",
                      color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                    }}
                  >
                    {active && <Check className="h-3 w-3" style={{ color: "var(--color-blood)" }} />}
                    {d.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Organizations */}
        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-display text-sm font-bold uppercase tracking-wider">{t("settings.orgs")}</h2>
            <span className="text-[10px] text-muted-foreground">{orgIds.size}</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">{t("settings.orgs.hint")}</p>
          {availableOrgs.length === 0 ? (
            <p className="rounded-md border border-border bg-surface px-3 py-3 text-xs text-muted-foreground">
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
                        {active && <Check className="h-3 w-3" style={{ color: "var(--color-blood-foreground)" }} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Language */}
        <section>
          <h2 className="mb-2 text-display text-sm font-bold uppercase tracking-wider">{t("settings.language")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {(["es", "en"] as const).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code as Lang)}
                  className="rounded-md border py-2.5 text-sm font-semibold transition-all"
                  style={{
                    borderColor: active ? "var(--color-blood)" : "var(--color-border)",
                    background: active ? "color-mix(in oklab, var(--color-blood) 18%, transparent)" : "var(--color-surface)",
                    color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  }}
                >
                  {code === "es" ? "Español" : "English"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Suggestions */}
        <section>
          <h2 className="mb-2 text-display text-sm font-bold uppercase tracking-wider">
            {t("settings.suggestions")}
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">{t("settings.suggestions.hint")}</p>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder={t("settings.suggestions.placeholder")}
            rows={4}
            className="w-full resize-none rounded-md border border-border bg-surface p-3 text-sm outline-none focus:border-[var(--color-blood)]"
          />
          <a
            href={suggestionMailto}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface py-2.5 text-xs font-bold uppercase tracking-widest active:scale-[0.99]"
          >
            <Mail className="h-3.5 w-3.5" style={{ color: "var(--color-blood)" }} />
            {t("settings.suggestions.send")}
          </a>
        </section>


        {/* Save */}
        <div className="sticky bottom-20 -mx-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
          {error && (
            <p className="mb-2 text-center text-xs" style={{ color: "var(--color-blood)" }}>
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="w-full rounded-lg py-3.5 text-display text-sm font-bold uppercase tracking-wider disabled:opacity-40"
            style={{
              background: "var(--gradient-blood)",
              color: "var(--color-blood-foreground)",
              boxShadow: "var(--shadow-blood)",
            }}
          >
            {saving ? t("settings.saving") : savedFlash ? `✓ ${t("settings.saved")}` : t("settings.save")}
          </button>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mx-auto flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          {t("settings.logout")}
        </button>
      </div>
    </AppShell>
  );
}
