'use strict'
// импорт модулей
import './pages/index.css';
import {
  editBtn, 
  addBtn, 
  elements, 
  profilePopup, 
  inputName, 
  inputJob, 
  cardPopup, 
  popupScalePicture,
  initialCards,
  config
 } from '../scripts/utils/constants.js';
import  Card  from '../scripts/components/Card.js';
import  FormValidator  from '../scripts/components/FormValidator.js';
import  Section  from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
// объявить экземпляры класса Popup для открытия и закрытия попапов на странице
const profileStatePopup = new Popup(profilePopup);
const cardStatePopup = new Popup(cardPopup);
const photoStatePopup =new Popup(popupScalePicture);
// создать экземпляры класса валидации
const validateProfile = new FormValidator(config, profilePopup);
const validateCard = new FormValidator(config, cardPopup);
// создать экземпляр класса пользователя при открытии формы
const user = new UserInfo({inputName, inputJob});
// создать функцию генерации карточек 
const createCard = (item) => {
  const createCard = new Card(item, openImagePopup, '.element-template')
  return createCard.generateCard();
}
// создать функцию увеличения картинки
const openImagePopup = (name, link) => {
 const image = new PopupWithImage({name, link}, popupScalePicture);
 photoStatePopup.setEventListeners();
 return image.openPhoto();
} 
// сгенерировать первоначальные карточки
const rendererCards = new Section({ items: initialCards,
renderer: (item) => {
  rendererCards.addItem(createCard(item));
}
},
elements);
// объявить экземпляр класса PopupWithForm для блока Profile
const submitProfile = new PopupWithForm(profilePopup, {
  //  воспроизвести функцию для реализации отправки формы
  handleFormSubmit: (data) => {
    // объявить класс userInfo
    const userInfo = new UserInfo(data);
    userInfo.setUserInfo();
    // объявить метод закрытия попапа
    profileStatePopup.close();
  }
});
// объявить экземпляр класса PopupWithForm для создания карточки фото
const submitCard = new PopupWithForm(cardPopup, {
  // воспроизвести функцию для создания карточки пользователем
  handleFormSubmit: (data) => {
    // обратиться к методу воспроизведения карточки
    rendererCards.addPrependItem(createCard(data));
  }
});
// объявить методы генерации сабмита
submitProfile.generate();
submitCard.generate();
// объявить методы закрытия попапов
profileStatePopup.setEventListeners();
cardStatePopup.setEventListeners();
// объявить методы валидации попапов
validateProfile.enableValidation();
validateCard.enableValidation();
// объявить метод класса Section для воспроизведения карточек из массива
rendererCards.renderItems();
// прослушивать события для открытия попапа Profile
editBtn.addEventListener('click', () => {
  user.getUserInfo();
  profileStatePopup.open();
  validateProfile.resetValidation();
});
 // прослушивать событие для открытия попапа Element
addBtn.addEventListener('click', () => {
  cardStatePopup.open();
  validateCard.resetValidation();
});

  