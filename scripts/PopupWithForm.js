import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleFormSubmit
  #form
  #inputList
  #inputValues

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this.#handleFormSubmit = handleFormSubmit
    this.#form = this.popup.querySelector('.popup__form')
    this.#inputList = this.popup.querySelectorAll('.popup__input')
  }

  #getInputValues() {
    this.#inputValues = {}
    this.#inputList.forEach((input) => {
      this.#inputValues[input.name] = input.value
    })
    return this.#inputValues
  }

  setEventListeners() {
    super.setEventListeners()
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues())
    })
  }

  close = () => {
    super.close()
    this.#form.reset()
  }
}
