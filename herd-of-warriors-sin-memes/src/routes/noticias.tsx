import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AuthGate } from "@/components/AuthGate";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { fetchNews, type NewsItem } from "@/lib/news.functions";
import { translateNews } from "@/lib/news-translate.functions";

export const Route = createFileRoute("/noticias")({
  head: () => ({ meta: [{ title: "Noticias — Herd of Warriors" }] }),
  component: () => (
    <AuthGate>
      <NoticiasView />
    </AuthGate>
  ),
});

type Tab = "all" | "fighters" | "orgs" | "saved";

type SavedRow = {
  url: string; title: string; source: string; image_url: string | null;
  snippet: string | null; published_at: string | null;
};

function useNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchNews();
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);
  return { items, loading, error };
}

function NoticiasView() {
  const { t, lang } = useLanguage();
  const session = useSession();
  const userId = session?.user?.id ?? null;
  const [tab, setTab] = useState<Tab>("all");
  const { items, loading, error } = useNews();
  const [fighterTerms, setFighterTerms] = useState<string[]>([]);
  const [orgTerms, setOrgTerms] = useState<string[]>([]);
  const [saved, setSaved] = useState<Map<string, SavedRow>>(new Map());

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const [{ data: ff }, { data: of }, { data: sn }] = await Promise.all([
        supabase.from("fighter_follows").select("fighters(nombre, apodo)").eq("user_id", userId),
        supabase.from("organization_follows").select("organizations(nombre, abreviatura)").eq("user_id", userId),
        supabase.from("saved_news").select("*").eq("user_id", userId),
      ]);
      const fTerms: string[] = [];
      for (const row of (ff ?? []) as Array<{ fighters: { nombre?: string; apodo?: string } | null }>) {
        const f = row.fighters;
        if (f?.nombre) fTerms.push(f.nombre);
        if (f?.apodo) fTerms.push(f.apodo);
      }
      const oTerms: string[] = [];
      const orgNames: string[] = [];
      for (const row of (of ?? []) as Array<{ organizations: { nombre?: string; abreviatura?: string } | null }>) {
        const o = row.organizations;
        if (o?.nombre) { oTerms.push(o.nombre); orgNames.push(o.nombre); }
        if (o?.abreviatura) oTerms.push(o.abreviatura);
      }
      // Add fighters affiliated with followed organizations (current or historical)
      if (orgNames.length > 0) {
        const orFilter = orgNames
          .map((n) => `organizacion.eq.${n},organizaciones_historial.cs.{${n}}`)
          .join(",");
        const { data: orgFighters } = await supabase
          .from("fighters")
          .select("nombre, apodo")
          .or(orFilter);
        for (const f of (orgFighters ?? []) as Array<{ nombre?: string; apodo?: string }>) {
          if (f.nombre) oTerms.push(f.nombre);
          if (f.apodo) oTerms.push(f.apodo);
        }
      }
      setFighterTerms(fTerms);
      setOrgTerms(oTerms);
      const m = new Map<string, SavedRow>();
      for (const s of (sn ?? []) as SavedRow[]) m.set(s.url, s);
      setSaved(m);
    })();
  }, [userId]);

  // Translations cache keyed by URL, only when lang === 'es'
  const [translations, setTranslations] = useState<Record<string, { title: string; snippet: string }>>({});
  useEffect(() => {
    if (lang !== "es") { setTranslations({}); return; }
    if (items.length === 0) return;
    let alive = true;
    (async () => {
      try {
        const payload = items.slice(0, 60).map((i) => ({
          url: i.url, title: i.title, snippet: i.snippet ?? "",
        }));
        const res = await translateNews({ data: { lang: "es", items: payload } });
        if (alive) setTranslations(res as Record<string, { title: string; snippet: string }>);
      } catch {
        // ignore
      }
    })();
    return () => { alive = false; };
  }, [lang, items]);


  const filtered = useMemo(() => {
    if (tab === "all") return items;
    if (tab === "saved") return Array.from(saved.values()).map(s => ({
      url: s.url, title: s.title, source: s.source, image_url: s.image_url,
      snippet: s.snippet ?? "", published_at: s.published_at,
    })) as NewsItem[];
    const terms = (tab === "fighters" ? fighterTerms : orgTerms)
      .map(s => s.toLowerCase()).filter(s => s.length > 2);
    if (terms.length === 0) return [];
    return items.filter(it => {
      const hay = (it.title + " " + it.snippet).toLowerCase();
      return terms.some(term => hay.includes(term));
    });
  }, [tab, items, saved, fighterTerms, orgTerms]);

  async function toggleSave(item: NewsItem) {
    if (!userId) return;
    if (saved.has(item.url)) {
      const next = new Map(saved); next.delete(item.url); setSaved(next);
      await supabase.from("saved_news").delete().eq("user_id", userId).eq("url", item.url);
    } else {
      const row: SavedRow = {
        url: item.url, title: item.title, source: item.source,
        image_url: item.image_url, snippet: item.snippet, published_at: item.published_at,
      };
      const next = new Map(saved); next.set(item.url, row); setSaved(next);
      await supabase.from("saved_news").insert({ user_id: userId, ...row });
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: t("news.tab.all") },
    { id: "fighters", label: t("news.tab.fighters") },
    { id: "orgs", label: t("news.tab.orgs") },
    { id: "saved", label: t("news.tab.saved") },
  ];

  return (
    <AppShell title={t("news.title")}>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(tb => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              tab === tb.id
                ? "border-transparent bg-[var(--color-blood)] text-white"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {loading && tab !== "saved" && (
        <p className="text-sm text-muted-foreground">{t("news.loading")}</p>
      )}
      {error && tab !== "saved" && (
        <p className="text-sm text-[var(--color-blood)]">{t("news.error")}</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {tab === "fighters" ? t("news.empty.fighters")
            : tab === "orgs" ? t("news.empty.orgs")
            : tab === "saved" ? t("news.empty.saved")
            : t("news.empty")}
        </p>
      )}

      <ul className="space-y-3">
        {filtered.map(it => {
          const isSaved = saved.has(it.url);
          const date = it.published_at
            ? new Date(it.published_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                day: "2-digit", month: "short", year: "numeric",
              })
            : "";
          const tr = translations[it.url];
          const displayTitle = tr?.title ?? it.title;
          const displaySnippet = tr?.snippet ?? it.snippet;
          return (
            <li
              key={it.url}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              {it.image_url && (
                <a href={it.url} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={it.image_url}
                    alt=""
                    loading="lazy"
                    className="h-40 w-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </a>
              )}
              <div className="p-3">
                <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="font-bold text-[var(--color-blood)]">{it.source}</span>
                  {date && <span>· {date}</span>}
                </div>
                <a
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-display block text-base font-bold leading-snug hover:text-[var(--color-blood)]"
                >
                  {displayTitle}
                </a>
                {displaySnippet && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{displaySnippet}</p>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:border-foreground"
                  >
                    <ExternalLink className="h-3 w-3" /> {t("news.read")}
                  </a>
                  <button
                    onClick={() => toggleSave(it)}
                    className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition ${
                      isSaved
                        ? "border-transparent bg-[var(--color-blood)] text-white"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                    {isSaved ? t("news.saved") : t("news.save")}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
