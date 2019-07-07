import {Box, Flex, Container} from 'fannypack'
import React from 'react'
import {PageBackground} from './PageBackground'
import {PageFooter} from './PageFooter'

export const PageLayout: React.FC = ({children}) => (
  <Box>
    <PageBackground />
    <Flex
      flexDirection="column"
      position="absolute"
      top="0"
      left="0"
      bottom="0"
      right="0">
      <Container
        maxWidth="36rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex="1">
        {children}
      </Container>
      <PageFooter />
    </Flex>
  </Box>
)
