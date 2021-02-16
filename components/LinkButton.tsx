import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

type Props = {
  title: string
  path: string
}

const StyledButton = styled(Button)`
  padding: ${(props) => props.theme.spacing(0, 4)};
  background-color: ${(props) => props.theme.palette.primary.main};
`

export const LinkButton = (props: Props) => {
  const router = useRouter()

  return <StyledButton onClick={async () => router.push(props.path)}>{props.title}</StyledButton>
}
