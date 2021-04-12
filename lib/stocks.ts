import { PrismaClient, Stock as StockType } from '@prisma/client'

export class Stock {
  public static async allOfNyEtfs() {
    const prisma = new PrismaClient()
    const etfs: StockType[] = await prisma.stock.findMany({
      where: {
        assetType: 'ETF',
      },
    })
    return etfs
  }

  public static toJson(stock: StockType) {
    return Object.fromEntries(
      Object.entries(stock).map(([key, value]) => {
        if (!value) {
          return [key, '']
        } else if (value instanceof Date) {
          // YYYY/m/d の形式に変換
          const date = `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`
          return [key, date]
        } else {
          return [key, value]
        }
      }),
    )
  }
}
