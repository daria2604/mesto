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
}

