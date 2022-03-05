import { NextResponse } from 'next/server'

const urls = ['/', '/user', '/logs', '/settings', '/article']

export default async (req, res) => {
  let token = req.cookies.token
  if (
    !req.nextUrl.searchParams.get('auth') &&
    urls.includes(req.nextUrl.pathname)
  ) {
    if (!req.cookies.token)
      return NextResponse.redirect(req.nextUrl.href + '?auth=true')

    const config = process.env.config
    const url = config && config.sys && config.sys.url

    token = await fetch(url + '/token', {
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