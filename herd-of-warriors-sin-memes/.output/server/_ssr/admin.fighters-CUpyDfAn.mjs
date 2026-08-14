import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BzAhCXBd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { C as Check, D as ArrowLeft, s as Trash2, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.fighters-CUpyDfAn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminFighters() {
	const { user } = useSession();
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(null);
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [pending, setPending] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({ data }) => setIsAdmin(!!data));
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (!isAdmin) return;
		load();
	}, [isAdmin]);
	const load = async () => {
		const [{ data: s }, { data: p }] = await Promise.all([supabase.from("fighter_suggestions").select("*").eq("estado", "pendiente").order("created_at", { ascending: false }), supabase.from("fighters").select("id,nombre,apodo,disciplinas,organizacion,estado").eq("estado", "pendiente_verificacion").order("created_at", { ascending: false })]);
		setSuggestions(s ?? []);
		setPending(p ?? []);
	};
	const approveSuggestion = async (s) => {
		await supabase.from("fighters").insert({
			nombre: s.nombre,
			disciplinas: s.disciplina ? [s.disciplina] : [],
			organizacion: s.organizacion,
			url_perfil_externo: s.url_perfil,
			estado: "pendiente_verificacion",
			fuente_datos: "manual"
		});
		await supabase.from("fighter_suggestions").update({ estado: "aprobada" }).eq("id", s.id);
		load();
	};
	const rejectSuggestion = async (id) => {
		await supabase.from("fighter_suggestions").update({ estado: "rechazada" }).eq("id", id);
		load();
	};
	const approveFighter = async (id) => {
		await supabase.from("fighters").update({ estado: "activo" }).eq("id", id);
		load();
	};
	const deleteFighter = async (id) => {
		await supabase.from("fighters").delete().eq("id", id);
		load();
	};
	if (isAdmin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Comprobando permisos…"
	}) });
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: "Acceso restringido. Necesitas rol de admin."
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-display mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground",
			children: [
				"Sugerencias pendientes (",
				suggestions.length,
				")"
			]
		}), suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "No hay sugerencias."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-border bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-display font-bold uppercase",
						children: s.nombre
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							s.disciplina ?? "—",
							" · ",
							s.organizacion ?? "—"
						]
					}),
					s.url_perfil && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.url_perfil,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "mt-1 inline-block text-xs underline",
						style: { color: "var(--color-blood)" },
						children: s.url_perfil
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => approveSuggestion(s),
							className: "flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold uppercase text-white",
							style: { background: "var(--color-blood)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Crear"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => rejectSuggestion(s.id),
							className: "flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Rechazar"]
						})]
					})
				]
			}, s.id))
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
		className: "text-display mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground",
		children: [
			"Peleadores pendientes verificación (",
			pending.length,
			")"
		]
	}), pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: "Nada pendiente."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: pending.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3 rounded-lg border border-border bg-surface p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-display truncate font-bold uppercase",
						children: f.nombre
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: [
							f.disciplinas.join("/"),
							" · ",
							f.organizacion ?? "—"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => approveFighter(f.id),
					className: "rounded-md px-3 py-1.5 text-xs font-semibold uppercase text-white",
					style: { background: "var(--color-blood)" },
					children: "Aprobar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => deleteFighter(f.id),
					className: "rounded-md border border-border p-1.5 text-muted-foreground",
					"aria-label": "Eliminar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})
			]
		}, f.id))
	})] })] });
}
function Wrap({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24 text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur",
			style: { paddingTop: "env(safe-area-inset-top)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-md items-center gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/peleadores",
					"aria-label": "Atrás",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display text-lg font-bold uppercase",
					children: "Admin · Peleadores"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-md px-4 py-4",
			children
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFighters, {}) });
//#endregion
export { SplitComponent as component };
