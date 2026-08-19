import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CxXRxhL3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AuthGate } from "./AuthGate-C0vsFf8u.mjs";
import { b as Globe, h as MapPin, m as Phone, y as Locate } from "../_libs/lucide-react.mjs";
import { t as useLanguage } from "./i18n-omL9hm4E.mjs";
import { t as AppShell } from "./AppShell-C4Gs5n5h.mjs";
import { a as DrawerTitle, i as DrawerHeader, r as DrawerContent, t as Drawer$1 } from "./drawer-JLYUgSll.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gimnasios-360pLFWQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DISCIPLINE_COLORS = {
	MMA: "#CC0000",
	Boxeo: "#F5F5F5",
	BJJ: "#3B82F6",
	"Muay Thai": "#F59E0B",
	Kickboxing: "#8B5CF6",
	Grappling: "#10B981"
};
function colorFor(disciplines, activeFilter) {
	if (activeFilter && activeFilter !== "all" && disciplines.includes(activeFilter)) return DISCIPLINE_COLORS[activeFilter] ?? "#CC0000";
	for (const d of disciplines) if (DISCIPLINE_COLORS[d]) return DISCIPLINE_COLORS[d];
	return "#CC0000";
}
var MADRID = [40.4168, -3.7038];
function GimnasiosView() {
	const { t } = useLanguage();
	const [gyms, setGyms] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [discipline, setDiscipline] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [userPos, setUserPos] = (0, import_react.useState)(null);
	const mapRef = (0, import_react.useRef)(null);
	const mapInstance = (0, import_react.useRef)(null);
	const markersLayer = (0, import_react.useRef)(null);
	const userMarker = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("gyms").select("*").then(({ data }) => {
			setGyms(data ?? []);
			setLoading(false);
		});
	}, []);
	const disciplines = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		gyms.forEach((g) => g.disciplinas.forEach((d) => set.add(d)));
		return Array.from(set).sort();
	}, [gyms]);
	const filtered = (0, import_react.useMemo)(() => discipline === "all" ? gyms : gyms.filter((g) => g.disciplinas.includes(discipline)), [gyms, discipline]);
	(0, import_react.useEffect)(() => {
		if (!mapRef.current || mapInstance.current) return;
		let cancelled = false;
		(async () => {
			const L = (await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
			if (cancelled || !mapRef.current) return;
			const map = L.map(mapRef.current, {
				center: MADRID,
				zoom: 12,
				zoomControl: true
			});
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
				attribution: "© OpenStreetMap © CARTO",
				maxZoom: 20,
				detectRetina: true,
				className: "how-tiles-base"
			}).addTo(map);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
				maxZoom: 20,
				detectRetina: true,
				pane: "overlayPane",
				className: "how-tiles-labels"
			}).addTo(map);
			mapInstance.current = map;
			markersLayer.current = L.layerGroup().addTo(map);
			setTimeout(() => map.invalidateSize(), 100);
		})();
		return () => {
			cancelled = true;
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mapInstance.current || !markersLayer.current) return;
		(async () => {
			const L = (await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
			markersLayer.current.clearLayers();
			filtered.forEach((g) => {
				const color = colorFor(g.disciplinas, discipline);
				const icon = L.divIcon({
					className: "how-pin",
					html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:2px solid #0A0A0A;box-shadow:0 0 0 2px ${color}55;"></div>`,
					iconSize: [22, 22],
					iconAnchor: [11, 11]
				});
				L.marker([g.latitud, g.longitud], { icon }).addTo(markersLayer.current).on("click", () => setSelected(g));
			});
		})();
	}, [filtered, discipline]);
	const locateMe = () => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition(async (pos) => {
			const p = [pos.coords.latitude, pos.coords.longitude];
			setUserPos(p);
			const L = (await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
			if (mapInstance.current) {
				mapInstance.current.setView(p, 13);
				if (userMarker.current) userMarker.current.remove();
				userMarker.current = L.circleMarker(p, {
					radius: 8,
					color: "#fff",
					weight: 2,
					fillColor: "#CC0000",
					fillOpacity: 1
				}).addTo(mapInstance.current);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: t("gyms.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 overflow-x-auto pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: locateMe,
						className: "shrink-0 inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground",
						"aria-label": t("gyms.locate"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locate, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: discipline === "all",
						onClick: () => setDiscipline("all"),
						label: t("gyms.all")
					}),
					disciplines.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: discipline === d,
						onClick: () => setDiscipline(d),
						label: d,
						color: DISCIPLINE_COLORS[d]
					}, d))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: mapRef,
				className: "w-full rounded-lg border border-border overflow-hidden",
				style: {
					height: "60vh",
					background: "#0A0A0A"
				}
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: t("gyms.loading")
			}),
			!loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: t("gyms.empty")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: filtered.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelected(g),
					className: "w-full rounded-md border border-border bg-surface p-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: g.nombre
						}), g.precio_mensual != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								g.precio_mensual,
								"€",
								t("gyms.perMonth")
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex flex-wrap gap-1",
						children: g.disciplinas.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
							style: {
								background: `${DISCIPLINE_COLORS[d] ?? "#CC0000"}22`,
								color: DISCIPLINE_COLORS[d] ?? "#CC0000"
							},
							children: d
						}, d))
					})]
				}) }, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GymSheet, {
				gym: selected,
				onClose: () => setSelected(null)
			}),
			userPos && null
		]
	});
}
function Chip({ active, onClick, label, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
		style: {
			borderColor: active ? "var(--color-blood)" : "var(--color-border)",
			background: active ? "var(--color-blood)" : "var(--color-surface)",
			color: active ? "#fff" : "var(--color-foreground)"
		},
		children: [color && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mr-1 inline-block h-2 w-2 rounded-full align-middle",
			style: { background: color }
		}), label]
	});
}
function GymSheet({ gym, onClose }) {
	const { t } = useLanguage();
	const [idx, setIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => setIdx(0), [gym?.id]);
	if (!gym) return null;
	const photos = gym.fotos && gym.fotos.length > 0 ? gym.fotos : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open: !!gym,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "max-h-[85vh]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, {
				className: "text-display text-xl",
				children: gym.nombre
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pb-6 overflow-y-auto",
				children: [
					photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-3 overflow-hidden rounded-md border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photos[idx],
							alt: gym.nombre,
							className: "h-48 w-full object-cover",
							loading: "lazy"
						}), photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 bottom-2 flex justify-center gap-1",
							children: photos.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIdx(i),
								className: "h-1.5 w-4 rounded-full",
								style: { background: i === idx ? "#CC0000" : "#ffffff55" },
								"aria-label": `Foto ${i + 1}`
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-start gap-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), gym.direccion]
					}),
					gym.descripcion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-foreground",
						children: gym.descripcion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3 text-xs",
						children: [gym.precio_mensual != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground uppercase tracking-wide",
							children: t("gyms.price")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold",
							children: [
								gym.precio_mensual,
								"€",
								t("gyms.perMonth")
							]
						})] }), gym.horarios && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground uppercase tracking-wide",
							children: t("gyms.schedule")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: gym.horarios
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wide",
							children: t("gyms.disciplines")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: gym.disciplinas.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
								style: {
									background: `${DISCIPLINE_COLORS[d] ?? "#CC0000"}22`,
									color: DISCIPLINE_COLORS[d] ?? "#CC0000"
								},
								children: d
							}, d))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-2",
						children: [gym.telefono && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${gym.telefono}`,
							className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
								t("gyms.contact"),
								" · ",
								gym.telefono
							]
						}), gym.web && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: gym.web,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }), t("gyms.website")]
						})]
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GimnasiosView, {}) });
//#endregion
export { SplitComponent as component };
