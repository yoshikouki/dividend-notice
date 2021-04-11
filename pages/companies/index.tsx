import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import { Company } from '../../lib/companies'
import StockList from '../../components/StockList'

interface Props {
  companies: any[]
}

const Companies = (props: Props) => {
  return (
    <DefaultLayout>
      <StockList stocks={props.companies} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allCompanies = await Company.all()
  const companies = allCompanies.map((company) => {
    return {
      id: company.id,
      status: company.status,
      symbol: company.symbol,
      name: company.name,
      exchange: company.exchange,
      assetType: company.assetType,
      ipoDate: company.ipoDate.toString(),
      delistingDate: company.delistingDate ? company.delistingDate.toString() : '',
    }
  })
  return {
    props: {
      companies: companies,
    },
  }
}

export default Companies
