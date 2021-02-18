import { AlphaVantage } from './alpha-vantage'
import axios from 'axios'
import { fakeForGetTimeSeriesMonthlyAdjusted } from '../../tests/faker'

test('#getTimeSeriesMonthlyAdjusted', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeForGetTimeSeriesMonthlyAdjusted)
  const av = new AlphaVantage()
  const res = await av.getTimeSeriesMonthlyAdjusted('IBM')
  expect(res.metaData.information).toBe('Monthly Adjusted Prices and Volumes')
  expect(res.data[0].dividendAmount).toMatch(/[0-9.]+/)
})
