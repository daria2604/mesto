import './index.css'
import { initialCards, cardTemplate, cardsContainer, profileName,
profileAbout, editButton, addButton, editForm, addForm,
inputName, inputAbout, formList, formValidators } from '../scripts/utils/constants.js'
import { FormValidator, settings } from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'

const cardTemplate = document.querySelector('#cardTemplate')
const cardsContainer = document.querySelector('.cards')

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const editButton = document.querySelector('.button_action_edit')
const editForm = document.forms['editForm']
const inputName = editForm.elements.name
const inputAbout = editForm.elements.about

const addButton = document.querySelector('.button_action_add')
const addForm = document.forms['addForm']

const formList = Array.from(document.querySelectorAll('.popup__form'))
const formValidators = {}

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileAbout
})

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
  userInfo.setUserInfo(data)
  editPopup.close()
  }
})

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    const card = createCard(data)
    cardList.addItem(card)
    addPopup.close()
  }
})

const popupWithImage = new PopupWithImage('.popup_type_image')

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, cardsContainer)

const defalutCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    defalutCards.addInitialCards(card)
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
  inputName.value = userInfo.getUserInfo().name
  inputAbout.value = userInfo.getUserInfo().about

  resetValidation(editForm)
  editPopup.open()
})

addButton.addEventListener('click', () => {
  resetValidation(addForm)
  addPopup.open()
})

editPopup.setEventListeners()
addPopup.setEventListeners()
popupWithImage.setEventListeners()

enableValidation(settings)

defalutCards.renderItems()
