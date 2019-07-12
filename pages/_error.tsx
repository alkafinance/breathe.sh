import {Flex, Heading} from 'fannypack'
import {NextPageContext} from 'next'
import {ErrorProps} from 'next/error'
import React from 'react'
import {PageLayout} from '../ui/components/PageLayout'

const statusCodes: {[code: number]: string} = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

class Error extends React.Component<ErrorProps> {
  static getInitialProps({res, err}: NextPageContext) {
    const statusCode =
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404

    return {statusCode}
  }

  render() {
    const {statusCode, title: titleProp} = this.props
    const title =
      titleProp || statusCodes[statusCode] || 'An unexpected error has occurred'

    return (
      <PageLayout>
        <Flex flexDirection="column" padding="1.5rem" marginTop="1.5rem">
          <Heading use="h1" textAlign="center">
            {statusCode}
          </Heading>
          <Heading use="h4" textAlign="center">
            {title}
          </Heading>
        </Flex>
      </PageLayout>
    )
  }
}

export default Error
