function hightLightKey(item) {
  item.classList.add('active');
}

function delHightLightKey(item) {
  item.classList.remove('active');
}

function createElm(element, className) {
  const item = document.createElement(element);
  item.classList.add(className);
  return item;
}

class Keyboard {
  constructor() {
    this.chars = {
      Backquote: ['`', 'ё', 'true'],
      Digit1: ['1', '!'],
      Digit2: ['2', '@'],
      Digit3: ['3', '#'],
      Digit4: ['4', '$'],
      Digit5: ['5', '%'],
      Digit6: ['6', '^'],
      Digit7: ['7', '&'],
      Digit8: ['8', '*'],
      Digit9: ['9', '('],
      Digit0: ['0', ')'],
      Minus: ['-', '-'],
      Equal: ['=', '='],
      Backspace: ['Backspace', 'Backspace'],
      Tab: ['Tab', 'Tab'],
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
      Delete: ['Del', 'Del'],
      CapsLock: ['CapsLock', 'CapsLock'],
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
      Enter: ['Enter', 'Enter'],
      ShiftLeft: ['Shift', 'Shift'],
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
      ShiftRight: ['Shift', 'Shift'],
      ControlLeft: ['Ctr', 'Ctr'],
      MetaLeft: ['Win', 'Win'],
      AltLeft: ['Alt', 'Alt'],
      Space: [' ', ' '],
      AltRight: ['Alt', 'Alt'],
      ArrowLeft: ['', ''],
      ArrowDown: ['', ''],
      ArrowRight: ['', ''],
      ControlRight: ['Ctr', 'Ctr'],
    };

    this.isLangRu = JSON.parse(localStorage.getItem('lng')) || false;
    this.isCaps = false;
    this.createPageStructure();
    this.isShift = false;
  }

  createPageStructure() {
    const body = document.querySelector('body');
    const main = createElm('main', 'main');
    const window = createElm('section', 'window');
    this.keyboard = createElm('section', 'keyboard');
    this.createKeyBoardLines();
    for (let i = 0; i < 5; i += 1) {
      this.createKeys(i);
    }
    main.insertAdjacentElement('afterbegin', this.keyboard);
    main.insertAdjacentElement('afterbegin', window);
    window.insertAdjacentElement('afterbegin', createElm('textarea', 'window__text'));
    body.insertAdjacentElement('afterbegin', main);
    body.insertAdjacentElement('afterbegin', createElm('div', 'window__desc'));
    const keys = document.querySelectorAll('.key');
    const textWindow = document.querySelector('.window__text');
    this.addIdContent(keys);
    this.addMessage(keys, textWindow);
  }

  createKeyBoardLines() {
    for (let i = 0; i < 5; i += 1) {
      this.keyboard.insertAdjacentElement('afterbegin', createElm('div', 'keyboard__line'));
    }
  }

  createKeys(counter) {
    const keyboardNodes = this.keyboard.childNodes;
    const lineLength = [14, 15, 13, 13, 9];
    for (let i = 0; i < lineLength[counter]; i += 1) {
      keyboardNodes[counter].insertAdjacentElement('beforeend', createElm('div', 'key'));
    }
  }

  addIdContent(keys) {
    const keysObj = Object.keys(this.chars);
    keys.forEach((element, i) => {
      const elm = element;
      elm.setAttribute('id', keysObj[i]);
      const dataElm = this.chars[keysObj[i]];
      const en = dataElm[0];
      const rus = dataElm[1];
      if (dataElm[2]) {
        elm.dataset.ru = rus;
        elm.dataset.eng = en;
        elm.dataset.symbol = 'true';
      }
      if (localStorage.getItem('lang') === 'ru') {
        elm.textContent = rus;
      } else {
        localStorage.getItem('lang', 'en');
        elm.textContent = en;
      }
      if (elm.id.slice(0, 5) === 'Digit') {
        elm.dataset.number = en;
        elm.dataset.shift = rus;
        elm.textContent = en;
      }
    });
  }

