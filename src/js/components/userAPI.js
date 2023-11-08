export class UserAPI {
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

  async addUser (name) {
    const request = fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${name}` })
    })

    const result = await request

    const json = await result.json()
    const status = json.status

    if (status) {
      return status
    }
    console.error('Ошибка')
  }
}
