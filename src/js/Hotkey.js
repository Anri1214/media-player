import { Media } from './Media';

/**
 * @const {Object} CONFIG (Default hotkey configuration)
 */
const CONFIG = {
  action: {
    open: {
      code: 79,
      label: 'Open File'
    },
    play: {
      code: 80,
      label: 'Play'
    },
    pause: {
      code: 32,
      label: 'Pause'
    },
    stop: {
      code: 83,
      label: 'Stop'
    },
    restart: {
      code: 65,
      label: 'Restart'
    },
    fullScreen: {
      code: 13,
      label: 'Full Screen'
    },
    normalScreen: {
      code: 90,
      label: 'Normal Screen'
    },
    incSpeed: {
      code: 69,
      label: 'Speed +'
    },
    decSpeed: {
      code: 87,
      label: 'Speed -'
    },
    turboSpeed: {
      code: 84,
      label: 'Turbo Speed'
    },
    normalSpeed: {
      code: 68,
      label: 'Normal Speed'
    },
    nextFrame: {
      code: 78,
      label: 'Next Frame'
    },
    prevFrame: {
      code: 82,
      label: 'Previous Frame'
    }
  },
  index: ['label', 'code', 'action']
};

/**
 * @const {Object} KEYBOARD_CODE (List with keyboard codes)
 */
const KEYBOARD_CODE = {
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
 * @const {Symbol} (Hotkey class private properties)
 */
const _config = Symbol('config');
const _table = Symbol('table');

/**
 * @const {Symbol} (Hotkey class private methods)
 */
const _addHotkeyListener = Symbol('addHotkeyListener');
const _initCallback = Symbol('initCallback');
const _initProps = Symbol('initProps');
const _initTable = Symbol('initTable');

/**
 * @class Hotkey (Base class working with hotkey configuration)
 */
export class Hotkey {
  constructor () {
    this.media = new Media();
    this[_initProps]();
    this[_initTable]();
    this[_initCallback]();
    this[_addHotkeyListener]();
  }

  /**
   * @method add hotkey event listener
   */
  [_addHotkeyListener] () {
    document.addEventListener('keyup', e => {
      Object.values(this[_config].action).forEach(item => {
        if (item.code === e.keyCode) {
          item.callback();
        }
      });
    });
  }

  /**
   *
   */
  [_initCallback] () {
    const config = this[_config].action;

    Object.keys(config).forEach(key => {
      config[key].callback = this.media[key];
    });
  }

  /**
   * @method initialization Hotkey class properties
   */
  [_initProps] () {
    this[_config] = CONFIG;
    this[_table] = document.getElementById('settings-table');
  }

  /**
   * @method initialization table row
   */
  [_initTable] () {
    const config = this[_config];

    Object.keys(config.action).forEach(key => {
      const $row = this[_table].getElementsByTagName('tbody')[0].insertRow(-1);
      const prefix = 'mp-asideright__settings--table';
      const val = config.action[key];

      for (let i = 0; i <= 2 ; i++) {
        const $cell = $row.insertCell(i);
        const index = config.index[i];
        const item = val[index];

        switch (index) {
          case 'action':
            $cell.innerHTML = `<button id="${key}" class="${prefix}-button">
                                 <i class="fas fa-edit"></i>
                               </button>`;
            break;
          case 'code':
            $cell.innerHTML = `Key "${KEYBOARD_CODE[item]}"`;
            break;
          case 'label':
            $cell.innerHTML = item;
            break;
        }

        $cell.setAttribute('class', `${prefix}-col-${i + 1}`);
      }
    });
  }
}
