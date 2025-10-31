import { HTML } from './libs/afrontend/index.js'
import { GoogleGenAI } from './libs/genai/index.js' // '@google/genai'
import { ButtonComponent, InputComponent } from './components/index.js'

import { MODEL } from './config.js'

class SuperPage extends HTML { }

export class Page extends SuperPage {
  ai = null
  el = {
    gemini_api_key: new InputComponent({ placeholder: 'GEMINI API KEY' }),
    message: new InputComponent({ placeholder: 'write your message...' }),
    messages: new HTML(),
  }

  onCreate() {
    this.append(this.getGeminiApiKeyInput())
    this.append(this.getCreateAgentButton())
    this.append(this.getMessagesInput())
    this.append(this.getSendMessageButton())
    this.append(this.getMessagesComponent())
  }

  getGeminiApiKeyInput() {
    return this.el.gemini_api_key
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
    this.ai = new GoogleGenAI({ apiKey: this.getGeminiApiKey() });
  }

  async onSendMessageButtonClick() {
    const question = this.el.message.getValue()
    this.addMessage({ text: question, name: 'user' })
    const answer = await this.sendMessage({ text: question })
    this.addMessage({ text: answer, name: 'ai' })
  }

  addMessage({ text } = {}) {
    const message = new HTML()
    message.setText(text)
    this.el.messages.append(message)
  }

  async sendMessage({ text } = {}) {
    const response = await this.ai.models.generateContent({ model: MODEL, contents: text });
    console.log({ response })
    return response.text
  }


  getGeminiApiKey() {
    return this.el.gemini_api_key.getValue()
  }
}
