import { Stock } from './stocks'
import axios from 'axios'
import { fakeListingStatusForLite } from '../tests/faker'

test('Stock.etfOfNy', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
  const stocks = await Stock.allOfNyEtfs()
  const type = stocks.map((etf) => {
    return etf.assetType
  })
  expect(Array.from(new Set(type))).toStrictEqual(['ETF'])
})
