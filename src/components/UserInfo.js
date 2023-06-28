'use strict'
// создать класс
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
    name: this._name.textContent,
    description: this._description.textContent,
    avatar: this._avatar.src
   }
  }
  setAvatar(data) {
    if(data.avatar) this._avatar.src = data.avatar;
    if(data.name) this._avatar.alt = data.name;
  }
  setUserInfo(data) {
    console.log(data)
    if(data.name) this._name.textContent = data.name;
    if(data.about) this._description.textContent = data.about;
    this.setAvatar(data);
  }
}