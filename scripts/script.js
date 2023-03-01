const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = card.name;

  const cardImage = newCard.querySelector('.card__image');
  cardImage.setAttribute('src', card.link);

  const deleteButton = newCard.querySelector('.button_action_delete');
  deleteButton.addEventListener('click', handleDeleteButton);

  const likeButton = newCard.querySelector('.button_action_like');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_action_like_type_active');
  });

  cards.prepend(newCard);
}

initialCards.forEach(createCard);

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

function handleOpenEditBtn() {
  popupOpen(editPopup)
}

editButton.addEventListener('click', handleOpenEditBtn)

closeEditPopupButton.addEventListener('click', () => {
  popupClose(editPopup)
} )

editForm.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(evt) {
  evt.preventDefault();
  const editForm = evt.target;
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  popupClose(popup);
}


// ADD POPUP
const addPopup = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.button_action_add')
const closeAddPopupButton = addPopup.querySelector('.button_action_close')
const addForm = document.forms['addFrom']
const inputTitle = editForm.querySelector('.popup__input_type_title')
const inputLink = editForm.querySelector('.popup__input_type_link')

addButton.addEventListener('click', () => {
  popupOpen(addPopup)
})

closeAddPopupButton.addEventListener('click', () => {
  popupClose(addPopup)
})
