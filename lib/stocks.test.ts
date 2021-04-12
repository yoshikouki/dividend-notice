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

test('Stock.toJson', () => {
  const obj = {
    id: 4,
    status: 'Active',
    symbol: 'AAAU',
    name: 'Goldman Sachs Physical Gold ETF',
    exchange: 'NYSE ARCA',
    assetType: 'ETF',
    ipoDate: new Date('2018-08-15T00:00:00.000Z'),
    delistingDate: null,
    createdAt: new Date('2021-04-11T14:01:26.353Z'),
  }
  const exp = {
    id: 4,
    status: 'Active',
    symbol: 'AAAU',
    name: 'Goldman Sachs Physical Gold ETF',
    exchange: 'NYSE ARCA',
    assetType: 'ETF',
    ipoDate: '2018/8/15',
    delistingDate: '',
    createdAt: '2021/4/11',
  }
  expect(Stock.toJson(obj)).toStrictEqual(exp)
})
