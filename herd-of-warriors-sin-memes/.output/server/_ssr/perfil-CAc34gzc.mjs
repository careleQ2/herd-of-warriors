import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BzAhCXBd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { t as useLanguage } from "./i18n-D_rmb_Ao.mjs";
import { t as AppShell } from "./AppShell-BqZU6toJ.mjs";
import { t as DISCIPLINES } from "./preferences-GFf26OS6.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as getFighterImageUrl } from "./fighter-images-aKXZBTV1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-CAc34gzc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Perfil() {
	const { user } = useSession();
	const { t } = useLanguage();
	const [fighters, setFighters] = (0, import_react.useState)(null);
	const [orgs, setOrgs] = (0, import_react.useState)(null);
	const [disciplines, setDisciplines] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const [ff, of, pf] = await Promise.all([
				supabase.from("fighter_follows").select("fighter_id").eq("user_id", user.id),
				supabase.from("organization_follows").select("organization_id").eq("user_id", user.id),
				supabase.from("profiles").select("disciplines").eq("id", user.id).maybeSingle()
			]);
			const fIds = (ff.data ?? []).map((r) => r.fighter_id);
			const oIds = (of.data ?? []).map((r) => r.organization_id);
			setDisciplines(pf.data?.disciplines ?? []);
			if (fIds.length) {
				const { data } = await supabase.from("fighters").select("id,nombre,apodo,foto_url").in("id", fIds);
				setFighters(data ?? []);
			} else setFighters([]);
			if (oIds.length) {
				const { data } = await supabase.from("organizations").select("id,nombre,abreviatura").in("id", oIds);
				setOrgs(data ?? []);
			} else setOrgs([]);
		})();
	}, [user]);
	const disciplineLabels = disciplines.map((id) => DISCIPLINES.find((d) => d.id === id)?.label ?? id).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: t("profile.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-display text-sm font-bold uppercase tracking-wider",
						children: t("profile.disciplines")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ajustes",
						className: "text-[10px] font-bold uppercase tracking-widest",
						style: { color: "var(--color-blood)" },
						children: t("profile.edit")
					})]
				}), disciplineLabels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("profile.empty.disciplines")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: disciplineLabels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold",
						children: l
					}, l))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-display text-sm font-bold uppercase tracking-wider",
					children: t("profile.fighters")
				}), fighters === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-lg" }, i))
				}) : fighters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("profile.empty.fighters")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-3 gap-2",
					children: fighters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/peleadores/$id",
						params: { id: f.id },
						className: "block overflow-hidden rounded-lg border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square w-full bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getFighterImageUrl(f.nombre),
								alt: f.nombre,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate p-1.5 text-[10px] font-semibold uppercase tracking-wide",
							children: f.apodo || f.nombre
						})]
					}) }, f.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-display text-sm font-bold uppercase tracking-wider",
					children: t("profile.orgs")
				}), orgs === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 rounded-md" }, i))
				}) : orgs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("profile.empty.orgs")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-1.5",
					children: orgs.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
						style: {
							borderColor: "var(--color-blood)",
							color: "var(--color-foreground)"
						},
						children: o.abreviatura || o.nombre
					}) }, o.id))
				})] })
			]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perfil, {}) });
//#endregion
export { SplitComponent as component };
