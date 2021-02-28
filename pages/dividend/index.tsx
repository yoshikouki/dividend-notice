import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import {AlphaVantage, TimeSeriesMonthlyAdjusted} from "../../lib/api/alpha-vantage";
import {GetServerSideProps} from "next";

interface Props {
}

const Dividend = (props: Props) => {
  return (
    <DefaultLayout>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY)
  return {
    props: {
    }
  }
}

export default Dividend
