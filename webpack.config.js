const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
