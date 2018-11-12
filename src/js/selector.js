import { Config } from './config';

/**
 * @const {Symbol} - Selector class private properties.
 */
const _config = Symbol('config');

/**
 * Class representing work with DOM selector.
 */
export class Selector {
  /**
   * Initialize a selector object.
   */
  constructor () {
    this[_config] = Config.get('selector');
  }

  /**
   * Get selector value.
   * @param {String} type - Selector type.
   * @param {String} val - Selector value.
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
