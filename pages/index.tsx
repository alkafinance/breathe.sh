import {
  Box,
  Button,
  Flex,
  Input,
  Link,
  List,
  Set,
  styled,
  Text,
} from 'fannypack'
import React from 'react'
import {PageLayout} from '../components/PageLayout'

const StyledList = styled(List)`
  list-style: none;
  counter-reset: styled-counter;
  & li {
    counter-increment: styled-counter;
    padding-left: calc(1.75rem + 0.5rem);
    position: relative;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  & li::before {
    content: counter(styled-counter);
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.1rem 0;
    background-color: black;
    width: 1.75rem;
    text-align: center;
    border-radius: 50%;
    font-weight: 400;
  }
`

const Home: React.FC = _props => {
  return (
    <PageLayout>
      <Box backgroundColor="rgba(0, 0, 0, 0.75)" padding="2rem">
        <StyledList isOrdered color="textInverted">
          <List.Item>Enter the URL of any site that stresses you out</List.Item>
          <List.Item>Bookmark the redirect link</List.Item>
          <List.Item>Next time you visit, follow the bookmarked link</List.Item>
          <List.Item>
            Be greeted with a chance to stop and breathe before being redirected
            to your more stressful activities
          </List.Item>
        </StyledList>
        <Input
          a11yLabel="URL"
          type="url"
          placeholder="https://"
          defaultValue="https://"
          marginTop="2rem"
          color=""
        />
        <Set marginTop="2rem" justifyContent="flex-end">
          <Button size="medium" kind="outlined" iconAfter="link">
            Copy Link
          </Button>
          <Button
            size="medium"
            kind="outlined"
            iconAfter="navigation-circle-right">
            Go
          </Button>
        </Set>
      </Box>
      <Box marginTop="2rem" color="textInverted">
        <Flex flexDirection="column" alignItems="center">
          <Text>See an Example</Text>
          <Link color="textInverted" href="#">
            MSNBC Election Coverage
          </Link>
        </Flex>
      </Box>
    </PageLayout>
  )
}

export default Home
