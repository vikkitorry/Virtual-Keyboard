class Keyboard {
  constructor() {
    this.engLetters = {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'Q',
      KeyW: 'W',
      KeyE: 'E',
      KeyR: 'R',
      KeyT: 'T',
      KeyY: 'Y',
      KeyU: 'U',
      KeyI: 'I',
      KeyO: 'O',
      KeyP: 'P',
      BracketLeft: '[',
      BracketRight: ']',
      Backslash: '\\',
      Delete: 'Del',
      CapsLock: 'CapsLock',
      KeyA: 'a',
      KeyS: 's',
      KeyD: 'd',
      KeyF: 'f',
      KeyG: 'g',
      KeyH: 'h',
      KeyJ: 'j',
      KeyK: 'k',
      KeyL: 'l',
      Semicolon: ';',
      Quote: "'",
      Enter: 'Enter',
      ShiftLeft: 'Shift',
      KeyZ: 'z',
      KeyX: 'x',
      KeyC: 'c',
      KeyV: 'v',
      KeyB: 'b',
      KeyN: 'n',
      KeyM: 'm',
      Comma: ',',
      Period: '.',
      Slash: '/',
      ArrowUp: '',
      ShiftRight: 'Shift',
      ControlLeft: 'Control',
      MetaLeft: 'Win',
      AltLeft: 'Alt',
      Space: ' ',
      AltRight: 'Alt',
      ArrowLeft: '',
      ArrowDown: '',
      ArrowRight: '',
      ControlRight: 'Control',
    };

    this.ruLetters = {
      Backquote: 'ё',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'й',
      KeyW: 'ц',
      KeyE: 'у',
      KeyR: 'к',
      KeyT: 'е',
      KeyY: 'н',
      KeyU: 'г',
      KeyI: 'ш',
      KeyO: 'щ',
      KeyP: 'з',
      BracketLeft: 'х',
      BracketRight: 'ъ',
      Backslash: '\\',
      Delete: 'Del',
      CapsLock: 'CapsLock',
      KeyA: 'Ф',
      KeyS: 'Ы',
      KeyD: 'В',
      KeyF: 'А',
      KeyG: 'П',
      KeyH: 'Р',
      KeyJ: 'О',
      KeyK: 'Л',
      KeyL: 'Д',
      Semicolon: 'Ж',
      Quote: 'Э',
      Enter: 'Enter',
      ShiftLeft: 'Shift',
      KeyZ: 'Я',
      KeyX: 'Ч',
      KeyC: 'С',
      KeyV: 'М',
      KeyB: 'И',
      KeyN: 'Т',
      KeyM: 'Ь',
      Comma: 'Б',
      Period: 'Ю',
      Slash: '.',
      ArrowUp: '',
      ShiftRight: 'Shift',
      ControlLeft: 'Control',
      MetaLeft: 'Win',
      AltLeft: 'Alt',
      Space: ' ',
      AltRight: 'Alt',
      ArrowLeft: '',
      ArrowDown: '',
      ArrowRight: '',
      ControlRight: 'Control',
    };

    this.lang = 'ru';
    this.isCaps = false;
    this.createPageStructure();
    this.keyboard;
  }

  createPageStructure() {
    const body = document.querySelector('body');
    const main = this.createElm('main', 'main');
    const window = this.createElm('section', 'window');
    this.keyboard = this.createElm('section', 'keyboard');
    this.createKeyBoardLines();
    for (let i = 0; i < 5; i++) {
      this.createKeys(i);
    }
    main.insertAdjacentElement('afterbegin', this.keyboard);
    main.insertAdjacentElement('afterbegin', window);
    window.insertAdjacentElement('afterbegin', this.createElm('pre', 'window__text'));
    body.insertAdjacentElement('afterbegin', main);
    body.insertAdjacentElement('afterbegin', this.createElm('div', 'window__desc'));
    const lines = document.querySelectorAll('.keyboard__line');
    this.addId()/*
    for (let i = 0; i < 5; i++) {
      addClassChar(i, lines[i]);
    }*/
  }

  createElm(element, className) {
    const item = document.createElement(element);
    item.classList.add(className);
    return item;
  }

  createKeyBoardLines() {
    for (let i = 0; i < 5; i++) {
      this.keyboard.insertAdjacentElement('afterbegin', this.createElm('div', 'keyboard__line'));
    }
  }

  createKeys(counter) {
    const keyboardNodes = this.keyboard.childNodes;
    const lineLength = [14, 15, 13, 13, 9];
    for (let i = 0; i < lineLength[counter]; i++) {
      keyboardNodes[counter].insertAdjacentElement('beforeend', this.createElm('div', 'key'))
    }
  }

  addId() {
    const keys = document.querySelectorAll('.key');
    console.log(keys)
    const keysObj = Object.keys(this.engLetters);
    keys.forEach((el, i) => {
      el.setAttribute('id', keysObj[i]);
    });
  }

}

function createPage() {
  return new Keyboard();
}

window.addEventListener('load', () => {
  createPage();
});