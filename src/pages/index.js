import './index.css'
import { cardTemplate, cardsContainer, profileName,
profileAbout, editButton, editFormSubmitButton, addButton, editForm, addForm,
inputName, inputAbout, avatarButton, avatarForm, addFormSubmitButton, formList, formValidators } from '../scripts/utils/constants.js'
import { FormValidator, settings } from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '65b7fcf6-b316-4d1e-9510-010044d65d75',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileAbout
})

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (value) => {
    editFormSubmitButton.textContent = 'Сохранение...'
    api.updateUserInfo(value)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => {
      editPopup.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      editFormSubmitButton.textContent = 'Сохранить'
    })
  }
})

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (value) => {
    addFormSubmitButton.textContent = 'Сохранение...'
    api.addCard(value, userInfo.getUserId())
    .then((data) => {
      const card = createCard(data)
      section.addItem(card)
    })
    .then(() => {
      addPopup.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      addFormSubmitButton.textContent = 'Сохранить'
    })
  }
})

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: () => {

  }
})

const popupWithImage = new PopupWithImage('.popup_type_image')

const section = new Section({
  renderer: (item) => {
    const card = createCard(item)
    section.addItem(card)
  }
}, cardsContainer)

const createCard = (data) => {
  const card = new Card(data, cardTemplate, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    }
  })
  return card.generateCard()
}

function enableValidation(config) {
  formList.forEach((form) => {
    const validator = new FormValidator(config, form)
    const formName = form.name

    formValidators[formName] = validator
    validator.enableValidation()
  })
}

function resetValidation(form) {
  const validator = formValidators[form.name]
  validator.resetValidation()
}

editButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo()
  inputName.value = user.name
  inputAbout.value = user.about

  resetValidation(editForm)
  editPopup.open()
})

addButton.addEventListener('click', () => {
  resetValidation(addForm)
  addPopup.open()
})

avatarButton.addEventListener('click', () => {
  resetValidation(avatarForm)
  avatarPopup.open()
})

editPopup.setEventListeners()
addPopup.setEventListeners()
avatarPopup.setEventListeners()
popupWithImage.setEventListeners()

enableValidation(settings)

api.getInitialCards().then((cards) => {
  section.renderItems(cards)
})

api.getUserInfo().then((data)=> {
  userInfo.setUserInfo(data)
})
