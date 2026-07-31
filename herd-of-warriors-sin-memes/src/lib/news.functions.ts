import { createServerFn } from "@tanstack/react-start";

export type NewsItem = {
  url: string;
  title: string;
  source: string;
  image_url: string | null;
  snippet: string;
  published_at: string | null;
};

const FEEDS: { source: string; url: string }[] = [
  { source: "MMA Junkie", url: "https://mmajunkie.usatoday.com/feed" },
  { source: "Sherdog", url: "https://www.sherdog.com/rss/news.xml" },
  { source: "The Mac Life", url: "https://themaclife.com/feed" },
];

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripHtml(s: string): string {
  return decode(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function pick(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? decode(m[1]).trim() : null;
}

function pickImage(xml: string): string | null {
  const patterns = [
    /<media:content[^>]*url=["']([^"']+)["']/i,
    /<media:thumbnail[^>]*url=["']([^"']+)["']/i,
    /<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i,
    /<enclosure[^>]*url=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/i,
    /<img[^>]+src=["']([^"']+)["']/i,
  ];
  for (const p of patterns) {
    const m = xml.match(p);
    if (m) return m[1];
  }
  return null;
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const regex = /<item[\s>][\s\S]*?<\/item>/gi;
  const matches = xml.match(regex) ?? [];
  for (const raw of matches) {
    const title = pick(raw, "title");
    const link = pick(raw, "link");
    const pubDate = pick(raw, "pubDate") ?? pick(raw, "dc:date");
    const desc = pick(raw, "description") ?? pick(raw, "content:encoded") ?? "";
    const contentEncoded = pick(raw, "content:encoded") ?? "";
    const image = pickImage(raw) ?? pickImage(contentEncoded) ?? pickImage(desc);
    if (!title || !link) continue;
    let iso: string | null = null;
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
      published_at: iso,
    });
  }
  return items;
}

export const fetchNews = createServerFn({ method: "GET" }).handler(async () => {
  const results = await Promise.allSettled(
    FEEDS.map(async (f) => {
      const res = await fetch(f.url, {
        headers: { "user-agent": "HerdOfWarriors/1.0 (+news-aggregator)" },
      });
      if (!res.ok) throw new Error(`${f.source} ${res.status}`);
      const xml = await res.text();
      return parseFeed(xml, f.source);
    }),
  );
  const items: NewsItem[] = [];
  for (const r of results) if (r.status === "fulfilled") items.push(...r.value);
  items.sort((a, b) => {
    const ta = a.published_at ? Date.parse(a.published_at) : 0;
    const tb = b.published_at ? Date.parse(b.published_at) : 0;
    return tb - ta;
  });
  return items.slice(0, 80);
});
