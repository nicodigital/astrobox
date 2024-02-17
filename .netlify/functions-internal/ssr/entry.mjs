import * as adapter from '@astrojs/netlify/ssr-function.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_zIMZmvkH.mjs';

const _page0  = () => import('./chunks/generic_f_XFJogg.mjs');
const _page1  = () => import('./chunks/index_gmsDm7lw.mjs');
const _page2  = () => import('./chunks/gracias_dcMGWEeB.mjs');
const _page3  = () => import('./chunks/about_eR_8ibXy.mjs');
const _page4  = () => import('./chunks/_film__R4FBPDcn.mjs');
const _page5  = () => import('./chunks/_id__eW_goFza.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@4.1.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/gracias.astro", _page2],["src/pages/about.astro", _page3],["src/pages/films/[film].astro", _page4],["src/pages/posts/[id].astro", _page5]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = undefined;

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default, pageMap };
