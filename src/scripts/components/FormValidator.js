export class FormValidator {
  #inputSelector
  #errorClassTemplate
  #activeErrorClass
  #errorClass
  #submitButtonSelector
  #inactiveSubmitButtonClass
  #formElement
  #errorTextElement
  #inputList
  #submitButton

  constructor(config, formElement) {
    this.#inputSelector = config.inputSelector
    this.#errorClassTemplate = config.errorClassTemplate
    this.#activeErrorClass = config.activeErrorClass
    this.#errorClass = config.errorClass
    this.#submitButtonSelector = config.submitButtonSelector
    this.#inactiveSubmitButtonClass = config.inactiveSubmitButtonClass
    this.#formElement = formElement
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector))
    this.#submitButton = this.#formElement.querySelector(this.#submitButtonSelector)
  }


  #showInputError(input) {
    this.#errorTextElement = this.#formElement.querySelector(`${this.#errorClassTemplate}${input.name}`)
    this.#errorTextElement.textContent = input.validationMessage
    this.#errorTextElement.classList.add(this.#activeErrorClass)
  }

  #hideInputError(input) {
    this.#errorTextElement = this.#formElement.querySelector(`${this.#errorClassTemplate}${input.name}`)
    this.#errorTextElement.textContent = ''
    this.#errorTextElement.classList.remove(this.#activeErrorClass)
  }

  #disableButton() {
    this.#submitButton.classList.add(this.#inactiveSubmitButtonClass)
    this.#submitButton.disabled = true
  }

  #enableButton() {
    this.#submitButton.classList.remove(this.#inactiveSubmitButtonClass)
    this.#submitButton.disabled = false
  }

  #checkInputValidity(input) {
    if(input.checkValidity()) {
      this.#hideInputError(input)
      input.classList.remove(this.#errorClass)
    } else {
      this.#showInputError(input)
      input.classList.add(this.#errorClass)
    }
  }

  #hasInvalidInput() {
    return Array.from(this.#inputList).some((input) => !input.validity.valid)
  }

  #toggleButtonState() {
    this.#hasInvalidInput(this.#inputList) ? this.#disableButton() : this.#enableButton()
  }

  #setEventListeners() {
    this.#inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input)
        this.#toggleButtonState()
      })
    })

    this.#formElement.addEventListener('reset', () => {
      this.#disableButton()
    })

    this.#toggleButtonState()
  }

  enableValidation() {
    this.#formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this.#setEventListeners()
  }

  resetValidation() {
    this.#toggleButtonState()
    this.#inputList.forEach((input) => {
      this.#hideInputError(input)
      input.classList.remove(this.#errorClass)
    })
  }
}

export const settings = {
  inputSelector:'.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_disabled'
}
