import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  #popup
  #image
  #caption

  constructor(popupSelector) {
    super(popupSelector)
    this.#image = this.#popup.querySelector('.popup__image')
    this.#caption = this.#popup.querySelector('.popup__caption')
  }

  open() {
    super.open()
    this.#image.src = this.link
    this.#image.alt = `Фотография ${this.name}`
    this.#caption.textContent = this.name
  }
}
