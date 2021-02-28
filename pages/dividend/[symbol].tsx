import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { Typography } from '@material-ui/core'
import {AlphaVantage, TimeSeriesMonthlyAdjusted} from "../../lib/api/alpha-vantage";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {route} from "next/dist/next-server/server/router";

interface Props {
  data: TimeSeriesMonthlyAdjusted
}

const DividendBySymbol = (props: Props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const data = await alphaVantage.getTimeSeriesMonthlyAdjusted(context.params.symbol)
  return {
    props: {
      data: data
    }
  }
}

export default DividendBySymbol
