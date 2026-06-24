const CACHE_NAME = "lenabeauty-spa-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/icon.svg",
  "/manifest.json"
];

// Install Event - Pre-cache core shell assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Intercept networks intelligently
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // CRITICAL: Express and Prisma API requests must NEVER be cached to prevent stale POS/booking states
  if (url.pathname.startsWith("/api/") || e.request.method !== "GET") {
    e.respondWith(fetch(e.request));
    return;
  }

  // Network-First with Cache Fallback for static assets and layouts
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.status === 200 && url.protocol.startsWith("http")) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // SPA routing fallback - return shell the client route is a document navigate request
          if (e.request.mode === "navigate") {
            return caches.match("/");
          }
        });
      })
  );
});
