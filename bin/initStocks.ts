import { AlphaVantage, ListingStatus } from '../lib/api/alpha-vantage'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const toDataForDatabase = (object: ListingStatus) => {
  const ipoDate = new Date(object.ipoDate!)
  const delistingDate = object.delistingDate === 'null' ? null : new Date(object.delistingDate!)
  return {
    status: object.status!,
    symbol: object.symbol!,
    name: object.name!,
    exchange: object.exchange!,
    assetType: object.assetType!,
    ipoDate: ipoDate,
    delistingDate: delistingDate,
  }
}

const main = async () => {
  const stocksCount = await prisma.stock.count()
  if (stocksCount !== 0) {
    console.error(`Stocks was initialized. Stocks has ${stocksCount} records`)
    return false
  }

  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  const listingStatus = await alphaVantage.getListingStatus()

  // DBに登録
  let createdCount = 0
  Promise.all(
    listingStatus.map(async (stock: ListingStatus) => {
      const data = toDataForDatabase(stock)
      await prisma.stock.create({ data: data })
      createdCount++
    }),
  )
    .then(async (values) => {
      const allStocksCount = await prisma.stock.count()
      console.log(`Create ${createdCount} Stocks. Now, All Stocks count is ${allStocksCount}.`)
    })
    .catch((err) => {
      console.error(`Prisma create has Error. It created ${createdCount} records.`)
      console.error(`message: ${err}`)
      return false
    })

  console.log(`Initialize Stocks table. Create ${createdCount} records`)
}

main()
  .catch((err) => {
    console.error(`message: ${err}`)
    throw Error('"initStock" had anything Error!!1')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
