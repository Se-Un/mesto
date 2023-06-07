'use strict'
// создать класс карточки
export class Card {
  // создать конструктор класса с необходимыми свойствами
  constructor(object, openImagePopup, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._openImagePopup = openImagePopup;
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
    this._element = null;
  }
  // создать метод изменения класса кнопки лайка
  #toggleLike() {
    // менять класс кнопки при нажатии, метод toggle
    this._likeBtn.classList.toggle('element__button_active');
  }
  // создать метод прослушивания событий в карточке
  #setEventListeners() {
    // прослушивать события по кнопке удалить
    this._deleteBtn.addEventListener('click', () => {
      this.#deleteCard();
    });
    // прослушивать события кнопки "нравится" 
    this._likeBtn.addEventListener('click', () => {
      this.#toggleLike();
    });
    // прослушивать событя при клике на картинку 
    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._name, this._link);
    })
  }
  // создать функцию воспроизведения карты со всеми методами
  generateCard() {
    this._element = this.#getTemplate();
    // создать классовые переменные
    this._deleteBtn = this._element.querySelector('.element__delete');
    this._likeBtn = this._element.querySelector('.element__button');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');

    this.#setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}

  


