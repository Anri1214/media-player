import { Config } from './Config';

/**
 * @const {Symbol} (Selector class private properties)
 */
const _config = Symbol('config');

export class Selector {
  constructor () {
    this[_config] = Config.get('selector');
  }

  /**
   * @method get selector value
   *
   * @param {String} type (Selector type)
   * @param {String} val (Selector value)
   *
   * @return {String | Object}
   */
  get (type, val = '') {
    const prop = this[_config][type];

    if (prop) {
      return val ? prop[val] || '' : prop;
    }

    return '';
  }
}
