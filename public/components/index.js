import { HTML } from '../libs/afrontend/index.js'

export class ButtonComponent extends HTML {
  getTagName() { return 'button' }

  getName() { return 'button' }

  constructor({ text, click = () => { } } = {}) {
    super()
    this.setText(text)
    this.addEventListener('click', () => click())
  }
}

export class InputComponent extends HTML {
  getTagName() { return 'input' }

  getName() { return 'input' }

  constructor({ type = 'text', placeholder = '' } = {}) {
    super()
    this.setAttr('type', type)
    this.setAttr('placeholder', placeholder)
  }

  getValue() { return this.element.value }
}

export class SelectComponent extends HTML {
  getTagName() { return 'select' }

  getName() { return 'select' }

  constructor({ options = [] } = {}) {
    super()
    this.options = options
  }

  onCreate() {
    this.options?.map(([key, value]) => this.append(new Option(key, value)))
  }

  getValue() {
    return this.element.value
  }
}

class Option extends HTML {
  getTagName() { return 'option' }

  getName() { return 'option' }

  constructor(key, value) {
    super()
    this.setAttr('value', key)
    this.setText(value)
  }
}
