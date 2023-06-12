'use strict'
// массив данных для карточек фото
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// объект селекторов валидации формы по умолчанию
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_validity_invalid',
  errorClass: 'popup__input-error_active',
}
// получить элементы блока profile
const fullName = document.querySelector('.profile__full-name');
const activity = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
// получить элемент блока elements
const elements = document.querySelector('.elements');
// получить общие элементы popup
const popupList = Array.from(document.querySelectorAll('.popup'));
// получить элементы popup для изменения блока profile
const profilePopup = document.querySelector('.popup-profile');
const profileForm = document.forms['profile-form'];
const inputName = profilePopup.querySelector('[name="name"]');
const inputJob = profilePopup.querySelector('[name="job"]');
// получить элементы popup для редактирования карточек фото
const cardPopup = document.querySelector('.popup-element');
const cardForm = document.forms['card-form'];
const inputTitle = cardPopup.querySelector('[name="title"]');
const inputLink = cardPopup.querySelector('[name="link"]');
// получить элементы попапа увеличения картинки
const popupScalePicture = document.querySelector('.popup-scale-picture');
const imagePopup = popupScalePicture.querySelector('.popup__image');
const captionPopup = popupScalePicture.querySelector('.popup__caption');

export { fullName, 
  activity, 
  editBtn, 
  addBtn, 
  elements, 
  popupList,
  profilePopup, 
  profileForm, 
  inputName, 
  inputJob, 
  cardPopup, 
  cardForm,
  inputTitle,
  inputLink,
  popupScalePicture,
  imagePopup,
  captionPopup,
  initialCards,
  config
}