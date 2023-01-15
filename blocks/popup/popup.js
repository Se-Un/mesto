'use strict'

let fullName = document.querySelector('.profile__full-name');
let profileDesc = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let popup = document.querySelector('.popup');
let buttonClose = popup.querySelector('.popup__button-close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__fullname');
let jobInput = formElement.querySelector('.popup__description');

function callPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', callPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
  nameInput.value = fullName.textContent;
  jobInput.value = profileDesc.textContent;
}
buttonClose.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();

  popup.classList.remove('popup_opened');
  fullName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);