globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/admin.fighters-BFIRfs_j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1494-X7DBtvQBmpQp0TJVmOMFAm0YLiA\"",
		"mtime": "2026-08-14T10:45:10.237Z",
		"size": 5268,
		"path": "../public/assets/admin.fighters-BFIRfs_j.js"
	},
	"/assets/ajustes-fQ95vC1O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f70-/ZZUatydcdkdZSJhRBIbSnYsOaI\"",
		"mtime": "2026-08-14T10:45:10.238Z",
		"size": 8048,
		"path": "../public/assets/ajustes-fQ95vC1O.js"
	},
	"/assets/arrow-left-BWJsLzcg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-lobjvnFnDij812QTqxbKDRsK8bE\"",
		"mtime": "2026-08-14T10:45:10.239Z",
		"size": 154,
		"path": "../public/assets/arrow-left-BWJsLzcg.js"
	},
	"/assets/auth-CcgyPoiF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1652-EdowY/EHZFHZ1d0F4WjDZJ+CbSk\"",
		"mtime": "2026-08-14T10:45:10.242Z",
		"size": 5714,
		"path": "../public/assets/auth-CcgyPoiF.js"
	},
	"/assets/AppShell-CjKzPwMO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a7-DZqZCp+TUHpTTDaeZKU8Mm+7F1w\"",
		"mtime": "2026-08-14T10:45:10.224Z",
		"size": 1959,
		"path": "../public/assets/AppShell-CjKzPwMO.js"
	},
	"/assets/AuthGate-DmTbBZGI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"245-hht43SjHy4ukgkIMziHDKTPGEl0\"",
		"mtime": "2026-08-14T10:45:10.234Z",
		"size": 581,
		"path": "../public/assets/AuthGate-DmTbBZGI.js"
	},
	"/assets/BottomNav-DAAiN21x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1450-P+f2p1s1q5I3AVKDEfGLDSncyso\"",
		"mtime": "2026-08-14T10:45:10.235Z",
		"size": 5200,
		"path": "../public/assets/BottomNav-DAAiN21x.js"
	},
	"/assets/auth-BeteF2gh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33f6b-IN8VgQ6x4AibRfIVQf/B+wVgPzw\"",
		"mtime": "2026-08-14T10:45:10.240Z",
		"size": 212843,
		"path": "../public/assets/auth-BeteF2gh.js"
	},
	"/favicon-wolf.svg": {
		"type": "image/svg+xml",
		"etag": "\"116-/cdmp1AsdyVDNUeNL6W/TBXoIgM\"",
		"mtime": "2026-08-13T18:42:05.947Z",
		"size": 278,
		"path": "../public/favicon-wolf.svg"
	},
	"/assets/check-DGdsKbby.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-Gm+QDq03ki9np+3baXjLoocz1Jk\"",
		"mtime": "2026-08-14T10:45:10.243Z",
		"size": 113,
		"path": "../public/assets/check-DGdsKbby.js"
	},
	"/assets/eventos.index-2qFMYcol.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164f-0S4DDFn+aQNmd+3kzepr4siFyfk\"",
		"mtime": "2026-08-14T10:45:10.245Z",
		"size": 5711,
		"path": "../public/assets/eventos.index-2qFMYcol.js"
	},
	"/assets/external-link-CpKMec0l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-DGjh6pdIvvT6VMJ/M4qdeLQc/E8\"",
		"mtime": "2026-08-14T10:45:10.246Z",
		"size": 240,
		"path": "../public/assets/external-link-CpKMec0l.js"
	},
	"/assets/eventos._id-CBngNzXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1360-IPKyaTGGn8l4edVpj7jgGHlFa+Q\"",
		"mtime": "2026-08-14T10:45:10.244Z",
		"size": 4960,
		"path": "../public/assets/eventos._id-CBngNzXX.js"
	},
	"/assets/favoritos-4W5GXgRJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-GrxIs/sxMjfnhxKbJcNkIOXMZRc\"",
		"mtime": "2026-08-14T10:45:10.248Z",
		"size": 310,
		"path": "../public/assets/favoritos-4W5GXgRJ.js"
	},
	"/assets/feed-IOlAzoPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d45-Osa9MhH+I6ru+F0hPb+4C71u8iA\"",
		"mtime": "2026-08-14T10:45:10.249Z",
		"size": 7493,
		"path": "../public/assets/feed-IOlAzoPa.js"
	},
	"/assets/gimnasios-BdVA2Aou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22aa-Qp5RN567yRYlz6V0bvR1AHbbHTI\"",
		"mtime": "2026-08-14T10:45:10.250Z",
		"size": 8874,
		"path": "../public/assets/gimnasios-BdVA2Aou.js"
	},
	"/assets/buakaw-banchamek-DFJ_FT6z.jpg": {
		"type": "image/jpeg",
		"etag": "\"1683f-BoW8lmtLJJfq3mTMH/4FdZVMXkg\"",
		"mtime": "2026-08-14T10:45:10.273Z",
		"size": 92223,
		"path": "../public/assets/buakaw-banchamek-DFJ_FT6z.jpg"
	},
	"/assets/canelo-álvarez-DKEBUhLo.jpg": {
		"type": "image/jpeg",
		"etag": "\"20f56-hhpxpFJcNPU2Eq+yJWpIWnx1Kqw\"",
		"mtime": "2026-08-14T10:45:10.274Z",
		"size": 134998,
		"path": "../public/assets/canelo-álvarez-DKEBUhLo.jpg"
	},
	"/assets/gordon-ryan-Wb5lqbgM.jpg": {
		"type": "image/jpeg",
		"etag": "\"103ef-oHp6bAVDXijvDzrvyUw260y/zkg\"",
		"mtime": "2026-08-14T10:45:10.277Z",
		"size": 66543,
		"path": "../public/assets/gordon-ryan-Wb5lqbgM.jpg"
	},
	"/assets/islam-makhachev-0Udhw6jJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"21d7c-B1NeJoEhwwmMEFKTzjG8lHHhi9A\"",
		"mtime": "2026-08-14T10:45:10.277Z",
		"size": 138620,
		"path": "../public/assets/islam-makhachev-0Udhw6jJ.jpg"
	},
	"/assets/israel-adesanya-DX8go9__.jpg": {
		"type": "image/jpeg",
		"etag": "\"26afb-rxPBi3N7XE47CeyI0FL96Fw5N1Y\"",
		"mtime": "2026-08-14T10:45:10.279Z",
		"size": 158459,
		"path": "../public/assets/israel-adesanya-DX8go9__.jpg"
	},
	"/assets/index-Ij_DRJFP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76dfe-Vdl5iVcKXa9Q7EZHLZuEkzFw/S4\"",
		"mtime": "2026-08-14T10:45:10.223Z",
		"size": 486910,
		"path": "../public/assets/index-Ij_DRJFP.js"
	},
	"/assets/conor-mcgregor-BRz7gATS.jpg": {
		"type": "image/jpeg",
		"etag": "\"27157-+CWwUWtx5K9Du6OpH78I7dB5mL4\"",
		"mtime": "2026-08-14T10:45:10.276Z",
		"size": 160087,
		"path": "../public/assets/conor-mcgregor-BRz7gATS.jpg"
	},
	"/assets/jon-jones-CcwtD3Ml.jpg": {
		"type": "image/jpeg",
		"etag": "\"a32d1-1tMlShgE5tKHtdLEGDXt4qjzVM4\"",
		"mtime": "2026-08-14T10:45:10.280Z",
		"size": 668369,
		"path": "../public/assets/jon-jones-CcwtD3Ml.jpg"
	},
	"/assets/alex-pereira-1WqqVu2y.jpg": {
		"type": "image/jpeg",
		"etag": "\"16baaf-1jcdhYvge7q4W4veI5f3TFrUygc\"",
		"mtime": "2026-08-14T10:45:10.272Z",
		"size": 1489583,
		"path": "../public/assets/alex-pereira-1WqqVu2y.jpg"
	},
	"/assets/leaflet-src-CTkuLwIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2455d-lZvIJCjDsu06800c3XrNmXfB9xA\"",
		"mtime": "2026-08-14T10:45:10.251Z",
		"size": 148829,
		"path": "../public/assets/leaflet-src-CTkuLwIm.js"
	},
	"/assets/mail-DJ_eEzhd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-X/yAPwfSvauuwHEzT4sl85VcLa8\"",
		"mtime": "2026-08-14T10:45:10.253Z",
		"size": 202,
		"path": "../public/assets/mail-DJ_eEzhd.js"
	},
	"/assets/link-DyOEmdMg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6642-y3lKsKKY5OPTC2t7ikunxskZ4IY\"",
		"mtime": "2026-08-14T10:45:10.252Z",
		"size": 26178,
		"path": "../public/assets/link-DyOEmdMg.js"
	},
	"/assets/kayla-harrison-C17IlibA.jpg": {
		"type": "image/jpeg",
		"etag": "\"32948-ITBWO3hGF5G6aL2vfQCZ9MeN+tY\"",
		"mtime": "2026-08-14T10:45:10.282Z",
		"size": 207176,
		"path": "../public/assets/kayla-harrison-C17IlibA.jpg"
	},
	"/assets/kyoji-horiguchi-eXoxd-zA.jpg": {
		"type": "image/jpeg",
		"etag": "\"29c01-FjruvrizLEy52QRhm0SFoBMyjBk\"",
		"mtime": "2026-08-14T10:45:10.284Z",
		"size": 171009,
		"path": "../public/assets/kyoji-horiguchi-eXoxd-zA.jpg"
	},
	"/assets/khabib-nurmagomedov-Bliz5cHP.jpg": {
		"type": "image/jpeg",
		"etag": "\"27814-+EL0kCitq2eUiokv3oO+zkDYzxU\"",
		"mtime": "2026-08-14T10:45:10.283Z",
		"size": 161812,
		"path": "../public/assets/khabib-nurmagomedov-Bliz5cHP.jpg"
	},
	"/assets/map-pin-D9NAiNu9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-LczYpoul4gtB3oBCkglCMtBOfGk\"",
		"mtime": "2026-08-14T10:45:10.254Z",
		"size": 248,
		"path": "../public/assets/map-pin-D9NAiNu9.js"
	},
	"/assets/noticias-D44ZJWWe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2992-Ca24DImra09vYcntBbkENWerHKA\"",
		"mtime": "2026-08-14T10:45:10.255Z",
		"size": 10642,
		"path": "../public/assets/noticias-D44ZJWWe.js"
	},
	"/assets/peleadores-DZm-G96o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-NCEaMPANN042BW2n8JSc/NDx9o8\"",
		"mtime": "2026-08-14T10:45:10.257Z",
		"size": 280,
		"path": "../public/assets/peleadores-DZm-G96o.js"
	},
	"/assets/onboarding-Clavdp6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18a2-/ygMyDkmdpydCD9wUGj5TeQOFrE\"",
		"mtime": "2026-08-14T10:45:10.256Z",
		"size": 6306,
		"path": "../public/assets/onboarding-Clavdp6v.js"
	},
	"/assets/peleadores._id-CmEqxqqs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e7f-b44IGAXcul+PXh3LCfFZPYh+P/A\"",
		"mtime": "2026-08-14T10:45:10.259Z",
		"size": 11903,
		"path": "../public/assets/peleadores._id-CmEqxqqs.js"
	},
	"/assets/perfil-V-CxcX18.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9e-CfUviUWlEUn6W2JnJ7wsXST5RlA\"",
		"mtime": "2026-08-14T10:45:10.261Z",
		"size": 3742,
		"path": "../public/assets/perfil-V-CxcX18.js"
	},
	"/assets/preferences-C9QoH9Ei.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-mNMQ9dKkwcRlGN72t8l4aH2nMhg\"",
		"mtime": "2026-08-14T10:45:10.262Z",
		"size": 352,
		"path": "../public/assets/preferences-C9QoH9Ei.js"
	},
	"/assets/redirect-C-eRQtnH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d-XWldT6wFIL00QHpfP609loBAcNQ\"",
		"mtime": "2026-08-14T10:45:10.263Z",
		"size": 557,
		"path": "../public/assets/redirect-C-eRQtnH.js"
	},
	"/assets/rolldown-runtime-QTnfLwEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b6-wnqLLSlp3SaE+lbe74bKNe5Rpds\"",
		"mtime": "2026-08-14T10:45:10.264Z",
		"size": 694,
		"path": "../public/assets/rolldown-runtime-QTnfLwEv.js"
	},
	"/assets/rico-verhoeven-DfRP88TY.jpg": {
		"type": "image/jpeg",
		"etag": "\"27482-xLTyNIwr1c30UnwaH869becfbo4\"",
		"mtime": "2026-08-14T10:45:10.289Z",
		"size": 160898,
		"path": "../public/assets/rico-verhoeven-DfRP88TY.jpg"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-14T10:45:10.265Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-DtkTpfYE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f3-O1OkvvRuP/X1iOdtVucHJSsEZGQ\"",
		"mtime": "2026-08-14T10:45:10.266Z",
		"size": 4339,
		"path": "../public/assets/routes-DtkTpfYE.js"
	},
	"/assets/siguiendo-B_0V42DY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-n/RE3PebgJhO8sUmzHFEjniGD5o\"",
		"mtime": "2026-08-14T10:45:10.268Z",
		"size": 310,
		"path": "../public/assets/siguiendo-B_0V42DY.js"
	},
	"/assets/skeleton-CDsJjmIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-sBbiK8IthzE7bpiZ5DEANkc5ev4\"",
		"mtime": "2026-08-14T10:45:10.270Z",
		"size": 221,
		"path": "../public/assets/skeleton-CDsJjmIm.js"
	},
	"/assets/naoya-inoue-vYnisnAf.jpg": {
		"type": "image/jpeg",
		"etag": "\"57cc6-6Q21Pdj8YmWJeZLBgDwPIS9od8k\"",
		"mtime": "2026-08-14T10:45:10.287Z",
		"size": 359622,
		"path": "../public/assets/naoya-inoue-vYnisnAf.jpg"
	},
	"/assets/rodtang-jitmuangnon-CG9vW9K5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c165-ECtu7OHN4l1h2gc/lLFjtgtX5mk\"",
		"mtime": "2026-08-14T10:45:10.290Z",
		"size": 311653,
		"path": "../public/assets/rodtang-jitmuangnon-CG9vW9K5.jpg"
	},
	"/assets/mikey-musumeci-Cbxx5dui.jpg": {
		"type": "image/jpeg",
		"etag": "\"9a281-PYLqMpn7qjIV054kWJHc+za79Pw\"",
		"mtime": "2026-08-14T10:45:10.286Z",
		"size": 631425,
		"path": "../public/assets/mikey-musumeci-Cbxx5dui.jpg"
	},
	"/assets/styles-hHcf5Hp7.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13aa8-0jekoHglKXJhhWYlu7bciyIQeJM\"",
		"mtime": "2026-08-14T10:45:10.292Z",
		"size": 80552,
		"path": "../public/assets/styles-hHcf5Hp7.css"
	},
	"/assets/teddy-riner-BP2p20-i.jpg": {
		"type": "image/jpeg",
		"etag": "\"a9a71-k/SQNeVY8jURDjhX5Q1i4GeBueM\"",
		"mtime": "2026-08-14T10:45:10.294Z",
		"size": 694897,
		"path": "../public/assets/teddy-riner-BP2p20-i.jpg"
	},
	"/assets/WolfIcon-DdmvjwE0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e-rq+abGRZhBJ4sqJCrLuxXwwXcOg\"",
		"mtime": "2026-08-14T10:45:10.236Z",
		"size": 414,
		"path": "../public/assets/WolfIcon-DdmvjwE0.js"
	},
	"/assets/tyson-fury-Ohyofgnp.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fff6-7mBcvnVVhX2nUSpEDGm0Kihye78\"",
		"mtime": "2026-08-14T10:45:10.295Z",
		"size": 131062,
		"path": "../public/assets/tyson-fury-Ohyofgnp.jpg"
	},
	"/assets/zhang-weili-D4vff_aR.jpg": {
		"type": "image/jpeg",
		"etag": "\"33008-icMTW2vgt+rNVG8OJjUkbJBFp14\"",
		"mtime": "2026-08-14T10:45:10.296Z",
		"size": 208904,
		"path": "../public/assets/zhang-weili-D4vff_aR.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_9wLQQC = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_9wLQQC
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
