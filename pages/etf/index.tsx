import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import { Company } from '../../lib/companies'
import StockList from '../../components/StockList'

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
  const allCompanies = await Company.all(process.env.ALPHA_VANTAGE_API_KEY)
  return {
    props: {
      companies: allCompanies,
    },
  }
}

export default Etf
