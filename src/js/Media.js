/**
 * @const {Object} ACTION_BUTTONS (Media player action buttons configuration)
 */
const ACTION_BUTTONS = {
  play: {
    icon: 'play',
    title: 'Play',
    disabled: true,
    hidden: false,
  },
  pause: {
    icon: 'pause',
    title: 'Pause',
    disabled: true,
    hidden: false,
  },
  stop: {
    icon: 'stop',
    title: 'Stop',
    disabled: true,
    hidden: false,
  },
  restart: {
    icon: 'redo',
    title: 'Restart',
    disabled: false,
    hidden: true,
  },
  prevFrame: {
    icon: 'backward',
    title: 'Previous Frame',
    disabled: false,
    hidden: true,
  },
  nextFrame: {
    icon: 'forward',
    title: 'Next Frame',
    disabled: false,
    hidden: true,
  },
  incVolume: {
    icon: 'volume-up',
    title: 'Volume +',
    disabled: false,
    hidden: true,
  },
  decVolume: {
    icon: 'volume-down',
    title: 'Volume -',
    disabled: false,
    hidden: true,
  },
  open: {
    icon: 'eject',
    title: 'Open',
    disabled: false,
    hidden: false,
  },
  fullScreen: {
    icon: 'expan',
    title: 'Full Screen',
    disabled: true,
    hidden: false,
  }
};

/**
 * @const {Array} FILE_TYPES (List with media player file types)
 */
const FILE_TYPES = [
  'video/ogg',
  'video/mp4',
  'video/webm'
];

/**
 * @const {Object} ID (Media player ID list in DOM)
 */
const ID = {
  actions: 'action-btns',
  decVolume: 'dec-volume-btn',
  file: 'file-input',
  fullScreen: 'full-screen-btn',
  incVolume: 'inc-volume-btn',
  info: 'info-text',
  nextFrame: 'next-frame-btn',
  open: 'open-btn',
  pause: 'pause-btn',
  play: 'play-btn',
  prevFrame: 'prev-frame-btn',
  restart: 'restart-btn',
  stop: 'stop-btn',
  video: 'video-container'
};

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
const _fullScreenBtn = Symbol('fullScreenBtn');
const _nextFrameBtn = Symbol('nextFrameBtn');
const _prevFrameBtn = Symbol('prevFrameBtn');
const _decVolumeBtn = Symbol('incVolumeBtn');
const _incVolumeBtn = Symbol('incVolumeBtn');
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
const _initActions = Symbol('initActions');
const _initAttrs = Symbol('initAttr');
const _initEvents = Symbol('initEvents');
const _initProps = Symbol('initProps');
const _endVideo = Symbol('end');
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
    this[_initActions]();
    this[_initProps]();
    this[_initAttrs]();
    this[_initEvents]();
  }

  /**
   * @method get media player elements ID parameters
   *
   * @return {Object}
   */
  getId () {
    return ID;
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
    const disableBtns = [this[_pauseBtn]];
    const enableBtns = [this[_playBtn]];

    this[_video].pause();
    this[_disableBtns](disableBtns);
    this[_enableBtns](enableBtns);
  }

  /**
   * @method play video
   */
  play () {
    const disableBtns = [this[_playBtn]];
    const enableBtns = [this[_pauseBtn], this[_stopBtn], this[_fullScreenBtn]];

    this[_video].play();
    this[_disableBtns](disableBtns);
    this[_enableBtns](enableBtns);
  }

  /**
   * @method restart video
   */
  restart () {
    this[_video].currentTime = 0;
    this.play();
  }

  /**
   * @method stop video and rewind to start
   */
  stop () {
    const disableBtns = [this[_pauseBtn], this[_stopBtn]];
    const enableBtns = [this[_playBtn]];

    this.pause();
    this[_video].currentTime = 0;
    this[_disableBtns](disableBtns);
    this[_enableBtns](enableBtns);
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
   * @method initialization Media action buttons
   */
  [_initActions] () {
    const $actions = document.getElementById(ID.actions);

    Object.keys(ACTION_BUTTONS).forEach(key => {
      const $btn = document.createElement('BUTTON');
      const param = ACTION_BUTTONS[key];
      const hidden = param.hidden ? 'hidden' : '';
      const className = `mp-asideleft__action--button ${hidden}`;

      $btn.setAttribute('id', ID[key]);
      $btn.setAttribute('class', className);
      $btn.setAttribute('title', param.title);
      $btn.innerHTML = `<i class="fas fa-${param.icon}"></i>`;

      if (param.disabled) {
        $btn.setAttribute('disabled', 'disabled');
      }

      $actions.appendChild($btn);
    });
  }

  /**
   * @method initialization Media class properties
   */
  [_initProps] () {
    this[_fileInput] = document.getElementById(ID.file);
    this[_infoText] = document.getElementById(ID.info);
    this[_fullScreenBtn] = document.getElementById(ID.fullScreen);
    this[_nextFrameBtn] = document.getElementById(ID.nextFrame);
    this[_prevFrameBtn] = document.getElementById(ID.prevFrame);
    this[_decVolumeBtn] = document.getElementById(ID.decVolume);
    this[_incVolumeBtn] = document.getElementById(ID.incVolume);
    this[_openBtn] = document.getElementById(ID.open);
    this[_playBtn] = document.getElementById(ID.play);
    this[_pauseBtn] = document.getElementById(ID.pause);
    this[_stopBtn] = document.getElementById(ID.stop);
    this[_video] = document.getElementById(ID.video);
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
    this[_fullScreenBtn].onclick = this.fullScreen;
    this[_nextFrameBtn].onclick = this.nextFrame;
    this[_prevFrameBtn].onclick = this.prevFrame;
    this[_decVolumeBtn].onclick = this.decVolume;
    this[_incVolumeBtn].onclick = this.incVolume;
    this[_openBtn].onclick = this.open;
    this[_playBtn].onclick = this.play;
    this[_pauseBtn].onclick = this.pause;
    this[_stopBtn].onclick = this.stop;
    this[_video].onended = this[_endVideo].bind(this);
    this[_video].onpause = this.pause;
    this[_video].onplay = this.play;
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
  [_endVideo] () {
    URL.revokeObjectURL(this[_video].src);
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
    const $info = this[_infoText];
    const $video = this[_video];
    const isValidType = this[_validType]();

    if (isValidType) {
      $info.innerHTML = '';
      $video.src = URL.createObjectURL(this[_fileInput].files[0]);
      this.play();
    } else {
      const disbaleBtns = [this[_playBtn], this[_fullScreenBtn]];

      this.stop();
      this[_disableBtns](disbaleBtns);
      $info.innerHTML = 'Invalid File Format';
      $video.src = '';
    }
  }

  /**
   * @method set media player video speed
   *
   * @param {number} val (Rate value)
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
