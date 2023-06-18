'use strict'
// импорт данных
import Popup from "./Popup.js";
import { imagePopup, captionPopup } from "../utils/constants.js";
// создать класс PopupWithImage
export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }
  openPhoto() {
    super.open();
    imagePopup.src = this._link;
    imagePopup.alt = this._name;
    captionPopup.textContent = this._name ;
  }
}

