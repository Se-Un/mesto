'use strict'
/*получить элементы блока profile*/
let fullName = document.querySelector('.profile__full-name');
let profileDesc = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
/*получить элементы блока popup*/
let popup = document.querySelector('.popup');
let buttonClose = popup.querySelector('.popup__button-close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');
/*воспроизвести функцию открытия popup */
function callPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = fullName.textContent;
    jobInput.value = profileDesc.textContent;
}
/*воспроизвести функцию закрытия popup*/
function closePopup() {
  popup.classList.remove('popup_opened');
}
/*воспроизвести функцию сохранения popup*/
function handleFormSubmit(evt) {
  evt.preventDefault();

  closePopup();
  fullName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
}
/*прослушивать события*/
editButton.addEventListener('click', callPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
