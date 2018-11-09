import { Config } from './config';
import { Selector } from './selector';

/**
 * @const {Symbol} (Device class private methods)
 */
const _checkDevice = Symbol('checkDevice');

/**
 * @class Device (Base class working with device definition)
 */
export class Device {
  constructor () {
    this[_checkDevice]();
  }

  /**
   * @method check application device
   */
  [_checkDevice] () {
    const devices = Config.get('device');
    const mobileBtns = Config.get('button').mobile;
    const selector = new Selector();

    if (devices.test(navigator.userAgent)) {
      const mainId = selector.get('id', 'main');
      const $main = document.getElementById(mainId);
      const browserClass = selector.get('className', 'browser');
      const mobileClass = selector.get('className', 'mobile');

      $main.classList.remove(browserClass);
      $main.classList.add(mobileClass);

      mobileBtns.forEach(key => {
        const hiddenClass = selector.get('className', 'hidden');
        const id = selector.get('id', key);

        document.getElementById(id).classList.remove(hiddenClass);
      });
    }
  }
}
