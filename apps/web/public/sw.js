if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-a74b0a75"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-runtime.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/server/pages/_middleware.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/MQw0gYP2JeRGhKhD_-Iu3/_buildManifest.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/MQw0gYP2JeRGhKhD_-Iu3/_middlewareManifest.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/MQw0gYP2JeRGhKhD_-Iu3/_ssgManifest.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/754-b49fdd95e5d75217.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/923-ea9a31970b3196ac.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/c8e26dd5-04867e52a9b170fa.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/framework-fd865f22cad73a01.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/main-101384ebd58e5f36.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/_app-1aa5df17496484e3.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/_error-5a714c45c50a8db4.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/about-744ae437a6b0aced.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/blog-f91e9a06455d886e.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/blog/%5B_id%5D-9755b3bcdb838353.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/classes-d74053f3c4a6f409.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/index-b181e2da865214bb.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/instructors-9dd9ea8300ddf355.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/pages/location-9e5960f33ac2638f.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/_next/static/chunks/webpack-378e68e29c265886.js",revision:"MQw0gYP2JeRGhKhD_-Iu3"},{url:"/favicon.ico",revision:"116a9e00da862cde1f68a4a5978630cd"},{url:"/icons/icon-144x144.png",revision:"c8e3c810cff01a270ff306e10e401e0a"},{url:"/icons/icon-152x152.png",revision:"9e283de62599a2cda2046543a519d56e"},{url:"/icons/icon-192x192.png",revision:"a27f3ee41d6898fef6191a98b3e25384"},{url:"/icons/icon-36x36.png",revision:"7b61d9be4474ac3ca04385905df56f77"},{url:"/icons/icon-72x72.png",revision:"8853aceb2233c9aef1b720920a790f1d"},{url:"/icons/icon-96x96.png",revision:"1293c7b587542948ba1bbc547cad9130"},{url:"/images/background.jpg",revision:"9dd3c90a47fb5efba5783a2f662861c5"},{url:"/images/background2.jpg",revision:"7a0aa2e5637df5e36f9088cb0a25c7f9"},{url:"/images/blog.jpg",revision:"d3bf053ffe06f47e0612c09370d9dca2"},{url:"/images/blog2.jpg",revision:"8af94034e97bf655e4f548a27593e7e5"},{url:"/images/blog3.jpg",revision:"27a770e311f207a7ef8f35867e51ecb6"},{url:"/images/classes.jpg",revision:"cd1c8b3ffac1c84d103812cabc37cc62"},{url:"/images/classes2.jpg",revision:"6e338bc415f218002363c5e65330dfc0"},{url:"/images/classes3.jpeg",revision:"df18bb3970d1b74b12dca7a2b2615ed4"},{url:"/images/instructor.jpeg",revision:"fa90ddd2eb0de538fb0d799ec26d4276"},{url:"/images/instructor2.jpg",revision:"2c47a68e7465561330fc270a1a10c0ee"},{url:"/manifest.json",revision:"18f8be41832d0e5a8d5be6c325146660"},{url:"/robots.txt",revision:"96019703683a025f43c8a7c0c6070a98"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
