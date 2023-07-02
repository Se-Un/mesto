'use strict'
// создать класс валидации 
export default class FormValidator {
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
    // создать классовые переменные
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._buttonElement = this._formElement.querySelector(this._submitButton);

    this.#toggleButtonState();

   this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState();
      })
    })
  }
  // создать метод обработчик для проверки всех форм на странице
  #invalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }
  //создать метод для активации кнопки сабмита
  #disableBtnSubmit() {
    //добавить сабмиту класс
    this._buttonElement.classList.add(this._inactiveButton);
    //добавить сабмиту атрибут
    this._buttonElement.setAttribute('disabled', 'disabled');
  }
  //создать метод для дизейбла кнопки сабмита
  #enableBtnSubmit() {
    //удалить класс
    this._buttonElement.classList.remove(this._inactiveButton);
    //удалить атрибут
    this._buttonElement.removeAttribute('disabled', 'disabled');
  }
  // создать метод обработчик для дизейбла кнопок
  #toggleButtonState() {
    // создать условную конструкцию, если есть невалидный инпут, то задизейблить кнопку
    if(this.#invalidInput()) {
      this.#disableBtnSubmit();
    }
    // если форма прошла валидацию, то активировать кнопку
    else {
      this.#enableBtnSubmit();
    }
  };
  // создать метод очистки ошибок
  resetValidation() {
    this.#toggleButtonState();
    this._inputList.forEach((inputElement) => {
      
      this.#hideInputError(inputElement);
    });
  }
  // создать метод обработчик валидации всех форм
  enableValidation() {
        // вызываем функцию для обработки форм
        this.#setEventListener();
  }
}