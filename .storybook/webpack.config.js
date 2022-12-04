const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: '../src/index.ts',
  loader: 'ts-loader',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src/'),
      '@components': path.resolve(__dirname, '../src/components/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      // path.resolve(__dirname, '../src'),
      // path.resolve(__dirname, '../src/components'),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]
    return config
  },
}
