import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BzAhCXBd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { E as BookmarkCheck, T as Bookmark, x as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-D_rmb_Ao.mjs";
import { t as AppShell } from "./AppShell-BqZU6toJ.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Bu2JA8tv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/noticias-gU9ctZcn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchNews = createServerFn({ method: "GET" }).handler(createSsrRpc("0a52a1a20366bf7417bc6d2f3abd330ea0ff281c95175f126a1247772c4f89d9"));
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
}).handler(createSsrRpc("a5a2653452fa3822e9168c0ab6ff95d4f133ea6f56407c8ad28c3a5cba5ef067"));
function useNews() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
		return () => {
			alive = false;
		};
	}, []);
	return {
		items,
		loading,
		error
	};
}
function NoticiasView() {
	const { t, lang } = useLanguage();
	const userId = useSession()?.user?.id ?? null;
	const [tab, setTab] = (0, import_react.useState)("all");
	const { items, loading, error } = useNews();
	const [fighterTerms, setFighterTerms] = (0, import_react.useState)([]);
	const [orgTerms, setOrgTerms] = (0, import_react.useState)([]);
	const [saved, setSaved] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		(async () => {
			const [{ data: ff }, { data: of }, { data: sn }] = await Promise.all([
				supabase.from("fighter_follows").select("fighters(nombre, apodo)").eq("user_id", userId),
				supabase.from("organization_follows").select("organizations(nombre, abreviatura)").eq("user_id", userId),
				supabase.from("saved_news").select("*").eq("user_id", userId)
			]);
			const fTerms = [];
			for (const row of ff ?? []) {
				const f = row.fighters;
				if (f?.nombre) fTerms.push(f.nombre);
				if (f?.apodo) fTerms.push(f.apodo);
			}
			const oTerms = [];
			const orgNames = [];
			for (const row of of ?? []) {
				const o = row.organizations;
				if (o?.nombre) {
					oTerms.push(o.nombre);
					orgNames.push(o.nombre);
				}
				if (o?.abreviatura) oTerms.push(o.abreviatura);
			}
			if (orgNames.length > 0) {
				const orFilter = orgNames.map((n) => `organizacion.eq.${n},organizaciones_historial.cs.{${n}}`).join(",");
				const { data: orgFighters } = await supabase.from("fighters").select("nombre, apodo").or(orFilter);
				for (const f of orgFighters ?? []) {
					if (f.nombre) oTerms.push(f.nombre);
					if (f.apodo) oTerms.push(f.apodo);
				}
			}
			setFighterTerms(fTerms);
			setOrgTerms(oTerms);
			const m = /* @__PURE__ */ new Map();
			for (const s of sn ?? []) m.set(s.url, s);
			setSaved(m);
		})();
	}, [userId]);
	const [translations, setTranslations] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (lang !== "es") {
			setTranslations({});
			return;
		}
		if (items.length === 0) return;
		let alive = true;
		(async () => {
			try {
				const res = await translateNews({ data: {
					lang: "es",
					items: items.slice(0, 60).map((i) => ({
						url: i.url,
						title: i.title,
						snippet: i.snippet ?? ""
					}))
				} });
				if (alive) setTranslations(res);
			} catch {}
		})();
		return () => {
			alive = false;
		};
	}, [lang, items]);
	const filtered = (0, import_react.useMemo)(() => {
		if (tab === "all") return items;
		if (tab === "saved") return Array.from(saved.values()).map((s) => ({
			url: s.url,
			title: s.title,
			source: s.source,
			image_url: s.image_url,
			snippet: s.snippet ?? "",
			published_at: s.published_at
		}));
		const terms = (tab === "fighters" ? fighterTerms : orgTerms).map((s) => s.toLowerCase()).filter((s) => s.length > 2);
		if (terms.length === 0) return [];
		return items.filter((it) => {
			const hay = (it.title + " " + it.snippet).toLowerCase();
			return terms.some((term) => hay.includes(term));
		});
	}, [
		tab,
		items,
		saved,
		fighterTerms,
		orgTerms
	]);
	async function toggleSave(item) {
		if (!userId) return;
		if (saved.has(item.url)) {
			const next = new Map(saved);
			next.delete(item.url);
			setSaved(next);
			await supabase.from("saved_news").delete().eq("user_id", userId).eq("url", item.url);
		} else {
			const row = {
				url: item.url,
				title: item.title,
				source: item.source,
				image_url: item.image_url,
				snippet: item.snippet,
				published_at: item.published_at
			};
			const next = new Map(saved);
			next.set(item.url, row);
			setSaved(next);
			await supabase.from("saved_news").insert({
				user_id: userId,
				...row
			});
		}
	}
	const tabs = [
		{
			id: "all",
			label: t("news.tab.all")
		},
		{
			id: "fighters",
			label: t("news.tab.fighters")
		},
		{
			id: "orgs",
			label: t("news.tab.orgs")
		},
		{
			id: "saved",
			label: t("news.tab.saved")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: t("news.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1",
				children: tabs.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb.id),
					className: `shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${tab === tb.id ? "border-transparent bg-[var(--color-blood)] text-white" : "border-border text-muted-foreground hover:text-foreground"}`,
					children: tb.label
				}, tb.id))
			}),
			loading && tab !== "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("news.loading")
			}),
			error && tab !== "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-[var(--color-blood)]",
				children: t("news.error")
			}),
			!loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: tab === "fighters" ? t("news.empty.fighters") : tab === "orgs" ? t("news.empty.orgs") : tab === "saved" ? t("news.empty.saved") : t("news.empty")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: filtered.map((it) => {
					const isSaved = saved.has(it.url);
					const date = it.published_at ? new Date(it.published_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
						day: "2-digit",
						month: "short",
						year: "numeric"
					}) : "";
					const tr = translations[it.url];
					const displayTitle = tr?.title ?? it.title;
					const displaySnippet = tr?.snippet ?? it.snippet;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "overflow-hidden rounded-lg border border-border bg-card",
						children: [it.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: it.url,
							target: "_blank",
							rel: "noreferrer",
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: it.image_url,
								alt: "",
								loading: "lazy",
								className: "h-40 w-full object-cover",
								onError: (e) => {
									e.currentTarget.style.display = "none";
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-[var(--color-blood)]",
										children: it.source
									}), date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", date] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: it.url,
									target: "_blank",
									rel: "noreferrer",
									className: "text-display block text-base font-bold leading-snug hover:text-[var(--color-blood)]",
									children: displayTitle
								}),
								displaySnippet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
									children: displaySnippet
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: it.url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:border-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }),
											" ",
											t("news.read")
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => toggleSave(it),
										className: `inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition ${isSaved ? "border-transparent bg-[var(--color-blood)] text-white" : "border-border hover:border-foreground"}`,
										children: [isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-3 w-3" }), isSaved ? t("news.saved") : t("news.save")]
									})]
								})
							]
						})]
					}, it.url);
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticiasView, {}) });
//#endregion
export { SplitComponent as component };
