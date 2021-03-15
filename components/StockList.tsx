import styled from 'styled-components'
import { DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  height: 1000px;
`

interface Props {
  stocks: any[]
}

const StockList = (props: Props) => {
  const router = useRouter()

  const rows = props.stocks
  const columns = [
    { field: 'symbol', headerName: 'Symbol' },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'exchange', headerName: 'Exchange', width: 120 },
    { field: 'assetType', headerName: 'Type' },
    { field: 'ipoDate', headerName: 'IPO Date', width: 120 },
  ]

  return (
    <Wrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={async (param) => {
          const path = `/stocks/${param.row.symbol}`
          await router.push(path)
        }}
      />
    </Wrapper>
  )
}

export default StockList
