const withPlugins = require('next-compose-plugins')
const offline = require('next-offline')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins(
  [offline, [optimizedImages, {handleImages: ['jpg', 'png']}]],
  {
    webpack: (config, _options) => {
      config.module.rules.push(
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                titleProp: true,
                svgoConfig: {
                  plugins: {
                    removeViewBox: false,
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(webm|mp4)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static',
                publicPath: '/_next/static',
                name: '[path][name].[hash].[ext]',
              },
            },
          ],
        },
      )

      return config
    },
  },
)
