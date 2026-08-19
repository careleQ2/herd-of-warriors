//#region node_modules/.nitro/vite/services/ssr/assets/fighter-images-aKXZBTV1.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var alex_pereira_exports = /* @__PURE__ */ __exportAll({ default: () => alex_pereira_default });
var alex_pereira_default = "/assets/alex-pereira-1WqqVu2y.jpg";
var buakaw_banchamek_exports = /* @__PURE__ */ __exportAll({ default: () => buakaw_banchamek_default });
var buakaw_banchamek_default = "/assets/buakaw-banchamek-DFJ_FT6z.jpg";
var canelo_álvarez_exports = /* @__PURE__ */ __exportAll({ default: () => canelo_álvarez_default });
var canelo_álvarez_default = "/assets/canelo-%C3%A1lvarez-DKEBUhLo.jpg";
var conor_mcgregor_exports = /* @__PURE__ */ __exportAll({ default: () => conor_mcgregor_default });
var conor_mcgregor_default = "/assets/conor-mcgregor-BRz7gATS.jpg";
var gordon_ryan_exports = /* @__PURE__ */ __exportAll({ default: () => gordon_ryan_default });
var gordon_ryan_default = "/assets/gordon-ryan-Wb5lqbgM.jpg";
var islam_makhachev_exports = /* @__PURE__ */ __exportAll({ default: () => islam_makhachev_default });
var islam_makhachev_default = "/assets/islam-makhachev-0Udhw6jJ.jpg";
var israel_adesanya_exports = /* @__PURE__ */ __exportAll({ default: () => israel_adesanya_default });
var israel_adesanya_default = "/assets/israel-adesanya-DX8go9__.jpg";
var jon_jones_exports = /* @__PURE__ */ __exportAll({ default: () => jon_jones_default });
var jon_jones_default = "/assets/jon-jones-CcwtD3Ml.jpg";
var kayla_harrison_exports = /* @__PURE__ */ __exportAll({ default: () => kayla_harrison_default });
var kayla_harrison_default = "/assets/kayla-harrison-C17IlibA.jpg";
var khabib_nurmagomedov_exports = /* @__PURE__ */ __exportAll({ default: () => khabib_nurmagomedov_default });
var khabib_nurmagomedov_default = "/assets/khabib-nurmagomedov-Bliz5cHP.jpg";
var kyoji_horiguchi_exports = /* @__PURE__ */ __exportAll({ default: () => kyoji_horiguchi_default });
var kyoji_horiguchi_default = "/assets/kyoji-horiguchi-eXoxd-zA.jpg";
var mikey_musumeci_exports = /* @__PURE__ */ __exportAll({ default: () => mikey_musumeci_default });
var mikey_musumeci_default = "/assets/mikey-musumeci-Cbxx5dui.jpg";
var naoya_inoue_exports = /* @__PURE__ */ __exportAll({ default: () => naoya_inoue_default });
var naoya_inoue_default = "/assets/naoya-inoue-vYnisnAf.jpg";
var rico_verhoeven_exports = /* @__PURE__ */ __exportAll({ default: () => rico_verhoeven_default });
var rico_verhoeven_default = "/assets/rico-verhoeven-DfRP88TY.jpg";
var rodtang_jitmuangnon_exports = /* @__PURE__ */ __exportAll({ default: () => rodtang_jitmuangnon_default });
var rodtang_jitmuangnon_default = "/assets/rodtang-jitmuangnon-CG9vW9K5.jpg";
var teddy_riner_exports = /* @__PURE__ */ __exportAll({ default: () => teddy_riner_default });
var teddy_riner_default = "/assets/teddy-riner-BP2p20-i.jpg";
var tyson_fury_exports = /* @__PURE__ */ __exportAll({ default: () => tyson_fury_default });
var tyson_fury_default = "/assets/tyson-fury-Ohyofgnp.jpg";
var zhang_weili_exports = /* @__PURE__ */ __exportAll({ default: () => zhang_weili_default });
var zhang_weili_default = "/assets/zhang-weili-D4vff_aR.jpg";
var fighterImages = null;
try {
	fighterImages = /* @__PURE__ */ Object.assign({
		"/src/assets/peleadores/alex-pereira.jpg": alex_pereira_exports,
		"/src/assets/peleadores/buakaw-banchamek.jpg": buakaw_banchamek_exports,
		"/src/assets/peleadores/canelo-álvarez.jpg": canelo_álvarez_exports,
		"/src/assets/peleadores/conor-mcgregor.jpg": conor_mcgregor_exports,
		"/src/assets/peleadores/gordon-ryan.jpg": gordon_ryan_exports,
		"/src/assets/peleadores/islam-makhachev.jpg": islam_makhachev_exports,
		"/src/assets/peleadores/israel-adesanya.jpg": israel_adesanya_exports,
		"/src/assets/peleadores/jon-jones.jpg": jon_jones_exports,
		"/src/assets/peleadores/kayla-harrison.jpg": kayla_harrison_exports,
		"/src/assets/peleadores/khabib-nurmagomedov.jpg": khabib_nurmagomedov_exports,
		"/src/assets/peleadores/kyoji-horiguchi.jpg": kyoji_horiguchi_exports,
		"/src/assets/peleadores/mikey-musumeci.jpg": mikey_musumeci_exports,
		"/src/assets/peleadores/naoya-inoue.jpg": naoya_inoue_exports,
		"/src/assets/peleadores/rico-verhoeven.jpg": rico_verhoeven_exports,
		"/src/assets/peleadores/rodtang-jitmuangnon.jpg": rodtang_jitmuangnon_exports,
		"/src/assets/peleadores/teddy-riner.jpg": teddy_riner_exports,
		"/src/assets/peleadores/tyson-fury.jpg": tyson_fury_exports,
		"/src/assets/peleadores/zhang-weili.jpg": zhang_weili_exports
	});
} catch (e) {
	fighterImages = null;
}
/**
* Get the image URL for a fighter by name
* Converts name to filename format and resolves to asset URL
* @param nombre - Fighter's full name (e.g., "Jon Jones")
* @returns The resolved image URL
*/
function getFighterImageUrl(nombre) {
	const filename = nombre.toLowerCase().replace(/\s+/g, "-");
	if (fighterImages) {
		const key = `/src/assets/peleadores/${filename}.jpg`;
		if (fighterImages[key]) return fighterImages[key]?.default || `/assets/peleadores/${filename}.jpg`;
	}
	return `/assets/peleadores/${filename}.jpg`;
}
//#endregion
export { getFighterImageUrl as t };
