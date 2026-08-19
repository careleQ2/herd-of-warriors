//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Bu2JA8tv.js
var manifest = {
	"0a52a1a20366bf7417bc6d2f3abd330ea0ff281c95175f126a1247772c4f89d9": {
		functionName: "fetchNews_createServerFn_handler",
		importer: () => import("./_ssr/news.functions-CgCXFVs7.mjs")
	},
	"a5a2653452fa3822e9168c0ab6ff95d4f133ea6f56407c8ad28c3a5cba5ef067": {
		functionName: "translateNews_createServerFn_handler",
		importer: () => import("./_ssr/news-translate.functions-BJArnlEG.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
