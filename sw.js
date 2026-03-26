var CACHE = 'kymn-v4';
var CORE = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css',
  '/favicon.svg',
  '/dr-kymn.webp',
  '/manifest.json',
  '/app.js',
  '/eligibility.js',
  '/404.html',
  '/about.html',
  '/after-you-apply.html',
  '/apply.html',
  '/checklist.html',
  '/dcbs-offices.html',
  '/eligibility-check.html',
  '/emergency-care.html',
  '/faq.html',
  '/glossary.html',
  '/kchip.html',
  '/keep-coverage.html',
  '/phone-numbers.html',
  '/renewal.html',
  '/what-if-approved.html',
  '/what-if-denied.html',
  '/what-is-covered.html',
  '/who-accepts.html',
  '/who-drives.html',
  '/who-qualifies.html',
  '/es/index.html',
  '/es/quien-califica.html',
  '/es/como-aplicar.html',
  '/es/preguntas-frecuentes.html',
  '/es/despues-de-aplicar.html'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Cache-first: serve cached version, fetch and cache new pages automatically,
// fall back to /offline.html for HTML navigation requests when the network fails.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        if (!res || !res.ok) return res;
        var clone = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, clone); });
        return res;
      }).catch(function () {
        if (e.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
