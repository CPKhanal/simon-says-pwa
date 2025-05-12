self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("simon-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./manifest.json",
        "./sounds/red.mp3",
        "./sounds/yellow.mp3",
        "./sounds/green.mp3",
        "./sounds/purple.mp3",
        "./sounds/wrong.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
