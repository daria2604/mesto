export const cardTemplate = document.querySelector('#cardTemplate')
export const cardsContainer = document.querySelector('.cards')
export const profileName = document.querySelector('.profile__name')
export const profileAbout = document.querySelector('.profile__about')
export const editButton = document.querySelector('.button_action_edit')
export const editForm = document.forms['editForm']
export const editFormSubmitButton = editForm.querySelector('.popup__submit-button_type_edit')
export const inputName = editForm.elements.name
export const inputAbout = editForm.elements.about
export const addButton = document.querySelector('.button_action_add')
export const addForm = document.forms['addForm']
export const formList = Array.from(document.querySelectorAll('.popup__form'))
export const formValidators = {}
