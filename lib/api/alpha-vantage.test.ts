import { AlphaVantage } from './alpha-vantage'
import axios from 'axios'
import {fakeForGetTimeSeriesMonthlyAdjusted, fakeListingStatusForLite} from '../../tests/faker'
import parser from "csv-parse/lib/sync";

test('#getTimeSeriesMonthlyAdjusted', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeForGetTimeSeriesMonthlyAdjusted)
  const av = new AlphaVantage()
  const res = await av.getTimeSeriesMonthlyAdjusted('SPYD')
  expect(res.metaData.information).toBe('Monthly Adjusted Prices and Volumes')
  expect(res.data[0].dividendAmount).toMatch(/[0-9.]+/)
})

test('#getListingStatus', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
  const av = new AlphaVantage()
  const listingStatus = await av.getListingStatus()
  expect(listingStatus).toStrictEqual(parser(fakeListingStatusForLite.data))
})
