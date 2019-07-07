const withOffline = require('next-offline')
const withTypescript = require('@zeit/next-typescript')

module.exports = withOffline(
  withTypescript({
    /* config options here */
  }),
)
