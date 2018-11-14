import { Config } from './config';
import { Media } from './media';
import { Selector } from './selector';

/**
 * @const {Symbol} - Hotkey class private properties.
 */
const _config = Symbol('config');
const _editMode = Symbol('editMode');
const _infoText = Symbol('infoText');
const _keyCode = Symbol('keyCode');
const _reservedKeys = Symbol('reservedKeys');
const _main = Symbol('main');
const _mouseEvent = Symbol('mouseEvent');
const _settings = Symbol('settings');
const _table = Symbol('table');

/**
 * @const {Symbol} - Hotkey class private methods.
 */
const _addHotkeyListener = Symbol('addHotkeyListener');
const _changeHotkey = Symbol('changeHotkey');
const _initCallback = Symbol('initCallback');
const _initProps = Symbol('initProps');
const _initTable = Symbol('initTable');
const _initTableEvents = Symbol('initTableEvents');
const _replaceHotkey = Symbol('replaceHotkey');
const _sortTitle = Symbol('sortTitle');

/**
 * Class representing work with hotkey configuration.
 */
export class Hotkey {
  /**
   * Initialize a hotkey object.
   */
  constructor () {
    this.media = new Media();
    this.selector = new Selector();
    this[_initProps]();
    this[_initTable]();
    this[_initTableEvents]();
    this[_initCallback]();
    this[_addHotkeyListener]();
  }

  /**
   * Initialization Hotkey class properties.
   */
  [_initProps] () {
    const infoId = this.selector.get('id', 'info');
    const mainId = this.selector.get('id', 'main');
    const settings = this.selector.get('id', 'settings');
    const tableId = this.selector.get('id', 'table');

    this[_config] = Config.get('button');
    this[_keyCode] = Config.get('keycode');
    this[_reservedKeys] = Config.get('reserved');
    this[_editMode] = false;
    this[_mouseEvent] = null;
    this[_changeHotkey] = this[_changeHotkey].bind(this);
    this[_replaceHotkey] = this[_replaceHotkey].bind(this);
    this[_infoText] = document.getElementById(infoId);
    this[_main] = document.getElementById(mainId);
    this[_settings] = document.getElementById(settings);
    this[_table] = document.getElementById(tableId);
  }

  /**
   * Initialization hotkey callback.
   */
  [_initCallback] () {
    const params = this[_config].params;

    Object.keys(params).forEach(key => {
      params[key].callback = this.media[key];
    });
  }

  /**
   * Initialization table content.
   */
  [_initTable] () {
    const config = this[_config];
    const params = config.params;
    const prefix = this.selector.get('className', 'table');
    const sort = this[_sortTitle](params);

    sort.forEach(key => {
      const $row = this[_table].getElementsByTagName('tbody')[0].insertRow(-1);
      const val = params[key];

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
            this[_reservedKeys].push(item);
            $cell.innerHTML = `Key "${this[_keyCode][item]}"`;
            break;
          case 'title':
            $cell.innerHTML = item;
            break;
        }

        $cell.setAttribute('class', `${prefix}-col-${i + 1}`);
      }
    });
  }

  /**
   * Initialization table button events.
   */
  [_initTableEvents] () {
    const prefix = this.selector.get('className', 'table');
    const btns = document.getElementsByClassName(`${prefix}-button`);

    Object.values(btns).forEach(btn => {
      btn.onclick = this[_changeHotkey];
    });
  }

  /**
   * Add hotkey event listener.
   */
  [_addHotkeyListener] () {
    document.addEventListener('keyup', event => {
      if (this[_editMode]) {
        const $info = this[_infoText];
        const $main = this[_main];
        const $settings = this[_settings];
        const code = event.keyCode;
        const editClass = this.selector.get('className', 'edit');
        const find = this[_reservedKeys].find(key => key === code);

        switch (true) {
          case code === 27:
            this[_editMode] = false;
            $info.innerHTML = '';
            $main.classList.remove(editClass);
            $settings.classList.remove(editClass);
            break;
          case find !== undefined:
            $info.innerHTML = 'Key is used or reserved';
            break;
          default:
            this[_replaceHotkey](event);
            $main.classList.remove(editClass);
            $settings.classList.remove(editClass);
        }
      } else {
        Object.values(this[_config].params).forEach(item => {
          if (item.code === event.keyCode) {
            item.callback();
          }
        });
      }
    });
  }

  /**
   * Change hotkey value.
   * @param {Object} event - Button click event.
   */
  [_changeHotkey] (event) {
    const editClass = this.selector.get('className', 'edit');

    this[_editMode] = true;
    this[_infoText].innerHTML = 'Select New Key';
    this[_main].classList.add(editClass);
    this[_settings].classList.add(editClass);
    this[_mouseEvent] = event;
    document.activeElement.blur();
  }

  /**
   * Replace hotkey value in configuration
   * @param {Object} event - Hotkey event.
   */
  [_replaceHotkey] (event) {
    const $mouse = this[_mouseEvent];
    const $target = $mouse.target;
    const code = event.keyCode;
    const find = $mouse.target.parentElement.parentElement;
    const id = $target.id || $target.parentElement.id;
    const keys = this[_reservedKeys];
    const param = this[_config].params[id];
    const index = keys.indexOf(param.code);

    param.code = code;
    find.children[1].innerHTML = `Key "${this[_keyCode][code]}"`;
    keys.splice(index, 1);
    keys.push(code);
    this[_editMode] = false;
    this[_infoText].innerHTML = '';
  }

  /**
   * Sort action button keys by title.
   * @param {Object} params - Action button parameters.
   * @return {Array}
   */
  [_sortTitle] (params) {
    return Object.keys(params).sort((a, b) => {
      const first = params[a].title;
      const second = params[b].title;

      switch (true) {
        case first > second:
          return 1;
        case first < second:
          return -1;
        default:
          return 0;
      }
    });
  }
}
