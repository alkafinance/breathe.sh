import {Flex, Set, Text} from 'fannypack'
import React from 'react'
import {Res} from '../resources'

export const PageFooter: React.FC = _props => (
  <Flex
    padding="0.5rem 1rem"
    flexDirection="row"
    justifyContent="space-between">
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
  </Flex>
)
