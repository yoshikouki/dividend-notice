import React, { ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
}

const Header = styled.header`
  grid-template-columns: 1fr 1fr;
  padding-top: 1rem;
  display: grid;
`

const Logo = styled.h1`
  padding-left: 2rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
`

const Body = styled.div`
  padding: 2rem;
  font-family: ${['Roboto', '-apple-system', 'Helvetica', 'Meiryo', 'ヒラギノ角ゴシック', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'Verdana', 'sans-serif'].join(', ')};
`

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: #ccc;
`

const copyright = `2021-${new Date().getFullYear()} @yoshikouki. All rights reserved.`

export const DefaultLayout = ({ children, title = 'Dividend Notice' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Header>
        <Logo>Dividend Notice</Logo>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <p>&copy; {copyright}</p>
      </Footer>
    </div>
  )
}
