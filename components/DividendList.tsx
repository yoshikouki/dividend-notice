import React from "react";
import {AlphaVantageData} from "../lib/api/alpha-vantage";

interface Props {
  data: AlphaVantageData[]
}

export const DividendList = (props: Props) => {
  return (
    <div className="dividendList">
      <table>
        <tr>
          <th>Date</th>
          <th>配当金</th>
          <th>始値</th>
          <th>高値</th>
          <th>低値</th>
          <th>終値</th>
          <th>調整後終値</th>
          <th>出来高</th>
        </tr>
        {props.data.map((d: AlphaVantageData) => {
          return (
            <tr>
              <th>{d.date}</th>
              <th>{d.dividendAmount}</th>
              <th>{d.open}</th>
              <th>{d.high}</th>
              <th>{d.low}</th>
              <th>{d.close}</th>
              <th>{d.adjustedClose}</th>
              <th>{d.volume}</th>
            </tr>
          )
        })}
      </table>
    </div>
  )
}