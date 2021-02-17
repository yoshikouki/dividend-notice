import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

type Props = {
  title: string
  path: string
}

const StyledButton = styled(Button)`
  margin: 2rem 0;
  padding: 1rem 2rem;
  width: 100%;
  min-height: 4rem;
  font-size: large;
  background-color: ${(props) => props.theme.palette.primary.main};
`

export const LinkButton = (props: Props) => {
  const router = useRouter()

  return <StyledButton onClick={async () => router.push(props.path)}>{props.title}</StyledButton>
}
