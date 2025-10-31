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

  constructor({ placeholder = '' } = {}) {
    super()
    this.setAttr('placeholder', placeholder)
  }

  getValue() { return this.element.value }
}
