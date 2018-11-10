const VERSION = 'v1';

self.addEventListener('install', event => {
  event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
});

function precache () {
  return caches.open(VERSION).then(cache => {
    return cache.addAll([
      '/',
      '/index.html',
      '/bundle.js',
      '/css/style.bundle.css',
      '/fonts/FontsFree-Net-proxima_nova_reg-webfont.ttf',
      '/fonts/fontawesome-free-5.5.0-web/css/all.min.css',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.eot',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.svg',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.ttf',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.eot',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.svg',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.ttf',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.eot',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.svg',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.ttf',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff',
      '/fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2',
    ]);
  });
}

function fromCache (request) {
  return caches.open(VERSION).then(cache => {
    return cache.match(request).then(match => {
      return match || Promise.reject('no-match');
    });
  });
}

function update (request) {
  return caches.open(VERSION).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
}