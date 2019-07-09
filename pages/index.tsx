import copy from 'copy-text-to-clipboard'
import {Button, Flex, Input, List, Set, styled, Text, Toast} from 'fannypack'
import NextLink from 'next/link'
import Router from 'next/router'
import React, {useState} from 'react'
import {PageLayout} from '../components/PageLayout'
import {Res} from '../resources'
import {getAnalytics} from '../utils/analytics'

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
  const [redirectPath, setRedirectPath] = useState('/#')

  return (
    <PageLayout>
      <Toast.Container>
        {toast => (
          <form
            onSubmit={event => {
              event.preventDefault()

              getAnalytics().breatheLinkCreated()
              copy(
                `${window.location.protocol}//${window.location.host}${redirectPath}`,
              )
              toast.success({
                message: 'Link copied',
                autoDismissTimeout: 4000,
                showCountdownBar: false,
              })
            }}>
            <Flex
              flexDirection="column"
              backgroundColor="rgba(0, 0, 0, 0.75)"
              padding="1.5rem">
              <StyledList isOrdered>
                <List.Item>
                  Enter the URL of any site that stresses you out
                </List.Item>
                <List.Item>Bookmark the redirect link</List.Item>
                <List.Item>
                  Next time you visit, follow the bookmarked link
                </List.Item>
                <List.Item>
                  Be greeted with a chance to stop and breathe before being
                  redirected to your more stressful activities
                </List.Item>
              </StyledList>
              <Input
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  const newToUrl = event.currentTarget.value
                  const newRedirectPath = `/redirect?to=${encodeURIComponent(
                    newToUrl,
                  )}`

                  setRedirectPath(newRedirectPath)
                }}
                a11yLabel="URL"
                type="url"
                placeholder="https://"
                defaultValue="https://"
                marginTop="1.5rem"
                required
              />
              <Set marginTop="1.5rem" justifyContent="flex-end">
                <Button size="medium" kind="outlined" type="submit">
                  Copy Link
                  <Flex marginLeft="0.5rem" alignItems="center">
                    <Res.Icon.link
                      aria-hidden
                      role="img"
                      width="18"
                      height="18"
                    />
                  </Flex>
                </Button>
                <Button
                  size="medium"
                  kind="outlined"
                  onClick={() => {
                    getAnalytics().breatheLinkCreated()
                    Router.push(redirectPath)
                  }}>
                  Go
                  <Flex marginLeft="0.5rem" alignItems="center">
                    <Res.Icon.navigation_circle_right
                      aria-hidden
                      role="img"
                      width="18"
                      height="18"
                    />
                  </Flex>
                </Button>
              </Set>
            </Flex>
          </form>
        )}
      </Toast.Container>
      <Flex flexDirection="column" alignItems="center" marginTop="1.5rem">
        <Text>See an Example</Text>
        <NextLink href="/redirect/[toId]" as="/redirect/election">
          <a>MSNBC Election Coverage</a>
        </NextLink>
      </Flex>
    </PageLayout>
  )
}

export default Home
