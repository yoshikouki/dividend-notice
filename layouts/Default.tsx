import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
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
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
`

const Body = styled.div`
  padding: 2rem 0;
`

const Footer = styled.footer`
  text-align: center;
  font-size: 0.7rem;
  font-weight: normal;
  color: #ccc;
`

const thisYear = new Date().getFullYear()
const copyright = `2021${thisYear == 2021 ? '' : '-' + thisYear} @yoshikouki. All rights reserved.`

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
        <Link href={'./'}>
          <a>
            <Logo>Dividend Notice</Logo>
          </a>
        </Link>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <p>&copy; {copyright}</p>
      </Footer>
    </div>
  )
}
