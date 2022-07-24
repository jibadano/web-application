import { NextResponse } from 'next/server'

export default async (req, res, urls) => {
  let token = req.cookies.token
  if (
    !req.nextUrl.searchParams.get('auth') &&
    urls.includes(req.nextUrl.pathname)
  ) {
    if (!req.cookies.token)
      return NextResponse.redirect(req.nextUrl.href + '?auth=true')

    const config = JSON.parse(process.env.CONFIG)
    const url =
      config &&
      config.services.sys &&
      config.services.sys &&
      config.services.sys.url

    token = await fetch(url + '/auth', {
      method: 'GET',

      headers: {
        authorization: 'Bearer ' + req.cookies.token
      }
    }).then((res) => res.status == 200 && res.text())

    if (token) res.cookie('token', token)

    if (!token) return NextResponse.redirect(req.nextUrl.href + '?auth=true')
  }

  return res
}
