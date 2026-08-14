import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BzAhCXBd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { P as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { C as Check } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-D_rmb_Ao.mjs";
import { t as WolfIcon } from "./WolfIcon-Dk8z0ht8.mjs";
import { t as DISCIPLINES } from "./preferences-GFf26OS6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-D4qYTE4h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const navigate = useNavigate();
	const { user } = useSession();
	const { t } = useLanguage();
	const [step, setStep] = (0, import_react.useState)(1);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [orgIds, setOrgIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [allOrgs, setAllOrgs] = (0, import_react.useState)([]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("disciplines,organizations").eq("id", user.id).maybeSingle().then(({ data }) => {
			if (Array.isArray(data?.disciplines) && data.disciplines.length > 0) setSelected(new Set(data.disciplines));
			if (Array.isArray(data?.organizations)) setOrgIds(new Set(data.organizations));
		});
	}, [user]);
	(0, import_react.useEffect)(() => {
		supabase.from("organizations").select("id,nombre,abreviatura,disciplinas").order("nombre").then(({ data }) => setAllOrgs(data ?? []));
	}, []);
	const availableOrgs = (0, import_react.useMemo)(() => allOrgs.filter((o) => o.disciplinas.some((d) => selected.has(d))), [allOrgs, selected]);
	const toggle = (id) => {
		setSelected((prev) => {
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
	const canContinue = selected.size >= 1;
	const goStep2 = () => {
		if (!canContinue) return;
		const valid = new Set(availableOrgs.map((o) => o.id));
		setOrgIds((prev) => new Set(Array.from(prev).filter((id) => valid.has(id))));
		setStep(2);
	};
	const finish = async () => {
		if (!user || saving) return;
		setSaving(true);
		setError(null);
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			disciplines: Array.from(selected),
			organizations: Array.from(orgIds)
		}, { onConflict: "id" });
		setSaving(false);
		if (error) {
			setError(error.message);
			return;
		}
		navigate({ to: "/feed" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		style: {
			paddingTop: "env(safe-area-inset-top)",
			paddingBottom: "env(safe-area-inset-bottom)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md flex-1 px-5 pt-10 pb-6 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WolfIcon, {
							className: "h-5 w-5",
							style: { color: "var(--color-blood)" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display text-xs font-bold tracking-[0.25em]",
							children: "HERD OF WARRIORS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] text-muted-foreground uppercase tracking-widest",
						children: [
							t("onboarding.step"),
							" ",
							step,
							" ",
							t("onboarding.of"),
							" 2"
						]
					})]
				})
			}), step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-display text-4xl font-bold leading-[1.05]",
						children: [
							t("onboarding.disciplines.title"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--color-blood)" },
								children: t("onboarding.disciplines.title.accent")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: t("onboarding.disciplines.sub")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2.5 flex-1",
					children: DISCIPLINES.map((d) => {
						const active = selected.has(d.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(d.id),
							className: "relative flex h-20 items-center justify-center rounded-lg border px-3 text-display text-sm font-bold transition-all active:scale-[0.98]",
							style: {
								borderColor: active ? "var(--color-blood)" : "var(--color-border)",
								background: active ? "color-mix(in oklab, var(--color-blood) 15%, transparent)" : "var(--color-surface)",
								color: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
								boxShadow: active ? "var(--shadow-blood)" : "none"
							},
							children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full",
								style: { background: "var(--color-blood)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "h-3 w-3",
									style: { color: "var(--color-blood-foreground)" }
								})
							}), d.label]
						}, d.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canContinue,
						onClick: goStep2,
						className: "w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider transition-all disabled:opacity-40",
						style: {
							background: canContinue ? "var(--gradient-blood)" : "var(--color-surface-elevated)",
							color: "var(--color-blood-foreground)",
							boxShadow: canContinue ? "var(--shadow-blood)" : "none"
						},
						children: t("onboarding.continue")
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-display text-4xl font-bold leading-[1.05]",
						children: [
							t("onboarding.orgs.title"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--color-blood)" },
								children: t("onboarding.orgs.title.accent")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: t("onboarding.orgs.sub")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto",
					children: availableOrgs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-border bg-surface px-3 py-4 text-xs text-muted-foreground",
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-2",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs",
							style: { color: "var(--color-blood)" },
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: saving,
							onClick: finish,
							className: "w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider transition-all disabled:opacity-40",
							style: {
								background: "var(--gradient-blood)",
								color: "var(--color-blood-foreground)",
								boxShadow: "var(--shadow-blood)"
							},
							children: saving ? t("settings.saving") : t("onboarding.enter")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStep(1),
							className: "w-full py-2 text-xs text-muted-foreground hover:text-foreground",
							children: [
								"← ",
								t("onboarding.step"),
								" 1"
							]
						})
					]
				})
			] })]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}) });
//#endregion
export { SplitComponent as component };
