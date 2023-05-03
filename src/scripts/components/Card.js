export default class Card {
  #element
  #name
  #link
  #template
  #userId
  #ownerId
  #handleCardClick
  #handleDeleteClick
  #likeButton
  #deleteButton
  #cardImage

  constructor(data, template, userId, { handleCardClick, handleDeleteClick }) {
    this.#name = data.name
    this.#link = data.link
    this.#template = template
    this.#userId = userId
    this.#ownerId = data.owner._id
    this.#handleCardClick = handleCardClick
    this.#handleDeleteClick = handleDeleteClick
  }

  #getTemplate() {
    const blankCard = this.#template.content.querySelector('.card').cloneNode(true)

    return blankCard
  }

  #handleLikeButton() {
    this.#likeButton.classList.toggle('button__like_active')
  }

  deleteCard() {
    this.#element.remove()
    this.#element = null
  }

  #setEventListeners() {
    this.#likeButton.addEventListener('click', () => {
      this.#handleLikeButton()
    })

    this.#deleteButton.addEventListener('click', () => {
      this.#handleDeleteClick()
    })

    this.#cardImage.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link)
    } )
  }

  generateCard() {
    this.#element = this.#getTemplate()

    this.#cardImage = this.#element.querySelector('.card__image')
    this.#cardImage.src = this.#link
    this.#cardImage.alt = `Фотография ${this.#name}`
    this.#element.querySelector('.card__title').textContent = this.#name
    this.#deleteButton = this.#element.querySelector('.button_action_delete')
    this.#likeButton = this.#element.querySelector('.button__like')

    if(this.#userId !== this.#ownerId) {
      this.#deleteButton.remove()
    }

    this.#setEventListeners()

    return this.#element
  }
}
