if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const t=e=>n(e,d),c={module:{uri:d},exports:o,require:t};i[d]=Promise.all(r.map((e=>c[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-958fa2bd"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.9a9c2932.js",revision:null},{url:"index.html",revision:"18b95d6dbaeb0c59ecca05b115d39715"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"0e096c8adf4de7904e76f1bdecf93c60"},{url:"apple-touch-icon.png",revision:"9bf1a661f9a68ddd02db58d0b5a7eebd"},{url:"pwa-192x192.png",revision:"0dd4d2af5a1f2a91d5e9260e80d26bc6"},{url:"pwa-512x512.png",revision:"3a4117d03832de8d1bb702c489f69461"},{url:"manifest.webmanifest",revision:"cd2bed018a7749510e9dfcefc135860b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
