import {AlphaVantage, ListingStatus} from "../../lib/api/alpha-vantage"
import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from "next";

interface Data {
  updatedLength: number
  updatedRows: ListingStatus
}

export default async function updateAllStocks(req: NextApiRequest, res: NextApiResponse<Data>) {
  // CSV を取得する
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatus = await alphaVantage.getListingStatus()

  // DBに登録
  const prisma = new PrismaClient()

  await prisma.stock.create({
    data: {
      status: listingStatus[0].status,
      symbol: listingStatus[0].symbol,
      name: listingStatus[0].name,
      exchange: listingStatus[0].exchange,
      assetType: listingStatus[0].assetType,
      ipoDate: listingStatus[0].ipoDate,
      delistingDate: listingStatus[0].delistingDate,
    },
  })
  .then((values) => {
    console.log(values.symbol)
  })
  // Promise.all(
  //   listingStatus.map(async (stock) => {
  //     await prisma.stock.create({
  //       data: {
  //         status: stock.status,
  //         symbol: stock.symbol,
  //         name: stock.name,
  //         exchange: stock.exchange,
  //         assetType: stock.assetType,
  //         ipoDate: stock.ipoDate,
  //         delistingDate: stock.delistingDate,
  //       },
  //     })
  //   })
  // )
  //   .then((values) => {
  //     console.log(values.length)
  //   })

  let updatedRows = await prisma.stock.count()

  const response: Data = {
    updatedLength: updatedRows,
    updatedRows: listingStatus,
  }
  res.status(200).json(response)
}
