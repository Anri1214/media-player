/**
 * @const {Array} FILE_TYPES (List with media player file types)
 */
const FILE_TYPES = [
  'video/ogg',
  'video/mp4',
  'video/webm'
];

/**
 * @const {Object} SPEED (Media player speed parameters)
 */
const SPEED = {
  max: 12,
  min: 0,
  muted: 3,
  normal: 1,
  step: 0.5
};

/**
 * @const {Object} VOLUME (Media player volume parameters)
 */
const VOLUME = {
  max: 1,
  min: 0,
  step: 0.1
};

/**
 * @const {Symbol} (Media class private properties)
 */
const _fileInput = Symbol('fileInput');
const _infoText = Symbol('infoText');
const _playBtn = Symbol('playBtn');
const _pauseBtn = Symbol('pauseBtn');
const _stopBtn = Symbol('stopBtn');
const _openBtn = Symbol('openBtn');
const _video = Symbol('video');

/**
 * @const {Symbol} (Media class private methods)
 */
const _disableBtns = Symbol('disableBtns');
const _enableBtns = Symbol('enableBtns');
const _initAttrs = Symbol('initAttr');
const _initEvents = Symbol('initEvents');
const _initProps = Symbol('initProps');
const _end = Symbol('end');
const _setFrame = Symbol('setFrame');
const _setScreen = Symbol('setScreen');
const _setSource = Symbol('setSource');
const _setSpeed = Symbol('setSpeed');
const _setVolume = Symbol('setVolume');
const _validType = Symbol('validType');

/**
 * @class Media (Base class working with media player)
 */
export class Media {
  constructor () {
    this[_initProps]();
    this[_initAttrs]();
    this[_initEvents]();
  }

  /**
   * @method decrease video speed
   */
  decSpeed () {
    const $speed = this[_video].playbackRate;

    this[_setSpeed]($speed - SPEED.step);
  }

  /**
   * @method increase video speed
   */
  incSpeed () {
    const $speed = this[_video].playbackRate;

    this[_setSpeed]($speed + SPEED.step);
  }

  /**
   * @method play video in normal speed
   */
  normalSpeed () {
    this[_setSpeed](SPEED.normal);
  }

  /**
   * @method pla video in turbo speed
   */
  turboSpeed () {
    this[_setSpeed](SPEED.max);
  }

  /**
   * @method view video in full screen mode
   */
  fullScreen () {
    this[_setScreen]('request');
  }

  /**
   * @method view video in normal screen mode
   */
  normalScreen () {
    this[_setScreen]('exit');
  }

  /**
   * @method set video to next frame
   */
  nextFrame () {
    this[_setFrame](1);
  }

  /**
   * @method set video to previous frame
   */
  prevFrame () {
    this[_setFrame](-1);
  }

  /**
   * @method open video file and auto play
   */
  open () {
    this[_fileInput].click();
    document.activeElement.blur();
  }

  /**
   * @method pause video
   */
  pause () {
    this[_video].pause();
    this[_disableBtns]([this[_pauseBtn]]);
    this[_enableBtns]([this[_playBtn]]);
  }

  /**
   * @method play video
   */
  play () {
    const btns = [this[_pauseBtn], this[_stopBtn]];

    this[_video].play();
    this[_disableBtns]([this[_playBtn]]);
    this[_enableBtns](btns);
  }

  /**
   * @method restart video
   */
  restart () {
    this[_video].currentTime = 0;
  }

  /**
   * @method stop video and rewind to start
   */
  stop () {
    const btns = [this[_pauseBtn], this[_stopBtn]];

    this.pause();
    this.restart();
    this[_disableBtns](btns);
    this[_enableBtns]([this[_playBtn]]);
  }

  /**
   * @method decrease video volume
   */
  decVolume () {
    const $volume = this[_video].volume;

    this[_setVolume]($volume - VOLUME.step);
  }

  /**
   * @method increase video volume
   */
  incVolume () {
    const $volume = this[_video].volume;

    this[_setVolume]($volume + VOLUME.step);
  }

  /**
   * @method enable or disable volume
   */
  muted () {
    const $video = this[_video];

    if ($video.playbackRate <= SPEED.muted) {
      this[_video].muted = !this[_video].muted;
    }
  }

  /**
   * @method disable button
   *
   * @param {Array} btns (List with disable button elements)
   */
  [_disableBtns] (btns) {
    btns.forEach(btn => btn.setAttribute('disabled', 'disabled'));
  }

