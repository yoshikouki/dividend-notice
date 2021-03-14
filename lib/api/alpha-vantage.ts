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
  public async getTimeSeriesMonthlyAdjusted(symbol) {
    const params = {
      function: 'TIME_SERIES_MONTHLY_ADJUSTED',
      symbol: symbol,
      apikey: this.apiKey,
    }
    const res = await requestGet(this.url, params)
    return this.convertConstruction(res, KeysTableForGetTimeSeriesMonthlyAdjusted)
  }

  public async getListingStatus(date: string = null, state: string = null) {
    const res = await this.fetchListingStatus()
    const csv = parser(res)
    // CSV のヘッダー行をオブジェクトの key として使う
    const objectKeys = csv.shift()
    const objectList: ListingStatus[] = this.convertToObject(csv, objectKeys)
    return objectList
  }

  // Document : https://www.alphavantage.co/documentation/#listing-status
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

  private convertConstruction(res, keysTable) {
    const metaData = this.convertKeys(res[keysTable.metaData.key], keysTable)

    const data = Object.keys(res[keysTable.data.key]).map((date) => {
      const obj = this.convertKeys(res[keysTable.data.key][date], keysTable)
      obj['date'] = date
      return obj
    })
      return <AlphaVantageResponse>{
      metaData: metaData,
      data: data,
    }
  }

  private convertKeys(object, keysTable) {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        return [keysTable[key], value]
      })
    )
  }

  private convertToObject(valueArray: any[], keysArray: string[]) {
    return valueArray.map((row, rowNumber) => {
      const object = {
        id: rowNumber + 1,
      }
      row.forEach((data, columnNumber) => {
        object[keysArray[columnNumber]] = data
      })
      return object
    })
  }
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

interface GetTimeSeriesMonthlyAdjustedResponse {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Time Zone': string
  },
  'Monthly Adjusted Time Series': {
    string: {
      '1. open': string
      '2. high': string
      '3. low': string
      '4. close': string
      '5. adjusted close': string
      '6. volume': string
      '7. dividend amount': string
    },
  }
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
  'Meta Data': 'metaData',
  '1. Information': 'information',
  '2. Symbol': 'symbol',
  '3. Last Refreshed': 'lastRefreshed',
  '4. Time Zone': 'timeZone',
  'Monthly Adjusted Time Series': 'data',
  '1. open': 'open',
  '4. close': 'close',
  '5. adjusted close': 'adjustedClose',
  '2. high': 'high',
  '3. low': 'low',
  '6. volume': 'volume',
  '7. dividend amount': 'dividendAmount',
}

export interface ListingStatusResponse {
  metaData: AlphaVantageMetaData
  data: [string, string, string, string, string, string, string][]
}

interface ListingStatus {
  id: number
  symbol?: string
  name?: string
  exchange?: string
  assetType?: string
  ipoDate?: string
  delistingDate?: string
  status?: string
}
