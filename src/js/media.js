import { Config } from './config';
import { Selector } from './selector';

/**
 * @const {Symbol} (Media class private properties)
 */
const _decSpeedBtn = Symbol('decSpeedBtn');
const _decVolumeBtn = Symbol('decVolumeBtn');
const _fileInput = Symbol('fileInput');
const _fullScreenBtn = Symbol('fullScreenBtn');
const _incSpeedBtn = Symbol('incSpeedBtn');
const _incVolumeBtn = Symbol('incVolumeBtn');
const _infoText = Symbol('infoText');
const _mutedBtn = Symbol('mutedBtn');
const _nextFrameBtn = Symbol('nextFrameBtn');
const _normalSpeedBtn = Symbol('normalSpeedBtn');
const _openBtn = Symbol('openBtn');
const _pauseBtn = Symbol('pauseBtn');
const _playBtn = Symbol('playBtn');
const _prevFrameBtn = Symbol('prevFrameBtn');
const _restartBtn = Symbol('restartBtn');
const _speed = Symbol('speed');
const _stopBtn = Symbol('stopBtn');
const _turboSpeedBtn = Symbol('turboSpeedBtn');
const _video = Symbol('video');
const _volume = Symbol('volume');

/**
 * @const {Symbol} (Media class private methods)
 */
