if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),c={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>c[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BK4qrmfN.js",revision:null},{url:"assets/index-CGph6yb0.css",revision:null},{url:"index.html",revision:"0508e2dd57f4c4dba2e02f11d602d8f2"},{url:"registerSW.js",revision:"b5fe1161a550218cc17dea621a5527ec"},{url:"images/icons/icon-192x192.png",revision:"af160bc8b1a379d992731df2e45132c1"},{url:"manifest.webmanifest",revision:"8857a4dc875d67aac2dfcd234c4a64ba"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
