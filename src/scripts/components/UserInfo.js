'use strict'
import { fullName, activity, inputName, inputJob } from "../utils/constants.js";
// создать класс
export default class UserInfo {
  constructor(obj) {
    this._name = obj.name;
    this._job = obj.job;

  }
  getUserInfo() {
   return {
    name: inputName.value = fullName.textContent,
    job: inputJob.value = activity.textContent
   }
  }
  setUserInfo() {
    fullName.textContent = this._name;
    activity.textContent = this._job;
  }
}