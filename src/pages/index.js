import './index.css'
import {
  cardTemplate,
  cardsContainer,
  editButton,
  addButton,
  avatarButton,
  confirmButton,
  editForm,
  addForm,
  avatarForm,
  formList,
  formValidators } from '../scripts/utils/constants.js'
import { FormValidator, settings } from '../scripts/components/FormValidator.js'
import Card from '../scripts/components/Card.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '65b7fcf6-b316-4d1e-9510-010044d65d75',
    'Content-Type': 'application/json'
  }
})

let userId

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
})

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (value) => {
    return api.updateUserInfo(value)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }
})

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (value) => {
    return api.addCard(value)
    .then((data) => {
      const card = createCard(data)
      section.addItem(card)
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    return api.updateAvatar(data)
    .then((avatar) => {
      userInfo.setAvatar(avatar)
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

const deleteCardPopup = new PopupWithConfirmation('.popup_type_confirm')

const popupWithImage = new PopupWithImage('.popup_type_image')

const section = new Section({
  renderer: (item) => {
    const card = createCard(item)
    section.addItem(card)
  }
}, cardsContainer)

const createCard = (data) => {
  const card = new Card(data, cardTemplate, userId, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    },
    handleDeleteClick: (cardId) => {
      deleteCardPopup.open()
      confirmButton.textContent = 'Да'
      deleteCardPopup.handleConfirm(() => {
        api.deleteCard(cardId)
        .then(() => {
          card.deleteCard()
        })
        .then(() => {
          deleteCardPopup.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          confirmButton.textContent = 'Удаление...'
        })
      })
    },
    handleLikeClick: (cardId) => {
      if(card.isLiked()) {
        api.unlikeCard(cardId)
        .then((data) => {
          card.removeLike()
          card.getLikesCounter(data)
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        api.likeCard(cardId)
        .then((data) => {
          card.setLike()
          card.getLikesCounter(data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  })

  return card.generateCard()
}

function enableValidation(config) {
  formList.forEach((form) => {
    const validator = new FormValidator(config, form)
    const formName = form.name

    formValidators[formName] = validator
    validator.enableValidation()
  })
}

function resetValidation(form) {
  const validator = formValidators[form.name]
  validator.resetValidation()
}

editButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo()
  editPopup.setInputValues(user)

  resetValidation(editForm)
  editPopup.open()
})

addButton.addEventListener('click', () => {
  resetValidation(addForm)
  addPopup.open()
})

avatarButton.addEventListener('click', () => {
  resetValidation(avatarForm)
  avatarPopup.open()
})

editPopup.setEventListeners()
addPopup.setEventListeners()
avatarPopup.setEventListeners()
popupWithImage.setEventListeners()
deleteCardPopup.setEventListeners()

enableValidation(settings)

api.getInitialInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    userInfo.setAvatar(userData)
    section.renderItems(cards.reverse())
  })
  .catch((err) => {
    console.log(err)
  })
