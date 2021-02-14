import {requestGet} from "./core";

test('#requestGet', async () => {
  const res = await requestGet(
    'https://httpbin.org/get',
    {param: 'test'}
    )
  expect(res.args.param).toBe('test')
})
