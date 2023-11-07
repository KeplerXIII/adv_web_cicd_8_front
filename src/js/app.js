import config from '../../config'
import { ChatApi } from './components/ChatApi'

const checkBtn = document.querySelector('.check')
const chatApi = new ChatApi(`${config.host}:${config.port}/index`)

checkBtn.addEventListener('click', async (event) => {
  event.preventDefault()
  await chatApi.check()
})
