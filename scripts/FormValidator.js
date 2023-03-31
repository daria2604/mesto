export class FormValidator {
  #formSelector
  #inputSelector
  #errorClassTemplate
  #activeErrorClass
  #errorClass
  #submitButtonSelector
  #inactiveSubmitButtonClass
  #formElement
  #errorTextElement
  #inputList
  #formList
  #submitButton

  constructor(config, formElement) {
    this.#formSelector = config.formSelector
    this.#inputSelector = config.inputSelector
    this.#errorClassTemplate = config.errorClassTemplate
    this.#activeErrorClass = config.activeErrorClass
    this.#errorClass = config.errorClass
    this.#submitButtonSelector = config.submitButtonSelector
    this.#inactiveSubmitButtonClass = config.inactiveSubmitButtonClass
    this.#formElement = formElement
  }

  #showInputError(input) {
    this.#errorTextElement.textContent = input.validationMessage
    this.#errorTextElement.classList.add(this.#activeErrorClass)
  }

  #hideInputError() {
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
    this.#errorTextElement = this.#formElement.querySelector(`${this.#errorClassTemplate}${input.name}`)

    if(input.checkValidity()) {
      this.#hideInputError()
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
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector))
    this.#submitButton = this.#formElement.querySelector(this.#submitButtonSelector)

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
    this.#formList = Array.from(document.querySelectorAll(this.#formSelector))
    this.#formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
    })
    this.#setEventListeners()
  }
}

export const settings = {
  formSelector: '.popup__form',
  inputSelector:'.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_disabled'
}
