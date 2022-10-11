const chrome = require('chrome-aws-lambda')

export default async (req, res) => {
  const browser = await chrome.puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          headless: true,
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
      : {
          headless: false,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--disable-dev-shm-usage',
            '--window-position=0,0',
            '--window-size=1920,1080',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list'
          ]
        }
  )

  const page = await browser.newPage()
  await page.goto(
    'https://p2p.binance.com/en/trade/sell/USDT?fiat=RUB&payment=TinkoffNew',
    { timeout: 150000 }
  )
  console.log('navigated to the page')

  try {
    await page.waitForSelector('#onetrust-accept-btn-handler', {
      timeout: 10000
    })
    await page.click('#onetrust-accept-btn-handler')

    console.log('accepted cookies')
    await page.goto(
      'https://p2p.binance.com/en/trade/sell/USDT?fiat=RUB&payment=TinkoffNew',
      { timeout: 150000 }
    )
    console.log('navigated again')
  } catch (e) {
    console.log('No cookies')
  }

  await page.waitForTimeout(10000)
  await page.waitForSelector(
    '.main-content > div > div:nth-child(4) > div  > div:nth-child(2) > div > div > div:nth-child(2)',
    { timeout: 150000 }
  )
  console.log('waited for data')

  const result = await page.$$eval(
    '.main-content > div > div:nth-child(4) > div  > div:nth-child(2) > div',
    (list) =>
      list.map(
        (el) =>
          el &&
          el.children[0] &&
          el.children[1] &&
          el.children[0].children[1].textContent
      )
  )

  console.log({ result })

  browser.close()

  res.send(JSON.stringify(result))
}
