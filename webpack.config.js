'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var styleLintPlugin = require('stylelint-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

require('es6-promise').polyfill();

module.exports = function(env) {
  var config = {
    entry: './app/index.js',

    output: {
      path: __dirname,
      filename: env.jsUrl
    },

    plugins: [
      new ExtractTextPlugin(env.styleUrl),
      new HtmlWebpackPlugin({
        title: 'Citadel merchant',
        filename: 'build/index.html',
        inject: false,
        template: 'app/assets/templates/index.html',
        baseUrl: env.baseUrl,
        styleUrl: env.styleUrl,
        jsUrl: env.jsUrl
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          })
        }
      ]
    },

    stats: {
      colors: true
    }
  }

  return config;

};
