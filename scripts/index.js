'use strict'
//получить данные массива из другого файла
import * as constants from './constants.js';
import { enableBtnSubmit } from './validate.js';
import { disableBtnSubmit } from './validate.js';
import { enableValidation } from './validate.js';
/*получить элементы блока profile*/
const fullName = document.querySelector('.profile__full-name');
const activity = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
/*получить элемент блока elements*/
const elements = document.querySelector('.elements');
/*получить общие элементы popup*/
const popupList = Array.from(document.querySelectorAll('.popup'));
/*получить элементы popup для изменения блока profile*/
const profilePopup = document.querySelector('.popup-profile');
const profileForm = document.forms['profile-form'];
const inputName = profilePopup.querySelector('[name="name"]');
const inputJob = profilePopup.querySelector('[name="job"]');
const submitBtnProfile = profilePopup.querySelector('.submit-profile');
/*получить элементы popup для редактирования карточек фото*/
const cardPopup = document.querySelector('.popup-element');
const cardForm = document.forms['card-form'];
const inputTitle = cardPopup.querySelector('[name="title"]');
const inputLink = cardPopup.querySelector('[name="link"]');
const submitBtnCard = cardPopup.querySelector('.submit-card');

const popupScalePicture = document.querySelector('.popup-scale-picture');
const imagePopup = popupScalePicture.querySelector('.popup__image');
const captionPopup = popupScalePicture.querySelector('.popup__caption');
/*получить доступ к элементам блока template*/
const template = document.querySelector('.element-template').content;
/*создать функцию вывода карточки в блок elements */
const createCard = (name, link) => {
  /*вывести в переменные елементы блока template через метод cloneNode */
  const newCard = template.querySelector('.element').cloneNode(true);
  const image = newCard.querySelector('.element__image');
  const deleteBtn = newCard.querySelector('.element__delete');
  const likeBtn = newCard.querySelector('.element__button');
  /*присвоим параметр заголовку карточки, чтобы вставлять необходимые значения*/
  newCard.querySelector('.element__title').textContent = name;
  /*присвоим параметр атрибуту src */
  image.src = link;
  /*присвоим параметр атрибуту alt */
  image.alt = name;
  /*создать функцию удаления карточки, так как елемент template создаем функцию и прослушивание события в данной функции */
  const deleteCard = () => {
    /*создать константу, в которой будет находится ближайший родитель */
    const removeCard = deleteBtn.closest('.element');
    /*удалить карточку*/
    removeCard.remove();
  }
  /*создать функцию лайка карточки */
  const toggleLike = () => {
    /*менять класс кнопки при нажатии, метод toggle */
    likeBtn.classList.toggle('element__button_active');
  }
  /*прослушивать события кнопки "удалить" */
  deleteBtn.addEventListener('click', deleteCard);
  /*прослушивать события кнопки "нравится" */
  likeBtn.addEventListener('click', toggleLike);
  /*прослушивать событя при нажатии на картинку */
  image.addEventListener('click', () => openImagePopup(name, link));
  /*вернуть значение чтобы функция выполнялась */
  return newCard;
}
/*создать функцию добавления карточек из исходного массива по порядку массива */
const appendCard = (element) => {
  /*использовать метод append */
  elements.append(element);
}
/*создать функцию добавления карточки при отправке формы в начало блока */
const prependCard = (element) => {
  /*использовать метод prepend */
  elements.prepend(element);
}
/*создать функцию для вывода карточек из первоначального массива */
const renderCards = (array) => {
  /*метод перебора массива по параметру*/
  array.forEach(({name, link}) => {
    /*использовать функцию добавления и создания карточки */
    appendCard(createCard(name, link));
  })
}
/*создать функцию увеличения картинки */
const openImagePopup = (name, link) => {
  /*подставить значение в атрибут src */
  imagePopup.src = link;
  /*подставить значение в атрибут alt*/
  imagePopup.alt = name;
  /*подставить значение в подпись к картинке */
  captionPopup.textContent = name;
  /*использовать функцию открытия попапа */
  openPopup(popupScalePicture)
}
/*создать функцию открытия попапов*/
const openPopup = (popup) => {
  /*добавить класс элементу popup */
  popup.classList.add('popup_opened');
  /*добавить обработчик события закрытия попапа по кнопке esc */
  document.addEventListener('keydown', closePopupByEsc);
}
/*создать функцю закрытия попапов*/
const closePopup = (popup) => {
  /*удалить класс элемента popup */
  popup.classList.remove('popup_opened');
  /*убрать обработчик события */
  document.removeEventListener('keydown', closePopupByEsc);
}
/*создать функцию отправки формы и изменения данных в блоке Profile*/
const submitProfileForm = (evt) => {
  /*функция события для обработки отправки формы */
  evt.preventDefault();
  /*подставить значения в соответсвующие разделы*/ 
  fullName.textContent = inputName.value; 
  activity.textContent = inputJob.value;
  /*использовать функцию закрытия popup */
  closePopup(profilePopup);
}
/*создать функцию отправки формы и создания карточки в блоке Elements */
const submitCardForm = (evt) => {
  /*функция события для обработки отправки формы */
  evt.preventDefault();
  /*создать константы в которых будут хранится значения полей из input */
  const name = inputTitle.value;
  const link = inputLink.value;
  /*использовать функции добавления карточки в начало и создания функции */
  prependCard(createCard(name, link));
  /*использовать функцию закрытия popup */
  closePopup(cardPopup);
  cardForm.reset();
  disableBtnSubmit(submitBtnCard, constants.config);
  
}
/*создать функцию закрытия попапов по клику на оверлей */
const closePopupByOverlay = (popup) => {
  /*прослушиваем событя клика в пределах открытого попапа */
  popup.addEventListener('click', (event) => {
    /*создать условие что класс должен быть popup_opened */
    if(event.target.classList.contains('popup_opened')) {
      /*вызвать функцию закрытия попапа */
      closePopup(popup);
    }
  })
}
/*создать функцию закрытия попапа по клипку на кнопку  esc */
const closePopupByEsc = (evt) => {
    // при условии что событие клика нажатия кнопки esc
    if(evt.key == 'Escape') {
      // закрыть попап с соответствующим классом
          closePopup(document.querySelector('.popup_opened'));
        }
};
/*вызвать функцию вывода карточек с заданным массивом */
renderCards(constants.initialCards);
// вызвать функцию валидации
enableValidation(constants.config);
/*прослушивать форму отправки данных блока Profile*/
profileForm.addEventListener('submit', submitProfileForm);
/*прослушивать событие отправки формы formElement */
cardForm.addEventListener('submit', submitCardForm);
/*прослушивать события для открытия попапа Profile*/
editBtn.addEventListener('click', () =>{
  inputName.value = fullName.textContent;
  inputJob.value = activity.textContent;
  enableBtnSubmit(submitBtnProfile, constants.config);
  openPopup(profilePopup);
});
 /*прослушивать событие для открытия попапа Element*/
addBtn.addEventListener('click', () => {
  openPopup(cardPopup);
});
/*перебираем попапы на странице*/
popupList.forEach((popup) => {
  /*прослушиваем событае на каждом попапе*/
  popup.addEventListener('click', (event) => {
    /*создать константу в которую будут делегироваться события с классами */
    const clickList = event.target.classList;
    /*создать условие что класс должен быть popup__button-close */
    if(clickList.contains('popup__button-close')) {
      /*вызвать функцию закрытия попапа */
      closePopup(popup);
    }
  });
  closePopupByOverlay(popup);
});