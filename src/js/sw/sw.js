/**
 * @const {String} VERSION - Service worker version.
 */
const VERSION = 'v1';

/**
 * @function add event listener for install service worker.
 */
self.addEventListener('install', event => {
  event.waitUntil(precache());
});

/**
 * @function add event listener for fetch data.
 */
self.addEventListener('fetch', event => {
  event.respondWith(fromCache(event.request));
});

/**
 * @function add files to service worker cache.
 * @return {Promise}
 */
function precache () {
  return caches.open(VERSION).then(cache => {
    return cache.addAll([
      'index.html',
      'bundle.js',
      'css/style.bundle.css',
      'fonts/FontsFree-Net-proxima_nova_reg-webfont.ttf',
      'fonts/fontawesome-free-5.5.0-web/css/all.min.css',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.eot',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.svg',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.ttf',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.eot',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.svg',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.ttf',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.eot',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.svg',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.ttf',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff',
      'fonts/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2',
      'images/favicon-128.png',
      'images/favicon-192.png',
      'images/favicon-512.png',
      'manifest.json'
    ]);
  });
}

/**
 * @function get asets from service worker cache.
 * @param {Request} request - Network request.
 * @return {Promise}
 */
function fromCache (request) {
  return caches.match(request).then(response => {
    return response || update(request);
  });
}

/**
 * @function update new assest in service worker cache.
 * @param {Request} request - Newtwork request.
 * @return {Promise}
 */
function update (request) {
  return fetch(request).then(response => {
    return caches.open(VERSION).then(cache => {
      cache.put(request.url, response.clone());

      return response;
    });
  });
}
