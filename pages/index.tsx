import React from 'react'
import {DefaultLayout} from "../layouts/Default";
import {Typography} from "@material-ui/core";

export default function Home() {
  return (
    <DefaultLayout>
      <Typography variant={'h2'}>
        Welcome to <a href="https://dividend-notice.net">Dividend Notice</a>
      </Typography>
      <Button></Button>
    </DefaultLayout>
  )
}
