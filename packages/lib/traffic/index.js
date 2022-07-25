import { userAgent } from 'next/server'

const urls = ['/', '/contact', '/article']

const traffic = async (req, res) => {
  if (!req.cookies.get('traffic') && urls.includes(req.nextUrl.pathname)) {
    const origin = req.nextUrl.href
    const geolocation = req.geo
    const ip = req.ip
    const { device, isBot } = userAgent(req)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'

    const config = JSON.parse(process.env.CONFIG)
    const url =
      config &&
      config.services.sys &&
      config.services.sys &&
      config.services.sys.url

    if (url)
      fetch(url + '/traffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          viewport,
          isBot,
          origin,
          geolocation
        })
      }).catch((e) => {
        //do nothing
      })

    res.cookies.set('traffic', true)
  }

  return res
}

export default traffic
