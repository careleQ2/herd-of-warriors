import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-D-ETUnuX.mjs";
import { P as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as WolfIcon } from "./WolfIcon-Dk8z0ht8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CFg8RIr8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SwordIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 3 L38 9 L38 42 L32 48 L26 42 L26 9 Z",
				fill: "currentColor",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "32",
				y1: "8",
				x2: "32",
				y2: "42",
				stroke: "rgba(0,0,0,0.35)",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 46 L50 46 L48 50 L16 50 Z",
				fill: "#CC0000",
				stroke: "#CC0000",
				strokeWidth: "1",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "29.5",
				y: "50",
				width: "5",
				height: "9",
				fill: "#2a2a2a",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "61",
				r: "2.5",
				fill: "#CC0000"
			})
		]
	});
}
function Welcome() {
	const { session, loading } = useSession();
	const navigate = useNavigate();
	const [splashDone, setSplashDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setSplashDone(true), 1100);
		return () => clearTimeout(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (loading || !session || !splashDone) return;
		(async () => {
			const { data } = await supabase.from("profiles").select("disciplines").eq("id", session.user.id).maybeSingle();
			navigate({
				to: Array.isArray(data?.disciplines) && data.disciplines.length > 0 ? "/feed" : "/onboarding",
				replace: true
			});
		})();
	}, [
		session,
		loading,
		navigate,
		splashDone
	]);
	if (!splashDone || loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		style: {
			paddingTop: "env(safe-area-inset-top)",
			paddingBottom: "env(safe-area-inset-bottom)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md flex-1 px-6 py-10 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WolfIcon, {
						className: "h-5 w-5",
						style: { color: "var(--color-blood)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-display text-xs font-bold tracking-[0.25em]",
						children: "HERD OF WARRIORS"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl",
							style: {
								background: "var(--gradient-blood)",
								boxShadow: "var(--shadow-blood)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WolfIcon, {
								className: "h-12 w-12",
								style: { color: "var(--color-blood-foreground)" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-display text-5xl font-bold leading-[0.95] uppercase",
							children: [
								"Herd",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "var(--color-blood)" },
									children: "warriors"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base text-muted-foreground",
							children: "MMA, boxeo, BJJ, muay thai y todas las artes marciales. En un solo lugar."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						className: "w-full rounded-lg py-4 text-display text-base font-bold uppercase tracking-wider text-center",
						style: {
							background: "var(--gradient-blood)",
							color: "var(--color-blood-foreground)",
							boxShadow: "var(--shadow-blood)"
						},
						children: "Crear cuenta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { mode: "login" },
						className: "w-full rounded-lg border py-4 text-display text-base font-bold uppercase tracking-wider text-center",
						style: {
							borderColor: "var(--color-border)",
							color: "var(--color-foreground)"
						},
						children: "Iniciar sesión"
					})]
				})
			]
		})
	});
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
		style: {
			paddingTop: "env(safe-area-inset-top)",
			paddingBottom: "env(safe-area-inset-bottom)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex h-40 w-40 items-center justify-center rounded-3xl",
				style: {
					background: "var(--gradient-blood)",
					boxShadow: "var(--shadow-blood)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwordIcon, { className: "h-24 w-24 animate-[sword-in_900ms_ease-out_both] text-white drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WolfIcon, {
					className: "h-4 w-4",
					style: { color: "var(--color-blood)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-display text-[11px] font-bold tracking-[0.28em] text-foreground",
					children: "HERD OF WARRIORS"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes sword-in {
          0% { transform: translateY(-30px) rotate(-25deg) scale(0.6); opacity: 0; }
          60% { transform: translateY(6px) rotate(3deg) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
        }
      ` })
		]
	});
}
//#endregion
export { Welcome as component };
