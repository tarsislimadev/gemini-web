import { HTML } from './libs/afrontend/index.js'
import { GoogleGenAI } from './libs/genai/index.js' // '@google/genai'
import { SelectComponent, ButtonComponent, InputComponent } from './components/index.js'

import { mapArray } from './functions.js'

import { MODELS_LIST } from './config.js'

class SuperPage extends HTML { }

export class Page extends SuperPage {
  ai = null
  el = {
    models: new SelectComponent({ options: mapArray(MODELS_LIST) }),
    gemini_api_key: new InputComponent({ type: 'password', placeholder: 'GEMINI API KEY' }),
    message: new InputComponent({ placeholder: 'write your message...' }),
    messages: new HTML(),
  }

  onCreate() {
    this.append(this.getGeminiApiKeyInput())
    this.append(this.getModelSelect())
    this.append(this.getCreateAgentButton())
    this.append(this.getMessagesInput())
    this.append(this.getSendMessageButton())
    this.append(this.getMessagesComponent())
  }

  getGeminiApiKeyInput() {
    return this.el.gemini_api_key
  }

  getModelSelect() {
    return this.el.models
  }

  getCreateAgentButton() {
    return new ButtonComponent({
      text: 'create agent',
      click: () => this.onCreateAgentButtonClick()
    })
  }

  getMessagesInput() {
    return this.el.message
  }

  getSendMessageButton() {
    return new ButtonComponent({
      text: 'send messsage',
      click: () => this.onSendMessageButtonClick()
    })
  }

  getMessagesComponent() {
    return this.el.messages
  }

  onCreateAgentButtonClick() {
    this.ai = new GoogleGenAI({
      apiKey: this.getGeminiApiKey()
    });
  }

  async onSendMessageButtonClick() {
    const question = this.el.message.getValue()
    this.addMessage({ text: question, name: 'user' })
    const loading = this.addMessage({ text: 'loading', name: 'system' })
    this.sendMessage({ text: question })
      .then((answer) => this.addMessage({ text: answer, name: 'ai' }))
      .catch((err) => this.addMessage({ text: err.message, name: 'ai-error' }))
      .finally(() => loading.clear())
  }

  addMessage({ text, name = 'app' } = {}) {
    const message = new HTML()
    message.setText(`${name}: ${text}`)
    this.el.messages.append(message)
    return message
  }

  async sendMessage({ text } = {}) {
    const response = await this.ai.models.generateContent({ model: this.getModelName(), contents: text });
    console.log({ response })
    return response.text
  }

  getModelName() {
    return this.el.models.getValue()
  }

  getGeminiApiKey() {
    return this.el.gemini_api_key.getValue()
  }
}
