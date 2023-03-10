const cardsContainer = document.querySelector('.cards')
const cardTemplate = document.querySelector('#cardTemplate').content

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.button_action_edit')
const closeEditPopupButton = editPopup.querySelector('.button_action_close')
const editForm = document.forms['editForm']
const inputName = editForm.elements.name
const inputAbout = editForm.elements.about

const addPopup = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.button_action_add')
const closeAddPopupButton = addPopup.querySelector('.button_action_close')
const addForm = document.forms['addForm']
const inputTitle = addForm.elements.title
const inputLink = addForm.elements.link

const imagePopup = document.querySelector('.popup_type_image')
const popupImage = imagePopup.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')
const closeImagePopupButton = imagePopup.querySelector('.button_action_close')

function popupOpen(popup) {
    popup.classList.add('popup_opened')
}

function popupClose(popup) {
  popup.classList.remove('popup_opened')
}

function createCard(card) {
  const blankCard = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = blankCard.querySelector('.card__title')
  cardTitle.textContent = card.name

  const cardImage = blankCard.querySelector('.card__image')
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', `Фотография ${card.name}`)

  const deleteButton = blankCard.querySelector('.button_action_delete')
  deleteButton.addEventListener('click', handlerDeleteButton)

  const likeButton = blankCard.querySelector('.button__like')
  likeButton.addEventListener('click', handlerLikeButton)

  cardImage.addEventListener('click', openFullImage)

  return blankCard
}

function addCard(card) {
  const newCard = createCard(card)
  cardsContainer.prepend(newCard)
}

function openFullImage(evt) {
  const image = evt.target
  const card = image.closest('.card')
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')

  popupImage.setAttribute('src', cardImage.src)
  popupImage.setAttribute('alt', cardImage.alt)
  popupCaption.textContent = cardTitle.textContent

  popupOpen(imagePopup)
}

closeImagePopupButton.addEventListener('click', closeImagePopup)

function closeImagePopup() {
  popupClose(imagePopup)
}

function handlerLikeButton(evt) {
  evt.target.classList.toggle('button__like_active')
}

function handlerDeleteButton(evt) {
  const button = evt.target;
  const card = button.closest('.card');
  card.remove();
}

function handlerAddCardFormSubmit(evt) {
  evt.preventDefault()
  const link = inputLink.value
  const name = inputTitle.value
  const newCard = { name, link }

  addCard(newCard)
  popupClose(addPopup)
  addForm.reset()
}

function handlerEditFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value

  popupClose(editPopup)
}

editButton.addEventListener('click', () => {
  popupOpen(editPopup)
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
})

closeEditPopupButton.addEventListener('click', () => {
  popupClose(editPopup)
} )

editForm.addEventListener('submit', handlerEditFormSubmit);

addButton.addEventListener('click', () => {
  popupOpen(addPopup)
})

closeAddPopupButton.addEventListener('click', () => {
  popupClose(addPopup)
})

addForm.addEventListener('submit', handlerAddCardFormSubmit)
