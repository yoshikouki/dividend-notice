export class Stock {
  public static async etfOfNy(apiKey = 'demo') {
    return [
      {
        id: 1,
        symbol: 'Symbol',
        name: 'Name',
        exchange: 'exchange',
        assetType: 'ETF',
        ipoDate: 'ipoDate',
        delistingDate: 'delistingDate',
        status: 'status',
      },
    ]
  }
}
