export default class Api {
  #baseUrl
  #headers

  constructor(options) {
    this.#baseUrl = options.baseUrl
    this.#headers = options.headers
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
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

  addCard({ title, link }) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  updateAvatar(data) {
    return fetch(this.#baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: data['avatar-link']
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  likeCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this.#headers
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  unlikeCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}

