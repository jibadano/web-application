import { NextResponse } from 'next/server'
import trafficMiddleware from 'lib/traffic'

export async function middleware(req) {
  let res = NextResponse.next()

  return trafficMiddleware(req, res)
}
