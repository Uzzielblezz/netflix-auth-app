const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        zlib: require.resolve('browserify-zlib'),
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        crypto: require.resolve('crypto-browserify'),
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
      return webpackConfig;
    },
  },
};
