'use strict'
// создать класс section
export default class Section {
  // внести  в конструктор необходимые объекты
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  // метод добавления карт
  addItem(element) {
    this._container.append(element);
  }
  // метод добавления карт в начало блока
  addPrependItem(element) {
    this._container.prepend(element);
  }
  // метод создания карт из массива
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }
}