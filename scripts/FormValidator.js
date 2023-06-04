'use strict'
// создать класс валидации 
export class FormValidator {
  // создать конструктор со свойствами класса
  constructor(object, formElement) {
    this._form = object.formSelector;
    this._input = object.inputSelector;
    this._submitButton = object.submitButtonSelector;
    this._inactiveButton = object.inactiveButtonClass;
    this._inputError = object.inputErrorClass;
    this._error = object.errorClass;
    this._formElement = formElement;
   
  }
  // создать метод вывода ошибки
  #showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // добавление класса input, если не валидация не пройдена
    inputElement.classList.add(this._inputError);
    // добавления браузерного сообщения об ошибке 
    errorElement.textContent = errorMessage;
    // добавления класса span для вывода текста ошибки на экран 
    errorElement.classList.add(this._error);
  }
  // создать метод стирания ошибки
  #hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
   // добавление класса input, если не валидация не пройдена
   inputElement.classList.remove(this._inputError);
   // добавления браузерного сообщения об ошибке 
   errorElement.textContent = '';
   // добавления класса span для вывода текста ошибки на экран 
   errorElement.classList.remove(this._error);
  }
  // создать метод проверки полей на валидацию
  #isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage)
    }
    else {
      this.#hideInputError(inputElement);
    }
  }
  // создать метод обработчик для установки валидации
  #setEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._input));
    const buttonElement = this._formElement.querySelector(this._submitButton);
    this.#toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState(inputList, buttonElement);
      })
    })
  }
  // создать метод обработчик для проверки всех форм на странице
  #invalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  //создать метод для активации кнопки сабмита
  #disableBtnSubmit(buttonElement) {
    //добавить сабмиту класс
    buttonElement.classList.add(this._inactiveButton);
    //добавить сабмиту атрибут
    buttonElement.setAttribute('disabled', 'disabled');
  }
  //создать метод для дизейбла кнопки сабмита
  #enableBtnSubmit(buttonElement) {
    //удалить класс
    buttonElement.classList.remove(this._inactiveButton);
    //удалить атрибут
    buttonElement.removeAttribute('disabled', 'disabled');
  }
  // создать метод обработчик для дизейбла кнопок
  #toggleButtonState(inputList, buttonElement) {
    // создать условную конструкцию, если есть невалидный инпут, то задизейблить кнопку
    if(this.#invalidInput(inputList)) {
      this.#disableBtnSubmit(buttonElement);
    }
    // если форма прошла валидацию, то активировать кнопку
    else {
      this.#enableBtnSubmit(buttonElement);
    }
  };
  // создать метод обработчик валидации всех форм
  enableValidation() {
    // получаем массив форм на странице
    const formList = Array.from(document.querySelectorAll(this._form));
    // проходим по массиву методом forEach 
    formList.forEach((formElement) => {
      // прослушиваем событие в форме на отправку формы 
      formElement.addEventListener('submit', function (evt) {
        // отменяем стандартные методы обработки формы 
        evt.preventDefault();
      });
        // вызываем функцию для обработки форм
        this.#setEventListener();
    });
  }
}






