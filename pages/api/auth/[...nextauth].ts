import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
    // Configure one or more authentication providers
    secret: process.env.NEXT_AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user',
                },
            },
        }),
    ],
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account.provider === 'github') {
                return true
            }
            return false
        },
        jwt: ({ token, user, account }) => {
            token = { accessToken: account?.access_token }
            return token
        },
        session: async ({ session, token, user }) => {
            const thisAccount = await prisma.account.findFirst({
                where: { provider: 'github', userId: user.id },
            })
            session.user.accessToken = thisAccount?.access_token ?? undefined
            return session
        },
    },
})
