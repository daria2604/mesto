import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  #form
  #handleDeleteCard

  constructor(popupSelector) {
    super(popupSelector)
    this.#form = this.popup.querySelector('.popup__form')
  }

  handleConfirm(handleDeleteCard) {
    this.#handleDeleteCard = handleDeleteCard
  }

  setEventListeners() {
    super.setEventListeners()
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.#handleDeleteCard()
    })
  }
}
