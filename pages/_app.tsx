import React from 'react'
import { AppProps } from 'next/app'
import {StylesProvider} from "@material-ui/styles";

function App({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <Component {...pageProps} />
    </StylesProvider>
  )
}

export default App
