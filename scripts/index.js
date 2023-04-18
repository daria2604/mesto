import { initialCards } from './initialCards.js'
import { Card } from './Card.js'
import { FormValidator, settings } from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

const cardTemplate = document.querySelector('#cardTemplate')
const cardsContainer = document.querySelector('.cards')

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.button_action_edit')
const editForm = document.forms['editForm']
const inputName = editForm.elements.name
const inputAbout = editForm.elements.about

const addPopup = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.button_action_add')
const addForm = document.forms['addForm']
const inputTitle = addForm.elements.title
const inputLink = addForm.elements.link

const formList = Array.from(document.querySelectorAll('.popup__form'))
const formValidators = {}

function createCard(item) {
  return new Card(item, cardTemplate, handleCardClick).generateCard()
}

// function addCard(card) {
//   const cardElement = createCard(card)
//   cardsContainer.prepend(cardElement)
// }
const popupWithImage = new PopupWithImage('.popup_type_image')

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

popupWithImage.setEventListeners()

function handleAddCardFormSubmit(evt) {
  const link = inputLink.value
  const name = inputTitle.value
  const newCard = { name, link }

  addCard(newCard)
  addForm.reset()
  closePopup(addPopup)
}

function handleEditFormSubmit() {
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value
  edit.close()
  // closePopup(editPopup)
}

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
  // openPopup(editPopup)
  // inputName.value = profileName.textContent
  // inputAbout.value = profileAbout.textContent

  resetValidation(editForm)
  edit.setEventListeners()
  edit.open()
})

const edit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit)

addButton.addEventListener('click', () => {
  // addForm.reset()
  resetValidation(addForm)
  add.setEventListeners()
  add.open()
})

const add = new PopupWithForm('.popup_type_add', handleAddCardFormSubmit)

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    section.addItem(card)
  }
}, cardsContainer)

section.renderItems()
