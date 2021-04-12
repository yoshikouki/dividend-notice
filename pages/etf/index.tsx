import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import StockList from '../../components/StockList'
import { Stock } from '../../lib/stocks'

interface Props {
  etfs: any[]
}

const Etf = (props: Props) => {
  return (
    <DefaultLayout>
      <StockList stocks={props.etfs} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allEtfs = await Stock.allOfNyEtfs()
  const etfs = allEtfs.map((etf) => {
    return Stock.toJson(etf)
  })
  return {
    props: {
      etfs: etfs,
    },
  }
}

export default Etf
