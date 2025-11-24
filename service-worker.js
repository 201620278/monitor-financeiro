const CACHE_NAME = "financeiro-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./MonitorFinanceiroCarro.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Instalar service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativar service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Buscar arquivos do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
