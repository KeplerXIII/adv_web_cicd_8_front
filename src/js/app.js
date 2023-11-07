import config from '../../config'
import { ChatApi } from './components/ChatApi'

const checkBtn = document.querySelector('.check')
const chatApi = new ChatApi(`${config.protocol}://${config.host}:${config.port}/index`)

checkBtn.addEventListener('click', async (event) => {
  event.preventDefault()
  await chatApi.check()
})

const ws = new WebSocket(`${config.protoco_ws}://${config.host}:${config.port}/ws`)
const chatBox = document.querySelector('.chat-window')
const sendBtn = document.querySelector('.send-button')
const input = document.querySelector('.message-input')

sendBtn.addEventListener('click', () => {
  const message = input.value
  if (!message) return
  ws.send(message)
  input.value = ''
})

ws.addEventListener('open', (e) => {
  console.log(e)
  console.log('ws open')
})

ws.addEventListener('close', (e) => {
  console.log('ws close')
})

ws.addEventListener('error', (e) => {
  console.log('ws error')
})

ws.addEventListener('message', (e) => {
  console.log('ws message')

  const data = JSON.parse(e.data)
  const { chat: messages } = data
  messages.forEach(message => {
    chatBox.appendChild(document.createTextNode(message + '\n'))
    chatBox.scrollTop = chatBox.scrollHeight
  })
})
