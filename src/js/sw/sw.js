/**
 * @const {String} VERSION - Service worker version.
 */
const VERSION = 'v1';

/**
 * @function add event listener for install service worker.
 */
self.addEventListener('install', event => {
  return event.waitUntil(precache());
});

/**
 * @function add event listener for fetch data.
 */
self.addEventListener('fetch', event => {
  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
});

/**
 * @function add files to service worker cache.
 * @return {Promise<void | never>}
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
    ]);
  });
}

/**
 * @function get asets from service worker cache.
 * @param {Object} request - Network request.
 * @return {Promise<Response | never | never>}
 */
function fromCache (request) {
  return caches.open(VERSION).then(cache => {
    return cache.match(request).then(match => {
      return match || Promise.reject('no-match');
    });
  });
}

/**
 * @function update new assest in service worker cache.
 * @param {Object} request - Newtwork request.
 * @return {Promise<void | never | never>}
 */
function update (request) {
  return caches.open(VERSION).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
}
