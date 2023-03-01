const popup = document.querySelector('.popup')
const cards = document.querySelector('.cards')

const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

const imagePopup = document.querySelector('.popup_type_image')
const popupImage = imagePopup.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')
const closeImagePopupButton = imagePopup.querySelector('.button_action_close')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpen(popup) {
    popup.classList.add('popup_opened')
}

function popupClose(popup) {
    popup.classList.remove('popup_opened')
}

function createCard(card) {
  const cardTemplate = document.querySelector('#cardTemplate').content.cloneNode(true)
  const title = cardTemplate.querySelector('.card__title')
  title.textContent = card.name

  const image = cardTemplate.querySelector('.card__image')
  image.setAttribute('src', card.link)
  image.setAttribute('alt', `Фотография ${card.name}`)

  const deleteButton = cardTemplate.querySelector('.button_action_delete')
  deleteButton.addEventListener('click', handleDeleteButton)

  const likeButton = cardTemplate.querySelector('.button_action_like')
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_action_like_type_active')
  })

  image.addEventListener('click', () => {
    popupOpen(imagePopup)
  })

  closeImagePopupButton.addEventListener('click', () => {
    popupClose(imagePopup)
  })

  cards.prepend(cardTemplate)
}

initialCards.forEach(createCard)

function handleDeleteButton(evt) {
  const button = evt.target;
  const card = button.closest('.card');
  card.remove();
}

// EDIT POPUP
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.button_action_edit')
const closeEditPopupButton = editPopup.querySelector('.button_action_close')
const editForm = document.forms['editForm']
const inputName = editForm.querySelector('.popup__input_type_name')
const inputAbout = editForm.querySelector('.popup__input_type_about')

editButton.addEventListener('click', () => {
  popupOpen(editPopup)
})

closeEditPopupButton.addEventListener('click', () => {
  popupClose(editPopup)
} )

editForm.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value

  popupClose(popup)
}


// ADD POPUP
const addPopup = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.button_action_add')
const closeAddPopupButton = addPopup.querySelector('.button_action_close')
const addForm = document.forms['addForm']
const inputTitle = addForm.querySelector('.popup__input_type_title')
const inputLink = addForm.querySelector('.popup__input_type_link')

addButton.addEventListener('click', () => {
  popupOpen(addPopup)
})

closeAddPopupButton.addEventListener('click', () => {
  popupClose(addPopup)
})

addForm.addEventListener('submit', handleAddCardButton)

function handleAddCardButton(evt) {
  evt.preventDefault()
  const form = evt.traget
  const link = inputLink.value
  const name = inputTitle.value

  const newCard = { name, link }

  createCard(newCard)
  popupClose(addPopup)
}
