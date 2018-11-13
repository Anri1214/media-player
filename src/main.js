import './js/sw/register';
import { Device } from './js/device';
import { Hotkey } from './js/hotkey';

document.addEventListener('DOMContentLoaded', () => {
  new Hotkey();
  new Device();
});
