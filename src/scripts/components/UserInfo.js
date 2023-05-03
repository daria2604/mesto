export default class UserInfo {
  #name
  #about
  #avatar
  #userId
  #userInfo

  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this.#name = document.querySelector(nameSelector)
    this.#about = document.querySelector(aboutSelector)
    this.#avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    this.#userInfo = {
      name: this.#name.textContent,
      about: this.#about.textContent,
    }
    return this.#userInfo
  }

  setAvatar(data) {
    this.#avatar.src = data.avatar
  }

  setUserInfo(data) {
    this.#name.textContent = data.name
    this.#about.textContent = data.about
  }
}
