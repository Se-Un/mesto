'use strict'
export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this.#handleEscClose(evt);
    });
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this.#handleEscClose(evt);
    })
  }
  #handleEscClose = (evt) => {
    if(evt.key == 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    
    this._popup.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });

    this._popup.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}