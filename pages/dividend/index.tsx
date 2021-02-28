import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { Typography } from '@material-ui/core'
import {AlphaVantage, TimeSeriesMonthlyAdjusted} from "../../lib/api/alpha-vantage";

const Dividend = async () => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const data = await alphaVantage.getTimeSeriesMonthlyAdjusted('IBM')
  return (
    <DefaultLayout>
      <Typography variant={'h2'}>Dividend</Typography>
      <p>test: {data.metaData.information}</p>
    </DefaultLayout>
  )
}

export default Dividend
