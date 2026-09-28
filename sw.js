// Chalk service worker: lets the app open offline. Firestore handles offline data on its own.
const CACHE = 'chalk-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'firebase-config.js', 'icons/icon-192.png', 'icons/icon-512.png'];
const CDN = ['https://www.gstatic.com/firebasejs/', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  const sameOrigin = url.startsWith(self.location.origin);
  const cdn = CDN.some(p => url.startsWith(p));
  if (!sameOrigin && !cdn) return; // leave Firebase auth/Firestore traffic alone
  if (req.mode === 'navigate' || url.endsWith('/index.html') || url.endsWith('firebase-config.js')) {
    // Network first so new versions show up; fall back to cache offline.
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  // Cache first for icons, SDK scripts and fonts.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); }
    return r;
  })));
});
