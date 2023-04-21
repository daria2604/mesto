export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const cardTemplate = document.querySelector('#cardTemplate')
export const cardsContainer = document.querySelector('.cards')
export const profileName = document.querySelector('.profile__name')
export const profileAbout = document.querySelector('.profile__about')
export const editButton = document.querySelector('.button_action_edit')
export const editForm = document.forms['editForm']
export const inputName = editForm.elements.name
export const inputAbout = editForm.elements.about
export const addButton = document.querySelector('.button_action_add')
export const addForm = document.forms['addForm']
export const formList = Array.from(document.querySelectorAll('.popup__form'))
export const formValidators = {}
