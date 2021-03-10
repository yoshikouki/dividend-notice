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
      return <CompanyData>company
    })
  }
}

export interface CompanyData {
  id: number
  symbol: string
  name: string
  exchange: string
  assetType: string
  ipoDate: string
  delistingDate: string
  status: string
}
