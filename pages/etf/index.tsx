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
    return {
      id: etf.id,
      status: etf.status,
      symbol: etf.symbol,
      name: etf.name,
      exchange: etf.exchange,
      assetType: etf.assetType,
      ipoDate: etf.ipoDate.toString(),
      delistingDate: etf.delistingDate ? etf.delistingDate.toString() : '',
    }
  })
  return {
    props: {
      etfs: etfs,
    },
  }
}

export default Etf
