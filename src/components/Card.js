'use strict'
// создать класс карточки
export default class Card {
  // создать конструктор класса с необходимыми свойствами
  constructor(data, openImagePopup, templateSelector, likeState, dislikeState, deleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._myId = data.myId;
    this._idOwner = data.idOwner;
    this._openImagePopup = openImagePopup;
    this._templateSelector = templateSelector;
    this._deleteCard = deleteCard;
    this._likeState = likeState;
    this._dislikeState = dislikeState;
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
  // создать метод прослушивания событий в карточке
  #setEventListeners() {
    // прослушивать события по кнопке удалить
    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard(this._id);
    });
    // прослушивать события кнопки "нравится" 
    this._likeBtn.addEventListener('click', () => {
      if(this._likeBtn.classList.contains('element__button_active')) {
        this._dislikeState();
      }
      else {
        this._likeState();
      }
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
    this._counterLikes = this._element.querySelector('.element__counter-like');
    this._counterLikes.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.#setEventListeners();
    this.isOwnerBtn();
    this.#liked();

    return this._element;
  }
  // создать метод для показа кол-ва лайков
  showCounterLike(res) {
    // создать условие чтобы не отображать нули
      this._counterLikes.textContent = res.likes.length;
  }
  // создать метод отображения кнопки корзины
  isOwnerBtn() {
    if (this._myId !== this._idOwner) {
        this._deleteBtn.classList.add('element__delete_display_none');
    }
  }
   // создать метод для удаления отображения карточки
   deleteElement() {
    this._element.remove();
    this._element = null;
  }
  // создать метод для отображения состояния лайка карточки
  #liked() {
    this._likes.forEach((user) => {
        if (user._id === this._myId) {
            this.likeState();
        } else {
            this.dislikeState();
        }
    });
  }
  // создать метод для отображения лайка
  likeState() {
    this._likeBtn.classList.add("element__button_active");
  }
  // создать метод для удаления отображения лайка
  dislikeState() {
    this._likeBtn.classList.remove("element__button_active");
  }
}