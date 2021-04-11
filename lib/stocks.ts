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
}
