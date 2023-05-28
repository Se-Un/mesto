'use strict'
class Card {
  //создать конструктор
  constructor (object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
    this._cardElement = document
    .querySelector(this.templateSelector)
    .content
    .querySelector('.element-template')
    .cloneNode(true);
  }
 
}