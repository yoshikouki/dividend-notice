import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import {GetStaticProps} from 'next'
import {Company} from "../../lib/companies";

interface Props {
  companies: any[]
}

const Dividend = (props: Props) => {
  const list = props.companies.map((company) => {
    return <li>{company.symbol}</li>
  })

  return <DefaultLayout>
    <ul>
      {list}
    </ul>
  </DefaultLayout>
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allCompanies = await Company.all(process.env.ALPHA_VANTAGE_API_KEY)
  return {
    props: {
      companies: allCompanies
    },
  }
}

export default Dividend
