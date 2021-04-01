import { AlphaVantage, ListingStatus } from '../../lib/api/alpha-vantage'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  allStocksCount: number
  updatedLength: number
  updatedRows: any
}

export default async function updateAllStocks(req: NextApiRequest, res: NextApiResponse<Data>) {
  // CSV を取得する
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatus = await alphaVantage.getListingStatus()

  // DBに登録
  const prisma = new PrismaClient()
  let updatedCount = 0
  Promise.all(
    listingStatus.map(async (stock: ListingStatus) => {
      const delistingDate: Date | null = stock.delistingDate === 'null' ? null : new Date(stock.delistingDate!)
      await prisma.stock.create({
        data: {
          status: stock.status!,
          symbol: stock.symbol!,
          name: stock.name!,
          exchange: stock.exchange!,
          assetType: stock.assetType!,
          ipoDate: new Date(stock.ipoDate!),
          delistingDate: delistingDate,
        },
      })
      updatedCount ++
    }),
  ).then((values) => {
    console.log(values.length)
  })

  const updatedRows = await prisma.stock.findMany()
  const allStocksCount = await prisma.stock.count()

  const response: Data = {
    allStocksCount: allStocksCount,
    updatedLength: updatedCount,
    updatedRows: updatedRows,
  }
  res.status(200).json(response)
}
