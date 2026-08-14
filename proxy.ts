import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple edge-safe proxy — checks auth cookie without any Node.js imports
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // NextAuth v5 session cookie names
  const sessionToken =
    req.cookies.get('authjs.session-token') ||
    req.cookies.get('__Secure-authjs.session-token') ||
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token')

  const isLoggedIn = !!sessionToken
  const isPublic =
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth')

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
