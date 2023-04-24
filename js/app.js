class Keyboard {
  constructor() {
    this.chars = {
      Backquote: ['`', 'ё', 'true'],
      Digit1: ['1'],
      Digit2: ['2'],
      Digit3: ['3'],
      Digit4: ['4'],
      Digit5: ['5'],
      Digit6: ['6'],
      Digit7: ['7'],
      Digit8: ['8'],
      Digit9: ['9'],
      Digit0: ['0'],
      Minus: ['-'],
      Equal: ['='],
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
      ArrowUp: [''],
      ShiftRight: ['Shift'],
      ControlLeft: ['Ctr'],
      MetaLeft: ['Win'],
      AltLeft: ['Alt'],
      Space: [' '],
      AltRight: ['Alt'],
      ArrowLeft: [''],
      ArrowDown: [''],
      ArrowRight: [''],
      ControlRight: ['Ctr'],
    };
/*
    this.ruLetters = {
      Backquote: ['ё', '', 'true'],
      Digit1: ['1'],
      Digit2: ['2'],
      Digit3: ['3'],
      Digit4: ['4'],
      Digit5: ['5'],
      Digit6: ['6'],
      Digit7: ['7'],
      Digit8: ['8'],
      Digit9: ['9'],
      Digit0: ['0'],
      Minus: ['-'],
      Equal: ['='],
      Backspace: ['Backspace'],
      Tab: ['Tab'],
      KeyQ: ['й', '', 'true'],
      KeyW: ['ц', '', 'true'],
      KeyE: ['у', '', 'true'],
      KeyR: ['к', '', 'true'],
      KeyT: ['е', '', 'true'],
      KeyY: ['н', '', 'true'],
      KeyU: ['г', '', 'true'],
      KeyI: ['ш', '', 'true'],
      KeyO: ['щ', '', 'true'],
      KeyP: ['з', '', 'true'],
      BracketLeft: ['х', '', 'true'],
      BracketRight: ['ъ', '', 'true'],
      Backslash: ['\\', '', 'true'],
      Delete: ['Del'],
      CapsLock: ['CapsLock'],
      KeyA: ['ф', '', 'true'],
      KeyS: ['ы', '', 'true'],
      KeyD: ['в', '', 'true'],
      KeyF: ['а', '', 'true'],
      KeyG: ['п', '', 'true'],
      KeyH: ['р', '', 'true'],
      KeyJ: ['о', '', 'true'],
      KeyK: ['л', '', 'true'],
      KeyL: ['д', '', 'true'],
      Semicolon: ['ж', '', 'true'],
      Quote: ['э', '', 'true'],
      Enter: ['Enter'],
      ShiftLeft: 'Shift',
      KeyZ: ['я', '', 'true'],
      KeyX: ['ч', '', 'true'],
      KeyC: ['с', '', 'true'],
      KeyV: ['м', '', 'true'],
      KeyB: ['и', '', 'true'],
      KeyN: ['т', '', 'true'],
      KeyM: ['ь', '', 'true'],
      Comma: ['б', '', 'true'],
      Period: ['ю', '', 'true'],
      Slash: ['.', '', 'true'],
      ArrowUp: [''],
      ShiftRight: ['Shift'],
      ControlLeft: ['Ctr'],
      MetaLeft: ['Win'],
      AltLeft: ['Alt'],
      Space: [' '],
      AltRight: ['Alt'],
      ArrowLeft: [''],
      ArrowDown: [''],
      ArrowRight: [''],
      ControlRight: ['Ctr'],
    };
*/
    this.isLangRu = JSON.parse(localStorage.getItem('lng')) || false;
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
    const keys = document.querySelectorAll('.key');
    const textWindow = document.querySelector('.window__text');
    this.addIdContent(keys)
    this.addMessage(keys, textWindow)
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
    keys.forEach((el, i) => {
      el.setAttribute('id', keysObj[i]);
      const dataElm = this.chars[keysObj[i]]
      if (dataElm[2]) {
        el.dataset.ru = dataElm[1];
        el.dataset.eng = dataElm[0];
        el.dataset.symbol = "true";
      }
      if (this.isLangRu) {
        el.textContent = dataElm[1]
      } else {
        el.textContent = dataElm[0];
      }
    });
  }

  addMessage(buttons, textWindow) {
    const symbolsArr = document.querySelectorAll('[data-symbol="true"]')
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.ru) {
          textWindow.textContent += el.textContent;
        } else {
          this.checkBtn(el.id, textWindow, symbolsArr)
        }
      });
      
      function addActionForShift() {
        symbolsArr.forEach((item) => {
          if (item.textContent === item.textContent.toLowerCase()) {
            item.textContent = item.textContent.toUpperCase();
            console.log(1)
          } else {
            item.textContent = item.textContent.toLowerCase();
            console.log(111)
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
    this.addMessageByKeyDown(buttons, textWindow, symbolsArr);
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

  addMessageByKeyDown(buttons, textWindow, symbolsArr) {
      document.addEventListener('keydown', (evt) => {
        if (this.keyboard.querySelector(`#${evt.code}`)) {
          setTimeout(() => {
            const item = this.keyboard.querySelector(`#${evt.code}`);
            this.hightLightKey(item)
          })
        if ((evt.altKey && evt.ctrlKey)) {
          this.changeLang()
          symbolsArr.forEach((btn, i) => {
            if (this.isLangRu) {
              btn.textContent = btn.dataset.eng
            } else {
              btn.textContent = btn.dataset.ru
            }
          })
          this.isLangRu = !this.isLangRu
        }
        }
      })

      document.addEventListener('keyup', (evt) => {
        if (this.keyboard.querySelector(`#${evt.code}`)) {
          setTimeout(() => {
          const item = this.keyboard.querySelector(`#${evt.code}`);
          this.delHightLightKey(item);
          })
        }
      })
  }

  hightLightKey(item) {
    item.classList.add('active')
  }
  delHightLightKey(item) {
    item.classList.remove('active')
  }

}

function createPage() {
  return new Keyboard();
}

window.addEventListener('load', () => {
  const lang = JSON.parse(localStorage.getItem('lng'));
  createPage();
});