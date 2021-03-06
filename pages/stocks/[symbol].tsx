import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { AlphaVantage, AlphaVantageResponse } from '../../lib/api/alpha-vantage'
import { GetServerSideProps } from 'next'
import { StockPageTitle } from '../../components/StockPageTitle'
import { MonthlyStockInformationList } from '../../components/MonthlyStockInformationList'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  data: AlphaVantageResponse
}

const MonthlyStockInformation = (props: Props) => {
  return (
    <DefaultLayout>
      <StockPageTitle metaData={props.data.metaData} />
      <MonthlyStockInformationList data={props.data.data} />
    </DefaultLayout>
  )
}

interface Params extends ParsedUrlQuery {
  symbol: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const params = context.params as Params
  const data = await alphaVantage.getTimeSeriesMonthlyAdjusted(params.symbol)
  return {
    props: {
      data: data,
    },
  }
}

export default MonthlyStockInformation
