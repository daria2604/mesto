export default class Popup {
  #closeButton

  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector)
    this.#closeButton = this.popup.querySelector('.button_action_close')
  }

  open() {
    this.popup.classList.add('popup_opened')
    document.addEventListener('keydown', this.#handleEscClose)
  }

  close() {
    this.popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this.#handleEscClose)
  }

  #handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close()
    }
  }

  #handleOverlayClose = (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      this.close()
    }
    if(evt.target.classList.contains('button_action_close')) {
      this.close()
    }
  }

  setEventListeners() {
    this.#closeButton.addEventListener('click', this.close)
    document.addEventListener('mousedown', this.#handleOverlayClose)
  }
}
