export default class Card {
  #element
  #template
  #name
  #link
  #likes
  #userId
  #ownerId
  #likesCounter
  #handleCardClick
  #handleDeleteClick
  #handleLikeClick
  #likeButton
  #deleteButton
  #cardImage


  constructor(data, template, userId, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this.#name = data.name
    this.#link = data.link
    this.#likes = data.likes
    this.#template = template
    this.cardId = data._id
    this.#userId = userId
    this.#ownerId = data.owner._id
    this.#handleCardClick = handleCardClick
    this.#handleDeleteClick = handleDeleteClick
    this.#handleLikeClick = handleLikeClick
  }

  #getTemplate() {
    const blankCard = this.#template.content.querySelector('.card').cloneNode(true)

    return blankCard
  }

  deleteCard() {
    this.#element.remove()
    this.#element = null
  }

  setLike() {
    this.#likeButton.classList.add('button__like_active')
  }

  removeLike() {
    this.#likeButton.classList.remove('button__like_active')
  }

  #likeCard() {
    if(this.isLiked()) {
      this.setLike()
    } else {
      this.removeLike()
    }
  }

  isLiked() {
    return this.#likes.some((someUser) => someUser._id === this.#userId)
  }

  getLikesCounter(data) {
    this.#likesCounter.textContent = data.likes.length
    this.#likes = data.likes
  }

  #setEventListeners() {
    this.#likeButton.addEventListener('click', () => {
      this.#handleLikeClick(this.cardId)
    })

    this.#deleteButton.addEventListener('click', () => {
      this.#handleDeleteClick(this.cardId)
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
    this.#likesCounter = this.#element.querySelector('.card__like_counter')
    this.#likesCounter.textContent = this.#likes.length

    if(this.#userId !== this.#ownerId) {
      this.#deleteButton.remove()
    }

    this.#likeCard()
    this.#setEventListeners()

    return this.#element
  }
}
