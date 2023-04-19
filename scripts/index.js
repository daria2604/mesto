import { initialCards } from './initialCards.js'
import { Card } from './Card.js'
import { FormValidator, settings } from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

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
const inputTitle = addForm.elements.title
const inputLink = addForm.elements.link

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

function createCard(item) {
  return new Card(item, cardTemplate, handleCardClick).generateCard()
}

const popupWithImage = new PopupWithImage('.popup_type_image')

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

popupWithImage.setEventListeners()

// function handleAddCardFormSubmit(evt) {
//   const link = inputLink.value
//   const name = inputTitle.value
//   const newCard = { name, link }

//   addCard(newCard)
//   addForm.reset()
//   closePopup(addPopup)
// }

function enableValidation(config) {
  formList.forEach((form) => {
    const validator = new FormValidator(config, form)
    const formName = form.name

    formValidators[formName] = validator
    validator.enableValidation()
  })
}

enableValidation(settings)

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

editPopup.setEventListeners()

// const addPopup = new PopupWithForm('.popup_type_add', handleAddCardFormSubmit)

// addButton.addEventListener('click', () => {
//   // addForm.reset()
//   resetValidation(addForm)
//   addPopup.open()
// })

// addPopup.setEventListeners()

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    section.addItem(card)
  }
}, cardsContainer)

section.renderItems()
