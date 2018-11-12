import {Selector} from './selector';
import {SELECTOR} from './config';

describe('Selector::', () => {
  const selector = new Selector();

  it('Test get class name type selector', () => {
    const tasks = [
      {
        input: 'action',
        output: 'mp-asideleft__action--button'
      },
      {
        input: 'browser',
        output: 'mp-browser'
      },
      {
        input: 'edit',
        output: 'edit-mode'
      },
      {
        input: 'hidden',
        output: 'hidden'
      },
      {
        input: 'mobile',
        output: 'mp-mobile'
      },
      {
        input: 'mutedOn',
        output: 'fa-volume-mute'
      },
      {
        input: 'mutedOff',
        output: 'fa-volume-off'
      },
      {
        input: 'table',
        output: 'mp-asideright__settings--table'
      },
      {
        input: 'any',
        output: ''
      }
    ];

    tasks.forEach(task => {
      return expect(selector.get('className', task.input)).toEqual(task.output);
    });
  });

  it('Test get ID type selector', () => {
    const tasks = [
      {
        input: 'actions',
        output: 'action-btns'
      },
      {
        input: 'decSpeed',
        output: 'dec-speed-btn'
      },
      {
        input: 'decVolume',
        output: 'dec-volume-btn'
      },
      {
        input: 'file',
        output: 'file-input'
      },
      {
        input: 'fullScreen',
        output: 'full-screen-btn'
      },
      {
        input: 'incSpeed',
        output: 'inc-speed-btn'
      },
      {
        input: 'incVolume',
        output: 'inc-volume-btn'
      },
      {
        input: 'info',
        output: 'info-text'
      },
      {
        input: 'main',
        output: 'main-container'
      },
      {
        input: 'muted',
        output: 'muted-btn'
      },
      {
        input: 'nextFrame',
        output: 'next-frame-btn'
      },
      {
        input: 'normalScreen',
        output: 'normal-screen-btn'
      },
      {
        input: 'normalSpeed',
        output: 'normal-speed-btn'
      },
      {
        input: 'open',
        output: 'open-btn'
      },
      {
        input: 'pause',
        output: 'pause-btn'
      },
      {
        input: 'play',
        output: 'play-btn'
      },
      {
        input: 'prevFrame',
        output: 'prev-frame-btn'
      },
      {
        input: 'restart',
        output: 'restart-btn'
      },
      {
        input: 'stop',
        output: 'stop-btn'
      },
      {
        input: 'table',
        output: 'settings-table'
      },
      {
        input: 'turboSpeed',
        output: 'turbo-speed-btn'
      },
      {
        input: 'video',
        output: 'video-container'
      },
      {
        input: 'any',
        output: ''
      }
    ];

    tasks.forEach(task => {
      return expect(selector.get('id', task.input)).toEqual(task.output);
    });
  });

  it('Test get type selector', () => {
    const tasks = [
      {
        input: ['attr', 'actions'],
        output: ''
      },
      {
        input: ['className', ''],
        output: SELECTOR.className
      },
      {
        input: ['id', ''],
        output: SELECTOR.id
      },
      {
        input: [],
        output: ''
      },
    ];

    tasks.forEach(task => {
      return expect(selector.get(...task.input)).toEqual(task.output);
    });
  });
});
