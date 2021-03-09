import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { AlphaVantage, AlphaVantageData, AlphaVantageResponse } from '../../lib/api/alpha-vantage'
import { GetServerSideProps } from 'next'
import { DividendPageTitle } from '../../components/DividendPageTitle'
import { DividendList } from '../../components/DividendList'

interface Props {
  data: AlphaVantageResponse
}

const DividendBySymbol = (props: Props) => {
  return (
    <DefaultLayout>
      <DividendPageTitle metaData={props.data.metaData} />
      <DividendList data={props.data.data} />
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const data = await alphaVantage.getTimeSeriesMonthlyAdjusted(context.params.symbol)
  return {
    props: {
      data: data,
    },
  }
}

export default DividendBySymbol
