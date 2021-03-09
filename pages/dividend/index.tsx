import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import {GetStaticProps} from 'next'
import {Company} from "../../lib/companies"
import {DataGrid} from "@material-ui/data-grid";
import styled from 'styled-components'
import {useRouter} from "next/router";

const Wrapper = styled.div`
  height: 3000px;
`

interface Props {
  companies: any[]
}

const Dividend = (props: Props) => {
  const router = useRouter()

  const rows = props.companies
  const columns = [
    {field : 'symbol', headerName: 'Symbol'},
    {field : 'name', headerName: 'name'},
    {field : 'exchange', headerName: 'exchange'},
    {field : 'assetType', headerName: 'assetType'},
    {field : 'ipoDate', headerName: 'ipoDate'},
    {field : 'delistingDate', headerName: 'delistingDate'},
    {field : 'status', headerName: 'status'},
  ]

  return (
    <DefaultLayout>
      <Wrapper>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={async (param) => {
            let path = '/dividend/' + param.row.symbol
            await router.push(path)
          }}
        />
      </Wrapper>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allCompanies = await Company.all(process.env.ALPHA_VANTAGE_API_KEY)
  return {
    props: {
      companies: allCompanies
    },
  }
}

export default Dividend
