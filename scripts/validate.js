'use strict'
import { config } from "./constants.js";
/*создать функцию для показа ошибок */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  /*создать константу для вывода ошибки */
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /*добавление класса input, если не валидация не пройдена */
  inputElement.classList.add(config.inputErrorClass);
  /*добавления браузерного сообщения об ошибке */
  errorElement.textContent = errorMessage;
  /*добавления класса span для вывода текста ошибки на экран */
  errorElement.classList.add(config.errorClass);
};
/*создать функцию для удаления ошибок, если валидация пройдена */
const hideInputError = (formElement, inputElement, config) => {
  /* также создаем константу для хранения данных об ошибке*/
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /*убираем класс у инпута, если валидация пройдена */
  inputElement.classList.remove(config.inputErrorClass);
  /*убираем класс у спана, закрываем его */
  errorElement.classList.remove(config.errorClass);
  /*очищаем спан */
  errorElement.textContent = '';
};
/*создать функцию обработчик для показа и удаления ошибок */
const isValid = (formElement, inputElement, config) => {
  /*если инпут не валиден то вызываем функцию show */
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
  /*если валиден, то hide */
  else {
    hideInputError(formElement, inputElement, config);
  }
};
/*создать функцию обработчик для проверки валидации всех инпутов в форме */
const setEventListener = (formElement, config) => {
  /*получаем массив инпутов в форме */
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  /*создать константу кнопки отправки формы*/
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  /*вызываем функцию чтобы кнопка была неактивна изначально при пустых значениях */
  toggleButtonState(inputList, buttonElement, config);
  /*методом forEach проходим массив из инпутов */
  inputList.forEach((inputElement) => {
    /*прослушиваем события в инпутах */
    inputElement.addEventListener('input', function () {
      /*вызываем функцию обработчик валидации */
      isValid(formElement, inputElement, config);
      /*вызываем функцию обработчик для изменения состояния кнопки отправки формы */
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
/*создать функцию обработчик для проверки всех форм на странице */
const invalidInput = (inputList) => {
  /*возвращаем метод some по которому ищем хотя бы один невалидный инпут */
  return inputList.some((inputElement) => {
    /*возвращаем навалидное значение*/
    return !inputElement.validity.valid;
  });
};
//создать функцию для активации кнопки сабмита
export const enableBtnSubmit = (buttonElement, config) => {
  //добавить сабмиту класс
  buttonElement.classList.add(config.inactiveButtonClass);
  //добавить сабмиту атрибут
  buttonElement.setAttribute('disabled', 'disabled');
};
//создать функцию для дизейбла кнопки сабмита
export const disableBtnSubmit = (buttonElement, config) => {
  //удалить класс
  buttonElement.classList.remove(config.inactiveButtonClass);
  //удалить атрибут
  buttonElement.removeAttribute('disabled', 'disabled');
}
/*функция обработчик активности кнопки отправки формы*/
const toggleButtonState = (inputList, buttonElement, config) => {
  /*создать условную конструкцию, если есть невалидный инпут, то задизейблить кнопку*/
  if(invalidInput(inputList)) {
    enableBtnSubmit(buttonElement, config);
  }
  /* если форма прошла валидацию, то активировать кнопку*/
  else {
    disableBtnSubmit(buttonElement, config);
  }
};
// создать функцию обработчик всеф форм
const enableValidation = (config) => {
  /*получаем массив форм на странице */
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  /*проходим по массиву методом forEach */
  formList.forEach((formElement) => {
    /*прослушиваем событие в форме на отправку формы */
    formElement.addEventListener('submit', function (evt) {
      /*отменяем стандартные методы обработки формы */
      evt.preventDefault();
      
    });
      /*вызываем функцию для обработки форм*/
      setEventListener(formElement, config);
  });
};
/* вызываем функцию обработчик всех форм*/
// присваиваем объекту данные массива
enableValidation(config);

