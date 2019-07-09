import {Flex, Container} from 'fannypack'
import React from 'react'
import {PageBackground} from './PageBackground'
import {PageFooter} from './PageFooter'

export const PageLayout: React.FC = ({children}) => (
  <>
    <Flex flexDirection="column" position="fixed" width="100%" height="100%">
      <PageBackground />
    </Flex>
    <Flex flexDirection="column" position="relative" flex="1" minHeight="100vh">
      <Container
        use="main"
        maxWidth="36rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex="1">
        {children}
      </Container>
      <PageFooter />
    </Flex>
  </>
)
