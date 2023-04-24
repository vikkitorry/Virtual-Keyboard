class Keyboard {
  constructor() {
    this.engLetters = {
      Backquote: ['`', 'true'],
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
      KeyQ: ['q', 'true'],
      KeyW: ['w', 'true'],
      KeyE: ['e', 'true'],
      KeyR: ['r', 'true'],
      KeyT: ['t', 'true'],
      KeyY: ['y', 'true'],
      KeyU: ['u', 'true'],
      KeyI: ['i', 'true'],
      KeyO: ['o', 'true'],
      KeyP: ['p', 'true'],
      BracketLeft: ['[', 'true'],
      BracketRight: [']', 'true'],
      Backslash: ['\\', 'true'],
      Delete: ['Del'],
      CapsLock: ['CapsLock'],
      KeyA: ['a', 'true'],
      KeyS: ['s', 'true'],
      KeyD: ['d', 'true'],
      KeyF: ['f', 'true'],
      KeyG: ['g', 'true'],
      KeyH: ['h', 'true'],
      KeyJ: ['j', 'true'],
      KeyK: ['k', 'true'],
      KeyL: ['l', 'true'],
      Semicolon: [';', 'true'],
      Quote: ["'", 'true'],
      Enter: ['Enter'],
      ShiftLeft: ['Shift'],
      KeyZ: ['z', 'true'],
      KeyX: ['x', 'true'],
      KeyC: ['c', 'true'],
      KeyV: ['v', 'true'],
      KeyB: ['b', 'true'],
      KeyN: ['n', 'true'],
      KeyM: ['m', 'true'],
      Comma: [',', 'true'],
      Period: ['.', 'true'],
      Slash: ['/', 'true'],
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

    this.ruLetters = {
      Backquote: ['ё', 'true'],
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
      KeyQ: ['й', 'true'],
      KeyW: ['ц', 'true'],
      KeyE: ['у', 'true'],
      KeyR: ['к', 'true'],
      KeyT: ['е', 'true'],
      KeyY: ['н', 'true'],
      KeyU: ['г', 'true'],
      KeyI: ['ш', 'true'],
      KeyO: ['щ', 'true'],
      KeyP: ['з', 'true'],
      BracketLeft: ['х', 'true'],
      BracketRight: ['ъ', 'true'],
      Backslash: ['\\', 'true'],
      Delete: ['Del'],
      CapsLock: ['CapsLock'],
      KeyA: ['ф', 'true'],
      KeyS: ['ы', 'true'],
      KeyD: ['в', 'true'],
      KeyF: ['а', 'true'],
      KeyG: ['п', 'true'],
      KeyH: ['р', 'true'],
      KeyJ: ['о', 'true'],
      KeyK: ['л', 'true'],
      KeyL: ['д', 'true'],
      Semicolon: ['ж', 'true'],
      Quote: ['э', 'true'],
      Enter: ['Enter'],
      ShiftLeft: 'Shift',
      KeyZ: ['я', 'true'],
      KeyX: ['ч', 'true'],
      KeyC: ['с', 'true'],
      KeyV: ['м', 'true'],
      KeyB: ['и', 'true'],
      KeyN: ['т', 'true'],
      KeyM: ['ь', 'true'],
      Comma: ['б', 'true'],
      Period: ['ю', 'true'],
      Slash: ['.', 'true'],
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
    const keysObj = Object.keys(this.engLetters);
    keys.forEach((el, i) => {
      el.setAttribute('id', keysObj[i]);
      const dataElm = this.engLetters[keysObj[i]]
      if (dataElm[1]) {
        el.dataset.symbol = 'true';
      }
      el.textContent = dataElm[0];
    });
    
  }

  addMessage(buttons, textWindow) {
    const symbolsArr = document.querySelectorAll('[data-symbol="true"]')
    buttons.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.symbol) {
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

      if (el.id === 'ShiftLeft') {
        el.addEventListener('mousedown', () => {
          addActionForShift();
        });
        el.addEventListener('mouseup', () => {
          addActionForShift();
        });
      }
    });
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


}

function createPage() {
  return new Keyboard();
}

window.addEventListener('load', () => {
  createPage();
});