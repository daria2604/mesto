export class Card {
  #element
  #name
  #link
  #template
  #handleCardClick
  #likeButton
  #deleteButton
  #cardImage

  constructor(data, template, { handleCardClick }) {
    this.#name = data.title
    this.#link = data.link
    this.#template = template
    this.#handleCardClick = handleCardClick
  }

  #getTemplate() {
    const blankCard = this.#template.content.querySelector('.card').cloneNode(true)

    return blankCard
  }

  #handleLikeButton() {
    this.#likeButton.classList.toggle('button__like_active')
  }

  #handleDeleteButton() {
    this.#element.remove()
  }

  #setEventListeners() {
    this.#likeButton.addEventListener('click', () => {
      this.#handleLikeButton()
    })

    this.#deleteButton.addEventListener('click', () => {
      this.#handleDeleteButton()
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

    this.#setEventListeners()

    return this.#element
  }
}
