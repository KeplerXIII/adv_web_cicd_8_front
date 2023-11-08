import config from '../../config'
import { UserAPI } from './components/userAPI'

const userAPI = new UserAPI(`${config.protocol}://${config.host}:${config.port}/users`)
const ws = new WebSocket(`${config.protoco_ws}://${config.host}:${config.port}/ws`)

const chatBox = document.querySelector('.chat-window')
const sendMessageBtn = document.querySelector('.send-message-button')
const inputMessage = document.querySelector('.message-input')
const userLits = document.querySelector('.user-list')

const inputName = document.querySelector('.name-input')
const sendNameBtn = document.querySelector('.send-name-button')
const nameBox = document.querySelector('.name-container')

let name = ''
let selfName = ''

sendNameBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  name = inputName.value
  if (name.length < 3 || name.length > 12) {
    inputName.value = ''
    inputName.placeholder = 'Имя может быть >3 и <12'
    return
  }
  if (await userAPI.addUser(name) === 'OK' && ws.OPEN) {
    ws.send(JSON.stringify({ name, message: 'Вошел в чат' }))
    nameBox.classList.add('hidden')
    selfName = name
  } else {
    inputName.value = ''
    inputName.placeholder = 'Имя занято'
  }
})

sendMessageBtn.addEventListener('click', () => {
  const message = inputMessage.value
  if (!message) return
  ws.send(JSON.stringify({ name, message }))
  inputMessage.value = ''
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

  const { type } = data
  if (type === 'msg') {
    const { name, message } = data
    if (message === 'Вошел в чат') {
      chatBox.appendChild(document.createTextNode(`${name}: ${message}` + '\n'))
      userLits.appendChild(document.createTextNode(`${name}` + '\n'))
      chatBox.scrollTop = chatBox.scrollHeight
      return
    }
    if (name === selfName) {
      chatBox.appendChild(document.createTextNode(`Вы: ${message}` + '\n'))
      chatBox.scrollTop = chatBox.scrollHeight
    } else {
      chatBox.appendChild(document.createTextNode(`${name}: ${message}` + '\n'))
      chatBox.scrollTop = chatBox.scrollHeight
    }
  }

  if (type === 'dump') {
    const { messages, users } = data
    messages.forEach(elem => {
      const { name, message } = elem
      chatBox.appendChild(document.createTextNode(`${name}: ${message}` + '\n'))
      chatBox.scrollTop = chatBox.scrollHeight
    })

    users.forEach(elem => {
      const { name } = elem
      userLits.appendChild(document.createTextNode(`${name}` + '\n'))
      userLits.scrollTop = chatBox.scrollHeight
    })
  }

  if (type === 'users') {
    const { users } = data
    console.log(data)
    userLits.innerHTML = ''
    users.forEach(elem => {
      const { name } = elem
      userLits.appendChild(document.createTextNode(`${name}` + '\n'))
      userLits.scrollTop = chatBox.scrollHeight
    })
  }
})
