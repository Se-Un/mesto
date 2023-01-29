'use strict'
/*создать массив */
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
/*получить элементы блока profile*/
const fullName = document.querySelector('.profile__full-name');
const infoJob = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
/*получить элементы блока popup*/
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__button-close');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const jobInput = formElement.querySelector('.popup__input_value_job');
/*получить елементы блока elements*/
const elements = document.querySelector('.elements');
/*создать функцию для popup секции profile*/
function callPopupProfile() {
/*воспроизвести функцию открытия popup */
  const openPopup = () => {
    popup.classList.add('popup_opened');
    nameInput.value = fullName.textContent;
    jobInput.value = infoJob.textContent;
  }
/*воспроизвести функцию закрытия popup*/
  const closePopup = () => {
    popup.classList.remove('popup_opened');
  }
/*воспроизвести функцию сохранения popup*/
  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    closePopup();
    fullName.textContent = nameInput.value;
    infoJob.textContent = jobInput.value;
  }
/*прослушивать события*/
  editButton.addEventListener('click', openPopup);
  buttonClose.addEventListener('click', closePopup);
  formElement.addEventListener('submit', handleFormSubmit);

}
callPopupProfile();

function suppElement(initialCards) {
  
    for(let i = 0; i < initialCards.length; i += 1) {
      const elementTemplate = document.querySelector('#element-template').content;  
      const cardElements = elementTemplate.querySelector('.element').cloneNode(true);
      cardElements.querySelector('.element__image').src = initialCards[i].link;
      cardElements.querySelector('.element__title').textContent = initialCards[i].name;
      elements.append(cardElements);
  }
}
suppElement(initialCards);