import {Flex, Set, Text} from 'fannypack'
import React from 'react'
import {Res} from '../resources'

export const PageFooter: React.FC = _props => (
  <Flex
    padding="major-3"
    color="#fff"
    flexDirection="row"
    justifyContent="space-between">
    <Set spacing="major-1">
      {[
        {Icon: Res.Icon.logo_facebook, href: '#facebook'},
        {Icon: Res.Icon.logo_twitter, href: '#twitter'},
        {Icon: Res.Icon.logo_instagram, href: '#instagram'},
      ].map(({Icon, href}) => (
        <a href={href} key={href}>
          <Flex padding="major-1" alignItems="center">
            <Icon width="24" height="24" fill="#fff" />
          </Flex>
        </a>
      ))}
    </Set>
    <a href="https://alka.app">
      <Flex padding="major-1" alignItems="center">
        <Res.Icon.logo_alka width="48" height="48" fill="#fff" />
        <Text fontWeight="600">Built by Alka</Text>
      </Flex>
    </a>
  </Flex>
)
