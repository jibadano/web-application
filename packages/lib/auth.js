export default async (req, res, urls) => {
  let token = req.cookies.get('token')
  if (token && urls.includes(req.nextUrl.pathname)) {
    const config = JSON.parse(process.env.CONFIG)
    const url =
      config &&
      config.services.sys &&
      config.services.sys &&
      config.services.sys.url

    token = await fetch(url + '/auth', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).then((res) => res.status == 200 && res.text())

    res.cookies.set('token', token)
  }

  return res
}
