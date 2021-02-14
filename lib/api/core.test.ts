import {requestGet} from "./core";
import axios from "axios";

test('#requestGet', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeRequestGet)
  const res = await requestGet(
    'https://httpbin.org/get',
    {param: 'test'}
    )
  expect(res.args.param).toBe('test')
})

const fakeRequestGet = {
  data: {
    "args": {
      "param": "test"
    },
    "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
      "Dnt": "1",
      "Host": "httpbin.org",
      "Sec-Ch-Ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
      "X-Amzn-Trace-Id": "Root=1-6029283b-2ada4f6327a8018d6a22fa9a"
    },
    "origin": "133.32.232.41",
    "url": "https://httpbin.org/get?param=test"
  }
}
