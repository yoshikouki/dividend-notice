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

    const metaData = res['Meta Data']
    const data = res['Monthly Adjusted Time Series']
    const convertedData: AlphaVantageResponse = {
      metaData: {
        information: metaData['1. Information'],
        symbol: metaData['2. Symbol'],
        lastRefreshed: metaData['3. Last Refreshed'],
        timeZone: metaData['4. Time Zone'],
      },
      data: Object.keys(data).map((key) => {
        return {
          date: key,
          open: data[key]['1. open'],
          high: data[key]['2. high'],
          low: data[key]['3. low'],
          close: data[key]['4. close'],
          adjustedClose: data[key]['5. adjusted close'],
          volume: data[key]['6. volume'],
          dividendAmount: data[key]['7. dividend amount'],
        }
      }),
    }
    return convertedData
  }

  public async getListingStatus(date: string = null, state: string = null) {
    const array = await this.fetchListingStatus()
    // CSV のヘッダー行をオブジェクトの key として使う
    const objectKeys = array.shift()
    const objectList: ListingStatus[] = this.convertToObject(array, objectKeys)
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

    const data = parser(csv)
    return data
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
