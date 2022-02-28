import { NextResponse } from 'next/server'
import authMiddleware from 'common-lib/auth'

export async function middleware(req) {
  let res = NextResponse.next()

  return authMiddleware(req, res)
}
