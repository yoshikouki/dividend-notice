import {Typography} from "@material-ui/core";
import React from "react";
import {AlphaVantageMetaData} from "../lib/api/alpha-vantage";

interface Props {
  metaDate: AlphaVantageMetaData
}

export const DividendPageTitle = (props: Props) => {
  return (
    <div className="pageTitle">
      <Typography variant={'h2'}>{props.metaDate.symbol}</Typography>
      <Typography variant={'subtitle1'}>{props.metaDate.information}</Typography>
      <Typography variant={'caption'}>Last Refreshed : {props.metaDate.lastRefreshed} ({props.metaDate.timeZone})</Typography>
    </div>
  )
}