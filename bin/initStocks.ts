import { AlphaVantage, ListingStatus } from '../lib/api/alpha-vantage'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const stocksCount = await prisma.stock.count()
  if (stocksCount !== 0) {
    console.error(`[Error] Stocks was initialized. Stocks had ${stocksCount} records.`)
    return false
  }

  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatuses = await alphaVantage.getListingStatus()

  // DBに登録
  const rows = listingStatuses.map((status) => {
    const row = {
      status: status.status!,
      symbol: status.symbol!,
      name: status.name!,
      exchange: status.exchange!,
      assetType: status.assetType!,
      ipoDate: status.ipoDate!,
      delistingDate: status.delistingDate!,
    }
    return row
  })
  await prisma.stock.createMany({
    data: rows,
    skipDuplicates: true,
  })

  const allCount = await prisma.stock.count()
  console.log(`Initialize Stocks table. Stocks has ${allCount} records.`)
}

main()
  .catch((err) => {
    console.error(`message: ${err}`)
    throw Error('"initStock" had anything Error!!1')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
