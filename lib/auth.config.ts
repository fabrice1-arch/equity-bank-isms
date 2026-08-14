import type { NextAuthConfig } from 'next-auth'

// Lightweight auth config — safe for Edge Runtime (no database imports)
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublic = nextUrl.pathname.startsWith('/login')

      if (!isLoggedIn && !isPublic) return false
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.department = (user as any).department
        token.jobTitle = (user as any).jobTitle
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
        ;(session.user as any).department = token.department
        ;(session.user as any).jobTitle = token.jobTitle
      }
      return session
    },
  },
  providers: [], // Providers are added in lib/auth.ts (Node.js only)
} satisfies NextAuthConfig
