import {AlphaVantage} from "./alpha-vantage";

test('#getTimeSeriesMonthlyAdjusted', async () => {
  const av = new AlphaVantage()
  expect(await av.getTimeSeriesMonthlyAdjusted('IBM')).toBe([])
})
