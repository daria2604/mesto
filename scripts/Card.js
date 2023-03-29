import { initialCards } from './initialCards.js'
import { handleCardClick } from './index.js'

export class Card {
  #element
  static #template = document.querySelector('#cardTemplate').content

  constructor(data, handleCardClick) {
    this.name = data.name
    this.link = data.link
    this.handleCardClick = handleCardClick
  }

  #getTemplate() {
    const blankCard = Card.#template.querySelector('.card').cloneNode(true)

    return blankCard
  }

  #handleLikeButton() {
    this.likeButton.classList.toggle('button__like_active')
  }

  #handleDeleteButton() {
    this.#element.remove()
  }

  #setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this.#handleLikeButton()
    })

    this.deleteButton.addEventListener('click', () => {
      this.#handleDeleteButton()
    })

    this.cardImage.addEventListener('click', () => {
      this.handleCardClick()
    } )
  }

  generateCard() {
    this.#element = this.#getTemplate()

    this.cardImage = this.#element.querySelector('.card__image')
    this.cardImage.src = this.link
    this.cardImage.alt = `Фотография ${this.name}`
    this.#element.querySelector('.card__title').textContent = this.name
    this.deleteButton = this.#element.querySelector('.button_action_delete')
    this.likeButton = this.#element.querySelector('.button__like')

    this.#setEventListeners()

    return this.#element
  }
}

initialCards.forEach((card) => {
  const newCard = new Card(card, handleCardClick)
  const cardElement = newCard.generateCard()
  document.querySelector('.cards').append(cardElement)
})
