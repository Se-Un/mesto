'use strict'
// создать класс
export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(`.${userNameSelector}`);
    this._userDescriptionElement = document.querySelector(`.${userDescriptionSelector}`);

  }
  getUserInfo({userName, userDescription}) {
   return {
    userName: userName.value = this._userNameElement.textContent,
    userDescription: userDescription.value = this._userDescriptionElement.textContent
   }
  }
  setUserInfo({userName, userDescription}) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}