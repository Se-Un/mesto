'use strict'
// импорт модулей
import './index.css';
import { config } from '../utils/constants.js';
import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { data } from 'autoprefixer';
// получить элементы блока profile
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
// получить элемент блока elements
const elements = document.querySelector('.elements');
// получить элементы popup для изменения блока profile
const profilePopup = document.querySelector('.popup-profile');
const name = profilePopup.querySelector('[name="name"]');
const description = profilePopup.querySelector('[name="description"]');
// получить элементы popup для редактирования карточек фото
const cardPopup = document.querySelector('.popup-element');
// получить элементы попапа увеличения картинки
const popupScalePicture = document.querySelector('.popup-scale-picture');
// получить элементы попапа Удаления карточки
const popupDeleteCard = document.querySelector('.popup-deleteCard');
// объявление классов
// объявить класс данных пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__full-name', 
  descriptionSelector: '.profile__description', 
  avatarSelector: '.profile__avatar'});
// объявить класс увеличения фото
const image = new PopupWithImage(popupScalePicture);
// объявить экземпляр класса PopupWithForm для блока Profile
const profile = new PopupWithForm(profilePopup, popupSubmitForm);

async function popupSubmitForm(data) {
  try {
    console.log(data);
    await api.patchDataUser(data);
    userInfo.setUserInfo(data);
    profile.close();
  }
  catch(err) {
    console.log(err);
  }

}
// объявить экземпляр класса PopupWithForm для создания карточки фото
const card = new PopupWithForm(cardPopup, submitCardForm);

async function submitCardForm(data) {
  try {
    rendererCards.addPrependItem(createCard(data));
    await api.postDataCards(data);
    card.close();
  }
  catch(err) {
    console.log(err);
  }
}


// объявить экземпляр класса
const deleteCard = new PopupWithForm(popupDeleteCard, {
  handleFormSubmit: () => {
    deleteCard.close();
  }
})
// создать экземпляры класса валидации
const validateProfile = new FormValidator(config, profilePopup);
const validateCard = new FormValidator(config, cardPopup);



// создать функцию генерации карточек 
const createCard = (item) => {
  const createCard = new Card(item, openImagePopup, '.element-template');
  return createCard.generateCard();
}
// создать функцию увеличения картинки
const openImagePopup = (name, link) => {
 return image.openPhoto({name, link});
} 
// сгенерировать первоначальные карточки
export const rendererCards = new Section({
renderer: (item) => {
  rendererCards.addItem(createCard(item));
}
},
elements);
// объявить методы генерации сабмита
image.setEventListeners();
profile.setEventListeners();
card.setEventListeners();
deleteCard.setEventListeners();
// объявить методы валидации попапов
validateProfile.enableValidation();
validateCard.enableValidation();
// прослушивать события для открытия попапа Profile
editBtn.addEventListener('click', () => {
  profile.open();
  const currentUserInfo = userInfo.getUserInfo();
  name.value = currentUserInfo.name;
  description.value = currentUserInfo.description;
  validateProfile.resetValidation();
});
 // прослушивать событие для открытия попапа Element
addBtn.addEventListener('click', () => {
  card.open();
  validateCard.resetValidation();
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
      authorization: "e7ba1a9e-f2b7-42f1-b3b7-db01471a0a76",
      "Content-Type": "application/json",
  }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
          userId = userData._id;
          userInfo.setUserInfo(userData);
          rendererCards.renderItems(cardData);
      })
      .catch((err) => console.log(err));
  
