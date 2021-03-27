import {AlphaVantage, ListingStatus} from "../../lib/api/alpha-vantage"
import parser from "csv-parse/lib/sync";
import { PrismaClient } from '@prisma/client'
import { fakeListingStatusForLite } from "../../tests/faker"
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
  const updatedRows = listingStatus.length

  const response: Data = {
    updatedLength: updatedRows,
    updatedRows: listingStatus,
  }
  res.status(200).json(response)
}
