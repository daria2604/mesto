const popupList = document.querySelectorAll('.popup')
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

function closeOnOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    popupList.forEach(closePopup)
  }
}

function createCard(card) {
  const blankCard = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = blankCard.querySelector('.card__title')
  cardTitle.textContent = card.name

  const cardImage = blankCard.querySelector('.card__image')
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', `Фотография ${card.name}`)

  const deleteButton = blankCard.querySelector('.button_action_delete')
  deleteButton.addEventListener('click', handleDeleteButton)

  const likeButton = blankCard.querySelector('.button__like')
  likeButton.addEventListener('click', handleLikeButton)

  cardImage.addEventListener('click', () => handleCardClick(card))

  return blankCard
}

function addCard(card) {
  const newCard = createCard(card)
  cardsContainer.prepend(newCard)
}

function handleCardClick(card) {
  popupImage.setAttribute('src', card.link)
  popupImage.setAttribute('alt', `Фотография ${card.name}`)
  popupCaption.textContent = card.name

  openPopup(imagePopup)
}

function closeImagePopup() {
  closePopup(imagePopup)
}

function handleLikeButton(evt) {
  evt.target.classList.toggle('button__like_active')
}

function handleDeleteButton(evt) {
  const button = evt.target;
  const card = button.closest('.card');
  card.remove();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault()
  const link = inputLink.value
  const name = inputTitle.value
  const newCard = { name, link }

  addCard(newCard)
  addForm.reset()
  evt.submitter.classList.add('popup__submit-button_disabled')
  evt.submitter.disabled = true
  closePopup(addPopup)
}

function handleEditFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value

  closePopup(editPopup)
}

editButton.addEventListener('click', () => {
  openPopup(editPopup)
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
})

closeEditPopupButton.addEventListener('click', () => {
  closePopup(editPopup)
} )

editForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  openPopup(addPopup)
})

closeAddPopupButton.addEventListener('click', () => {
  closePopup(addPopup)
})

addForm.addEventListener('submit', handleAddCardFormSubmit)

closeImagePopupButton.addEventListener('click', closeImagePopup)

editPopup.addEventListener('mousedown', closeOnOverlay)
addPopup.addEventListener('mousedown', closeOnOverlay)
imagePopup.addEventListener('mousedown', closeOnOverlay)
