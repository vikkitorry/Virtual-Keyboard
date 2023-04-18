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
  }
}
//lang = true means RU language
let lang = false;
const body = document.querySelector('body');
const actualKeyboard = new Letters();
let keyboard;

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
      chars = actualKeyboard.engLetters[i];
  }
  if (keys) {
    for (let j = 0; j < keys.length; j++) {
      keys[j].textContent = chars[j]
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
  body.insertAdjacentElement('afterbegin', main);

  const lines = document.querySelectorAll('.keyboard__line');
  for (let i = 0; i < 5; i++) {
    addClassChar(i, lines[i]);
  }
}

window.addEventListener('load', function() {
  createPage()
});



