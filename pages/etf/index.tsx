import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import StockList from '../../components/StockList'
import { Stock } from '../../lib/stocks'

interface Props {
  companies: any[]
}

const Etf = (props: Props) => {
  return (
    <DefaultLayout>
      <StockList stocks={props.companies} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allCompanies = await Stock.allOfNyEtfs(process.env.ALPHA_VANTAGE_API_KEY)
  return {
    props: {
      companies: allCompanies,
    },
  }
}

export default Etf
