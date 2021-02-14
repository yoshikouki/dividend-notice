import { requestGet } from './core'
import axios from 'axios'
import { fakeRequestGet } from '../../tests/faker'

test('#requestGet', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeRequestGet)
  const res = await requestGet('https://httpbin.org/get', { param: 'test' })
  expect(res.args.param).toBe('test')
})
