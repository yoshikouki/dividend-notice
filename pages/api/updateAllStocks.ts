import { AlphaVantage, ListingStatus } from '../../lib/api/alpha-vantage'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  allStocksCount: number
  updatedLength: number
  updatedRows: any
}

export default async function updateAllStocks(req: NextApiRequest, res: NextApiResponse<Data>) {
  // 最新データをAPIから取得
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatuses = await alphaVantage.getListingStatus()

  // DBの既存データを取得
  const prisma = new PrismaClient()
  const allStocks = await prisma.stock.findMany()

  // 最新データと既存データで差分があるデータを抽出
  // 新規追加される情報もあるので、最新データを元に比較する
  const diffStocks = listingStatuses.map((ls, index) => {
    const stockIndex = allStocks.findIndex(stock => ls.symbol === stock.symbol)
    if (stockIndex === -1) {
      return ls
    }

    const row = allStocks.splice(stockIndex, 1)[0]
    if ( ls.status === row.status
      && ls.delistingDate === row.delistingDate
      && ls.exchange === row.exchange
      && ls.name === row.name
      && ls.ipoDate === row.ipoDate
      && ls.assetType === row.assetType) {
      return ls
    }
  })

  // 差分データをDBに登録

  const allStocksCount = await prisma.stock.count()
  const updatedCount = diffStocks.length
  const updatedRows = diffStocks

  const response: Data = {
    allStocksCount: allStocksCount,
    updatedLength: updatedCount,
    updatedRows: updatedRows,
  }
  res.status(200).json(response)
}
