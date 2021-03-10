import { Typography } from '@material-ui/core'
import React from 'react'
import { AlphaVantageMetaData } from '../lib/api/alpha-vantage'

interface Props {
  metaData: AlphaVantageMetaData
}

export const CompanyPageTitle = (props: Props) => {
  return (
    <div className="pageTitle">
      <Typography variant={'h2'}>{props.metaData.symbol}</Typography>
      <Typography variant={'subtitle1'}>{props.metaData.information}</Typography>
      <Typography variant={'caption'}>
        Last Refreshed : {props.metaData.lastRefreshed} ({props.metaData.timeZone})
      </Typography>
    </div>
  )
}
