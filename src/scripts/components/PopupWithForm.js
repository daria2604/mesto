import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleFormSubmit
  #form
  #inputList
  #inputValues
  #submitButton

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this.#handleFormSubmit = handleFormSubmit
    this.#form = this.popup.querySelector('.popup__form')
    this.#inputList = this.popup.querySelectorAll('.popup__input')
    this.#submitButton = this.popup.querySelector('.popup__submit-button')
  }

  #getInputValues() {
    this.#inputValues = {}
    this.#inputList.forEach((input) => {
      this.#inputValues[input.name] = input.value
    })
    return this.#inputValues
  }

  setInputValues(data) {
    return this.#inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this.#submitButton.textContent
      
      this.#submitButton.textContent = 'Сохранение...'
      this.#handleFormSubmit(this.#getInputValues())
        .then(() => this.close())
        .finally(() => {
          this.#submitButton.textContent = initialText
        })
    })
  }

  close = () => {
    super.close()
    this.#form.reset()
  }
}
