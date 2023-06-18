'use strict'
// импорт модулей
import './index.css';
import {
  initialCards,
  config
 } from '../utils/constants.js';
import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer';
// получить элементы блока profile
const userNameSelector = 'profile__full-name';
const userDescriptionSelector = 'profile__description';
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
// получить элемент блока elements
const elements = document.querySelector('.elements');
// получить элементы popup для изменения блока profile
const profilePopup = document.querySelector('.popup-profile');
const userName = profilePopup.querySelector('[name="userName"]');
const userDescription = profilePopup.querySelector('[name="userDescription"]');
// получить элементы popup для редактирования карточек фото
const cardPopup = document.querySelector('.popup-element');
// получить элементы попапа увеличения картинки
const popupScalePicture = document.querySelector('.popup-scale-picture');
const imagePopup = popupScalePicture.querySelector('.popup__image');
const captionPopup = popupScalePicture.querySelector('.popup__caption');
// экспорт
export { imagePopup, captionPopup }
// объявить класс данных пользователя
const userInfo = new UserInfo({userNameSelector, userDescriptionSelector});
// объявить класс увеличения фото
const image = new PopupWithImage(popupScalePicture);
// объявить экземпляр класса PopupWithForm для блока Profile
const profile = new PopupWithForm(profilePopup, {
  //  воспроизвести функцию для реализации отправки формы
  handleFormSubmit: (data) => {
    // объявить класс userInfo
    userInfo.setUserInfo(data);
    // объявить метод закрытия попапа
    profile.close();
  }
});
// объявить экземпляр класса PopupWithForm для создания карточки фото
const card = new PopupWithForm(cardPopup, {
  // воспроизвести функцию для создания карточки пользователем
  handleFormSubmit: (data) => {
    // обратиться к методу воспроизведения карточки
    rendererCards.addPrependItem(createCard(data));
    card.close();
  }
});
// создать экземпляры класса валидации
const validateProfile = new FormValidator(config, profilePopup);
const validateCard = new FormValidator(config, cardPopup);
// создать функцию генерации карточек 
const createCard = (item) => {
  const createCard = new Card(item, openImagePopup, '.element-template')
  return createCard.generateCard();
}
// создать функцию увеличения картинки
const openImagePopup = (name, link) => {
 return image.openPhoto({name, link});
} 
// сгенерировать первоначальные карточки
const rendererCards = new Section({
renderer: (item) => {
  rendererCards.addItem(createCard(item));
}
},
elements);
// объявить методы генерации сабмита
image.setEventListeners();
profile.setEventListeners();
card.setEventListeners();
// объявить методы валидации попапов
validateProfile.enableValidation();
validateCard.enableValidation();
// объявить метод класса Section для воспроизведения карточек из массива
rendererCards.renderItems(initialCards);
// прослушивать события для открытия попапа Profile
editBtn.addEventListener('click', () => {
  profile.open();
  userInfo.getUserInfo({userName, userDescription});
  
  validateProfile.resetValidation();
  
});
 // прослушивать событие для открытия попапа Element
addBtn.addEventListener('click', () => {
  card.open();
  validateCard.resetValidation();
});

  
