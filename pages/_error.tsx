import {DefaultErrorIProps} from 'next/error'
import React from 'react'

class Error extends React.Component<DefaultErrorIProps> {
  static getInitialProps({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null

    return {statusCode}
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
}

export default Error
