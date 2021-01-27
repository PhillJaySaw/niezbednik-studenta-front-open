const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  stats: {
    errorDetails: true,
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: false,
      favicon: './src/assets/favicon.ico',
    }),
  ],
};
