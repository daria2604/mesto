const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');

const editButton = document.querySelector('.button_action_edit');
const closeButton = document.querySelector('.button_action_close');
const addButton = document.querySelector('.button_action_add');

const editForm = document.forms['editForm'];
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');

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

function popupOpen() {
  popup.setAttribute('disabled', true);
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpen);

function popupClose() {
  popup.removeAttribute('disabled', true);
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClose);

function handlerFormSubmit (evt) {
  evt.preventDefault();

  nameInput.getAttribute('value');
  aboutInput.getAttribute('value');

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  popupClose();
}

editForm.addEventListener('submit', handlerFormSubmit);

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

  cards.append(newCard);
}
initialCards.forEach(createCard);

function handleDeleteButton(evt) {
  const button = evt.target;
  const card = button.closest('.card');
  card.remove();
}
