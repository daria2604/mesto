import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #image
  #caption

  constructor(popupSelector) {
    super(popupSelector)
    this.#image = this.popup.querySelector('.popup__image')
    this.#caption = this.popup.querySelector('.popup__caption')
  }

  open(name, link) {
    this.#image.src = link
    this.#image.alt = `Фотография ${name}`
    this.#caption.textContent = name
    super.open()
  }

  close = () => {
    super.close()
  }
}
