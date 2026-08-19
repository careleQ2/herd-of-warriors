import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useSession } from "./auth-D-ETUnuX.mjs";
import { P as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ArrowLeft, g as Mail, v as Lock } from "../_libs/lucide-react.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as Route } from "./auth-BI7FBpQg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B2nYy3rJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var credSchema = objectType({
	email: stringType().trim().email("Correo inválido").max(255),
	password: stringType().min(6, "Mínimo 6 caracteres").max(72)
});
function AuthPage() {
	const { mode: initialMode } = Route.useSearch();
	const navigate = useNavigate();
	const { session } = useSession();
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (session) navigate({
			to: "/",
			replace: true
		});
	}, [session, navigate]);
	const submit = async (e) => {
		e.preventDefault();
		setError(null);
		const parsed = credSchema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Datos inválidos");
			return;
		}
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email: parsed.data.email,
					password: parsed.data.password,
					options: { emailRedirectTo: `${window.location.origin}/` }
				});
				if (error) throw error;
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: parsed.data.email,
					password: parsed.data.password
				});
				if (error) throw error;
			}
			navigate({
				to: "/",
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Algo salió mal");
		} finally {
			setLoading(false);
		}
	};
	const google = async () => {
		setError(null);
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: `${window.location.origin}/` }
			});
			if (error) throw error;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error con Google");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		style: {
			paddingTop: "env(safe-area-inset-top)",
			paddingBottom: "env(safe-area-inset-bottom)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md flex-1 px-6 pt-6 pb-8 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Volver"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 text-display text-3xl font-bold uppercase",
					children: mode === "signup" ? "Únete a la manada" : "Bienvenido de vuelta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: mode === "signup" ? "Crea tu cuenta gratis." : "Inicia sesión para continuar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 rounded-lg p-1",
					style: { background: "var(--color-surface)" },
					children: ["signup", "login"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(m),
						className: "rounded-md py-2 text-xs font-bold uppercase tracking-wider transition",
						style: {
							background: mode === m ? "var(--color-blood)" : "transparent",
							color: mode === m ? "var(--color-blood-foreground)" : "var(--color-muted-foreground)"
						},
						children: m === "signup" ? "Registro" : "Login"
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-5 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								inputMode: "email",
								autoComplete: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "tu@correo.com",
								className: "w-full rounded-lg border bg-transparent pl-10 pr-3 py-3 text-sm outline-none focus:border-[var(--color-blood)]",
								style: { borderColor: "var(--color-border)" }
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoComplete: mode === "signup" ? "new-password" : "current-password",
								required: true,
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Contraseña",
								className: "w-full rounded-lg border bg-transparent pl-10 pr-3 py-3 text-sm outline-none focus:border-[var(--color-blood)]",
								style: { borderColor: "var(--color-border)" }
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs",
							style: { color: "var(--color-blood)" },
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "mt-2 w-full rounded-lg py-3.5 text-display text-sm font-bold uppercase tracking-wider disabled:opacity-50",
							style: {
								background: "var(--gradient-blood)",
								color: "var(--color-blood-foreground)",
								boxShadow: "var(--shadow-blood)"
							},
							children: loading ? "..." : mode === "signup" ? "Crear cuenta" : "Entrar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px flex-1",
							style: { background: "var(--color-border)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "o"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px flex-1",
							style: { background: "var(--color-border)" }
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: google,
					disabled: loading,
					className: "w-full rounded-lg border py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50",
					style: {
						borderColor: "var(--color-border)",
						background: "#fff",
						color: "#000"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continuar con Google"]
				})
			]
		})
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.1A6.97 6.97 0 0 1 5.46 12c0-.73.13-1.44.36-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
