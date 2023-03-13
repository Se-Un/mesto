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
const btnClose = document.querySelectorAll('.popup__button-close');
/*получить элементы popup для изменения блока profile*/
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.popup__form');
const inputName = popupProfile.querySelector('[name="name"]');
const inputJob = popupProfile.querySelector('[name="job"]');
/*получить элементы popup для редактирования карточек фото*/
const popupElement = document.querySelector('.popup-element');
const formElement = popupElement.querySelector('.popup__form');
const inputTitle = popupElement.querySelector('[name="title"]');
const inputLink = popupElement.querySelector('[name="link"]');

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
  const changeClassLikeBtn = () => {
    /*менять класс кнопки при нажатии, метод toggle */
    likeBtn.classList.toggle('element__button_active');
  }
  /*прослушивать события кнопки "удалить" */
  deleteBtn.addEventListener('click', deleteCard);
  /*прослушивать события кнопки "нравится" */
  likeBtn.addEventListener('click', changeClassLikeBtn);
  /*прослушивать событя при нажатии на картинку */
  image.addEventListener('click', () => scale(name, link));
  /*вернуть значение чтобы функция выполнялась */
  return templateElement;
}
/*создать функцию добавления карточек из исходного массива по порядку массива */
const addCard = (element) => {
  /*использовать метод append */
  elements.append(element);
}
/*создать функцию добавления карточки при отправке формы в начало блока */
const submitCard = (element) => {
  /*использовать метод prepend */
  elements.prepend(element);
}
/*создать функцию для вывода карточек из первоначального массива */
const exampleCards = (array) => {
  /*метод перебора массива по параметру*/
  array.forEach(({name, link}) => {
    /*использовать функцию добавления и создания карточки */
    addCard(createCard(name, link));
  })
}
/*создать функцию увеличения картинки */
const scale = (name, link) => {
  /*подставить значение в атрибут src */
  imagePopup.src = link;
  /*подставить значение в подпись к картинке */
  captionPopup.textContent = name;
  /*использовать функцию открытия попапа */
  openPopup(popupScalePicture)
}

/*создать функцию открытия попапов*/
const openPopup = (popup) => {
  /*добавить класс элементу popup */
  popup.classList.add('popup_opened');
}
/*создать функцю закрытия попапов*/
const closePopup = (popup) => {
  /*удалить класс элемента popup */
  popup.classList.remove('popup_opened');
}
/*создать функцию отправки формы и изменения данных в блоке Profile*/
const submitFormProfile = (evt) => {
  /*функция события для обработки отправки формы */
  evt.preventDefault();
  /*подставить значения в соответсвующие разделы*/
  fullName.textContent = inputName.value;
  activity.textContent = inputJob.value;
  /*использовать функцию закрытия popup */
  closePopup(popupProfile);
}
/*создать функцию отправки формы и создания карточки в блоке Elements */
const submitFormElement = (evt) => {
  /*функция события для обработки отправки формы */
  evt.preventDefault();
  /*создать константы в которых будут хранится значения полей из input */
  const name = inputTitle.value;
  const link = inputLink.value;
  /*использовать функции добавления карточки в начало и создания функции */
  submitCard(createCard(name, link));
  /*использовать функцию закрытия popup */
  closePopup(popupElement);
}
/*вызвать функцию вывода карточек с заданным массивом */
exampleCards(initialCards);
/*прослушивать форму отправки данных блока Profile*/
formProfile.addEventListener('submit', submitFormProfile);
/*прослушивать событие отправки формы formElement */
formElement.addEventListener('submit', submitFormElement);
/*прослушивать события для открытия попапа Profile*/
editBtn.addEventListener('click', () =>{
  inputName.value = fullName.textContent;
  inputJob.value = activity.textContent;
  openPopup(popupProfile);
});
/*прослушивать событие для открытия попапа Element*/
addBtn.addEventListener('click', () => {
  inputTitle.value = '';
  inputLink.value = '';
  openPopup(popupElement);
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
  }) 
})


 



















