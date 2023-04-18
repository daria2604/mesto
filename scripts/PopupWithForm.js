import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitFormCallback
  #form
  #inputList
  #inputValues

  constructor({ popupSelector, submitFormCallback }) {
    super(popupSelector)
    this.#submitFormCallback = submitFormCallback
    this.#form = document.querySelector('.popup__form')
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
      this.#submitFormCallback(this.#getInputValues)
    })
  }

  close = () => {
    super.close()
    this.#form.reset()
  }
}
