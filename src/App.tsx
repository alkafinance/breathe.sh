import {RouteComponentProps, Router} from '@reach/router'
import {
  Box,
  Container,
  ThemeProvider as FannypackThemeProvider,
} from 'fannypack'
import React from 'react'
import {theme} from './theme'

interface AppProps {}

export const App: React.FC<AppProps> = _props => {
  return (
    <FannypackThemeProvider theme={theme}>
      <>
        <Router>
          <Main path="/"></Main>
        </Router>
      </>
    </FannypackThemeProvider>
  )
}

interface MainProps extends RouteComponentProps {}

const Main: React.FC<MainProps> = _props => {
  return (
    <Container marginTop="2rem">
      <Box backgroundColor="whitesmoke" padding="0.5rem">
        Hello world!
      </Box>
    </Container>
  )
}
