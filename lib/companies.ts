import { PrismaClient, Stock } from '@prisma/client'

export class Company {
  public static async all() {
    const prisma = new PrismaClient()
    const companies: Stock[] = await prisma.stock.findMany({
      where: {
        assetType: 'Stock',
      },
    })
    return companies
  }
}
