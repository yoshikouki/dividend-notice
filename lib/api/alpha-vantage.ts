import { requestGet } from './core'
import parser from 'csv-parse/lib/sync'

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

  // Document : https://www.alphavantage.co/documentation/#listing-status
  public async getListingStatus (date: string = null, state:string = null) {
    const params = {
      function: 'LISTING_STATUS',
      apikey: this.apiKey,
    }
    const csv = await requestGet(this.url, params)

    const data = parser(csv)
    const res: ListingStatus = {
      metaData: {
        information: 'Listing Status',
        lastRefreshed: new Date().toLocaleString(),
        timeZone: 'Asia/Tokyo',
      },
      data: data
    }
    return res
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

export interface ListingStatus {
  metaData: AlphaVantageMetaData
  data: any[]
}
