let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button__edit');
let closeButton = document.querySelector('.popup__close-icon');

let editForm = popup.querySelector('.popup__form');
let nameInput = editForm.querySelector('.popup__input_name');
let aboutInput = editForm.querySelector('.popup__input_about');
let saveButton = editForm.querySelector('.popup__submit-button');

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

  let profileName = document.querySelector('.profile__name');
  let profileAbout = document.querySelector('.profile__about');

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

editForm.addEventListener('submit', handlerFormSubmit);
saveButton.addEventListener('click', popupClose);
