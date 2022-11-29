import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import Layout from 'components/layout'

const App = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return router.asPath === '/login' ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
