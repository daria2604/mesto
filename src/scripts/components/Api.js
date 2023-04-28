export default class Api {
  #baseUrl
  #headers

  constructor(options) {
    this.#baseUrl = options.baseUrl
    this.#headers = options.headers
  }

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      headers: this.#headers
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  getUserInfo() {
    return fetch(this.#baseUrl + '/users/me', {
      headers: this.#headers
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  updateUserInfo({ name, about }) {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  addCard({ title, link }, userId) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: title,
        link: link,
        _id: userId
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}

