import { AlphaVantage, KeysTableForGetTimeSeriesMonthlyAdjusted, ListingStatusColumn } from './alpha-vantage'
import axios from 'axios'
import { fakeForGetTimeSeriesMonthlyAdjusted, fakeListingStatusForLite } from '../../tests/faker'
import parser from 'csv-parse/lib/sync'

describe('月次情報の取得', () => {
  test('#getTimeSeriesMonthlyAdjusted', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue(fakeForGetTimeSeriesMonthlyAdjusted)
    const av = new AlphaVantage()
    const res = await av.getTimeSeriesMonthlyAdjusted('SPYD')
    const key = KeysTableForGetTimeSeriesMonthlyAdjusted
    const fakeMetaData = fakeForGetTimeSeriesMonthlyAdjusted.data[key.metaData.key]
    const fakeData = fakeForGetTimeSeriesMonthlyAdjusted.data[key.data.key]
    const fakeFirstDate = '2021-02-12'
    const expected = {
      metaData: {
        information: fakeMetaData[key.metaData.information],
        symbol: fakeMetaData[key.metaData.symbol],
        lastRefreshed: fakeMetaData[key.metaData.lastRefreshed],
        timeZone: fakeMetaData[key.metaData.timeZone],
      },
      data: [
        {
          date: fakeFirstDate,
          open: fakeData[fakeFirstDate][key.data.open],
          close: fakeData[fakeFirstDate][key.data.close],
          adjustedClose: fakeData[fakeFirstDate][key.data.adjustedClose],
          high: fakeData[fakeFirstDate][key.data.high],
          low: fakeData[fakeFirstDate][key.data.low],
          volume: fakeData[fakeFirstDate][key.data.volume],
          dividendAmount: fakeData[fakeFirstDate][key.data.dividendAmount],
        },
      ],
    }
    expect(res.metaData).toStrictEqual(expected.metaData)
    expect(res.data[0]).toStrictEqual(expected.data[0])
  })
})

describe('企業・ETF一覧の取得', () => {
  test('#getListingStatus', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
    const av = new AlphaVantage()
    const listingStatus = await av.getListingStatus()
    const firstRow = parser(fakeListingStatusForLite.data)[1]
    const expected = {
      id: 1,
      symbol: firstRow[0],
      name: firstRow[1],
      exchange: firstRow[2],
      assetType: firstRow[3],
      ipoDate: new Date(firstRow[4]),
      delistingDate: firstRow[5] === 'null' ? null : new Date(firstRow[5]),
      status: firstRow[6],
    }
    expect(listingStatus[0]).toStrictEqual(expected)
  })

  test('#toDateForDatabase', () => {
    const ipoDate = '1999-11-18'
    const delistingDate = 'null'
    const values = ['A', 'Agilent Technologies Inc', 'NYSE', 'Stock', ipoDate, delistingDate, 'Active']
    const keys: ListingStatusColumn = ['symbol', 'name', 'exchange', 'assetType', 'ipoDate', 'delistingDate', 'status']
    const expectData = {
      id: 1,
      status: 'Active',
      symbol: 'A',
      name: 'Agilent Technologies Inc',
      exchange: 'NYSE',
      assetType: 'Stock',
      ipoDate: new Date(ipoDate),
      delistingDate: null,
    }
    const alphaVantage = new AlphaVantage()
    const object = alphaVantage.toListingStatusObject(values, keys, 0)
    expect(object).toStrictEqual(expectData)
  })
})
