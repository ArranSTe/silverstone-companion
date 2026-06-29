const CACHE_NAME = "silverstone-companion-v5"

const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/schedule",
  "/stage-schedule",
  "/packing",
  "/tickets",
  "/map",
  "/food",
  "/grandstands",
  "/transport",
  "/emergency",
  "/notes",

  "/silverstone-official-map.jpg",
  "/silverstone-official-map.png",
  "/stand-map.jpg",

  "/grandstands/stowe.jpg",
  "/grandstands/club-corner.jpg",
  "/grandstands/abbey.jpg",
  "/grandstands/village.jpg",
  "/grandstands/becketts.jpg",
  "/grandstands/hamilton-straight.jpg",
  "/grandstands/farm-curve.jpg",
  "/grandstands/the-loop.jpg",
  "/grandstands/national.jpg",
  "/grandstands/brooklands.jpg",
  "/grandstands/luffield.jpg",
  "/grandstands/woodcote.jpg",
  "/grandstands/copse.jpg",
  "/grandstands/chapel.jpg",
  "/grandstands/vale.jpg"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )

  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )

  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
        })
        .catch(() => {
          return caches.match("/")
        })
    })
  )
})