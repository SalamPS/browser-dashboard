if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let i={};const r=e=>a(e,n),o={module:{uri:n},exports:i,require:r};s[n]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/410-5f20017bcaf45ab4.js",revision:"5f20017bcaf45ab4"},{url:"/_next/static/chunks/98-2ed7406414413ae9.js",revision:"2ed7406414413ae9"},{url:"/_next/static/chunks/framework-5429a50ba5373c56.js",revision:"5429a50ba5373c56"},{url:"/_next/static/chunks/main-47c5fcd70d99e89f.js",revision:"47c5fcd70d99e89f"},{url:"/_next/static/chunks/pages/Merge-e48468165a046bb7.js",revision:"e48468165a046bb7"},{url:"/_next/static/chunks/pages/Time-26068927bc5850a3.js",revision:"26068927bc5850a3"},{url:"/_next/static/chunks/pages/Todo-ba15729489bcfaa2.js",revision:"ba15729489bcfaa2"},{url:"/_next/static/chunks/pages/Welcome-e12dbbf1c8ce4cbd.js",revision:"e12dbbf1c8ce4cbd"},{url:"/_next/static/chunks/pages/Xcontainer-6950dbce59b71773.js",revision:"6950dbce59b71773"},{url:"/_next/static/chunks/pages/_app-d04832fedb08365f.js",revision:"d04832fedb08365f"},{url:"/_next/static/chunks/pages/_error-5a00309fd5f4b49e.js",revision:"5a00309fd5f4b49e"},{url:"/_next/static/chunks/pages/context/_SpotCAuth-bd0907a21f0a066d.js",revision:"bd0907a21f0a066d"},{url:"/_next/static/chunks/pages/context/_SpotCWidget-c2153baac84c5153.js",revision:"c2153baac84c5153"},{url:"/_next/static/chunks/pages/context/_SpotContext-ca80e048eae1f6dc.js",revision:"ca80e048eae1f6dc"},{url:"/_next/static/chunks/pages/index-9ef50189bfcf1b87.js",revision:"9ef50189bfcf1b87"},{url:"/_next/static/chunks/pages/popup/Popup-4e16efaca79e5050.js",revision:"4e16efaca79e5050"},{url:"/_next/static/chunks/pages/popup/_Button-b35827c9523d779f.js",revision:"b35827c9523d779f"},{url:"/_next/static/chunks/pages/popup/_Log-be851cc7c9043eb2.js",revision:"be851cc7c9043eb2"},{url:"/_next/static/chunks/pages/popup/_Login-fd0422bb322d8da3.js",revision:"fd0422bb322d8da3"},{url:"/_next/static/chunks/pages/popup/_Settings-81ad5f98042ba73c.js",revision:"81ad5f98042ba73c"},{url:"/_next/static/chunks/pages/popup/_Short-ab9d9ac20480d5a8.js",revision:"ab9d9ac20480d5a8"},{url:"/_next/static/chunks/pages/popup/_SpotAuth-e6145b8039abb64b.js",revision:"e6145b8039abb64b"},{url:"/_next/static/chunks/pages/popup/_Todo-55201c743845b2e0.js",revision:"55201c743845b2e0"},{url:"/_next/static/chunks/pages/widgets/Widget-116277f0decd54df.js",revision:"116277f0decd54df"},{url:"/_next/static/chunks/pages/widgets/_SpotWidget-db7c2e9a8e4d1831.js",revision:"db7c2e9a8e4d1831"},{url:"/_next/static/chunks/pages/widgets/_addNew-edce050ba7922f0f.js",revision:"edce050ba7922f0f"},{url:"/_next/static/chunks/pages/widgets/_jokes-190a6b44f6ae8584.js",revision:"190a6b44f6ae8584"},{url:"/_next/static/chunks/pages/widgets/_quote-e7cd5e8b373db983.js",revision:"e7cd5e8b373db983"},{url:"/_next/static/chunks/pages/widgets/_shortcut-f5bc1112364913bf.js",revision:"f5bc1112364913bf"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b8f8d6679aaa5f42.js",revision:"b8f8d6679aaa5f42"},{url:"/_next/static/css/01f56437d9dc8997.css",revision:"01f56437d9dc8997"},{url:"/_next/static/css/510eef8e98ba3ba9.css",revision:"510eef8e98ba3ba9"},{url:"/_next/static/css/8a80f62966f458d0.css",revision:"8a80f62966f458d0"},{url:"/_next/static/media/0c9f04b3a081fbe8-s.woff2",revision:"dbb600ebf3f75489e74697c0109d933d"},{url:"/_next/static/media/2aae41578844343d-s.woff2",revision:"2efc5ed64bf29fedae0e9c7afc25d78d"},{url:"/_next/static/media/384d46444bc5fa8e-s.woff2",revision:"9460683c5ef0b2f1b43518df6c172d21"},{url:"/_next/static/media/3d372fc6ad648ff2-s.p.woff2",revision:"00ae08ee2b4bc609b61544c9e9c01f55"},{url:"/_next/static/media/6a60075cb2a5f0ad-s.woff2",revision:"f080f837a915f4762f72cd01fadeb352"},{url:"/_next/static/media/b0c2fa43e5e9d061-s.woff2",revision:"c635a10842bbaa362cd28882806dd3c0"},{url:"/_next/static/media/bf1c75f9dc170279-s.woff2",revision:"7535ffb3c2a8cf0bb678c203177d1200"},{url:"/_next/static/media/c2e6efaf026ea7b6-s.p.woff2",revision:"b9438e2f493d622d47722bf73a8828e0"},{url:"/_next/static/zra6B_mulVgOiJGUcRhEM/_buildManifest.js",revision:"c8eab46250fa0822df58fd7922c0871a"},{url:"/_next/static/zra6B_mulVgOiJGUcRhEM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"439707d9ce12701cb6f9ca303a75089f"},{url:"/lamp_maskable.png",revision:"704f19ccc5bfa99ec6fdf99e8e3e9122"},{url:"/lamp_rounded.png",revision:"824c2bc5d1d560d6969e274ad3df3d59"},{url:"/manifest.webmanifest",revision:"65c617aa1c2b43a8468f2def6fe2a1b8"},{url:"/ss.png",revision:"7ec9d4fb463038b6aae1c20bde5eafe6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
