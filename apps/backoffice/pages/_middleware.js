import { NextResponse } from 'next/server'
import authMiddleware from 'lib/auth'

export async function middleware(req) {
  let res = NextResponse.next()

  return authMiddleware(req, res, [
    '/',
    '/user',
    '/logs',
    '/settings',
    '/article'
  ])
}
