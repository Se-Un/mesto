'use strict'
// создать класс
export default class Api {
  //создать конструктор класса
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  // создать метод для возвращения json
  #response(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так ${res.status}`);
  }
  // создать метод профиля класса
  getUserInfo() {
    // исполнить запрос
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.#response);
  }
  // метод добавления первоначальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.#response);
  }
  // метод добавления информации о пользователе на сервер
  patchDataUser(data) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this.#response);
  }
  // создать метод создания карты на сервере
  postDataCards(data) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.#response);
  }
}

