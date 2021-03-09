import { AlphaVantage } from './api/alpha-vantage'

const ListingStatusKeyTable = ['symbol', 'name', 'exchange', 'assetType', 'ipoDate', 'delistingDate', 'status']

export class Company {
  public static async all(apiKey = 'demo') {
    const alphaVantage = new AlphaVantage(apiKey)
    const csv = await alphaVantage.getListingStatus()
    // ヘッダー行を削除
    csv.shift()
    return csv.map((row, index) => {
      const company = {
        id: index,
      }
      row.forEach((data, index) => {
        company[ListingStatusKeyTable[index]] = data
      })
      return company
    })
  }
}
