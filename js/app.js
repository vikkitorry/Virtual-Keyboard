class Letters {
  constructor() {
    this.engLetters = [
      ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspase'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/', 'Del'],
      ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "''", 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '', 'Shift'],
      ['Ctr', 'Win', 'Alt', '', 'Alt', '', '', '', 'Ctr'],
    ];
    this.ruLetters = [
      ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', '+', 'Backspase'],
      ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del'],
      ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
      ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'Shift'],
      ['Ctr', 'Win', 'Alt', '', 'Alt', '', '', '', 'Ctr'],
    ];
    this.lettrArr = [
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
    ];
    this.symbolsArrEn = [
      '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/','a', 's', 'd', 'f', 'g',
      'h', 'j', 'k', 'l', ';', "''", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
    ];
    this.symbolsArrRu = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', '+',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/','ф', 'ы', 'в', 'а', 'п',
      'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
    ];
  }
}


//  lang = true means RU language
let lang = true;
const body = document.querySelector('body');
const actualKeyboard = new Letters();
let keyboard;
let buttons;
let textWindow;

// keySymbols and keyLetters includes only keys which can be changed:
// to upper/lower case
let keyLetters = [];
// ru / eng
let keySymbols = [];

function createElement(element, className) {
  const item = document.createElement(element);
  item.classList.add(className);
  return item;
}

function createKeyBoardLines() {
  for (let i = 0; i < 5; i++) {
    keyboard.insertAdjacentElement('afterbegin', createElement('div', 'keyboard__line'));
  }
}

function createKeys(counter) {
  const keyboardNodes = keyboard.childNodes;
  const lineLength = [14, 15, 13, 13, 9];
  for (let i = 0; i < lineLength[counter]; i++) {
    keyboardNodes[counter].insertAdjacentElement('beforeend', createElement('div', 'key'))
  }
}

function addClassChar(i, line) {
  const keys = line.querySelectorAll('.key');
  let chars;
  switch (i) {
    case 0:
      chars = actualKeyboard.engLetters[i];
      keys[13].classList.add('key-backspace');
      if (lang) {
        chars = actualKeyboard.ruLetters[i];
      }
      break;
    case 1:
      chars = actualKeyboard.engLetters[i];
      keys[0].classList.add('key-tab');
      keys[14].classList.add('key-del');
      if (lang) {
        chars = actualKeyboard.ruLetters[i];
      }
      break;
    case 2:
      chars = actualKeyboard.engLetters[i];
      keys[0].classList.add('key-capsLock');
      keys[12].classList.add('key-enter');
      if (lang) {
        chars = actualKeyboard.ruLetters[i];
      }
      break;
    case 3:
      chars = actualKeyboard.engLetters[i];
      keys[0].classList.add('key-shift');
      keys[11].classList.add('key-top');
      keys[11].classList.add('key-arrow');
      keys[12].classList.add('key-shift');
      keys[12].classList.add('key-shift-right');
      if (lang) {
        chars = actualKeyboard.ruLetters[i];
      }
      break;
    case 4:
      chars = actualKeyboard.engLetters[i];
      keys[0].classList.add('key-ctr');
      keys[1].classList.add('key-win');
      keys[2].classList.add('key-alt');
      keys[3].classList.add('key-space');
      keys[4].classList.add('key-alt');
      keys[5].classList.add('key-left');
      keys[5].classList.add('key-arrow');
      keys[6].classList.add('key-down');
      keys[6].classList.add('key-arrow');
      keys[7].classList.add('key-right');
      keys[7].classList.add('key-arrow');
      keys[8].classList.add('key-ctr');
      if (lang) {
        chars = actualKeyboard.ruLetters[i];
      }
      break;
    default:
      chars = actualKeyboard.ruLetters[i];
  }
  if (keys) {
    for (let j = 0; j < keys.length; j++) {
      keys[j].textContent = chars[j];
    }
  }
}

function createPage() {
  const main = createElement('main', 'main');
  const window = createElement('section', 'window');
  keyboard = createElement('section', 'keyboard');
  createKeyBoardLines();
  for (let i = 0; i < 5; i++) {
    createKeys(i);
  }
  main.insertAdjacentElement('afterbegin', keyboard);
  main.insertAdjacentElement('afterbegin', window);
  window.insertAdjacentElement('afterbegin', createElement('i', 'window__desc'));
  window.insertAdjacentElement('afterbegin', createElement('pre', 'window__text'));
  body.insertAdjacentElement('afterbegin', main);

  const lines = document.querySelectorAll('.keyboard__line');
  for (let i = 0; i < 5; i++) {
    addClassChar(i, lines[i]);
  }
}

