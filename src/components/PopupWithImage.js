'use strict'
// импорт данных
import Popup from "./Popup.js";
import { imagePopup, captionPopup } from "../pages/index.js";
// создать класс PopupWithImage
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  openPhoto(data) {
    super.open();
    imagePopup.src = data.link;
    imagePopup.alt = data.name;
    captionPopup.textContent = data.name ;
  }
}

