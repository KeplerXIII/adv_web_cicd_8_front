import puppeteer from 'puppeteer'

describe('Page start', () => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      slowMo: 100,
      devtools: true
    })

    page = await browser.newPage()
  })

  test('Start test', async () => {
    await page.goto('http://localhost:8080')

    await page.waitForSelector('body')
  })

  afterEach(async () => {
    await browser.close()
  })
})
