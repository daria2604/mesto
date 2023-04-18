export default class Section {
  #container
  #items
  #renderer

  constructor({ items, renderer }, containerSelector) {
    this.#items = items
    this.#renderer = renderer
    this.#container = containerSelector
  }

  renderItems() {
    this.#items.forEach((item) => {
      this.#renderer(item)
    })
  }

  addItem(element) {
    this.#container.append(element)
  }
}
