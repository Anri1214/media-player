if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    return navigator.serviceWorker.register('sw.js');
  });
}
