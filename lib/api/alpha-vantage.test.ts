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

describe('#getListingStatus', () => {
  test('#getListingStatus', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
    const av = new AlphaVantage()
    const listingStatus = await av.getListingStatus()
    const firstRow = parser(fakeListingStatusForLite.data)[1]
    const expected = {
      "id": 1,
      "symbol": firstRow[0],
      "name": firstRow[1],
      "exchange": firstRow[2],
      "assetType": firstRow[3],
      "ipoDate": firstRow[4],
      "delistingDate": firstRow[5],
      "status": firstRow[6],
    }
    expect(listingStatus[0]).toStrictEqual(expected)
  })
})
