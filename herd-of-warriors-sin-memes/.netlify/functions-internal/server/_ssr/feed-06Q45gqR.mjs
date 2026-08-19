import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-D-ETUnuX.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-C0vsFf8u.mjs";
import { C as Check, f as Search, p as Plus, r as Users } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-omL9hm4E.mjs";
import { t as AppShell } from "./AppShell-C4Gs5n5h.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as getFighterImageUrl } from "./fighter-images-aKXZBTV1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-06Q45gqR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VikingHelmet({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 13c0-5 4-9 9-9s9 4 9 9v2H3v-2Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 15h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 4v11" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 11c2 0 3-1 3-3M23 11c-2 0-3-1-3-3" })
		]
	});
}
function Shield$1({ className, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		style,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 11l2 2 4-4" })]
	});
}
function Feed() {
	const { user } = useSession();
	const { t } = useLanguage();
	const [fighters, setFighters] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [busyFollowId, setBusyFollowId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const { data: follows } = await supabase.from("fighter_follows").select("fighter_id").eq("user_id", user.id);
			const ids = (follows ?? []).map((f) => f.fighter_id);
			if (ids.length === 0) {
				setFighters([]);
				return;
			}
			const { data } = await supabase.from("fighters").select("id,nombre,apodo,disciplinas,organizacion,foto_url,record_victorias,record_derrotas,record_empates,ultima_pelea_rival,ultima_pelea_resultado").in("id", ids).order("nombre", { ascending: true });
			setFighters(data ?? []);
		})();
	}, [user]);
	const unfollow = async (fighterId) => {
		if (!user || busyFollowId) return;
		setBusyFollowId(fighterId);
		const { error } = await supabase.from("fighter_follows").delete().eq("user_id", user.id).eq("fighter_id", fighterId);
		if (!error) setFighters((prev) => (prev ?? []).filter((f) => f.id !== fighterId));
		setBusyFollowId(null);
	};
	const needle = query.trim().toLowerCase();
	const visible = (fighters ?? []).filter((f) => !needle ? true : f.nombre.toLowerCase().includes(needle) || (f.apodo ?? "").toLowerCase().includes(needle));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: t("feed.title"),
		children: fighters === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-4",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 w-full rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-2/3" })]
				})]
			}, i))
		}) : fighters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center pt-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 flex h-16 w-16 items-center justify-center rounded-full border",
					style: {
						borderColor: "var(--color-blood)",
						background: "color-mix(in oklab, var(--color-blood) 10%, transparent)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						className: "h-7 w-7",
						style: { color: "var(--color-blood)" }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-sm text-muted-foreground",
					children: t("feed.empty")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/peleadores",
					className: "text-display mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest",
					style: {
						background: "var(--color-blood)",
						color: "var(--color-foreground)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }),
						" ",
						t("feed.explore")
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: t("feed.search"),
					className: "w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-blood)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: [
						visible.length,
						" ",
						t("feed.following")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/peleadores",
					className: "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider",
					style: { color: "var(--color-blood)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
						" ",
						t("feed.add")
					]
				})]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted-foreground",
				children: t("common.noResults")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: visible.map((fighter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FighterFeedCard, {
					fighter,
					busy: busyFollowId === fighter.id,
					onUnfollow: unfollow,
					t
				}, fighter.id))
			})
		] })
	});
}
function FighterFeedCard({ fighter, busy, onUnfollow, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/peleadores/$id",
			params: { id: fighter.id },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-48 w-full bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: getFighterImageUrl(fighter.nombre),
						alt: fighter.nombre,
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 55%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
							children: [fighter.disciplinas.join(" · "), fighter.organizacion ? ` · ${fighter.organizacion}` : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-display text-lg font-bold uppercase leading-tight",
							children: fighter.nombre
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-display absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-bold",
						style: {
							background: "var(--color-blood)",
							color: "var(--color-foreground)"
						},
						children: [
							fighter.record_victorias,
							"-",
							fighter.record_derrotas,
							"-",
							fighter.record_empates
						]
					})
				]
			}), fighter.ultima_pelea_rival && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-3 py-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: t("feed.last")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: fighter.ultima_pelea_rival
					}),
					fighter.ultima_pelea_resultado && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [" · ", fighter.ultima_pelea_resultado]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2 border-t border-border p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onUnfollow(fighter.id),
					disabled: busy,
					className: "text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md border py-2.5 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50",
					style: { borderColor: "var(--color-border)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-3.5 w-3.5",
							style: { color: "var(--color-blood)" }
						}),
						" ",
						t("feed.followingBtn")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/peleadores/$id",
					params: { id: fighter.id },
					search: { tab: "bio" },
					className: "text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-border py-2.5 text-[10px] font-bold uppercase tracking-widest",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield$1, {
							className: "h-3.5 w-3.5",
							style: { color: "var(--color-blood)" }
						}),
						" ",
						t("feed.bio")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/peleadores/$id",
					params: { id: fighter.id },
					search: { tab: "trayectoria" },
					className: "text-display flex min-h-10 items-center justify-center gap-1.5 rounded-md py-2.5 text-[10px] font-bold uppercase tracking-widest",
					style: {
						background: "var(--color-blood)",
						color: "var(--color-foreground)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VikingHelmet, { className: "h-3.5 w-3.5" }),
						" ",
						t("feed.trajectoryShort")
					]
				})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {}) });
//#endregion
export { SplitComponent as component };
