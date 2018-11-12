import * as module from './config';

describe('module::', () => {
  it('Get configuration', () => {
    const tasks = [
      {
        input: 'button',
        output: module.ACTION_BUTTONS
      },
      {
        input: 'device',
        output: module.DEVICES
      },
      {
        input: 'file',
        output: module.FILE_TYPES
      },
      {
        input: 'keycode',
        output: module.KEYBOARD_CODE
      },
      {
        input: 'reserved',
        output: module.RESERVED_KEYS
      },
      {
        input: 'selector',
        output: module.SELECTOR
      },
      {
        input: 'speed',
        output: module.SPEED
      },
      {
        input: 'volume',
        output: module.VOLUME
      },
      {
        input: 'any',
        output: ''
      }
    ];

    tasks.forEach(task => {
      return expect(module.Config.get(task.input)).toEqual(task.output);
    });
  });
});
