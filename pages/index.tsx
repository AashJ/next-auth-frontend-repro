import { signIn, getSession, signOut } from 'next-auth/react'
import { GetServerSidePropsContext, NextPage } from 'next'
import { AuthPageProps } from 'pages/_app'

const Home: NextPage<AuthPageProps> = ({ session }) => {
    const handleSignIn = () => {
        signIn('github')
    }

    const handleSignOut = () => {
        signOut()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignOut}>Sign out</button>
            <div>{session?.user?.name}</div>
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx)
    return {
        props: {
            session,
        },
    }
}

export default Home
