import React from 'react'
import { DefaultLayout } from '../../layouts/Default'
import { GetStaticProps } from 'next'
import { Company } from '../../lib/companies'
import { DataGrid } from '@material-ui/data-grid'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  height: 1000px;
`

interface Props {
  companies: any[]
}

const Companies = (props: Props) => {
  const router = useRouter()

  const rows = props.companies
  const columns = [
    { field: 'symbol', headerName: 'Symbol' },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'exchange', headerName: 'Exchange', width: 120 },
    { field: 'assetType', headerName: 'Type' },
    { field: 'ipoDate', headerName: 'IPO Date', width: 120 },
  ]

  return (
    <DefaultLayout>
      <Wrapper>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={async (param) => {
            let path = '/companies/' + param.row.symbol
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
      companies: allCompanies,
    },
  }
}

export default Companies