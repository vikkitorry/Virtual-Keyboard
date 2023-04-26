class Keyboard {
  constructor() {
    this.chars = {
      Backquote: ['`', 'ё', 'true'],
      Digit1: ['1', '1'],
      Digit2: ['2', '2'],
      Digit3: ['3', '3'],
      Digit4: ['4', '4'],
      Digit5: ['5', '5'],
      Digit6: ['6', '6'],
      Digit7: ['7', '7'],
      Digit8: ['8', '8'],
      Digit9: ['9', '9'],
      Digit0: ['0', '0'],
      Minus: ['-', '-'],
      Equal: ['=', '='],
      Backspace: ['Backspace'],
      Tab: ['Tab'],
      KeyQ: ['q', 'й', 'true'],
      KeyW: ['w', 'ц', 'true'],
      KeyE: ['e', 'у', 'true'],
      KeyR: ['r', 'к', 'true'],
      KeyT: ['t', 'е', 'true'],
      KeyY: ['y', 'н', 'true'],
      KeyU: ['u', 'г', 'true'],
      KeyI: ['i', 'ш', 'true'],
      KeyO: ['o', 'щ', 'true'],
      KeyP: ['p', 'з', 'true'],
      BracketLeft: ['[', 'х', 'true'],
      BracketRight: [']', 'ъ', 'true'],
      Backslash: ['\\', '/', 'true'],
      Delete: ['Del'],
      CapsLock: ['CapsLock'],
      KeyA: ['a', 'ф', 'true'],
      KeyS: ['s', 'ы', 'true'],
      KeyD: ['d', 'в', 'true'],
      KeyF: ['f', 'а', 'true'],
      KeyG: ['g', 'п', 'true'],
      KeyH: ['h', 'р', 'true'],
      KeyJ: ['j', 'о', 'true'],
      KeyK: ['k', 'л', 'true'],
      KeyL: ['l', 'д', 'true'],
      Semicolon: [';', 'ж', 'true'],
      Quote: ["'", 'э', 'true'],
      Enter: ['Enter'],
      ShiftLeft: ['Shift'],
      KeyZ: ['z', 'я', 'true'],
      KeyX: ['x', 'ч', 'true'],
      KeyC: ['c', 'с', 'true'],
      KeyV: ['v', 'м', 'true'],
      KeyB: ['b', 'и', 'true'],
      KeyN: ['n', 'т', 'true'],
      KeyM: ['m', 'ь', 'true'],
      Comma: [',', 'б', 'true'],
      Period: ['.', 'ю', 'true'],
      Slash: ['/', '.', 'true'],
      ArrowUp: ['', ''],
      ShiftRight: ['Shift'],
      ControlLeft: ['Ctr'],
      MetaLeft: ['Win'],
      AltLeft: ['Alt'],
      Space: [' ', ' '],
      AltRight: ['Alt'],
      ArrowLeft: ['', ''],
      ArrowDown: ['', ''],
      ArrowRight: ['', ''],
      ControlRight: ['Ctr'],
    };

    this.isLangRu = JSON.parse(localStorage.getItem('lng')) || false;
    this.isCaps = false;
    this.createPageStructure();
    this.keyboard;
    this.isShift = false;
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
    window.insertAdjacentElement('afterbegin', this.createElm('textarea', 'window__text'));
    body.insertAdjacentElement('afterbegin', main);
    body.insertAdjacentElement('afterbegin', this.createElm('div', 'window__desc'));
    const keys = document.querySelectorAll('.key');
    const textWindow = document.querySelector('.window__text');
    this.addIdContent(keys);
    this.addMessage(keys, textWindow);
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

  addIdContent(keys) {
    const keysObj = Object.keys(this.chars);
    keys.forEach((elm, i) => {
      elm.setAttribute('id', keysObj[i]);
      const dataElm = this.chars[keysObj[i]];
      if (dataElm[1]) {
        elm.dataset.ru = dataElm[1];
        elm.dataset.eng = dataElm[0];
        elm.dataset.symbol = 'true';
      }
      if (this.isLangRu) {
        elm.textContent = dataElm[1]
      } else {
        elm.textContent = dataElm[0];
      }
    });
  }

  addMessage(buttons, textWindow) {
    const symbolsArr = document.querySelectorAll('[data-symbol="true"]');
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.ru) {
          textWindow.textContent += el.textContent;
        } else {
          this.checkBtn(el.id, textWindow, symbolsArr);
        }
      });

      function addActionForShift() {
        symbolsArr.forEach((item) => {
          if (item.textContent === item.textContent.toLowerCase()) {
            item.textContent = item.textContent.toUpperCase();
          } else {
            item.textContent = item.textContent.toLowerCase();
          }
        });
      }

      if (el.id === 'ShiftLeft' || el.id === 'ShiftRight') {
        el.addEventListener('mousedown', () => {
          addActionForShift();
        });
        el.addEventListener('mouseup', () => {
          addActionForShift();
        });
      }
    });
    this.addMessageByKeyDown(textWindow, symbolsArr);
  }

  checkBtn(btnCode, textWindow, symbolsArr) {
    switch (btnCode) {
      case 'Backspace':
        textWindow.textContent = textWindow.textContent.slice(0, -1);
        break;
      case 'Tab':
        textWindow.textContent += '    ';
        break;
      case 'Space':
        textWindow.textContent += ' ';
        break;
      case 'Delete':
        textWindow.textContent = '';
        break;
      case 'CapsLock':
        for (let i = 0; i < symbolsArr.length; i++) {
          if (!this.isCaps) {
            symbolsArr[i].textContent = symbolsArr[i].textContent.toUpperCase();
          } else {
            symbolsArr[i].textContent = symbolsArr[i].textContent.toLowerCase();
          }
        }
        this.isCaps = !this.isCaps
        break;
      case 'Enter':
        textWindow.textContent += '\n';
        break;
      case 'ArrowUp':
        textWindow.textContent += '↑';
        break;
      case 'ArrowDown':
        textWindow.textContent += '↓';
        break;
      case 'ArrowRight':
        textWindow.textContent += '→';
        break;
      case 'ArrowLeft':
        textWindow.textContent += '←';
        break;
      default:
    }
  }

  changeLang() {
    const lang = localStorage.getItem('lang');
    if (this.isLangRu) {
      localStorage.setItem('lang', 'en');
    } else {
      localStorage.setItem('lang', 'ru');
    }
  }

  addMessageByKeyDown(textWindow, symbolsArr) {
    document.addEventListener('keydown', (evt) => {
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        const item = this.keyboard.querySelector(`#${evt.code}`);
        setTimeout(() => {
          this.hightLightKey(item);
        });
        if (evt.code === 'Tab') {
          evt.preventDefault();
          textWindow.textContent += '    ';
        }
        if ((evt.altKey && evt.ctrlKey)) {
          this.changeLang();
          symbolsArr.forEach((btn) => {
            if (this.isLangRu) {
              btn.textContent = btn.dataset.eng;
            } else {
              btn.textContent = btn.dataset.ru;
            }
          });
          this.isLangRu = !this.isLangRu;
        } else if (evt.key === 'Shift') {
          this.isShift = true;
          this.addShiftAction(symbolsArr, true);
        } else if (item.dataset.eng) {
          textWindow.textContent += item.textContent;
        } else if (!item.dataset.eng) {
          this.checkBtn(evt.code, textWindow, symbolsArr, item);
        }
      }
    });

    document.addEventListener('keyup', (evt) => {
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        setTimeout(() => {
          const item = this.keyboard.querySelector(`#${evt.code}`);
          this.delHightLightKey(item);
        });
        if (evt.key === 'Shift') {
          this.isShift = false;
          this.addShiftAction(symbolsArr, false);
        }
      }
    });
  }
  //  REFACTOR THIS CODE LATER START

  addShiftAction(symbolsArr, isPressed) {
    if (isPressed) {
      if (this.isCaps) {
        symbolsArr.forEach((item) => {
          item.textContent = item.textContent.toLowerCase();
        });
      } else {
        symbolsArr.forEach((item) => {
          item.textContent = item.textContent.toUpperCase();
        });
      }
    } else {
      if (this.isCaps) {
        symbolsArr.forEach((item) => {
          item.textContent = item.textContent.toUpperCase();
        });
      }
      if (!this.isCaps) {
        symbolsArr.forEach((item) => {
          item.textContent = item.textContent.toLowerCase();
        });
      }
    }
  }

  hightLightKey(item) {
    item.classList.add('active');
  }

  delHightLightKey(item) {
    item.classList.remove('active');
  }
}

function createPage() {
  return new Keyboard();
}

window.addEventListener('load', () => {
  const lang = JSON.parse(localStorage.getItem('lng'));
  createPage();
});