import {AlphaVantage} from "./alpha-vantage";
import axios from "axios";

test('#getTimeSeriesMonthlyAdjusted', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeForGetTimeSeriesMonthlyAdjusted)
  const av = new AlphaVantage()
  const res = await av.getTimeSeriesMonthlyAdjusted('IBM')
  expect(res["Meta Data"]['1. Information']).toBe('Monthly Adjusted Prices and Volumes')
})

const fakeForGetTimeSeriesMonthlyAdjusted = {
  data: {
    "Meta Data": {
      "1. Information": "Monthly Adjusted Prices and Volumes",
      "2. Symbol": "IBM",
      "3. Last Refreshed": "2021-02-12",
      "4. Time Zone": "US/Eastern"
    },
    "Monthly Adjusted Time Series": {
      "2021-02-12": {
        "1. open": "119.9000",
        "2. high": "123.9767",
        "3. low": "118.1200",
        "4. close": "120.8000",
        "5. adjusted close": "120.8000",
        "6. volume": "53039869",
        "7. dividend amount": "1.6300"
      }
    }
  }
}
