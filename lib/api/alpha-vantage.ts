require('dotenv').config()
import {requestGet} from "./core";

export class AlphaVantage {
  private url = 'https://www.alphavantage.co/query'
  private apiKey = process.env.ALPHA_VANTAGE_API_KEY

  // Document : https://www.alphavantage.co/documentation/#monthlyadj
  public async getTimeSeriesMonthlyAdjusted(symbol) {
    const params = {
      function: 'TIME_SERIES_MONTHLY_ADJUSTED',
      symbol: symbol,
      apikey: this.apiKey
    }
    const res = await requestGet(this.url, params)
    const metaData = res['Meta Data']
    const data = res['Monthly Adjusted Time Series']
    return {
      metaData: {
        information: metaData["1. Information"],
        symbol: metaData["2. Symbol"],
        lastRefreshed: metaData["3. Last Refreshed"],
        timeZone: metaData["4. Time Zone"]
      },
      data: Object.keys(data).map((key) => {
        return {
          open: data[key]["1. open"],
          high: data[key]["2. high"],
          low: data[key]["3. low"],
          close: data[key]["4. close"],
          adjustedClose: data[key]["5. adjusted close"],
          volume: data[key]["6. volume"],
          dividendAmount: data[key]["7. dividend amount"]
        }
      })
    }
  }
}
