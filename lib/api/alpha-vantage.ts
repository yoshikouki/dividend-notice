import { requestGet } from './core'

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
    const convertedData: TimeSeriesMonthlyAdjusted = {
      metaData: {
        information: metaData['1. Information'],
        symbol: metaData['2. Symbol'],
        lastRefreshed: metaData['3. Last Refreshed'],
        timeZone: metaData['4. Time Zone'],
      },
      data: Object.keys(data).map((key) => {
        return {
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
}

export interface TimeSeriesMonthlyAdjusted {
  metaData: AlphaVantageMetaData,
  data: AlphaVantageData[],
}

interface AlphaVantageMetaData {
  information: string,
  symbol: string,
  lastRefreshed: string,
  timeZone: string,
}

interface AlphaVantageData {
  open: number,
  high: number,
  low: number,
  close: number,
  adjustedClose: number,
  volume: number,
  dividendAmount?: number,
}