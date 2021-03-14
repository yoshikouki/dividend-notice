import {AlphaVantage} from "./api/alpha-vantage";

export class Stock {
  public static async allOfNyEtfs(apiKey = 'demo') {
    const alphaVantage = new AlphaVantage(apiKey)
    const listingStatus = await alphaVantage.getListingStatus()
    // ETF を除外して企業情報だけにする
    return listingStatus.filter((row) => {
      return row.assetType === 'ETF'
    })
  }
}
