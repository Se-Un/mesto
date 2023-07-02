'use strict'
// создать класс
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userInfo = {
    name: this._name.textContent,
    about: this._about.textContent,
    avatar: this._avatar.src
   }
   return userInfo;
  }
  setAvatar(data) {
    if(data.avatar) this._avatar.src = data.avatar;
    if(data.name) this._avatar.alt = data.name;
  }
  setUserInfo(data) {
    if(data.name) this._name.textContent = data.name;
    if(data.about) this._about.textContent = data.about;
    this.setAvatar(data);
  }
}