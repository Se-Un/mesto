'use strict'
// создать класс section
export default class Section {
  // внести  в конструктор необходимые объекты
  constructor({ renderer }, containerSelector) {
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
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }
}