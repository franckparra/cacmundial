const CACHE_NAME = "cacadamundial-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (e) => {
  // Ignora chamadas de API (elas exigem rede e não devem ir para o cache offline)
  if (e.request.url.includes("workers.dev") || e.request.url.includes("localhost:11434") || e.request.url.includes("googleapis")) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
