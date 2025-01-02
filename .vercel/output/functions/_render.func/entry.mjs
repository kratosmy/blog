import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C5_gFXQN.mjs';
import { manifest } from './manifest_D_RoDI8d.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page3 = () => import('./pages/rss.xml.astro.mjs');
const _page4 = () => import('./pages/tags/_tag_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_tsx@4.19.2_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404/index.astro", _page1],
    ["src/pages/posts/[...slug].astro", _page2],
    ["src/pages/rss.xml.js", _page3],
    ["src/pages/tags/[tag].astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "93afc422-2d23-4ddd-b3e3-647d784878b6",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
