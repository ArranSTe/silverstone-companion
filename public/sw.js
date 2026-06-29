const CACHE_NAME = "silverstone-companion-v1";

const urlsToCache = [
  "/",
  "/dashboard",
  "/map",
  "/tent-map",
  "/schedule",
  "/tickets",
  "/weather",
  "/packing",
  "/emergency",
  "/food",
  "/transport",
  "/notes",
  "/settings",
  "/silverstone-official-map.jpg",
  "/manifest.json",
  "/192x192.png",
  "/512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || caches.match("/");
      });
    })
  );
});