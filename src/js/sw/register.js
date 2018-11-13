if ('serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  } else {
    navigator.serviceWorker.register('/media-player/sw.js');
  }
}
