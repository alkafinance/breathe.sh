const withPlugins = require('next-compose-plugins')
const offline = require('next-offline')
const typescript = require('@zeit/next-typescript')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins(
  [offline, typescript, [optimizedImages, {handleImages: ['png']}]],
  {
    webpack: (config, _options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      })

      return config
    },
  },
)
