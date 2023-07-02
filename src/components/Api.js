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
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.#response);
  }
  // создать метод создания карты на сервере
  postDataCards(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.#response);
  }
  // создать метод удаления карты на сервере
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this.#response);
  }
  // создать метод лайка карточки
  likeState(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
    }).then(this.#response);
  }
  // создать метод дизлайка карточки
  dislikeState(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this.#response);
  }
  // создать метод изменения аватара
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
    }).then(this._response);
  }
}