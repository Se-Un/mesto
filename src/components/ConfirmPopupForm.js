'use strict'
// импорт класса попап
import Popup from "./Popup.js";
// создать класс для работы с попапом подтверждения удаления карточки
export default class ConfirmPopupForm extends Popup {
  // создать конструктор
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
  // создать метод открытия карты
  open(card) {
    this._card = card;
    super.open();
  }
  // создать метод прослушивания событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    })
  }
}

