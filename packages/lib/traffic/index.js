const urls = ['/', '/contact', '/article']

const traffic = async (req, res) => {
  if (!req.cookies.traffic && urls.includes(req.nextUrl.pathname)) {
    const origin = req.nextUrl.href
    const geolocation = req.geo
    const ip = req.ip
    const userAgent = req.ua && req.ua.ua
    const config = process.env.config
    const url = config && config.sys && config.sys.url

    if (url)
      fetch(url + '/logTraffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          userAgent,
          origin,
          geolocation
        })
      }).catch((e) => {
        //do nothing
      })

    res.cookie('traffic', true)
  }

  return res
}

export default traffic
