import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BI7FBpQg.js
var $$splitComponentImporter = () => import("./auth-B2nYy3rJ.mjs");
var searchSchema = objectType({ mode: enumType(["login", "signup"]).optional().default("signup") });
var Route = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Acceso — Herd of Warriors" }, {
		name: "description",
		content: "Crea tu cuenta o inicia sesión."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
