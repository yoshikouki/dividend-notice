import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { AlphaVantage, AlphaVantageData, AlphaVantageResponse } from '../../lib/api/alpha-vantage'
import { GetServerSideProps } from 'next'
import { CompanyPageTitle } from '../../components/CompanyPageTitle'
import { CompanyList } from '../../components/CompanyList'

interface Props {
  data: AlphaVantageResponse
}

const CompanyBySymbol = (props: Props) => {
  return (
    <DefaultLayout>
      <CompanyPageTitle metaData={props.data.metaData} />
      <CompanyList data={props.data.data} />
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

export default CompanyBySymbol
