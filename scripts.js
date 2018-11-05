const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  let itemText;

  function init(_form, _items) {
    items = _items;
    form = _form;

    itemText = form.querySelector('.form__input');

    form.addEventListener('submit', formHandler);

    items.addEventListener('click', deleteItem);

    items.addEventListener('click', edit);

    items.addEventListener('keyup', commit);

    items.addEventListener('click', finish);

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    let texti = itemText.value;

    if (texti.trim() != "") {
      add(texti);
    }

    itemText.value = "";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const {
      target
    } = e;
    if (target.type == 'checkbox') {
      target.parentNode.classList.toggle('item--done');
    }

  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {
      target
    } = e;
    const spans = items.getElementsByTagName('span');

    let span;
    let maBreyta = false;
    for (let i = 0; i < spans.length; i++) {
      span = spans[i];
      if (span.textContent == target.textContent) {
        maBreyta = true;
        break;
      }
    }
    if (maBreyta) {
      let newInput = document.createElement('input');
      newInput.classList.add('item__edit');
      newInput.value = span.textContent;
      newInput.focus();
      span.parentNode.replaceChild(newInput, span);
    }

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const {
      keyCode
    } = e;

    const {
      target
    } = e;

    if (keyCode == ENTER_KEYCODE) {
      let newSpan = document.createElement('span');
      newSpan.classList.add('item__text');
      newSpan.textContent = target.value;
      target.parentNode.replaceChild(newSpan, target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const liElement = el('li', 'item');

    const inputElement = el('input', 'item__checkbox');
    inputElement.setAttribute('type', 'checkbox');

    const spanElement = el('span', 'item__text', value);

    const buttonElement = el('button', 'item__button', 'Eyða');

    liElement.appendChild(inputElement);
    liElement.appendChild(spanElement);
    liElement.appendChild(buttonElement);

    document.getElementById("items").appendChild(liElement);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {
      target
    } = e;
    if (target.textContent == "Eyða") {
      items.removeChild(target.parentNode);
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, textNode) {
    const teg = document.createElement(type);
    if (className) {
      teg.classList.add(className);
    }
    if (textNode) {
      teg.appendChild(document.createTextNode(textNode));
    }
    return teg;
  }

  return {
    init: init
  }
})();