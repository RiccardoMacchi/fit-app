if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>s(e,t),d={module:{uri:t},exports:o,require:l};i[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"b584398dce23ba527db666ebc12c8958"},{url:"assets/index-B6LFdkBF.css",revision:null},{url:"assets/index-DJ3Z6Rqr.js",revision:null},{url:"index.html",revision:"56ba20e559c2b644a043d15a04d2492e"},{url:"registerSW.js",revision:"b5fe1161a550218cc17dea621a5527ec"},{url:"manifest.webmanifest",revision:"c3290b526a083078bd1f9ca795dbd191"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
