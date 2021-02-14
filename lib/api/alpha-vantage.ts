require('dotenv').config()
import {requestGet} from "./core";

export class AlphaVantage {
  private url = 'https://www.alphavantage.co/query'
  private apiKey = process.env.ALPHA_VANTAGE_API_KEY

  // Document : https://www.alphavantage.co/documentation/#monthlyadj
  public getTimeSeriesMonthlyAdjusted(symbol) {
    const params = {
      function: 'TIME_SERIES_MONTHLY_ADJUSTED',
      symbol: symbol,
      apikey: this.apiKey
    }
    return requestGet(this.url, params)
  }
}