  addMessage(buttons, textWindow) {
    const disp = textWindow;
    const symbolsArr = document.querySelectorAll('[data-symbol="true"]');
    this.numArr = document.querySelectorAll('[data-number]');
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.ru || el.id.slice(0, 5) === 'Digit'
         || el.id.slice(0, 5) === 'Minus' || el.id.slice(0, 5) === 'Equal') {
          disp.value += el.textContent;
        } else {
          this.checkBtn(el.id, textWindow, symbolsArr);
        }
      });

      function addActionForShift() {
        symbolsArr.forEach((elm) => {
          const item = elm;
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
    const displayMsg = textWindow;
    const start = textWindow.selectionStart;
    switch (btnCode) {
      case 'Backspace':
        textWindow.focus();
        if (start > 0) {
          displayMsg.value = textWindow.value.slice(0, start - 1) + textWindow.value.slice(start);
          displayMsg.selectionStart = start - 1;
          displayMsg.selectionEnd = start - 1;
        }
        break;
      case 'Tab':
        displayMsg.value += '    ';
        break;
      case 'Space':
        displayMsg.value += ' ';
        break;
      case 'Delete':
        textWindow.focus();
        if (start < textWindow.value.length) {
          displayMsg.value = textWindow.value.slice(0, start) + textWindow.value.slice(start + 1);
          displayMsg.selectionStart = start;
          displayMsg.selectionEnd = start;
        }
        break;
      case 'CapsLock':
        for (let i = 0; i < symbolsArr.length; i += 1) {
          const arr = symbolsArr;
          if (!this.isCaps) {
            arr[i].textContent = symbolsArr[i].textContent.toUpperCase();
          } else {
            arr[i].textContent = symbolsArr[i].textContent.toLowerCase();
          }
        }
        this.isCaps = !this.isCaps;
        break;
      case 'Enter':
        displayMsg.value += '\n';
        break;
      case 'ArrowUp':
        displayMsg.value += '↑';
        break;
      case 'ArrowDown':
        displayMsg.value += '↓';
        break;
      case 'ArrowRight':
        displayMsg.value += '→';
        break;
      case 'ArrowLeft':
        displayMsg.value += '←';
        break;
      default:
    }
  }

  changeLang() {
    if (this.isLangRu) {
      localStorage.setItem('lang', 'en');
    } else {
      localStorage.setItem('lang', 'ru');
    }
  }

  addMessageByKeyDown(textWindow, symbolsArr) {
    const display = textWindow;
    document.addEventListener('keydown', (evt) => {
      if (evt.code !== 'F12') {
        evt.preventDefault();
      }
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        const item = this.keyboard.querySelector(`#${evt.code}`);
        setTimeout(() => {
          hightLightKey(item);
        });
        if (evt.code === 'Tab') {
          display.value += '    ';
        }
        if ((evt.altKey && evt.ctrlKey)) {
          this.changeLang();
          symbolsArr.forEach((button) => {
            const btn = button;
            if (this.isLangRu) {
              if (this.isCaps) {
                btn.textContent = btn.dataset.eng.toUpperCase();
              }
              if (!this.isCaps) {
                btn.textContent = btn.dataset.eng.toLowerCase();
              }
            } else {
              if (this.isCaps) {
                btn.textContent = btn.dataset.ru.toUpperCase();
              }
              if (!this.isCaps) {
                btn.textContent = btn.dataset.ru.toLowerCase();
              }
            }
          });
          this.isLangRu = !this.isLangRu;
        } else if (evt.key === 'Shift') {
          this.isShift = true;
          this.addShiftAction(symbolsArr, true);
        } else if (item.dataset.eng || item.id.slice(0, 5) === 'Digit'
        || item.id.slice(0, 5) === 'Minus' || item.id.slice(0, 5) === 'Equal') {
          display.value += item.textContent;
        } else if (!item.dataset.eng) {
          this.checkBtn(evt.code, textWindow, symbolsArr);
        }
      }
    });

    document.addEventListener('keyup', (evt) => {
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        setTimeout(() => {
          const item = this.keyboard.querySelector(`#${evt.code}`);
          delHightLightKey(item);
        });
        if (evt.key === 'Shift') {
          this.isShift = false;
          this.addShiftAction(symbolsArr, false);
        }
      }
    });
  }

  addShiftAction(symbolsArr, isPressed) {
    if (isPressed) {
      symbolsArr.forEach((char) => {
        const item = char;
        if (this.isCaps) {
          item.textContent = item.textContent.toLowerCase();
        } else if (!this.isCaps) {
          item.textContent = item.textContent.toUpperCase();
        }
      });
      this.numArr.forEach((e) => {
        e.textContent = e.dataset.shift;
      });
    }
    if (!isPressed) {
      symbolsArr.forEach((char) => {
        const item = char;
        if (this.isCaps) {
          item.textContent = char.textContent.toUpperCase();
        } else if (!this.isCaps) {
          item.textContent = char.textContent.toLowerCase();
        }
      });
      this.numArr.forEach((e) => {
        e.textContent = e.dataset.number;
      });
    }
  }
}

function createPage() {
  return new Keyboard();
}

window.addEventListener('load', () => {
  createPage();
});
