require('dotenv').config()
import axios, {AxiosResponse} from "axios";

export function requestGet() {
  // Document : https://www.alphavantage.co/documentation/#monthlyadj
  const url = 'https://www.alphavantage.co/query'
  const symbol = 'IBM'
  const params = {
    function: 'TIME_SERIES_MONTHLY_ADJUSTED',
    symbol: symbol,
    apikey: process.env.ALPHA_VANTAGE_API_KEY
  }
  const res = axios.get(url, {params: params})
    .then((res: AxiosResponse) => {
      console.log(res)
      return res.data
    })
    .catch((err) => {
      console.log('[error] ', err)
    })
  return res
}
