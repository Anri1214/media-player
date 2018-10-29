/**
 * @const {Symbol} (Hotkey class private methods)
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
    const $nextFrameBtn = document.getElementById('next-frame-btn');
    const $prevFrameBtn = document.getElementById('prev-frame-btn');
    const $decVolumeBtn = document.getElementById('dec-volume-btn');
    const $incVolumeBtn = document.getElementById('inc-volume-btn');
    const btns = [$nextFrameBtn, $prevFrameBtn, $decVolumeBtn, $incVolumeBtn];
    const list = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    if (list.test(navigator.userAgent)) {
      const $main = document.getElementById('main');

      $main.classList.remove('mp-browser');
      $main.classList.add('mp-mobile');

      btns.forEach(btn => btn.classList.remove('hidden'));
    }
  }
}
