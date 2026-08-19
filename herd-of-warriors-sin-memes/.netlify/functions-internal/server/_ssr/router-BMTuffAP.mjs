import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as WifiOff } from "../_libs/lucide-react.mjs";
import { t as Route$13 } from "./auth-BI7FBpQg.mjs";
import { t as Route$14 } from "./eventos._id-Bg60KsEV.mjs";
import { n as Route$15 } from "./peleadores.index-gre4L_Lf.mjs";
import { t as Route$16 } from "./peleadores._id-DNNqHNAq.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BMTuffAP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-hHcf5Hp7.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function OfflineBanner() {
	const [online, setOnline] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof navigator === "undefined") return;
		setOnline(navigator.onLine);
		const up = () => setOnline(true);
		const down = () => setOnline(false);
		window.addEventListener("online", up);
		window.addEventListener("offline", down);
		return () => {
			window.removeEventListener("online", up);
			window.removeEventListener("offline", down);
		};
	}, []);
	if (online) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest animate-in slide-in-from-top duration-300",
		style: {
			background: "var(--color-blood)",
			color: "var(--color-blood-foreground)",
			paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)"
		},
		role: "alert",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sin conexión a internet" })]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#0A0A0A"
			},
			{ title: "Herd of Warriors" },
			{
				name: "description",
				content: "para guerreros"
			},
			{
				property: "og:title",
				content: "Herd of Warriors"
			},
			{
				property: "og:description",
				content: "para guerreros"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Herd of Warriors"
			},
			{
				name: "twitter:description",
				content: "para guerreros"
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3537efcf-15a5-40cf-a292-dd2c5b299768"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3537efcf-15a5-40cf-a292-dd2c5b299768"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon-wolf.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
				integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
				crossOrigin: ""
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBanner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
var $$splitComponentImporter$11 = () => import("./siguiendo-CbuulAM5.mjs");
var Route$11 = createFileRoute("/siguiendo")({
	head: () => ({ meta: [{ title: "Siguiendo — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./perfil-CzhUrjvA.mjs");
var Route$10 = createFileRoute("/perfil")({
	head: () => ({ meta: [{ title: "Mi perfil — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./peleadores-BFAEHosH.mjs");
var Route$9 = createFileRoute("/peleadores")({
	head: () => ({ meta: [{ title: "Fighters — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./onboarding-B1JeRhkl.mjs");
var Route$8 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Elige tu estilo — Herd of Warriors" }, {
		name: "description",
		content: "Selecciona tus disciplinas y organizaciones favoritas."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./noticias-B0aUN3ON.mjs");
var Route$7 = createFileRoute("/noticias")({
	head: () => ({ meta: [{ title: "Noticias — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./gimnasios-360pLFWQ.mjs");
var Route$6 = createFileRoute("/gimnasios")({
	head: () => ({ meta: [{ title: "Gimnasios — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./feed-06Q45gqR.mjs");
var Route$5 = createFileRoute("/feed")({
	head: () => ({ meta: [{ title: "Feed — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./favoritos-Bl6NDY2j.mjs");
var Route$4 = createFileRoute("/favoritos")({
	head: () => ({ meta: [{ title: "Favoritos — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./ajustes-C_A4fCiC.mjs");
var Route$3 = createFileRoute("/ajustes")({
	head: () => ({ meta: [{ title: "Ajustes — Herd of Warriors" }, {
		name: "description",
		content: "Gestiona tus disciplinas, organizaciones e idioma."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./routes-CFg8RIr8.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Herd of Warriors" }, {
		name: "description",
		content: "Tu casa para MMA, boxeo, BJJ, muay thai y todas las artes marciales."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./eventos.index-D5YTniO2.mjs");
var Route$1 = createFileRoute("/eventos/")({
	head: () => ({ meta: [{ title: "Eventos — Herd of Warriors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.fighters-B-c0o-7V.mjs");
var Route = createFileRoute("/admin/fighters")({
	head: () => ({ meta: [{ title: "Admin · Peleadores" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SiguiendoRoute = Route$11.update({
	id: "/siguiendo",
	path: "/siguiendo",
	getParentRoute: () => Route$12
});
var PerfilRoute = Route$10.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => Route$12
});
var PeleadoresRoute = Route$9.update({
	id: "/peleadores",
	path: "/peleadores",
	getParentRoute: () => Route$12
});
var OnboardingRoute = Route$8.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$12
});
var NoticiasRoute = Route$7.update({
	id: "/noticias",
	path: "/noticias",
	getParentRoute: () => Route$12
});
var GimnasiosRoute = Route$6.update({
	id: "/gimnasios",
	path: "/gimnasios",
	getParentRoute: () => Route$12
});
var FeedRoute = Route$5.update({
	id: "/feed",
	path: "/feed",
	getParentRoute: () => Route$12
});
var FavoritosRoute = Route$4.update({
	id: "/favoritos",
	path: "/favoritos",
	getParentRoute: () => Route$12
});
var AuthRoute = Route$13.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$12
});
var AjustesRoute = Route$3.update({
	id: "/ajustes",
	path: "/ajustes",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var PeleadoresIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => PeleadoresRoute
});
var EventosIndexRoute = Route$1.update({
	id: "/eventos/",
	path: "/eventos/",
	getParentRoute: () => Route$12
});
var PeleadoresIdRoute = Route$16.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PeleadoresRoute
});
var EventosIdRoute = Route$14.update({
	id: "/eventos/$id",
	path: "/eventos/$id",
	getParentRoute: () => Route$12
});
var AdminFightersRoute = Route.update({
	id: "/admin/fighters",
	path: "/admin/fighters",
	getParentRoute: () => Route$12
});
var PeleadoresRouteChildren = {
	PeleadoresIdRoute,
	PeleadoresIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AjustesRoute,
	AuthRoute,
	FavoritosRoute,
	FeedRoute,
	GimnasiosRoute,
	NoticiasRoute,
	OnboardingRoute,
	PeleadoresRoute: PeleadoresRoute._addFileChildren(PeleadoresRouteChildren),
	PerfilRoute,
	SiguiendoRoute,
	AdminFightersRoute,
	EventosIdRoute,
	EventosIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
