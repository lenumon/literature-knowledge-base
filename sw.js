/* Build replaces these values with the exact shell assets and a content version. */
const PREFIX = 'literature-shell-';
const CACHE = PREFIX + '64fa14374b2f5be4';
const SHELL = ["/literature-knowledge-base/index.html","/literature-knowledge-base/manifest.webmanifest","/literature-knowledge-base/icons/icon-192.png","/literature-knowledge-base/icons/icon-512.png","/literature-knowledge-base/assets/pdf.worker.min-CIqJB0yW.mjs","/literature-knowledge-base/assets/cursor-editorTextHighlight-kG3uUOwL.svg","/literature-knowledge-base/assets/index-Cj-soK0i.css","/literature-knowledge-base/assets/index-UHn3-13O.js","/literature-knowledge-base/assets/pdf-AVAxhmeW.js"];
self.addEventListener('install', event => {
 event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
 event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
 const request = event.request, url = new URL(request.url);
 if (request.method !== 'GET' || url.origin !== self.location.origin || url.search || request.headers.has('authorization')) return;
 if (request.mode === 'navigate') {
  event.respondWith(fetch(request).catch(async () => (await caches.match('/literature-knowledge-base/index.html')) || Response.error()));
  return;
 }
 if (!url.pathname.startsWith('/literature-knowledge-base/assets/') && !url.pathname.startsWith('/literature-knowledge-base/icons/') && url.pathname !== '/literature-knowledge-base/manifest.webmanifest') return;
 event.respondWith((async () => {
  let cache; const key = new Request(url.href, {credentials:'omit'});
  try { cache = await caches.open(CACHE); const cached = await cache.match(key); if (cached) return cached; } catch { /* Network remains usable if storage is unavailable. */ }
  const response = await fetch(request);
  if (cache && response.ok && response.type !== 'opaque') { try { await cache.put(key, response.clone()); } catch { /* A cache write must not break an online response. */ } }
  return response;
 })());
});
