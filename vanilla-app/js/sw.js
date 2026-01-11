const CACHE_NAME = "jwc-explorer-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/animals.html",
  "/css/styles.css",
  "/js/main.js",
  "/js/install.js",
  "/assets/images/european_hedgehog.webp",
  "/assets/images/red-fox.webp",
  "/assets/images/european_badger.webp",
  "/assets/images/red-deerred-deer-stag-bellowing-flickr-tony-cox.webp",
  "/assets/images/Squirrel-red.webp",
  "/assets/images/european_otter.webp",
  "/data/animals.json",
    "/data/kidsTips.json",
  "site.webmanifest"
];


// listed for install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate event - to clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                         console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve cached content when offline else fetch from network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // return cached response if found
            }
         
            // Clone the request to fetch and cache
            const fetchRequest = event.request.clone();
            return fetch(fetchRequest).then((response) => {
                // Check if response was successful
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                // Open cache and add response to it
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
    })
    
