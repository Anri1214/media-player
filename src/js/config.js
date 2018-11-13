/**
 * @const {Object} ACTION_BUTTONS - Media player action buttons configuration.
 * Key must be named as Media class public methods.
 */
export const ACTION_BUTTONS = {
  index: ['title', 'code', 'action'],
  mobile: [
    'decSpeed',
    'decVolume',
    'incSpeed',
    'incVolume',
    'muted',
    'nextFrame',
    'normalSpeed',
    'prevFrame',
    'restart',
    'turboSpeed'
  ],
  params: {
    decSpeed: {
      icon: 'minus',
      title: 'Speed -',
      disabled: true,
      hidden: true,
      code: 87
    },
    decVolume: {
      icon: 'volume-down',
      title: 'Volume -',
      disabled: false,
      hidden: true,
      code: 66
    },
    fullScreen: {
      icon: 'expand',
      title: 'Full Screen',
      disabled: true,
      hidden: false,
      code: 70
    },
    incSpeed: {
      icon: 'plus',
      title: 'Speed +',
      disabled: true,
      hidden: true,
      code: 69
    },
    incVolume: {
      icon: 'volume-up',
      title: 'Volume +',
      disabled: false,
      hidden: true,
      code: 86
    },
    muted: {
      icon: 'volume-off',
      title: 'Muted',
      disabled: false,
      hidden: true,
      code: 77
    },
    nextFrame: {
      icon: 'step-forward',
      title: 'Next Frame',
      disabled: true,
      hidden: true,
      code: 78
    },
    normalScreen: {
      icon: 'compress',
      title: 'Normal Screen',
      disabled: true,
      hidden: true,
      code: 90
    },
    normalSpeed: {
      icon: 'walking',
      title: 'Normal Speed',
      disabled: true,
      hidden: true,
      code: 68
    },
    open: {
      icon: 'eject',
      title: 'Open',
      disabled: false,
      hidden: false,
      code: 79
    },
    pause: {
      icon: 'pause',
      title: 'Pause',
      disabled: true,
      hidden: false,
      code: 76
    },
    play: {
      icon: 'play',
      title: 'Play',
      disabled: true,
      hidden: false,
      code: 80
    },
    prevFrame: {
      icon: 'step-backward',
      title: 'Previous Frame',
      disabled: true,
      hidden: true,
      code: 82
    },
    restart: {
      icon: 'redo',
      title: 'Restart',
      disabled: true,
      hidden: true,
      code: 65
    },
    stop: {
      icon: 'stop',
      title: 'Stop',
      disabled: true,
      hidden: false,
      code: 83
    },
    turboSpeed: {
      icon: 'running',
      title: 'Turbo Speed',
      disabled: true,
      hidden: true,
      code: 84
    }
  },
  view: [
    'play',
    'pause',
    'stop',
    'open',
    'restart',
    'prevFrame',
    'nextFrame',
    'incVolume',
    'decVolume',
    'muted',
    'incSpeed',
    'decSpeed',
    'turboSpeed',
    'normalSpeed',
    'fullScreen',
    'normalScreen'
  ]
};

/**
 * @const {String} DEVICES - Regular expression with mobile devices.
 */
export const DEVICES = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * @const {Array} FILE_TYPES - List with media player file types.
 */
export const FILE_TYPES = [
  'video/ogg',
  'video/mp4',
  'video/webm'
];

/**
 * @const {Object} KEYBOARD_CODE - List with keyboard codes.
 */
