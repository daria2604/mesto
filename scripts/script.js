let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_action_edit');
let closeButton = document.querySelector('.button_action_close');

let editForm = document.forms['editForm'];
let nameInput = editForm.querySelector('.popup__input_type_name');
let aboutInput = editForm.querySelector('.popup__input_type_about');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

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
