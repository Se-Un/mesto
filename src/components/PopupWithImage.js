'use strict'
// импорт данных
import Popup from "./Popup.js";
// создать класс PopupWithImage
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector('.popup__image');
    this._captionPopup = document.querySelector('.popup__caption');
  }
  openPhoto(data) {
    super.open();
    this._imagePopup.src = data.link;
    this._imagePopup.alt = data.name;
    this._captionPopup.textContent = data.name ;
  }
}

