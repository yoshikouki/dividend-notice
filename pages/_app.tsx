import React from 'react'
import { AppProps } from 'next/app'
import { Theme } from '../components/Theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  )
}

export default App
