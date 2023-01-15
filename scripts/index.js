'use strict'
/*получить элементы блока profile*/
let fullName = document.querySelector('.profile__full-name');
let profileDesc = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
/*получить элементы блока popup*/
let popup = document.querySelector('.popup');
let buttonClose = popup.querySelector('.popup__button-close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__fullname');
let jobInput = formElement.querySelector('.popup__description');
/*воспроизвести функцию открытия popup */
function callPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', callPopup);
/*воспроизвести функцию закрытия popup*/
function closePopup() {
  popup.classList.remove('popup_opened');
  nameInput.value = fullName.getAttribute('placeholder');
  jobInput.value = profileDesc.getAttribute('placeholder');
}
buttonClose.addEventListener('click', closePopup);
/*воспроизвести функцию сохранения popup*/
function handleFormSubmit(evt) {
  evt.preventDefault();

  popup.classList.remove('popup_opened');
  fullName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);