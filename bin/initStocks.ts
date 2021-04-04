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
      createdCount++
    }),
  ).then((values) => {
    console.log(`Initialize Stocks table. Create ${createdCount} records`)
  })

  const allStocksCount = await prisma.stock.count()
  console.log(`Create ${createdCount} Stocks. Now, All Stocks count is ${allStocksCount}.`)
}

main()
  .catch((err) => {
    throw Error('"initStock" had anything Error!!1')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
