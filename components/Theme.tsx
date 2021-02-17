import React, { ReactNode } from 'react'
import { createMuiTheme } from '@material-ui/core'
import { StylesProvider, ThemeProvider as MaterialThemeProvider } from '@material-ui/styles'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8BC34A',
      dark: '#689F38',
      light: '#DCEDC8',
    },
    secondary: {
      main: '#FF5722',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
})

const Body = styled.div`
  padding: 0 2rem;
  font-family: 'Roboto', '-apple-system', 'Helvetica', 'Meiryo', 'ヒラギノ角ゴシック', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'Verdana', 'sans-serif';
`
type Props = {
  children?: ReactNode
}

export const Theme = ({ children }: Props) => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Body>{children}</Body>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  )
}
