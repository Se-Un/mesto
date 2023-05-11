'use strict'
/*получить элементы блока profile*/
const fullName = document.querySelector('.profile__full-name');
const activity = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
/*получить элемент блока elements*/
const elements = document.querySelector('.elements');
/*получить общие элементы popup*/
const popupList = Array.from(document.querySelectorAll('.popup'));
const closeBtns = document.querySelectorAll('.popup__button-close');
/*получить элементы popup для изменения блока profile*/
const profilePopup = document.querySelector('.popup-profile');
const profileForm = document.forms['profile-form'];
const inputName = profilePopup.querySelector('[name="name"]');
const inputJob = profilePopup.querySelector('[name="job"]');
const submitProfile = profilePopup.querySelector('.popup__submit');
/*получить элементы popup для редактирования карточек фото*/
const cardPopup = document.querySelector('.popup-element');
const cardForm = document.forms['card-form'];
const inputTitle = cardPopup.querySelector('[name="title"]');
const inputLink = cardPopup.querySelector('[name="link"]');

const popupScalePicture = document.querySelector('.popup-scale-picture');
const imagePopup = popupScalePicture.querySelector('.popup__image');
const captionPopup = popupScalePicture.querySelector('.popup__caption');
/*получить доступ к элементам блока template*/
const template = document.querySelector('.element-template').content;
/*массив данных для карточек фото*/
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
/*создать функцию вывода карточки в блок elements */
const createCard = (name, link) => {
  /*вывести в переменные елементы блока template через метод cloneNode */
  const templateElement = template.querySelector('.element').cloneNode(true);
  const image = templateElement.querySelector('.element__image');
  const deleteBtn = templateElement.querySelector('.element__delete');
  const likeBtn = templateElement.querySelector('.element__button');
  /*присвоим параметр заголовку карточки, чтобы вставлять необходимые значения*/
  templateElement.querySelector('.element__title').textContent = name;
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
  return templateElement;
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
  document.addEventListener('keydown', closeEsc);
}
/*создать функцю закрытия попапов*/
const closePopup = (popup) => {
  /*удалить класс элемента popup */
  popup.classList.remove('popup_opened');
  /*убрать обработчик события */
  document.removeEventListener('keydown', closeEsc);
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
}
/*создать функцию закрытия попапов по клику на оверлей */
const closeOverlay = (popup) => {
  /*прослушиваем событя клика в пределах открытого попапа */
  popup.addEventListener('click', (event) => {
    /*создать константу в которую будут делегироваться события с классами */
    const clickList = event.target.classList;
    /*создать условие что класс должен быть popup_opened */
    if(clickList.contains('popup_opened')) {
      /*вызвать функцию закрытия попапа */
      closePopup(popup);
    }
  })
}
/*создать функцию закрытия попапа по клипку на кнопку  esc */
const closeEsc = (evt) => {
  // пройти по массиву попапа
  popupList.forEach((popup) =>{
    // при условии что событие клика нажатия кнопки esc, закрыть попап
    if(evt.key == 'Escape') {
   closePopup(popup);
 } 
  })
};
/*вызвать функцию вывода карточек с заданным массивом */
renderCards(initialCards);
/*прослушивать форму отправки данных блока Profile*/
profileForm.addEventListener('submit', submitProfileForm);
/*прослушивать событие отправки формы formElement */
cardForm.addEventListener('submit', submitCardForm);
/*прослушивать события для открытия попапа Profile*/
editBtn.addEventListener('click', () =>{
  inputName.value = fullName.textContent;
  inputJob.value = activity.textContent;
  submitProfile.classList.remove('popup__submit_inactive');
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
  closeOverlay(popup);
});


















