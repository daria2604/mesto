export class Section {
  #container
  #renderedItems
  #renderer

  constructor({ data, renderer }, containerSelector) {
    this.#renderedItems = data
    this.#renderer = renderer
    this.#container = containerSelector
  }

  renderItems() {
    this.#renderedItems.forEach((item) => {
      this.#renderer(item)
    })
  }

  addItem(element) {
    this.#container.append(element)
  }
}
