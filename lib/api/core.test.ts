import {requestGet} from "./core";

test('#requestGet', async () => {
  const res = await requestGet()
  expect(res).toBe([])
})
