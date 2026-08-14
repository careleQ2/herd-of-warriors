import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-ieyMJtkN.mjs";
import { P as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthGate-BxGkWxTs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthGate({ children }) {
	const { session, loading } = useSession();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({
			to: "/",
			replace: true
		});
	}, [
		loading,
		session,
		navigate
	]);
	if (loading || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-8 w-8 rounded-full border-2 border-t-transparent animate-spin",
			style: {
				borderColor: "var(--color-blood)",
				borderTopColor: "transparent"
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { AuthGate as t };
