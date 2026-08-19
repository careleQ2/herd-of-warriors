import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-C0vsFf8u.mjs";
import { t as AppShell } from "./AppShell-C4Gs5n5h.mjs";
import { t as FightersPage } from "./peleadores.index-gre4L_Lf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-Bl6NDY2j.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
	title: "FAVORITOS",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightersPage, {
		favoritesOnly: true,
		title: "FAVORITOS"
	})
}) });
//#endregion
export { SplitComponent as component };
