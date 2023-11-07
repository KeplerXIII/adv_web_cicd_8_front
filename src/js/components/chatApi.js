export class ChatApi {
  constructor (url) {
    this.url = url
  }

  async check () {
    const request = fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await request

    if (!result.ok) {
      console.error('Ошибка')
      return
    }

    const json = await result.json()

    console.log(json)
  }
}
