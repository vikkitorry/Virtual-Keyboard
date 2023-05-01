function addKeyEffect(item) {
  item.classList.add('active');
}

function delKeyEffect(item) {
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

    this.isCaps = false;
    this.createPageStructure();
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
    this.keys = document.querySelectorAll('.key');
    this.addIdContent();
    this.createvariables();
    this.addMessage();
  }

  createvariables() {
    this.textWindow = document.querySelector('.window__text');
    this.symbolsArr = document.querySelectorAll('[data-symbol="true"]');
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

  addIdContent() {
    const keysObj = Object.keys(this.chars);
    this.keys.forEach((element, i) => {
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
        elm.textContent = en;
      }
      if (elm.id.slice(0, 5) === 'Digit') {
        elm.dataset.number = en;
        elm.dataset.shift = rus;
        elm.textContent = en;
      }
    });
  }

  addMessage() {
    this.keys.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.ru || el.id.slice(0, 5) === 'Digit'
         || el.id.slice(0, 5) === 'Minus' || el.id.slice(0, 5) === 'Equal') {
          this.textWindow.value += el.textContent;
        } else {
          this.checkBtn(el.id);
        }
      });
      if (el.id === 'ShiftLeft' || el.id === 'ShiftRight') {
        el.addEventListener('mousedown', () => {
          this.addShiftAction(true);
        });
        el.addEventListener('mouseup', () => {
          this.addShiftAction(false);
        });
      }
    });
    this.addMessageByKeyDown();
  }

  checkBtn(btnCode) {
    const start = this.textWindow.selectionStart;
    switch (btnCode) {
      case 'Backspace':
        this.textWindow.focus();
        if (start > 0) {
          this.textWindow.value = this.textWindow.value.slice(0, start - 1)
          + this.textWindow.value.slice(start);
          this.textWindow.selectionStart = start - 1;
          this.textWindow.selectionEnd = start - 1;
        }
        break;
      case 'Tab':
        this.textWindow.value += '    ';
        break;
      case 'Space':
        this.textWindow.value += ' ';
        break;
      case 'Delete':
        this.textWindow.focus();
        if (start < this.textWindow.value.length) {
          this.textWindow.value = this.textWindow.value.slice(0, start)
          + this.textWindow.value.slice(start + 1);
          this.textWindow.selectionStart = start;
          this.textWindow.selectionEnd = start;
        }
        break;
      case 'CapsLock':
        for (let i = 0; i < this.symbolsArr.length; i += 1) {
          const char = this.symbolsArr;
          if (!this.isCaps) {
            char[i].textContent = char[i].textContent.toUpperCase();
          } else {
            char[i].textContent = char[i].textContent.toLowerCase();
          }
        }
        this.isCaps = !this.isCaps;
        break;
      case 'Enter':
        this.textWindow.value += '\n';
        break;
      case 'ArrowUp':
        this.textWindow.value += '↑';
        break;
      case 'ArrowDown':
        this.textWindow.value += '↓';
        break;
      case 'ArrowRight':
        this.textWindow.value += '→';
        break;
      case 'ArrowLeft':
        this.textWindow.value += '←';
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

  addMessageByKeyDown() {
    document.addEventListener('keydown', (evt) => {
      if (evt.code !== 'F12') {
        evt.preventDefault();
      }
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        const item = this.keyboard.querySelector(`#${evt.code}`);
        setTimeout(() => {
          addKeyEffect(item);
        });
        if ((evt.altKey && evt.ctrlKey)) {
          this.changeLang();
          this.symbolsArr.forEach((button) => {
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
          this.addShiftAction(true);
        } else if (item.dataset.eng || item.id.slice(0, 5) === 'Digit'
        || item.id.slice(0, 5) === 'Minus' || item.id.slice(0, 5) === 'Equal') {
          this.textWindow.value += item.textContent;
        } else if (!item.dataset.eng) {
          this.checkBtn(evt.code);
        }
      }
    });

    document.addEventListener('keyup', (evt) => {
      if (this.keyboard.querySelector(`#${evt.code}`)) {
        setTimeout(() => {
          const item = this.keyboard.querySelector(`#${evt.code}`);
          delKeyEffect(item);
        });
        if (evt.key === 'Shift') {
          this.addShiftAction(false);
        }
      }
    });
  }

  addShiftAction(isPressed) {
    const numArr = document.querySelectorAll('[data-number]');
    if (isPressed) {
      this.symbolsArr.forEach((char) => {
        const item = char;
        if (this.isCaps) {
          item.textContent = item.textContent.toLowerCase();
        } else if (!this.isCaps) {
          item.textContent = item.textContent.toUpperCase();
        }
      });
      numArr.forEach((e) => {
        e.textContent = e.dataset.shift;
      });
    }
    if (!isPressed) {
      this.symbolsArr.forEach((char) => {
        const item = char;
        if (this.isCaps) {
          item.textContent = char.textContent.toUpperCase();
        } else if (!this.isCaps) {
          item.textContent = char.textContent.toLowerCase();
        }
      });
      numArr.forEach((e) => {
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
