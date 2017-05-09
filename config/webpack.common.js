/**
 * Created by thinhtran on 1/31/17.
 */

const helpers = require('./helpers');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const METADATA = {
  title: 'App',
  baseUrl: '/'
};

module.exports = {
  entry: {
    vendors: helpers.root("src/app/vendors.js"),
    app: helpers.root("src/app/main.js")
  },
  output: {
    path: helpers.root('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".js"],
    alias: {

    }
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.ts?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=img/[path][name].[ext]&context=./app/images'
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors']
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets', ignore: ['*.scss']},
    ]),
    new webpack.ProvidePlugin({
    })
  ]
};