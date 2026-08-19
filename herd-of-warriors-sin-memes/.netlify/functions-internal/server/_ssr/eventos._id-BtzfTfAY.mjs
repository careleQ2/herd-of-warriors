import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-C0vsFf8u.mjs";
import { D as ArrowLeft, a as Tv, c as Swords, h as MapPin } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-omL9hm4E.mjs";
import { t as AppShell } from "./AppShell-C4Gs5n5h.mjs";
import { t as Route } from "./eventos._id-Bg60KsEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eventos._id-BtzfTfAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pad(n) {
	return String(n).padStart(2, "0");
}
function toICSDate(d) {
	return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}
function downloadICS(event) {
	const start = new Date(event.fecha);
	const end = new Date(start.getTime() + 10800 * 1e3);
	const ics = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Herd of Warriors//ES",
		"BEGIN:VEVENT",
		`UID:${event.id}@herdofwarriors`,
		`DTSTAMP:${toICSDate(/* @__PURE__ */ new Date())}`,
		`DTSTART:${toICSDate(start)}`,
		`DTEND:${toICSDate(end)}`,
		`SUMMARY:${event.nombre}`,
		`LOCATION:${event.ubicacion ?? ""}`,
		`DESCRIPTION:${(event.combate_principal ?? "") + (event.donde_verlo ? " — " + event.donde_verlo : "")}`,
		"END:VEVENT",
		"END:VCALENDAR"
	].join("\r\n");
	const blob = new Blob([ics], { type: "text/calendar" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${event.nombre.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function EventDetail() {
	const { id } = Route.useParams();
	const { t, lang } = useLanguage();
	const locale = lang === "en" ? "en-US" : "es-ES";
	const [event, setEvent] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("events").select("*, organizations(nombre,abreviatura)").eq("id", id).maybeSingle();
			setEvent(data);
			setLoading(false);
		})();
	}, [id]);
	const title = lang === "en" ? "Event" : "Evento";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("common.loading")
		})
	});
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("events.notFound")
		})
	});
	const d = new Date(event.fecha);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/eventos",
				className: "mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }),
					" ",
					t("events.back")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
						children: event.organizations?.abreviatura || event.organizations?.nombre || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-2xl font-black leading-tight",
						children: event.nombre
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						style: { color: "var(--color-blood)" },
						children: [
							d.toLocaleDateString(locale, {
								weekday: "long",
								day: "numeric",
								month: "long",
								year: "numeric"
							}),
							" ·",
							" ",
							d.toLocaleTimeString(locale, {
								hour: "2-digit",
								minute: "2-digit"
							})
						]
					}),
					event.ubicacion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
							" ",
							event.ubicacion
						]
					}),
					event.donde_verlo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-4 w-4" }),
							" ",
							event.donde_verlo
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => downloadICS(event),
						className: "mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg active:scale-[0.98]",
						style: {
							background: "var(--color-blood)",
							boxShadow: "0 4px 20px rgba(204,0,0,0.4)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {
							className: "h-5 w-5",
							strokeWidth: 2.5
						}), t("events.addToCalendar")]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: t("events.fullCard")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2",
				children: [event.cartelera.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("events.cardTBD")
				}), event.cartelera.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wide",
							style: { color: "var(--color-blood)" },
							children: f.tipo || t("events.fight")
						}), f.categoria && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-wide text-muted-foreground",
							children: f.categoria
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display font-bold leading-tight",
						children: f.peleadores
					})]
				}, i))]
			})] })
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDetail, {}) });
//#endregion
export { SplitComponent as component };
