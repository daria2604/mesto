import { initialCards } from './initialCards.js'
import { Card } from './Card.js'
import { FormValidator, settings } from './FormValidator.js'

const popupList = document.querySelectorAll('.popup')
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

const imagePopup = document.querySelector('.popup_type_image')
const popupImage = imagePopup.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeOnEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeOnEsc)
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach(closePopup)
  }
}

function createCard(item) {
  return new Card(item, handleCardClick).generateCard()
}

function addCard(card) {
  const cardElement = createCard(card)
  cardsContainer.prepend(cardElement)
}

export function handleCardClick() {
  popupImage.src = this.link
  popupImage.alt = `Фотография ${this.name}`
  popupCaption.textContent = this.name

  openPopup(imagePopup)
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault()
  const link = inputLink.value
  const name = inputTitle.value
  const newCard = { name, link }

  addCard(newCard)
  addForm.reset()
  closePopup(addPopup)
}

function handleEditFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value

  closePopup(editPopup)
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if(evt.target.classList.contains('button_action_close')) {
      closePopup(popup)
    }
  })
})

editButton.addEventListener('click', () => {
  openPopup(editPopup)
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
})

editForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  openPopup(addPopup)
})

addForm.addEventListener('submit', handleAddCardFormSubmit)

new FormValidator(settings, editForm).enableValidation()
new FormValidator(settings, addForm).enableValidation()

initialCards.forEach((card) => {
  const cardElement = createCard(card)
  cardsContainer.append(cardElement)
})