  /**
   * @method enable button
   *
   * @param {Array} btns (List with enable button elements)
   */
  [_enableBtns] (btns) {
    btns.forEach(btn => btn.removeAttribute('disabled'));
  }

  /**
   * @method end video file
   */
  [_end] () {
    URL.revokeObjectURL(this[_video].src);
  }

  /**
   * @method initialization media player attributes
   */
  [_initAttrs] () {
    const types = FILE_TYPES.map(type => type.replace('video/', '.'));

    this[_fileInput].setAttribute('accept', types.toString());
    this[_video].controls = true;
  }

  /**
   * @method initialization media player events
   */
  [_initEvents] () {
    this[_fileInput].onchange = this[_setSource].bind(this);
    this[_openBtn].onclick = this.open;
    this[_playBtn].onclick = this.play;
    this[_pauseBtn].onclick = this.pause;
    this[_stopBtn].onclick = this.stop;
    this[_video].onended = this[_end].bind(this);
  }

  /**
   * @method initialization Media class properties
   */
  [_initProps] () {
    this[_fileInput] = document.getElementById('file-input');
    this[_infoText] = document.getElementById('info-text');
    this[_openBtn] = document.getElementById('open-btn');
    this[_playBtn] = document.getElementById('play-btn');
    this[_pauseBtn] = document.getElementById('pause-btn');
    this[_stopBtn] = document.getElementById('stop-btn');
    this[_video] = document.getElementById('video-container');
    this.decSpeed = this.decSpeed.bind(this);
    this.incSpeed = this.incSpeed.bind(this);
    this.normalSpeed = this.normalSpeed.bind(this);
    this.turboSpeed = this.turboSpeed.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.normalScreen = this.normalScreen.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
    this.prevFrame = this.prevFrame.bind(this);
    this.open = this.open.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
    this.decVolume = this.decVolume.bind(this);
    this.incVolume = this.incVolume.bind(this);
    this.muted = this.muted.bind(this);
  }

  /**
   * @method set media player frame
   *
   * @param {int} val (Frame value)
   */
  [_setFrame] (val) {
    const frame = 1 / 24;

    this.pause();
    this[_video].currentTime += frame * val;
  }

  /**
   * @method set media player screen mode
   *
   * @param {String} mode (Screen mode)
   */
  [_setScreen] (mode) {
    const $video = this[_video];
    const lowerCase = mode.toLowerCase();
    const upperCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    const callback = [
      `${lowerCase}Fullscreen`,
      `moz${upperCase}FullScreen`,
      `webkit${upperCase}Fullscreen`,
      `ms${upperCase}Fullscreen`
    ];

    callback.forEach(item => {
      if ($video[item]) {
        $video[item]();

        return false;
      }
    });
  }

  /**
   * @method set media player source
   */
  [_setSource] () {
    const isValidType = this[_validType]();

    if (isValidType) {
      this[_video].src = URL.createObjectURL(this[_fileInput].files[0]);
      this.play();
    } else {
      this[_infoText].innerHTML = 'Invalid File Format';
    }
  }

  /**
   * @method set media player video speed
   *
   * @param {float} val (Rate value)
   */
  [_setSpeed] (val) {
    const $video = this[_video];

    if ($video.src) {
      $video.muted = val > SPEED.muted;

      switch (true) {
        case val < SPEED.min:
          $video.playbackRate = SPEED.min;
          break;
        case val > SPEED.max:
          $video.playbackRate = SPEED.max;
          break;
        default:
          $video.playbackRate = val;
      }

      const rate = $video.playbackRate;

      this[_infoText].innerHTML = rate !== 1 ? `Video Speed x${rate}` : '';
    }
  }

  /**
   * @method set media player volume
   *
   * @param {int} val (Volume value)
   */
  [_setVolume] (val) {
    const $video = this[_video];

    switch (true) {
      case val < VOLUME.min:
        $video.volume = VOLUME.min;
        break;
      case val > VOLUME.max:
        $video.volume = VOLUME.max;
        break;
      default:
        $video.volume = val;
    }
  }

  /**
   * @method validate input file format
   *
   * @return {Boolean}
   */
  [_validType] () {
    const $file = this[_fileInput].files[0];
    const type = $file ? $file.type : '';

    return FILE_TYPES.includes(type);
  }
}