const _changeSound = Symbol('changeSound');
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
    this.selector = new Selector();
    this[_initActions]();
    this[_initProps]();
    this[_initAttrs]();
    this[_initEvents]();
  }

  /**
   * @method decrease video speed
   */
  decSpeed () {
    const $speed = this[_video].playbackRate;

    this[_setSpeed]($speed - this[_speed].step);
  }

  /**
   * @method decrease video volume
   */
  decVolume () {
    const $volume = this[_video].volume;

    this[_setVolume]($volume - this[_volume].step);
  }

  /**
   * @method view video in full screen mode
   */
  fullScreen () {
    this[_setScreen]('request');
  }

  /**
   * @method increase video speed
   */
  incSpeed () {
    const $speed = this[_video].playbackRate;

    this[_setSpeed]($speed + this[_speed].step);
  }

  /**
   * @method increase video volume
   */
  incVolume () {
    const $volume = this[_video].volume;

    this[_setVolume]($volume + this[_volume].step);
  }

  /**
   * @method enable or disable volume
   */
  muted () {
    const $video = this[_video];

    if ($video.playbackRate <= this[_speed].muted) {
      $video.muted = !$video.muted;
      this[_changeSound]();
    }
  }

  /**
   * @method set video to next frame
   */
  nextFrame () {
    if (this[_video].src) {
      this[_setFrame](1);
    }
  }

  /**
   * @method view video in normal screen mode
   */
  normalScreen () {
    this[_setScreen]('exit');
  }

  /**
   * @method play video in normal speed
   */
  normalSpeed () {
    this[_setSpeed](this[_speed].normal);
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
    const $video = this[_video];

    if ($video.src) {
      const disableBtns = [this[_pauseBtn]];
      const enableBtns = [this[_playBtn]];

      $video.pause();
      this[_disableBtns](disableBtns);
      this[_enableBtns](enableBtns);
    }
  }

  /**
   * @method play video
   */
  play () {
    const $video = this[_video];

    if ($video.src) {
      const disableBtns = [this[_playBtn]];
      const enableBtns = [
        this[_decSpeedBtn],
        this[_incSpeedBtn],
        this[_normalSpeedBtn],
        this[_turboSpeedBtn],
        this[_fullScreenBtn],
        this[_nextFrameBtn],
        this[_prevFrameBtn],
        this[_pauseBtn],
        this[_restartBtn],
        this[_stopBtn]
      ];

      $video.play();
      this[_disableBtns](disableBtns);
      this[_enableBtns](enableBtns);
    }
  }

  /**
   * @method set video to previous frame
   */
  prevFrame () {
    if (this[_video].src) {
      this[_setFrame](-1);
    }
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
    const $video = this[_video];

    if ($video.src) {
      const disableBtns = [this[_pauseBtn], this[_stopBtn]];
      const enableBtns = [this[_playBtn]];

      this.pause();
      $video.currentTime = 0;
      this[_disableBtns](disableBtns);
      this[_enableBtns](enableBtns);
    }
  }

  /**
   * @method pla video in turbo speed
   */
  turboSpeed () {
    this[_setSpeed](this[_speed].max);
  }

  /**
   * @method initialization Media action buttons
   */
  [_initActions] () {
    const id = this.selector.get('id');
    const $actions = document.getElementById(id.actions);
    const config = Config.get('button');
    const params = config.params;

    config.view.forEach(key => {
      const $btn = document.createElement('BUTTON');
      const actionClass = this.selector.get('className', 'action');
      const hiddenClass = this.selector.get('className', 'hidden');
      const param = params[key];
      const hidden = param.hidden ? hiddenClass : '';

      this[key] = this[key].bind(this);
      $btn.setAttribute('id', id[key]);
      $btn.setAttribute('class', `${actionClass} ${hidden}`);
      $btn.setAttribute('title', param.title);
      $btn.onclick = this[key];
      $btn.innerHTML = `<i class="fas fa-${param.icon}"></i>`;

      if (param.disabled) {
        $btn.setAttribute('disabled', 'disabled');
      }

      $actions.appendChild($btn);
    });
  }

  /**
   * @method initialization media player attributes
   */
  [_initAttrs] () {
    const types = Config.get('file').map(type => type.replace('video/', '.'));

    this[_fileInput].setAttribute('accept', types.toString());
    this[_video].controls = true;
  }

  /**
   * @method initialization media player events
   */
  [_initEvents] () {
    const $video = this[_video];

    this[_fileInput].onchange = this[_setSource].bind(this);
    $video.onended = this[_endVideo].bind(this);
    $video.onvolumechange = this[_changeSound].bind(this);
    $video.onpause = this.pause;
    $video.onplay = this.play;
  }

  /**
   * @method initialization Media class properties
   */
  [_initProps] () {
    const id = this.selector.get('id');

    this[_decSpeedBtn] = document.getElementById(id.decSpeed);
    this[_decVolumeBtn] = document.getElementById(id.decVolume);
    this[_fileInput] = document.getElementById(id.file);
    this[_fullScreenBtn] = document.getElementById(id.fullScreen);
    this[_incSpeedBtn] = document.getElementById(id.incSpeed);
    this[_incVolumeBtn] = document.getElementById(id.incVolume);
    this[_infoText] = document.getElementById(id.info);
    this[_mutedBtn] = document.getElementById(id.muted);
    this[_nextFrameBtn] = document.getElementById(id.nextFrame);
    this[_normalSpeedBtn] = document.getElementById(id.normalSpeed);
    this[_openBtn] = document.getElementById(id.open);
    this[_pauseBtn] = document.getElementById(id.pause);
    this[_playBtn] = document.getElementById(id.play);
    this[_prevFrameBtn] = document.getElementById(id.prevFrame);
    this[_restartBtn] = document.getElementById(id.restart);
    this[_stopBtn] = document.getElementById(id.stop);
    this[_turboSpeedBtn] = document.getElementById(id.turboSpeed);
    this[_video] = document.getElementById(id.video);
    this[_speed] = Config.get('speed');
    this[_volume] = Config.get('volume');
  }

  /**
   * @method change video sound
   */
  [_changeSound] () {
    const $muted = this[_mutedBtn];
    const $video = this[_video];
    const btns = [this[_decVolumeBtn], this[_incVolumeBtn]];
    const mutedOnClass = this.selector.get('className', 'mutedOn');
    const mutedOffClass = this.selector.get('className', 'mutedOff');

    if ($video.muted) {
      $muted.innerHTML = `<i class="fas ${mutedOnClass}"></i>`;
      this[_disableBtns](btns);
    } else {
      $muted.innerHTML = `<i class="fas ${mutedOffClass}"></i>`;
      this[_enableBtns](btns);
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
      const disbaleBtns = [
        this[_fullScreenBtn],
        this[_nextFrameBtn],
        this[_prevFrameBtn],
        this[_playBtn],
        this[_restartBtn],
      ];

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
    const speed = this[_speed];

    if ($video.src) {
      $video.muted = val > speed.muted;

      switch (true) {
        case val < speed.min:
          $video.playbackRate = speed.min;
          break;
        case val > speed.max:
          $video.playbackRate = speed.max;
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
    const volume = this[_volume];

    switch (true) {
      case val < volume.min:
        $video.volume = volume.min;
        break;
      case val > volume.max:
        $video.volume = volume.max;
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

    return Config.get('file').includes(type);
  }
}