export const KEYBOARD_CODE = {
  3: 'Break',
  8: 'Backspace / Delete',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Ctrl',
  18: 'Alt',
  19: 'Pause / Break',
  20: 'Caps Lock',
  27: 'Escape',
  32: 'Spacebar',
  33: 'Page Up',
  34: 'Page Down',
  35: 'End',
  36: 'Home',
  37: 'Left Arrow',
  38: 'Up Arrow',
  39: 'Right Arrow',
  40: 'Down Arrow',
  41: 'Select',
  42: 'Print',
  43: 'Execute',
  44: 'Print Screen',
  45: 'Insert',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: 'Semicolon (Firefox), Equals',
  60: '<',
  61: 'Equals (Firefox)',
  63: 'ß',
  64: '@ (Firefox)',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  91: 'Windows Key / Left ⌘ / Chromebook Search Key',
  92: 'Right Window Key',
  93: 'Windows Menu / Right ⌘',
  96: 'Numpad 0',
  97: 'Numpad 1',
  98: 'Numpad 2',
  99: 'Numpad 3',
  100: 'Numpad 4',
  101: 'Numpad 5',
  102: 'Numpad 6',
  103: 'Numpad 7',
  104: 'Numpad 8',
  105: 'Numpad 9',
  106: 'Multiply',
  107: 'Add',
  108: 'Numpad Period (Firefox)',
  109: 'Subtract',
  110: 'Decimal Point',
  111: 'Divide',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  124: 'F13',
  125: 'F14',
  126: 'F15',
  127: 'F16',
  128: 'F17',
  129: 'F18',
  130: 'F19',
  131: 'F20',
  132: 'F21',
  133: 'F22',
  134: 'F23',
  135: 'F24',
  144: 'Num Lock ',
  145: 'Scroll Lock',
  160: '^',
  161: '!',
  163: '#',
  164: '$',
  165: 'Ù',
  166: 'Page Backward',
  167: 'Page Forward',
  169: 'Closing paren (AZERTY)',
  170: '*',
  171: '~ + * Key',
  173: 'Minus (Firefox), Mute / Unmute',
  174: 'Decrease Volume Level',
  175: 'Increase Volume Level',
  176: 'Next',
  177: 'Previous',
  178: 'Stop',
  179: 'Play / Pause',
  180: 'E-Mail',
  181: 'Mute / Unmute (Firefox)',
  182: 'Decrease Volume Level (Firefox)',
  183: 'Increase Volume Level (Firefox)',
  186: 'Semi-Colon / Ñ',
  187: 'Equal Sign',
  188: 'Comma',
  189: 'Dash',
  190: 'Period',
  191: 'Forward Slash / Ç',
  192: 'Grave Accent / Ñ / Æ',
  193: '?, / or °',
  194: 'Numpad Period (Chrome)',
  219: 'Open Bracket',
  220: 'Back Slash',
  221: 'Close Bracket / Å',
  222: 'Single Quote / Ø',
  223: '`',
  224: 'Left Or Right ⌘ key (Firefox)',
  225: 'Altgr',
  226: '< /git >',
  230: 'GNOME Compose Key',
  231: 'Ç',
  233: 'XF86Forward',
  234: 'XF86Back',
  255: 'Toggle Touchpad'
};

/**
 * @const {Array} RESERVED_KEYS - List with reserved keyboard keys.
 */
export const RESERVED_KEYS = [9, 13, 20, 27, 32, 35, 36, 40, 112, 114, 116, 117, 122, 123];

/**
 * @const {Object} SELECTOR - Selector configuration.
 */
export const SELECTOR = {
  className: {
    action: 'mp-asideleft__action--button',
    browser: 'mp-browser',
    edit: 'edit-mode',
    hidden: 'hidden',
    mobile: 'mp-mobile',
    mutedOn: 'fa-volume-mute',
    mutedOff: 'fa-volume-off',
    table: 'mp-asideright__settings--table'
  },
  id: {
    actions: 'action-btns',
    decSpeed: 'dec-speed-btn',
    decVolume: 'dec-volume-btn',
    file: 'file-input',
    fullScreen: 'full-screen-btn',
    incSpeed: 'inc-speed-btn',
    incVolume: 'inc-volume-btn',
    info: 'info-text',
    main: 'main-container',
    muted: 'muted-btn',
    nextFrame: 'next-frame-btn',
    normalScreen: 'normal-screen-btn',
    normalSpeed: 'normal-speed-btn',
    open: 'open-btn',
    pause: 'pause-btn',
    play: 'play-btn',
    prevFrame: 'prev-frame-btn',
    restart: 'restart-btn',
    stop: 'stop-btn',
    table: 'settings-table',
    turboSpeed: 'turbo-speed-btn',
    video: 'video-container'
  }
};

/**
 * @const {Object} SPEED - Media player speed parameters.
 */
export const SPEED = {
  max: 12,
  min: 0,
  muted: 3,
  normal: 1,
  step: 0.5
};

/**
 * @const {Object} VOLUME - Media player volume parameters.
 */
export const VOLUME = {
  max: 1,
  min: 0,
  step: 0.1
};

/**
 * Class representing media player configuration.
 */
export class Config {
  /**
   * Get configuration by type
   * @param {String} type - Configuration type.
   * @return {Object | Array | String}
   */
  static get (type) {
    switch (type) {
      case 'button':
        return ACTION_BUTTONS;
      case 'device':
        return DEVICES;
      case 'file':
        return FILE_TYPES;
      case 'keycode':
        return KEYBOARD_CODE;
      case 'reserved':
        return RESERVED_KEYS;
      case 'selector':
        return SELECTOR;
      case 'speed':
        return SPEED;
      case 'volume':
        return VOLUME;
      default:
        return '';
    }
  }
}
