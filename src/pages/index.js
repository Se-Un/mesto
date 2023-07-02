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
import ConfirmPopupForm from '../components/ConfirmPopupForm.js';
import { data } from 'autoprefixer';
// получить элементы блока profile
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const changeBtn = document.querySelector('.profile__avatar')
// получить элемент блока elements
const elements = document.querySelector('.elements');
// получить элементы popup для изменения блока profile
const profilePopup = document.querySelector('.popup-profile');
const name = profilePopup.querySelector('[name="name"]');
const about = profilePopup.querySelector('[name="about"]');
// получить элементы popup для редактирования карточек фото
const cardPopup = document.querySelector('.popup-element');
// получить элементы попапа увеличения картинки
const popupScalePicture = document.querySelector('.popup-scale-picture');
// получить элементы попапа Удаления карточки
const popupDeleteCard = document.querySelector('.popup-deleteCard');
// получить элемент попапа изменения аватара
const popupChangeAvatar = document.querySelector('.popup-changeAvatar');
// создать переменную для хранения id пользователя
let myId;
// объявление классов
// объявить экземпляр класса
const profile = new PopupWithForm(profilePopup, submitProfileForm);
const cards = new PopupWithForm(cardPopup, submitCardForm);
const image = new PopupWithImage(popupScalePicture);
const avatar = new  PopupWithForm(popupChangeAvatar, submitAvatarForm);
// создать экземпляры класса валидации
const validateProfile = new FormValidator(config, profilePopup);
const validateCard = new FormValidator(config, cardPopup);
const validateAvatar = new FormValidator(config, popupChangeAvatar);
// объявить класс данных пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__full-name', 
  descriptionSelector: '.profile__description', 
  avatarSelector: '.profile__avatar-image'
});
// сгенерировать первоначальные карточки
const rendererCards = new Section({
  renderer: (data) => {
    rendererCards.addItem(createCard(data));
  }
},
elements);
// создать функцию увеличения картинки
function openImagePopup(name, link)  {
  return image.openPhoto(name, link);
} 
// создать функцию создания и отображения карточки на странице
function createCard(data) {
  const card = new Card({
      name: data.name,
      link: data.link,
      likes: data.likes,
      myId,
      idOwner: data.owner._id,
      id: data._id
  },
    openImagePopup,
    '#element-template',
    async () => {
          try {
              const res = await api.likeState(data._id);
              card.likeState();
              card.showCounterLike(res);
          } catch (err) {
              console.log(err);
          }
      },
      async () => {
          try {
              const res = await api.dislikeState(data._id);
              card.dislikeState();
              card.showCounterLike(res);
          } catch (err) {
              console.log(err);
          }
      },
      () => {
          confirmPopupForm.open(card);
      }
  );

  return card.generateCard();
}
// создать функцию отправки данных на сервер Profile
async function submitProfileForm(data) {
  profile.loading(true, 'Сохранение...');
  try {
    const res = await api.patchDataUser(data);
    userInfo.setUserInfo(res);
    profile.close();
  }
  catch(err) {
    console.log(err);
  }
  finally {
    profile.loading(false);
  }
}
// создать функцию отправки данных на сервер Card
async function submitCardForm(data) {
  cards.loading(true, 'Сохранение...');
  try {
    const res = await api.postDataCards(data);
    const card = createCard(res);
    rendererCards.addPrependItem(card);
    cards.close();
  } 
  catch (err) {
    console.log(err);
  }
  finally {
    cards.loading(false);
  }
}
// создать функцию открытия попапа и удаления карточки
const confirmPopupForm = new ConfirmPopupForm(popupDeleteCard, async (card) => {
  try {
      await api.deleteCard(card._id);
      card.deleteElement();
      confirmPopupForm.close();
  } catch (err) {
      console.log(err);
  }
})
// создать функцию отправки данных на сервер Avatar
async function submitAvatarForm(data) {
  avatar.loading(true, 'Сохранение...');
  try {
    await api.changeAvatar(data);
    userInfo.setAvatar(data);
    avatar.close();
  } catch (err) {
    console.log(err);
  }
  finally {
    avatar.loading(false);
  }
}
// объявить методы для закрытия попапов
profile.setEventListeners();
cards.setEventListeners();
confirmPopupForm.setEventListeners();
avatar.setEventListeners();
image.setEventListeners();
// объявить методы валидации попапов
validateProfile.enableValidation();
validateCard.enableValidation();
validateAvatar.enableValidation();
// прослушивать события для открытия попапа Profile
editBtn.addEventListener('click', () => {
  profile.open();
  const currentUserInfo = userInfo.getUserInfo();
  name.value = currentUserInfo.name;
  about.value = currentUserInfo.about;
  validateProfile.resetValidation();
});
 // прослушивать событие для открытия попапа Element
addBtn.addEventListener('click', () => {
  cards.open();
  validateCard.resetValidation();
});
// прослушивать событие для открытие попапа Avatar
changeBtn.addEventListener('click', () => {
  avatar.open();
  validateAvatar.resetValidation();
})
// получить данные api с сервера
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
      authorization: "e7ba1a9e-f2b7-42f1-b3b7-db01471a0a76",
      "Content-Type": "application/json",
  }
});
// обявить промис ол для использования данных карт и пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
          myId = userData._id;
          userInfo.setUserInfo(userData);
          rendererCards.renderItems(cardData);
      })
      .catch((err) => console.log(err));