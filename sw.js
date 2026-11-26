const CACHE_NAME = "headcount-pwa-v1";

 

const FILES_TO_CACHE = [

  "./",

  "./index.html",

  "./manifest.webmanifest"

];

 

self.addEventListener("install", function(event) {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(function(cache) {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

 

  self.skipWaiting();

});

 

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches.keys().then(function(keys) {

      return Promise.all(

        keys

          .filter(function(key) {

            return key !== CACHE_NAME;

          })

          .map(function(key) {

            return caches.delete(key);

          })

      );

    })

  );

 

  self.clients.claim();

});

 

self.addEventListener("fetch", function(event) {

  event.respondWith(

    fetch(event.request)

      .catch(function() {

        return caches.match(event.request);

      })

  );

});
