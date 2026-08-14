import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BzAhCXBd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { h as MapPin, l as Star, w as Calendar } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-D_rmb_Ao.mjs";
import { t as AppShell } from "./AppShell-BqZU6toJ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eventos.index-DZqCzxmT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Eventos() {
	const { t, lang } = useLanguage();
	const locale = lang === "en" ? "en-US" : "es-ES";
	const userId = useSession()?.user?.id;
	const [events, setEvents] = (0, import_react.useState)([]);
	const [orgs, setOrgs] = (0, import_react.useState)([]);
	const [followed, setFollowed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			const [evRes, orgRes] = await Promise.all([supabase.from("events").select("*, organizations(id,nombre,abreviatura)").order("fecha", { ascending: true }), supabase.from("organizations").select("id,nombre,abreviatura").order("nombre")]);
			setEvents(evRes.data ?? []);
			setOrgs(orgRes.data ?? []);
			if (userId) {
				const { data } = await supabase.from("organization_follows").select("organization_id").eq("user_id", userId);
				setFollowed(new Set((data ?? []).map((r) => r.organization_id)));
			}
			setLoading(false);
		})();
	}, [userId]);
	async function toggleFollow(orgId) {
		if (!userId) return;
		const next = new Set(followed);
		if (next.has(orgId)) {
			next.delete(orgId);
			setFollowed(next);
			await supabase.from("organization_follows").delete().eq("user_id", userId).eq("organization_id", orgId);
		} else {
			next.add(orgId);
			setFollowed(next);
			await supabase.from("organization_follows").insert({
				user_id: userId,
				organization_id: orgId
			});
		}
	}
	const grouped = (followed.size > 0 ? events.filter((e) => e.organization_id && followed.has(e.organization_id)) : events).reduce((acc, e) => {
		const key = new Date(e.fecha).toLocaleDateString(locale, {
			month: "long",
			year: "numeric"
		}).toUpperCase();
		(acc[key] ||= []).push(e);
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: t("events.title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
					children: t("events.orgs")
				}), followed.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: async () => {
						if (!userId) return;
						await supabase.from("organization_follows").delete().eq("user_id", userId);
						setFollowed(/* @__PURE__ */ new Set());
					},
					className: "text-[10px] font-bold uppercase tracking-wide text-muted-foreground underline",
					children: t("events.viewAll")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: orgs.map((o) => {
					const active = followed.has(o.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => toggleFollow(o.id),
						className: "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition",
						style: {
							borderColor: active ? "var(--color-blood)" : "var(--color-border)",
							background: active ? "var(--color-blood)" : "transparent",
							color: active ? "#fff" : "var(--color-foreground)"
						},
						children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-1 inline h-3 w-3 fill-current" }), o.abreviatura || o.nombre]
					}, o.id);
				})
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-16 rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/2" })
						]
					})]
				})
			}, i))
		}) : Object.entries(grouped).map(([month, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
					" ",
					month
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: list.map((e) => {
					const isFollowed = e.organization_id ? followed.has(e.organization_id) : false;
					const d = new Date(e.fecha);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/eventos/$id",
						params: { id: e.id },
						className: "block overflow-hidden rounded-xl border bg-surface transition active:scale-[0.99]",
						style: {
							borderColor: isFollowed ? "var(--color-blood)" : "var(--color-border)",
							boxShadow: isFollowed ? "0 0 0 1px var(--color-blood) inset" : void 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-16 flex-col items-center justify-center py-3 text-center",
								style: { background: isFollowed ? "var(--color-blood)" : "var(--color-muted)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wide",
									style: { color: isFollowed ? "#fff" : "var(--color-muted-foreground)" },
									children: d.toLocaleDateString(locale, { month: "short" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black leading-none",
									style: { color: isFollowed ? "#fff" : "var(--color-foreground)" },
									children: d.getDate()
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
											children: e.organizations?.abreviatura || "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: d.toLocaleTimeString(locale, {
												hour: "2-digit",
												minute: "2-digit"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base font-bold leading-tight",
										children: e.nombre
									}),
									e.combate_principal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground line-clamp-1",
										children: e.combate_principal
									}),
									e.ubicacion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
											" ",
											e.ubicacion
										]
									})
								]
							})]
						})
					}) }, e.id);
				})
			})]
		}, month))]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eventos, {}) });
//#endregion
export { SplitComponent as component };
