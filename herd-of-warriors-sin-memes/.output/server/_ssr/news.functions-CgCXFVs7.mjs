import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news.functions-CgCXFVs7.js
var FEEDS = [
	{
		source: "MMA Junkie",
		url: "https://mmajunkie.usatoday.com/feed"
	},
	{
		source: "Sherdog",
		url: "https://www.sherdog.com/rss/news.xml"
	},
	{
		source: "The Mac Life",
		url: "https://themaclife.com/feed"
	}
];
function decode(s) {
	return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}
function stripHtml(s) {
	return decode(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function pick(xml, tag) {
	const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
	return m ? decode(m[1]).trim() : null;
}
function pickImage(xml) {
	for (const p of [
		/<media:content[^>]*url=["']([^"']+)["']/i,
		/<media:thumbnail[^>]*url=["']([^"']+)["']/i,
		/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i,
		/<enclosure[^>]*url=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/i,
		/<img[^>]+src=["']([^"']+)["']/i
	]) {
		const m = xml.match(p);
		if (m) return m[1];
	}
	return null;
}
function parseFeed(xml, source) {
	const items = [];
	const matches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
	for (const raw of matches) {
		const title = pick(raw, "title");
		const link = pick(raw, "link");
		const pubDate = pick(raw, "pubDate") ?? pick(raw, "dc:date");
		const desc = pick(raw, "description") ?? pick(raw, "content:encoded") ?? "";
		const contentEncoded = pick(raw, "content:encoded") ?? "";
		const image = pickImage(raw) ?? pickImage(contentEncoded) ?? pickImage(desc);
		if (!title || !link) continue;
		let iso = null;
		if (pubDate) {
			const d = new Date(pubDate);
			if (!isNaN(d.getTime())) iso = d.toISOString();
		}
		items.push({
			url: link,
			title: stripHtml(title),
			source,
			image_url: image,
			snippet: stripHtml(desc).slice(0, 220),
			published_at: iso
		});
	}
	return items;
}
var fetchNews_createServerFn_handler = createServerRpc({
	id: "0a52a1a20366bf7417bc6d2f3abd330ea0ff281c95175f126a1247772c4f89d9",
	name: "fetchNews",
	filename: "src/lib/news.functions.ts"
}, (opts) => fetchNews.__executeServer(opts));
var fetchNews = createServerFn({ method: "GET" }).handler(fetchNews_createServerFn_handler, async () => {
	const results = await Promise.allSettled(FEEDS.map(async (f) => {
		const res = await fetch(f.url, { headers: { "user-agent": "HerdOfWarriors/1.0 (+news-aggregator)" } });
		if (!res.ok) throw new Error(`${f.source} ${res.status}`);
		return parseFeed(await res.text(), f.source);
	}));
	const items = [];
	for (const r of results) if (r.status === "fulfilled") items.push(...r.value);
	items.sort((a, b) => {
		const ta = a.published_at ? Date.parse(a.published_at) : 0;
		return (b.published_at ? Date.parse(b.published_at) : 0) - ta;
	});
	return items.slice(0, 80);
});
//#endregion
export { fetchNews_createServerFn_handler };
