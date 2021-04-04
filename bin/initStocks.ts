import { AlphaVantage, ListingStatus } from '../lib/api/alpha-vantage'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const stocksCount = await prisma.stock.count()
  if (stocksCount !== 0) {
    console.error(`Stocks was initialized. Stocks has ${stocksCount} records`);
    return false
  }

  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatus = await alphaVantage.getListingStatus()

  // DBに登録
  let createdCount = 0
  Promise.all(
    listingStatus.map(async (stock: ListingStatus) => {
      const data = toDataForDatabase(stock)
      await prisma.stock.create({data: data,})
      createdCount++
    }),
  ).then((values) => {
    console.log(`Create ${createdCount} Stocks. Now, All Stocks count is ${allStocksCount}.`)
  })
    .catch((err) => {
      console.error(`Prisma create has Error. It created ${createdCount} records.`);
      return false
    })

  const allStocksCount = await prisma.stock.count()
  console.log(`Initialize Stocks table. Create ${createdCount} records`)
}

export const toDataForDatabase = (object: ListingStatus) => {
  const delistingDate: Date | null = object.delistingDate === 'null' ? null : new Date(object.delistingDate!)
  const data = {
    status: object.status!,
    symbol: object.symbol!,
    name: object.name!,
    exchange: object.exchange!,
    assetType: object.assetType!,
    ipoDate: new Date(object.ipoDate!),
    delistingDate: delistingDate,
  }
  return data
}

main()
  .catch((err) => {
    throw Error('"initStock" had anything Error!!1')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
