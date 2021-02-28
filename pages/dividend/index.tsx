import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { Typography } from '@material-ui/core'
import {AlphaVantage, TimeSeriesMonthlyAdjusted} from "../../lib/api/alpha-vantage";
import {GetServerSideProps} from "next";

interface Props {
  data: TimeSeriesMonthlyAdjusted
}

const Dividend = (props: Props) => {
  const metaData = props.data.metaData
  return (
    <DefaultLayout>
      <Typography variant={'h2'}>Dividend</Typography>
      <Typography variant={'h3'}>{metaData.symbol}</Typography>
      <Typography variant={'subtitle1'}>{metaData.information}</Typography>
      <Typography variant={'caption'}>Last Refreshd : {metaData.lastRefreshed} ({metaData.timeZone})</Typography>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const data = await alphaVantage.getTimeSeriesMonthlyAdjusted('IBM')
  return {
    props: {
      data: data
    }
  }
}

export default Dividend
