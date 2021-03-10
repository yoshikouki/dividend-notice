import React from 'react'
import { DefaultLayout } from '../layouts/Default'
import { Typography } from '@material-ui/core'
import { LinkButton } from '../components/LinkButton'

const Home = () => {
  return (
    <DefaultLayout>
      <Typography variant={'h2'}>
        Welcome to <a href="https://dividend-notice.net">Dividend Notice</a>
      </Typography>
      <LinkButton title={'Companies'} path={'/companies'} />
    </DefaultLayout>
  )
}

export default Home
