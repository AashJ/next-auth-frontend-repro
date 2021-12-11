import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { withUrqlClient } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

export type AuthPageProps = {
    session: Session | null
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default withUrqlClient((ssrExchange, ctx) => ({
    url: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000',
    exchanges: [devtoolsExchange, dedupExchange, ssrExchange, fetchExchange],
    ssr: true,
}))(MyApp)
