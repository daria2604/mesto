export default class UserInfo {
  #name
  #about
  #userInfo

  constructor({ nameSelector, aboutSelector }) {
    this.#name = nameSelector
    this.#about = aboutSelector
  }

  getUserInfo() {
    this.#userInfo = {
      name: this.#name.textContent,
      about: this.#about.textContent
    }
    return this.#userInfo
  }

  setUserInfo(data) {
    this.#name.textContent = data.name
    this.#about.textContent = data.about
  }
}
