import {Flex, Set, Text, styled, theme} from 'fannypack'
import React from 'react'
import {FacebookShareButton, TwitterShareButton} from 'react-share'
import {Res} from '../resources'

const Container = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${theme('fannypack.layout.tabletBreakpoint')}px) {
    & {
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
    }
  }
`

export const PageFooter: React.FC = _props => (
  <Container padding="0.5rem 1rem">
    <Set spacing="major-1">
      <FacebookShareButton
        url="https://breathe.sh"
        quote="I found a way to take a breath before jumping into the most stressful parts of the internet with https://breathe.sh"
        hashtag="#mindfulness">
        <Flex padding="0.5rem" alignItems="center">
          <Res.Icon.logo_facebook
            role="img"
            title="Facebook Logo"
            width="24"
            height="24"
            fill="#fff"
          />
        </Flex>
      </FacebookShareButton>
      <TwitterShareButton
        key="twitter"
        url="https://breathe.sh"
        title="I found a way to take a breath before jumping into the most stressful parts of the internet with"
        hashtags={['mindfulness']}>
        <Flex padding="0.5rem" alignItems="center">
          <Res.Icon.logo_twitter
            role="img"
            title="Twitter Logo"
            width="24"
            height="24"
            fill="#fff"
          />
        </Flex>
      </TwitterShareButton>
    </Set>
    <a href="https://alka.app">
      <Flex padding="0.5rem" alignItems="center">
        <Res.Icon.logo_alka
          role="img"
          title="Alka Logo"
          width="48"
          height="48"
          fill="#fff"
        />
        <Text color="#fff" fontWeight="600">
          Built by Alka
        </Text>
      </Flex>
    </a>
  </Container>
)
