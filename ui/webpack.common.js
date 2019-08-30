"use strict";

require("@babel/polyfill");

const merge = require("webpack-merge");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge.smart(baseConfig, {
  entry: {
    app: [
      "@babel/polyfill",
      "./src/app.js"
    ]
  },
  module: {
    // temp
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      // temp
    })
  ]
});
