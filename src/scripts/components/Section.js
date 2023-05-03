export default class Section {
  #container
  #renderer

  constructor({ renderer }, containerSelector) {
    this.#renderer = renderer
    this.#container = containerSelector
  }

  renderItems(items) {
    items.forEach((item) => {
      this.#renderer(item)
    })
  }

  addItem(element) {
    this.#container.prepend(element)
  }
}
