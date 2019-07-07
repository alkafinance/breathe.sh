const withPlugins = require('next-compose-plugins')
const offline = require('next-offline')
const typescript = require('@zeit/next-typescript')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([offline, typescript, optimizedImages])
