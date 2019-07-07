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
import {Res} from '../resources'

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
      <Box backgroundColor="rgba(0, 0, 0, 0.75)" padding="major-3">
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
          marginTop="major-3"
        />
        <Set marginTop="major-3" justifyContent="flex-end">
          <Button size="medium" kind="outlined">
            Copy Link
            <Flex marginLeft="major-1" alignItems="center">
              <Res.Icon.link width="18" height="18" />
            </Flex>
          </Button>
          <Button size="medium" kind="outlined">
            Go
            <Flex marginLeft="major-1" alignItems="center">
              <Res.Icon.navigation_circle_right width="18" height="18" />
            </Flex>
          </Button>
        </Set>
      </Box>
      <Box marginTop="major-3" color="textInverted">
        <Flex flexDirection="column" alignItems="center">
          <Text>See an Example</Text>
          <Link href="#">MSNBC Election Coverage</Link>
        </Flex>
      </Box>
    </PageLayout>
  )
}

export default Home
