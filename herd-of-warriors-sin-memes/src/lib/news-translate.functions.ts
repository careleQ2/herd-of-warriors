import { createServerFn } from "@tanstack/react-start";

type Item = { url: string; title: string; snippet: string };
type Out = Record<string, { title: string; snippet: string }>;

export const translateNews = createServerFn({ method: "POST" })
  .inputValidator((data: { lang: string; items: Item[] }) => {
    if (!data || !Array.isArray(data.items)) throw new Error("bad input");
    return {
      lang: String(data.lang || "es"),
      items: data.items.slice(0, 80).map((i) => ({
        url: String(i.url),
        title: String(i.title ?? ""),
        snippet: String(i.snippet ?? ""),
      })),
    };
  })
  .handler(async ({ data }) => {
    const { lang, items } = data;
    const out: Out = {};
    if (lang === "en" || items.length === 0) return out;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const urls = items.map((i) => i.url);
    const { data: cached } = await supabaseAdmin
      .from("news_translations")
      .select("url,title,snippet")
      .eq("lang", lang)
      .in("url", urls);
    const cacheMap = new Map<string, { title: string; snippet: string }>();
    for (const row of cached ?? []) {
      cacheMap.set(row.url, { title: row.title, snippet: row.snippet ?? "" });
      out[row.url] = { title: row.title, snippet: row.snippet ?? "" };
    }

    const missing = items.filter((i) => !cacheMap.has(i.url));
    if (missing.length === 0) return out;

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return out;

    // Batch translate in chunks
    const chunkSize = 15;
    const langName = lang === "es" ? "Spanish (Spain)" : lang;
    const newRows: { url: string; lang: string; title: string; snippet: string }[] = [];

    for (let i = 0; i < missing.length; i += chunkSize) {
      const chunk = missing.slice(i, i + chunkSize);
      const payload = chunk.map((c, idx) => ({ i: idx, t: c.title, s: c.snippet }));
      const prompt = `Translate the following MMA/combat sports news headlines and snippets to ${langName}. Keep proper nouns (fighter names, organizations like UFC, ONE, PFL) unchanged. Return ONLY valid JSON with shape {"items":[{"i":number,"t":"translated title","s":"translated snippet"}]}. Input:\n${JSON.stringify(payload)}`;

      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: "You are a professional translator. Output only valid JSON." },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
          }),
        });
        if (!res.ok) continue;
        const json = await res.json();
        const content: string = json?.choices?.[0]?.message?.content ?? "";
        const parsed = JSON.parse(content);
        const arr: Array<{ i: number; t: string; s: string }> = parsed?.items ?? [];
        for (const r of arr) {
          const src = chunk[r.i];
          if (!src) continue;
          const title = String(r.t ?? src.title);
          const snippet = String(r.s ?? src.snippet);
          out[src.url] = { title, snippet };
          newRows.push({ url: src.url, lang, title, snippet });
        }
      } catch {
        // skip chunk on error
      }
    }

    if (newRows.length > 0) {
      await supabaseAdmin.from("news_translations").upsert(newRows, { onConflict: "url,lang" });
    }
    return out;
  });
