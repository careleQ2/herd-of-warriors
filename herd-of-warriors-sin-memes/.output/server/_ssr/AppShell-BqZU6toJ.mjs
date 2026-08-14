import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Settings } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-D_rmb_Ao.mjs";
import { t as WolfIcon } from "./WolfIcon-Dk8z0ht8.mjs";
import { t as BottomNav } from "./BottomNav-CtwjdKIR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-BqZU6toJ.js
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ title, children }) {
	const { t } = useLanguage();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur",
				style: { paddingTop: "env(safe-area-inset-top)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-md items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WolfIcon, {
							className: "h-6 w-6 shrink-0",
							style: {
								color: "var(--color-blood)",
								filter: "drop-shadow(var(--shadow-blood))"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display text-sm font-bold tracking-widest truncate",
							children: "HERD OF WARRIORS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ajustes",
						"aria-label": t("common.settings"),
						className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-md px-4 pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-display text-2xl font-bold",
						children: title
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
				children
			}, pathname),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
//#endregion
export { AppShell as t };
