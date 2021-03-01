import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { AlphaVantage } from '../../lib/api/alpha-vantage'
import { GetServerSideProps } from 'next'

interface Props {
  companies: string
}

const Dividend = (props: Props) => {
  return <DefaultLayout>
    <p>{props.companies}</p>
  </DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const csv = await alphaVantage.getListingStatus()
  return {
    props: {
      companies: csv
    },
  }
}

export default Dividend
