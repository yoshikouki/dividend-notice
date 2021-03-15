export const fakeForGetTimeSeriesMonthlyAdjusted = {
  data: {
    'Meta Data': {
      '1. Information': 'Monthly Adjusted Prices and Volumes',
      '2. Symbol': 'IBM',
      '3. Last Refreshed': '2021-02-12',
      '4. Time Zone': 'US/Eastern',
    },
    'Monthly Adjusted Time Series': {
      '2021-02-12': {
        '1. open': '119.9000',
        '2. high': '123.9767',
        '3. low': '118.1200',
        '4. close': '120.8000',
        '5. adjusted close': '120.8000',
        '6. volume': '53039869',
        '7. dividend amount': '1.6300',
      },
      '2021-01-29': {
        '1. open': '125.8500',
        '2. high': '132.2400',
        '3. low': '117.3600',
        '4. close': '119.1100',
        '5. adjusted close': '117.5409',
        '6. volume': '176168962',
        '7. dividend amount': '0.0000',
      },
    },
  },
}

export const fakeRequestGet = {
  data: {
    args: {
      param: 'test',
    },
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      Dnt: '1',
      Host: 'httpbin.org',
      'Sec-Ch-Ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
      'X-Amzn-Trace-Id': 'Root=1-6029283b-2ada4f6327a8018d6a22fa9a',
    },
    origin: '133.32.232.41',
    url: 'https://httpbin.org/get?param=test',
  },
}

export const fakeListingStatusForLite = {
  data: `symbol,name,exchange,assetType,ipoDate,delistingDate,status
A,Agilent Technologies Inc,NYSE,Stock,1999-11-18,null,Active
AA,Alcoa Corp,NYSE,Stock,2016-11-01,null,Active
AAA,AAF First Priority CLO Bond ETF,NYSE ARCA,ETF,2020-09-09,null,Active
ZYNE,Zynerba Pharmaceuticals Inc,NASDAQ,Stock,2015-08-05,null,Active
ZYXI,Zynex Inc,NASDAQ,Stock,2002-12-31,null,Active
ZZK,,NYSE ARCA,Stock,2020-07-22,null,Active
ZZZ,TEST TICKER FOR UTP,NYSE ARCA,Stock,2014-10-31,null,Active`,
}
