export default class Api {
  #baseUrl
  #headers

  constructor(options) {
    this.#baseUrl = options.baseUrl
    this.#headers = options.headers
  }

  #checkResponse(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      headers: this.#headers
    })
    .then(this.#checkResponse)
  }

  getUserInfo() {
    return fetch(this.#baseUrl + '/users/me', {
      headers: this.#headers
    })
    .then(this.#checkResponse)
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
    .then(this.#checkResponse)
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
    .then(this.#checkResponse)
  }

  updateAvatar(data) {
    return fetch(this.#baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: data['avatar-link']
      })
    })
    .then(this.#checkResponse)
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(this.#checkResponse)
  }

  likeCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this.#headers
    })
    .then(this.#checkResponse)
  }

  unlikeCard(cardId) {
    return fetch(this.#baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(this.#checkResponse)
  }
}

