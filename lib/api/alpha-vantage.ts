import { requestGet } from './core'
import parser from 'csv-parse/lib/sync'
import { fakeListingStatus } from '../../tests/data/fakeListingStatus'

export class AlphaVantage {
  private url = 'https://www.alphavantage.co/query'
  private readonly apiKey

  constructor(apiKey: string = 'demo') {
    this.apiKey = apiKey
  }

  // Document : https://www.alphavantage.co/documentation/#monthlyadj
  public async getTimeSeriesMonthlyAdjusted(symbol: string) {
    const params = {
      function: 'TIME_SERIES_MONTHLY_ADJUSTED',
      symbol: symbol,
      apikey: this.apiKey,
    }
    const res = await requestGet(this.url, params)
    return this.convertConstruction(res, KeysTableForGetTimeSeriesMonthlyAdjusted)
  }

  private async fetchListingStatus() {
    const params = {
      function: 'LISTING_STATUS',
      apikey: this.apiKey,
    }
    // APIのアクセスに時間がかかるので開発では予めDLしたデータを使用する
    let csv = ''
    if (process.env.NODE_ENV === 'development') {
      csv = fakeListingStatus.data
    } else {
      csv = await requestGet(this.url, params)
    }
    return csv
  }

  private convertConstruction(res: StringKeyObject, keysTable: StringKeyObject) {
    const metaData = this.convertKeys(res[keysTable.metaData.key], keysTable.metaData)

    const data = Object.keys(res[keysTable.data.key]).map((date) => {
      const obj = this.convertKeys(res[keysTable.data.key][date], keysTable.data)
      obj['date'] = date
      return obj
    })
    return <AlphaVantageResponse>{
      metaData: metaData,
      data: data,
    }
  }

  private convertKeys(object: StringKeyObject, keysTable: StringKeyObject) {
    const response: StringKeyObject = {}
    Object.entries(keysTable).forEach(([newKey, oldKey]) => {
      if (typeof oldKey !== 'string' || newKey === 'key') {
        return
      }
      response[newKey] = object[oldKey]
    })
    return response
  }

  // Document : https://www.alphavantage.co/documentation/#listing-status
  public async getListingStatus(): Promise<ListingStatus[]> {
    const res = await this.fetchListingStatus()
    const csv = parser(res)
    // CSV のヘッダー行を key としてオブジェクトへの変換を行う
    const objectKeys: ListingStatusColumn = csv.shift()
    const objectList = csv.map((row: string[], rowNumber: number) => {
      const object: ListingStatus = {
        id: rowNumber + 1,
      }
      row.forEach((data: string, columnNumber: number) => {
        object[objectKeys[columnNumber]] = data
      })
      return object
    })
    return objectList
  }
}

export interface StringKeyObject {
  [key: string]: any
}

export interface AlphaVantageResponse {
  metaData: AlphaVantageMetaData
  data: AlphaVantageData[]
}

export interface AlphaVantageMetaData {
  information: string
  symbol?: string
  lastRefreshed: string
  timeZone: string
}

export interface AlphaVantageData {
  date: string
  open: number
  close: number
  adjustedClose: number
  high: number
  low: number
  volume: number
  dividendAmount?: number
}

export const KeysTableForGetTimeSeriesMonthlyAdjusted = {
  metaData: {
    key: 'Meta Data',
    information: '1. Information',
    symbol: '2. Symbol',
    lastRefreshed: '3. Last Refreshed',
    timeZone: '4. Time Zone',
  },
  data: {
    key: 'Monthly Adjusted Time Series',
    date: /\d{4}-\d{2}-\d{2}/,
    open: '1. open',
    close: '4. close',
    adjustedClose: '5. adjusted close',
    high: '2. high',
    low: '3. low',
    volume: '6. volume',
    dividendAmount: '7. dividend amount',
  },
}

export interface ListingStatusResponse {
  metaData: AlphaVantageMetaData
  data: [string, string, string, string, string, string, string][]
}

export interface ListingStatus {
  id: number
  symbol?: string
  name?: string
  exchange?: string
  assetType?: string
  ipoDate?: string
  delistingDate?: string
  status?: string
}

type ListingStatusColumn = ['symbol', 'name', 'exchange', 'assetType', 'ipoDate', 'delistingDate', 'status']
