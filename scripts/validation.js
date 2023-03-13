const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage
  errorTextElement.classList.add(activeErrorClass)
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.textContent = ''
  errorTextElement.classList.remove(activeErrorClass)
}

const disableButton = (submitButtonList, inactiveButtonClass) => {
  submitButtonList.forEach((submitButton) => {
    submitButton.classList.add(inactiveButtonClass)
    submitButton.disabled = true
  })
}

const enableButton = (submitButtonList, inactiveButtonClass) => {
  submitButtonList.forEach((submitButton) => {
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false
  })
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

const toggleButtonState = (submitButtonList, inactiveButtonClass, inputList) => {
  if (!hasInvalidInput(inputList)) {
    enableButton(submitButtonList, inactiveButtonClass)
  } else {
    disableButton(submitButtonList, inactiveButtonClass)
  }
}

const setEventListeners = (formList, inputList, errorCalssTemplate, activeErrorClass, inactiveButtonClass, submitButtonList) => {
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
  })

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input, errorCalssTemplate, activeErrorClass)
      toggleButtonState(submitButtonList, inactiveButtonClass, inputList)
    })
  })
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector)
  const inputList = document.querySelectorAll(config.inputSelector)
  const submitButtonList = document.querySelectorAll(config.submitButtonSelector)

  setEventListeners(formList, inputList, config.errorCalssTemplate, config.activeErrorClass, config.inactiveButtonClass, submitButtonList)
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorCalssTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled'
})
