import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import Layout from 'components/layout'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return router.asPath === '/login' ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
