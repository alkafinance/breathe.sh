import {Flex, Set, Text, styled, theme} from 'fannypack'
import React from 'react'
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
      {[
        {
          Icon: Res.Icon.logo_facebook,
          title: 'Facebook Logo',
          href: 'https://facebook.com/alkafinance',
        },
        {
          Icon: Res.Icon.logo_twitter,
          title: 'Twitter Logo',
          href: 'https://twitter.com/alkafinance',
        },
        {
          Icon: Res.Icon.logo_instagram,
          title: 'Instagram Logo',
          href: 'https://instagram.com/alkafinance',
        },
      ].map(({Icon, title, href}) => (
        <a href={href} key={href}>
          <Flex padding="0.5rem" alignItems="center">
            <Icon role="img" title={title} width="24" height="24" fill="#fff" />
          </Flex>
        </a>
      ))}
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
