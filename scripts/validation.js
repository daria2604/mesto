const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage
  errorTextElement.classList.add(activeErrorClass)
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.textContent = ''
  errorTextElement.classList.remove(activeErrorClass)
}

const disableButton = (submitButton, inactiveSubmitButtonClass) => {
  submitButton.classList.add(inactiveSubmitButtonClass)
  submitButton.disabled = true
}

const enableButton = (submitButton, inactiveSubmitButtonClass) => {
  submitButton.classList.remove(inactiveSubmitButtonClass)
  submitButton.disabled = false
}

const checkInputValidity = (input, errorClassTemplate, activeErrorClass, errorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`)
  console.log(errorTextElement)

  if(!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass)
    input.classList.add(errorClass)
  } else {
    hideInputError(errorTextElement, activeErrorClass)
    input.classList.remove(errorClass)
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid)
}

const toggleButtonState = (submitButton, inactiveSubmitButtonClass, inputList) => {
  if(hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveSubmitButtonClass, inputList)
  } else {
    enableButton(submitButton, inactiveSubmitButtonClass, inputList)
  }
  console.log(submitButton)
}

const setEventListeners = (inputSelector, form, errorClassTemplate, activeErrorClass, errorClass, inactiveSubmitButtonClass, submitButtonSelector) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector))
  const submitButton = form.querySelector(submitButtonSelector)

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass, errorClass)
      toggleButtonState(submitButton, inactiveSubmitButtonClass, inputList)
    })
  })

  toggleButtonState(submitButton, inactiveSubmitButtonClass, inputList)
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(config.inputSelector, form, config.errorClassTemplate, config.activeErrorClass, config.errorClass, config.inactiveSubmitButtonClass, config.submitButtonSelector)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector:'.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  inactiveSubmitButtonClass: 'popup__submit-button_disabled'
})
