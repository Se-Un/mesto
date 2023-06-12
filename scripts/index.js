'use strict'
// импорт модулей
import { fullName, 
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
 } from './utils/constants.js';
import  Card  from './components/Card.js';
import  FormValidator  from './components/FormValidator.js';
import  Section  from './components/Section.js';
// создать функцию увеличения картинки
const openImagePopup = (name, link) => {
  // подставить значение в атрибут src 
  imagePopup.src = link;
  // подставить значение в атрибут alt
  imagePopup.alt = name;
  // подставить значение в подпись к картинке 
  captionPopup.textContent = name;
  // использовать функцию открытия попапа 
  openPopup(popupScalePicture)
}
// сгенерировать первоначальные карточки
const rendererCards = new Section({ items: initialCards,
renderer: (item) => {
  const card = new Card(item, openImagePopup, '.element-template');
  const cardElement = card.generateCard();
  rendererCards.addItem(cardElement);
}
},
elements);
rendererCards.renderItems();
// создать функцию добавления карточки пользователем
const createCard = (items) => {
  const createCard = new Card(items, openImagePopup, '.element-template')
  const newCardElement = createCard.generateCard();
  rendererCards.addPrependItem(newCardElement);
}
//создать функцию открытия попапов
const openPopup = (popup) => {
  //добавить класс элементу popup 
  popup.classList.add('popup_opened');
  //добавить обработчик события закрытия попапа по кнопке esc 
  document.addEventListener('keydown', closePopupByEsc);
}
// создать функцю закрытия попапов*/
const closePopup = (popup) => {
  // удалить класс элемента popup */
  popup.classList.remove('popup_opened');
  // убрать обработчик события 
  document.removeEventListener('keydown', closePopupByEsc);
}
// создать функцию отправки формы и изменения данных в блоке Profile
const submitProfileForm = (evt) => {
  // функция события для обработки отправки формы 
  evt.preventDefault();
  // подставить значения в соответсвующие разделы
  fullName.textContent = inputName.value; 
  activity.textContent = inputJob.value;
  // использовать функцию закрытия popup 
  closePopup(profilePopup);
}
// создать функцию отправки формы и создания карточки в блоке Elements 
const submitCardForm = (evt) => {
  // функция события для обработки отправки формы 
  evt.preventDefault();
  // создать константы в которых будут хранится значения полей из input 
  const name = inputTitle.value;
  const link = inputLink.value;
  createCard({ name, link });
  //использовать функцию закрытия popup 
  closePopup(cardPopup);
  cardForm.reset();
  
}
// создать функцию закрытия попапов по клику на оверлей 
const closePopupByOverlay = (popup) => {
  // прослушиваем событя клика в пределах открытого попапа 
  popup.addEventListener('click', (event) => {
    // создать условие что класс должен быть popup_opened 
    if(event.target.classList.contains('popup_opened')) {
      // вызвать функцию закрытия попапа 
      closePopup(popup);
    }
  })
}
// создать функцию закрытия попапа по клипку на кнопку  esc 
const closePopupByEsc = (evt) => {
    // при условии что событие клика нажатия кнопки esc
    if(evt.key == 'Escape') {
      // закрыть попап с соответствующим классом
          closePopup(document.querySelector('.popup_opened'));
        }
}
// создать экземпляр класса валидации профиля
const validateProfile = new FormValidator(config, profilePopup);
validateProfile.enableValidation();
//  создать экземпляр класса валидации карты
const validateCard = new FormValidator(config, cardPopup);
validateCard.enableValidation();
// вызвать функцию вывода карточек с заданным массивом 
//renderCards(initialCards);
// прослушивать форму отправки данных блока Profile
profileForm.addEventListener('submit', submitProfileForm);
// прослушивать событие отправки формы formElement
cardForm.addEventListener('submit', submitCardForm);
// прослушивать события для открытия попапа Profile
editBtn.addEventListener('click', () =>{
  inputName.value = fullName.textContent;
  inputJob.value = activity.textContent;
  openPopup(profilePopup);
  validateProfile.resetValidation();
});
 // прослушивать событие для открытия попапа Element
addBtn.addEventListener('click', () => {
  openPopup(cardPopup);
  validateCard.resetValidation();
});
// перебираем попапы на странице
popupList.forEach((popup) => {
  //прослушиваем событае на каждом попапе
  popup.addEventListener('click', (event) => {
    // создать константу в которую будут делегироваться события с классами 
    const clickList = event.target.classList;
    // создать условие что класс должен быть popup__button-close 
    if(clickList.contains('popup__button-close')) {
      // вызвать функцию закрытия попапа 
      closePopup(popup);
    }
  });
  
  closePopupByOverlay(popup);
});