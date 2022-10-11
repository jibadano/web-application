// Shout outs to the following repositories:

// https://github.com/vercel/og-image
// https://github.com/ireade/netlify-puppeteer-screenshot-demo

// The maximum execution timeout is 10
// seconds when deployed on a Personal Account (Hobby plan).
// For Teams, the execution timeout is 60 seconds (Pro plan)
// or 900 seconds (Enterprise plan).

const puppeteer = require('puppeteer-core')
const chrome = require('chrome-aws-lambda')

/** The code below determines the executable location for Chrome to
 * start up and take the screenshot when running a local development environment.
 *
 * If the code is running on Windows, find chrome.exe in the default location.
 * If the code is running on Linux, find the Chrome installation in the default location.
 * If the code is running on MacOS, find the Chrome installation in the default location.
 * You may need to update this code when running it locally depending on the location of
 * your Chrome installation on your operating system.
 */

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getOptions(isDev) {
  let options
  if (isDev) {
    options = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--disable-dev-shm-usage',
        '--window-position=0,0',
        '--window-size=1920,1080',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-spki-list'
      ],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }
  return options
}

module.exports = async (req, res) => {
  // pass in this parameter if you are developing locally
  // to ensure puppeteer picks up your machine installation of
  // Chrome via the configurable options
  const isDev = process.env.NODE_ENV !== 'production'

  const browser = await puppeteer.launch(getOptions(isDev))

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
