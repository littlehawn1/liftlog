/* Lift Log service worker: offline app shell + update-on-request.
   Bump VERSION on every release; the new version activates on its own and the app reloads into it when no workout is in progress. */
const VERSION = "1.3.2";
const SHELL = `liftlog-shell-${VERSION}`;
const RUNTIME = "liftlog-runtime";
const ASSETS = ["./", "index.html", "styles.css", "app.js", "exercises.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];

self.addEventListener("install", (e) => {
  // Take over as soon as the new files are cached, so updates apply on their own.
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("liftlog-shell-") && k !== SHELL) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("message", (e) => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.includes("/videos/")) return; // videos stream from the network (range requests)
  if (url.origin === location.origin) {
    // App shell: cache first (the shell version controls updates), network fallback.
    e.respondWith((async () => {
      const cached = req.mode === "navigate" ? (await caches.match("index.html")) : await caches.match(req, { ignoreSearch: true });
      return cached || fetch(req);
    })());
    return;
  }
  // Fonts and libraries from CDNs: serve cached copy, refresh in the background.
  if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host)) {
    e.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const cached = await cache.match(req);
      const net = fetch(req).then((res) => { if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()); return res; }).catch(() => cached);
      return cached || net;
    })());
  }
});
