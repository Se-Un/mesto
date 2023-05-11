'use strict'
//создать переменную с пустым массивом
let obj = {};
/*создать функцию для показа ошибок */
const showInputError = (formElement, inputElement, errorMessage) => {
  /*создать константу для вывода ошибки */
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /*добавление класса input, если не валидация не пройдена */
  inputElement.classList.add(obj.inputErrorClass);
  /*добавления браузерного сообщения об ошибке */
  errorElement.textContent = errorMessage;
  /*добавления класса span для вывода текста ошибки на экран */
  errorElement.classList.add(obj.errorClass);
};
/*создать функцию для удаления ошибок, если валидация пройдена */
const hideInputError = (formElement, inputElement) => {
  /* также создаем константу для хранения данных об ошибке*/
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /*убираем класс у инпута, если валидация пройдена */
  inputElement.classList.remove(obj.inputErrorClass);
  /*убираем класс у спана, закрываем его */
  errorElement.classList.remove(obj.errorClass);
  /*очищаем спан */
  errorElement.textContent = '';
};
/*создать функцию обработчик для показа и удаления ошибок */
const isValid = (formElement, inputElement) => {
  /*если инпут не валиден то вызываем функцию show */
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  /*если валиден, то hide */
  else {
    hideInputError(formElement, inputElement);
  }
};
/*создать функцию обработчик для проверки валидации всех инпутов в форме */
const setEventListener = (formElement) => {
  /*получаем массив инпутов в форме */
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  /*создать константу кнопки отправки формы*/
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  /*вызываем функцию чтобы кнопка была неактивна изначально при пустых значениях */
  toggleButtonState(inputList, buttonElement);
  /*методом forEach проходим массив из инпутов */
  inputList.forEach((inputElement) => {
    /*прослушиваем события в инпутах */
    inputElement.addEventListener('input', function () {
      /*вызываем функцию обработчик валидации */
      isValid(formElement, inputElement);
      /*вызываем функцию обработчик для изменения состояния кнопки отправки формы */
      toggleButtonState(inputList, buttonElement);
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
/*функция обработчик активности кнопки отправки формы*/
const toggleButtonState = (inputList, buttonElement) => {
  /*создать условную конструкцию, если есть невалидный инпут, то задизейблить кнопку*/
  if(invalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
  }
  /* если форма прошла валидацию, то активировать кнопку*/
  else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
};
// создать функцию обработчик всеф форм
const enableValidation = (obj) => {
  /*получаем массив форм на странице */
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  /*проходим по массиву методом forEach */
  formList.forEach((formElement) => {
    /*прослушиваем событие в форме на отправку формы */
    formElement.addEventListener('submit', function (evt) {
      /*отменяем стандартные методы обработки формы */
      evt.preventDefault();
      
    });
      /*вызываем функцию для обработки форм*/
      setEventListener(formElement);
  });
};

/* вызываем функцию обработчик всех форм*/
// присваиваем объекту данные массива
enableValidation (obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_validity_invalid',
  errorClass: 'popup__input-error_active',

});

