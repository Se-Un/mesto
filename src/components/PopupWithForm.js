'use strict'
// импорт данных
import Popup from "./Popup.js";
// создать класс
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submitBtn = this._popup.querySelector('.popup__submit');
    this._submitText = this._submitBtn.textContent;
  }
  #getInputValues() {
    this._formValues = {};
     this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  close() {
    super.close();
    this._form.reset();
  }
  loading(loading, text) {
    if (loading) {
        this._submitBtn.textContent = text;
    } else {
        this._submitBtn.textContent = this._submitText;
    }
}
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.#getInputValues());      
    })
  }
}