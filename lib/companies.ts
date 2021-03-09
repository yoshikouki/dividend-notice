import {AlphaVantage} from "./api/alpha-vantage";

export class Company {
  public static async all(apiKey = 'demo') {
    const alphaVantage = new AlphaVantage(apiKey)
    const csv = await alphaVantage.getListingStatus()
    // ヘッダー行を削除
    csv.data.shift()
    const companies = csv.data.map((row, index) => {
      let company = {
        id: index
      }
      row.forEach((data, index) => {
        company[ListingStatusKeyTable[index]] = data
      })
      return company
    })
    return companies

  }
}

const ListingStatusKeyTable = [
  'symbol',
  'name',
  'exchange',
  'assetType',
  'ipoDate',
  'delistingDate',
  'status',
]
