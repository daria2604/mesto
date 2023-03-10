const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage
  errorTextElement.classList.add(activeErrorClass)
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.textContent = ''
  errorTextElement.classList.remove(activeErrorClass)
}

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass)
  submitButton.disabled = true
}

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass)
  submitButton.disabled = false
}

const isValid = (input, errorCalssTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorCalssTemplate}${input.name}`)
  if (input.validity.valid) {
    hideInputError(errorTextElement)
  } else {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass)
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid )
}

const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass)
  } else {
    enableButton(submitButton, inactiveButtonClass)
  }
}

const setEventListeners = (form, inputList, errorCalssTemplate, activeErrorClass, inactiveButtonClass, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input, errorCalssTemplate, activeErrorClass)
      toggleButtonState(submitButton, inactiveButtonClass, inputList)
    })
  })
}

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector)
  const inputList = form.querySelectorAll(config.inputSelector)
  const submitButton = form.querySelector(config.submitButtonSelector)

  setEventListeners(form, inputList, config.errorCalssTemplate, config.activeErrorClass, config.inactiveButtonClass, submitButton)
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorCalssTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled'
})
