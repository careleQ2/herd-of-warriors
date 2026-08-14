import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/news-translate.functions-BJArnlEG.js
var translateNews_createServerFn_handler = createServerRpc({
	id: "a5a2653452fa3822e9168c0ab6ff95d4f133ea6f56407c8ad28c3a5cba5ef067",
	name: "translateNews",
	filename: "src/lib/news-translate.functions.ts"
}, (opts) => translateNews.__executeServer(opts));
var translateNews = createServerFn({ method: "POST" }).inputValidator((data) => {
	if (!data || !Array.isArray(data.items)) throw new Error("bad input");
	return {
		lang: String(data.lang || "es"),
		items: data.items.slice(0, 80).map((i) => ({
			url: String(i.url),
			title: String(i.title ?? ""),
			snippet: String(i.snippet ?? "")
		}))
	};
}).handler(translateNews_createServerFn_handler, async ({ data }) => {
	const { lang, items } = data;
	const out = {};
	if (lang === "en" || items.length === 0) return out;
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const urls = items.map((i) => i.url);
	const { data: cached } = await supabaseAdmin.from("news_translations").select("url,title,snippet").eq("lang", lang).in("url", urls);
	const cacheMap = /* @__PURE__ */ new Map();
	for (const row of cached ?? []) {
		cacheMap.set(row.url, {
			title: row.title,
			snippet: row.snippet ?? ""
		});
		out[row.url] = {
			title: row.title,
			snippet: row.snippet ?? ""
		};
	}
	const missing = items.filter((i) => !cacheMap.has(i.url));
	if (missing.length === 0) return out;
	const apiKey = process.env.LOVABLE_API_KEY;
	if (!apiKey) return out;
	const chunkSize = 15;
	const langName = lang === "es" ? "Spanish (Spain)" : lang;
	const newRows = [];
	for (let i = 0; i < missing.length; i += chunkSize) {
		const chunk = missing.slice(i, i + chunkSize);
		const payload = chunk.map((c, idx) => ({
			i: idx,
			t: c.title,
			s: c.snippet
		}));
		const prompt = `Translate the following MMA/combat sports news headlines and snippets to ${langName}. Keep proper nouns (fighter names, organizations like UFC, ONE, PFL) unchanged. Return ONLY valid JSON with shape {"items":[{"i":number,"t":"translated title","s":"translated snippet"}]}. Input:\n${JSON.stringify(payload)}`;
		try {
			const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Lovable-API-Key": apiKey
				},
				body: JSON.stringify({
					model: "google/gemini-3-flash-preview",
					messages: [{
						role: "system",
						content: "You are a professional translator. Output only valid JSON."
					}, {
						role: "user",
						content: prompt
					}],
					response_format: { type: "json_object" }
				})
			});
			if (!res.ok) continue;
			const content = (await res.json())?.choices?.[0]?.message?.content ?? "";
			const arr = JSON.parse(content)?.items ?? [];
			for (const r of arr) {
				const src = chunk[r.i];
				if (!src) continue;
				const title = String(r.t ?? src.title);
				const snippet = String(r.s ?? src.snippet);
				out[src.url] = {
					title,
					snippet
				};
				newRows.push({
					url: src.url,
					lang,
					title,
					snippet
				});
			}
		} catch {}
	}
	if (newRows.length > 0) await supabaseAdmin.from("news_translations").upsert(newRows, { onConflict: "url,lang" });
	return out;
});
//#endregion
export { translateNews_createServerFn_handler };
