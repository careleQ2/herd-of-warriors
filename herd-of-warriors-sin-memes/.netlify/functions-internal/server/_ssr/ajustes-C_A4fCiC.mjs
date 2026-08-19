import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession, t as signOut } from "./auth-D-ETUnuX.mjs";
import { P as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-C0vsFf8u.mjs";
import { C as Check, S as ChevronRight, _ as LogOut, g as Mail, i as User } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-omL9hm4E.mjs";
import { t as AppShell } from "./AppShell-C4Gs5n5h.mjs";
import { t as DISCIPLINES } from "./preferences-GFf26OS6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ajustes-C_A4fCiC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AjustesPage() {
	const { user } = useSession();
	const { t, lang, setLang } = useLanguage();
	const navigate = useNavigate();
	const [disciplinas, setDisciplinas] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [orgIds, setOrgIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [allOrgs, setAllOrgs] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [savedFlash, setSavedFlash] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("organizations").select("id,nombre,abreviatura,disciplinas").order("nombre").then(({ data }) => setAllOrgs(data ?? []));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("disciplines,organizations,language").eq("id", user.id).maybeSingle().then(({ data }) => {
			if (!data) return;
			if (Array.isArray(data.disciplines)) setDisciplinas(new Set(data.disciplines));
			if (Array.isArray(data.organizations)) setOrgIds(new Set(data.organizations));
		});
	}, [user]);
	const availableOrgs = (0, import_react.useMemo)(() => allOrgs.filter((o) => o.disciplinas.some((d) => disciplinas.has(d))), [allOrgs, disciplinas]);
	(0, import_react.useEffect)(() => {
		setOrgIds((prev) => {
			const validIds = new Set(availableOrgs.map((o) => o.id));
			let changed = false;
			const next = /* @__PURE__ */ new Set();
			prev.forEach((id) => {
				if (validIds.has(id)) next.add(id);
				else changed = true;
			});
			return changed ? next : prev;
		});
	}, [availableOrgs]);
	const toggleDiscipline = (id) => {
		setDisciplinas((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};
	const toggleOrg = (id) => {
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
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			disciplines: Array.from(disciplinas),
			organizations: Array.from(orgIds),
			language: lang
		}, { onConflict: "id" });
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
		navigate({
			to: "/",
			replace: true
		});
	};
	const [suggestion, setSuggestion] = (0, import_react.useState)("");
	const suggestionMailto = `mailto:sugerencias@herdofwarriors.app?subject=${encodeURIComponent("Sugerencia Herd of Warriors")}&body=${encodeURIComponent(suggestion || "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: t("settings.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/perfil",
					className: "flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-3 active:scale-[0.99] transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
							style: { background: "color-mix(in oklab, var(--color-blood) 18%, transparent)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								className: "h-4 w-4",
								style: { color: "var(--color-blood)" }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-bold",
								children: t("settings.profile")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-[11px] text-muted-foreground",
								children: t("settings.profile.hint")
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-display text-sm font-bold uppercase tracking-wider",
							children: t("settings.disciplines")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: disciplinas.size
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: t("settings.disciplines.hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-1.5",
						children: DISCIPLINES.map((d) => {
							const active = disciplinas.has(d.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleDiscipline(d.id),
								className: "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-[0.97]",
								style: {
									borderColor: active ? "var(--color-blood)" : "var(--color-border)",
									background: active ? "color-mix(in oklab, var(--color-blood) 18%, transparent)" : "var(--color-surface)",
									color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)"
								},
								children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "h-3 w-3",
									style: { color: "var(--color-blood)" }
								}), d.label]
							}) }, d.id);
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-display text-sm font-bold uppercase tracking-wider",
							children: t("settings.orgs")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: orgIds.size
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: t("settings.orgs.hint")
					}),
					availableOrgs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-border bg-surface px-3 py-3 text-xs text-muted-foreground",
						children: t("settings.orgs.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border rounded-md border border-border bg-surface",
						children: availableOrgs.map((o) => {
							const active = orgIds.has(o.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleOrg(o.id),
								className: "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: o.nombre
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[10px] uppercase tracking-wider text-muted-foreground",
										children: o.disciplinas.join(" · ")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
									style: {
										borderColor: active ? "var(--color-blood)" : "var(--color-border)",
										background: active ? "var(--color-blood)" : "transparent"
									},
									children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "h-3 w-3",
										style: { color: "var(--color-blood-foreground)" }
									})
								})]
							}) }, o.id);
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-display text-sm font-bold uppercase tracking-wider",
					children: t("settings.language")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: ["es", "en"].map((code) => {
						const active = lang === code;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLang(code),
							className: "rounded-md border py-2.5 text-sm font-semibold transition-all",
							style: {
								borderColor: active ? "var(--color-blood)" : "var(--color-border)",
								background: active ? "color-mix(in oklab, var(--color-blood) 18%, transparent)" : "var(--color-surface)",
								color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)"
							},
							children: code === "es" ? "Español" : "English"
						}, code);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-display text-sm font-bold uppercase tracking-wider",
						children: t("settings.suggestions")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: t("settings.suggestions.hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: suggestion,
						onChange: (e) => setSuggestion(e.target.value),
						placeholder: t("settings.suggestions.placeholder"),
						rows: 4,
						className: "w-full resize-none rounded-md border border-border bg-surface p-3 text-sm outline-none focus:border-[var(--color-blood)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: suggestionMailto,
						className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface py-2.5 text-xs font-bold uppercase tracking-widest active:scale-[0.99]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "h-3.5 w-3.5",
							style: { color: "var(--color-blood)" }
						}), t("settings.suggestions.send")]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky bottom-20 -mx-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur",
					children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-center text-xs",
						style: { color: "var(--color-blood)" },
						children: error
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: save,
						disabled: saving,
						className: "w-full rounded-lg py-3.5 text-display text-sm font-bold uppercase tracking-wider disabled:opacity-40",
						style: {
							background: "var(--gradient-blood)",
							color: "var(--color-blood-foreground)",
							boxShadow: "var(--shadow-blood)"
						},
						children: saving ? t("settings.saving") : savedFlash ? `✓ ${t("settings.saved")}` : t("settings.save")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleSignOut,
					className: "mx-auto flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), t("settings.logout")]
				})
			]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AjustesPage, {}) });
//#endregion
export { SplitComponent as component };
