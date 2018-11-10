import { Device } from './js/device';
import { Hotkey } from './js/hotkey';

new Hotkey();
new Device();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
