import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-BxGkWxTs.mjs";
import { t as AppShell } from "./AppShell-BqZU6toJ.mjs";
import { t as FightersPage } from "./peleadores.index-D_DhxW6z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-Chymq85M.js
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
