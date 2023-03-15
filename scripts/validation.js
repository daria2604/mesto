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

const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass, errorClass, inactiveSubmitButtonClass, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass, errorClass)
      toggleButtonState(submitButton, inactiveSubmitButtonClass, inputList)
    })
  })
}

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector)
  const inputList = form.querySelectorAll(config.inputSelector)
  const submitButton = form.querySelector(config.submitButtonSelector)

  setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, config.errorClass, config.inactiveSubmitButtonClass, submitButton)
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