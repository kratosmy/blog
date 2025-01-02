import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_caLtsidU.mjs';
import { i as decodeKey } from './chunks/astro/server_BYCKvhr9.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///root/projects/blog/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":true,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404/index.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;object-fit:var(--fit);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_tsx@4.19.2_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"site":"https://blog.kratosmy.uk","base":"/","trailingSlash":"ignore","compressHTML":false,"componentMetadata":[["/root/projects/blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/root/projects/blog/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/root/projects/blog/src/pages/404/index.astro",{"propagation":"none","containsHead":true}],["/root/projects/blog/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/root/projects/blog/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/root/projects/blog/src/utils/content.ts",{"propagation":"in-tree","containsHead":false}],["/root/projects/blog/src/layouts/PostsLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404/index@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_tsx@4.19.2_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/root/projects/blog/node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_tsx@4.19.2_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C7ZOZ_KH.mjs","/root/projects/blog/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/root/projects/blog/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BNQY1Uw2.mjs","\u0000@astrojs-manifest":"manifest_D_RoDI8d.mjs","/root/projects/blog/src/components/ThemeSelect.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeSelect.astro_astro_type_script_index_0_lang.Do8vXPF4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/root/projects/blog/src/components/ThemeSelect.astro?astro&type=script&index=0&lang.ts","const r=\"panda-theme\";function c(e){return e===\"auto\"||e===\"dark\"||e===\"light\"?e:\"auto\"}function d(){return c(typeof localStorage<\"u\"&&localStorage.getItem(r))}function l(e){typeof localStorage<\"u\"&&localStorage.setItem(r,e===\"light\"||e===\"dark\"?e:\"\")}function s(){return matchMedia(\"(prefers-color-scheme: light)\").matches?\"light\":\"dark\"}function t(e){document.documentElement.dataset.theme=e===\"auto\"?s():e,e===\"dark\"?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\"),l(e)}matchMedia(\"(prefers-color-scheme: light)\").addEventListener(\"change\",()=>{d()===\"auto\"&&t(\"auto\")});customElements.define(\"starlight-rapide-theme-select\",class extends HTMLElement{constructor(){super(),t(d());const a=this.querySelector(\"button\");a?.addEventListener(\"click\",()=>{const o=c(document.documentElement.dataset.theme),n=o===\"dark\"?\"light\":o===\"light\"?\"dark\":\"auto\";t(n),a?.setAttribute(\"aria-label\",`${n} theme`)})}});"]],"assets":["/_astro/ec.6xp1a.css","/_astro/ec.8zarh.js","/_astro/ibm-plex-sans-cyrillic-ext-400-normal.BJItruJi.woff2","/_astro/ibm-plex-sans-cyrillic-400-normal.BPWuI_CM.woff2","/_astro/ibm-plex-sans-greek-400-normal.n6oPB5VF.woff2","/_astro/ibm-plex-sans-vietnamese-400-normal.B97dYap6.woff2","/_astro/ibm-plex-sans-latin-ext-400-normal.BHf956ki.woff2","/_astro/ibm-plex-sans-latin-400-normal.CdZtFfYS.woff2","/_astro/ibm-plex-sans-cyrillic-ext-400-normal.C1SKuNhx.woff","/_astro/ibm-plex-sans-cyrillic-400-normal.CTUnhTqV.woff","/_astro/ibm-plex-sans-greek-400-normal.DSasf_jt.woff","/_astro/ibm-plex-sans-vietnamese-400-normal.OKGpH0gQ.woff","/_astro/ibm-plex-sans-latin-ext-400-normal.CyDjbWPV.woff","/_astro/ibm-plex-sans-latin-400-normal.BU83cd9M.woff","/_astro/index.Y6NSlHWR.css","/_astro/index.B3zaAnLi.css","/404.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"FX9VuTwZ7+kzi/9XaskrgIZQnRvlkF2s10f6trvCB6o="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
