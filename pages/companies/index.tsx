import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import { Company } from '../../lib/companies'
import StockList from '../../components/StockList'
import { Stock } from '../../lib/stocks'

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
    return Stock.toJson(company)
  })
  return {
    props: {
      companies: companies,
    },
  }
}

export default Companies
