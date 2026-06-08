import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { LoginSchema } from '@english-web/types'
import { apiClient } from './api-client'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // --- Try real API first ---
        try {
          const { user, tokens } = await apiClient.auth.login(parsed.data)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatarUrl,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          }
        } catch {
          // Real API failed — fall back to mock in dev mode
        }

        // --- Dev mock fallback: when backend is not running ---
        const isDev = process.env.NODE_ENV === 'development'
        const isMockUser =
          parsed.data.email === 'demo@example.com' &&
          parsed.data.password === 'password'
        if (isDev && isMockUser) {
          return {
            id: 'demo-user-001',
            email: 'demo@example.com',
            name: 'Demo User',
            image: null,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as { accessToken?: string }).accessToken
        token.refreshToken = (user as { refreshToken?: string }).refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
