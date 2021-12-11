import 'next-auth'

declare module 'next-auth' {
    interface User {
        accessToken?: string // Or string
    }

    interface Session {
        user: User
    }
}
