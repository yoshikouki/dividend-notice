import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { Typography } from '@material-ui/core'
import {AlphaVantage} from "../../lib/api/alpha-vantage";

const Dividend = () => {
  const alphaVantage = new AlphaVantage()
  return (
    <DefaultLayout>
      <Typography variant={'h2'}>Dividend</Typography>
      <p>test: {alphaVantage}</p>
    </DefaultLayout>
  )
}

export default Dividend
