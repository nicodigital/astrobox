import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_0kSjT3pA.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
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
    })
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
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"gracias/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gracias","type":"page","pattern":"^\\/gracias\\/?$","segments":[[{"content":"gracias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gracias.astro","pathname":"/gracias","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.tdlkyGlf.js"}],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.1.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/PROYECTOS/ASTRO/astrobox/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/PROYECTOS/ASTRO/astrobox/src/pages/films/[film].astro",{"propagation":"none","containsHead":true}],["C:/PROYECTOS/ASTRO/astrobox/src/pages/gracias.astro",{"propagation":"none","containsHead":true}],["C:/PROYECTOS/ASTRO/astrobox/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/PROYECTOS/ASTRO/astrobox/src/pages/posts/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/.pnpm/astro@4.1.3/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_xQX9P8sG.mjs","\u0000@astrojs-manifest":"manifest_zIMZmvkH.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.1.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_f_XFJogg.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_gmsDm7lw.mjs","\u0000@astro-page:src/pages/gracias@_@astro":"chunks/gracias_dcMGWEeB.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_eR_8ibXy.mjs","\u0000@astro-page:src/pages/films/[film]@_@astro":"chunks/_film__R4FBPDcn.mjs","\u0000@astro-page:src/pages/posts/[id]@_@astro":"chunks/_id__eW_goFza.mjs","astro:scripts/page.js":"_astro/page.tdlkyGlf.js","/astro/hoisted.js?q=1":"_astro/hoisted.dgwHAJPJ.js","/astro/hoisted.js?q=0":"_astro/hoisted._bjHESlD.js","/astro/hoisted.js?q=2":"_astro/hoisted.HwG2A3dG.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/inconsolata-latin-400-normal.o70AXgUX.woff2","/_astro/inconsolata-latin-ext-400-normal.HuZw2hCm.woff2","/_astro/inconsolata-vietnamese-400-normal.3zKPDl-B.woff2","/_astro/inconsolata-latin-400-normal.Xn5JvomB.woff","/_astro/inconsolata-vietnamese-400-normal.IRV754iC.woff","/_astro/inconsolata-latin-ext-400-normal.3ngTiviM.woff","/_astro/about.k_SkLytB.css","/_astro/index.vFnvo9XS.css","/site.webmanifest","/img/1200x600.svg","/img/1920x1080.svg","/img/600x400.svg","/admin/index.html","/_astro/hoisted.dgwHAJPJ.js","/_astro/hoisted.HwG2A3dG.js","/_astro/hoisted._bjHESlD.js","/_astro/page.tdlkyGlf.js","/img/favicon/android-chrome-192x192.png","/img/favicon/android-chrome-512x512.png","/img/favicon/apple-touch-icon.png","/img/favicon/browserconfig.xml","/img/favicon/favicon-16x16.png","/img/favicon/favicon-32x32.png","/img/favicon/favicon.ico","/img/favicon/mstile-150x150.png","/img/favicon/safari-pinned-tab.svg","/img/icons/arrow-down-black.svg","/img/logos/FAVICON.png","/img/logos/logo.svg","/_astro/page.tdlkyGlf.js","/index.html","/gracias/index.html","/about/index.html"]});

export { manifest };
