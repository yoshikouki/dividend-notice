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
  const diffStatuses: ListingStatus[] = []
  listingStatuses.forEach((ls) => {
    // シンボル名が既存データになかったら新規に作成する
    const stockIndex = allStocks.findIndex((stock) => ls.symbol === stock.symbol)
    if (stockIndex === -1) {
      diffStatuses.push(ls)
    }

    // 計算数を減らすため処理対象を既存データから破壊的に抜き出す
    const row = allStocks.splice(stockIndex, 1)[0]
    if (
      !(
        ls.status === row.status &&
        ls.delistingDate === row.delistingDate &&
        ls.exchange === row.exchange &&
        ls.name === row.name &&
        ls.ipoDate.valueOf() === row.ipoDate.valueOf() &&
        ls.assetType === row.assetType
      )
    ) {
      diffStatuses.push(ls)
    }
  })

  // 差分データをDBに登録
  diffStatuses.forEach((ls) => {
    const data = {
      status: ls.status,
      symbol: ls.symbol,
      name: ls.name,
      exchange: ls.exchange,
      assetType: ls.assetType,
      ipoDate: ls.ipoDate,
      delistingDate: ls.delistingDate,
    }
    prisma.stock.upsert({
      where: {
        symbol: ls.symbol,
      },
      update: data,
      create: data,
    })
  })

  const allStocksCount = await prisma.stock.count()
  const updatedCount = diffStatuses.length
  const updatedRows = diffStatuses

  const response: Data = {
    allStocksCount: allStocksCount,
    updatedLength: updatedCount,
    updatedRows: updatedRows,
  }
  res.status(200).json(response)
}
