'use strict'
// импортировать функцию масштабирования картинки
import { openImagePopup } from './index.js';
// создать класс карточки
export class Card {
  // создать конструктор класса с необходимыми свойствами
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
  }
  // создать метод получения темплейт элементов
  #getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
  // создать метод удаления карточки
  #deleteCard()  {
    this._element.remove();
  }
  // создать метод изменения класса кнопки лайка
  #toggleLike() {
    // менять класс кнопки при нажатии, метод toggle
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
  }
  // создать метод прослушивания событий в карточке
  #setEventListeners() {
    this.element = this.#getTemplate();
    // прослушивать события по кнопке удалить
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this.#deleteCard();
    });
    // прослушивать события кнопки "нравится" 
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this.#toggleLike();
    });
    // прослушивать событя при клике на картинку 
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openImagePopup(this._name, this._link);
    })
  }
  // создать функцию воспроизведения карты со всеми методами
  generateCard() {
    this._element = this.#getTemplate();

    this.#setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }
}

  