function changeKeyboard(el) {
  if (el.classList.contains('key-backspace')) {
    textWindow.textContent = textWindow.textContent.slice(0, -1);
    return textWindow.textContent;
  } if (el.classList.contains('key-tab')) {
    textWindow.textContent += '    ';
    return textWindow.textContent;
  } if (el.classList.contains('key-space')) {
    textWindow.textContent += ' ';
    return textWindow.textContent;
  } if (el.classList.contains('key-del')) {
    textWindow.textContent = '';
    return textWindow.textContent;
  } if (el.classList.contains('key-capsLock')) {
    for (let i = 0; i < keyLetters.length; i++) {
      if (keyLetters[i].textContent === keyLetters[i].textContent.toLowerCase()) {
        keyLetters[i].textContent = keyLetters[i].textContent.toUpperCase();
      } else {
        keyLetters[i].textContent = keyLetters[i].textContent.toLowerCase();
      }
    }
  } if (el.classList.contains('key-enter')) {
    textWindow.textContent += '\n';
    return textWindow.textContent;
  } if (el.classList.contains('key-ctr'  )) {

  } if (el.classList.contains('key-win')) {

  } if (el.classList.contains('key-alt')) {

  } if (el.classList.contains('key-left')) {
    textWindow.textContent += '←';
    return textWindow.textContent;
  } if (el.classList.contains('key-top')) {
    textWindow.textContent += '↑';
    return textWindow.textContent;
  } if (el.classList.contains('key-down')) {
    textWindow.textContent += '↓';
    return textWindow.textContent;
  } if (el.classList.contains('key-right')) {
    textWindow.textContent += '→';
    return textWindow.textContent;
  }
}
/*
function keyEvents() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
      console.log(1)
      runOnKeys()
    } //else {
      //changeKeyboard(event, textWindow, keyLetters);
   // }
  
  
    //console.log(event.key)
  });

}*/

function changeLang() {
  for (let i = 0; i < keySymbols.length; i++) {
    if (lang) {
      keySymbols[i].textContent = actualKeyboard.symbolsArrEn[i]
      lang = false;
    } else {
      keySymbols[i].textContent = actualKeyboard.symbolsArrRu[i];
      lang = true;
    }
  }
}

function runOnKeys(...args) {
  console.log(11111111111111111)
  const codes = ['AltLeft', 'ControlLeft', 'AltRight', 'ControlRight'];
  let arrChars = [];
  document.addEventListener("keydown", function (event) {
      if (event.repeat) return;
      arrChars.push(event.code);

  });
  document.addEventListener("keyup", function (event) {
      if (arrChars.length == 0) return;
      let runFunc = true;
      for (let arg of args) {
          if (!arrChars.includes(arg)) {
              runFunc = false;
              break;
          }
      }
      if (runFunc) {
        changeLang();
      }
      arrChars.length = 0;
  });

}




function findLetters() {
  let arr = [];
  for (let i = 0; i < buttons.length; i++) {
    if (actualKeyboard.lettrArr.includes(buttons[i].textContent)) {
      arr.push(buttons[i]);
    }
  }
  return arr;
}

function findSymbols() {
  let arr = [];
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].className.split(' ').length === 1) {
      arr.push(buttons[i]);
    }
  }
  return arr;
}

//  Add keyboard logic
function addMessage() {
  buttons.forEach((el) => {
    el.addEventListener('click', () => {
      const classes = el.className.split(' ');
      if (classes.length === 1) {
        textWindow.textContent += el.textContent;
      } else {
        changeKeyboard(el, textWindow, keyLetters);
      }
    });

    function addActionForShift() {
      keyLetters.forEach((item) => {
        const itm = item;
        if (itm.textContent === itm.textContent.toLowerCase()) {
          itm.textContent = itm.textContent.toUpperCase();
        } else {
          itm.textContent = itm.textContent.toLowerCase();
        }
      });
    }

    if (el.classList.contains('key-shift')) {
      el.addEventListener('mousedown', () => {
        addActionForShift();
      });
      el.addEventListener('mouseup', () => {
        addActionForShift();
      });
    }
  });
}

window.addEventListener('load', () => {
  createPage();
  buttons = keyboard.querySelectorAll('.key');
  keyLetters = findLetters();
  keySymbols = findSymbols()
  textWindow = document.querySelector('.window__text');
  // keyEvents();
  addMessage();
  runOnKeys();
});

